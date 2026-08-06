"""
2군 문의폼 발송 문구 생성 — 의원별로 완성된 텍스트를 만들어 복붙만 하면 되게 한다.

문구만 생성한다. 폼 제출은 반드시 사람이 한다 (자동 제출 = 스팸 봇).

입력: docs/leads/clinics-triaged.csv (등급 2 + 문의폼 보유)
출력: docs/leads/form-messages.csv — 발송 우선순위 순 정렬, 발송 기록 컬럼 포함
"""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IN = ROOT / "docs/leads/clinics-triaged.csv"
OUT = ROOT / "docs/leads/form-messages.csv"

SIG = "웅쓰컴퍼니 / woongs.official@gmail.com"
OPEN = "안녕하세요. 환자 문의가 아니라, 홈페이지 관련해 알려드릴 것이 있어 남깁니다."
CLOSE = "관리 업체에 그대로 전달하시면 됩니다. 제게 회신하지 않으셔도 괜찮습니다."

# 후크 문자열 → (템플릿ID, 본문 생성 함수)
BODIES = {
    "HTTPS 미설정": (
        "A",
        lambda n: (
            f"{n} 홈페이지에 https:// 로 접속하면 보안 인증서 오류로 경고 화면이 뜨고, "
            "http:// 로만 정상 접속됩니다.\n\n"
            "요즘 브라우저는 주소를 입력하면 https 부터 시도하기 때문에 환자분에 따라 경고 화면을 "
            '먼저 보게 됩니다. http 로 열려도 주소창에 "안전하지 않음"이 표시됩니다.\n\n'
            "무료 인증서로도 해결됩니다."
        ),
    ),
    "tel: 링크 없음": (
        "B",
        lambda n: (
            f"{n} 홈페이지의 전화번호가 눌러서 전화를 걸 수 있는 형태가 아니라 글자로만 "
            "표시되어 있습니다.\n\n"
            "휴대폰으로 보시는 분이 번호를 눌러도 아무 일이 일어나지 않아, 번호를 따로 옮겨 적어 "
            "전화 앱에 입력해야 합니다. 진료 문의가 대부분 전화로 들어오는 만큼 이 단계에서 "
            "이탈이 생깁니다.\n\n간단한 수정으로 해결됩니다."
        ),
    ),
    "viewport 없음": (
        "C",
        lambda n: (
            f"{n} 홈페이지를 휴대폰으로 열면 화면이 좌우로 밀리고 글씨가 작아서 확대해야 읽힙니다. "
            "화면 크기 설정(viewport)이 없어 휴대폰이 PC 화면을 그대로 축소해 보여주는 상태입니다.\n\n"
            "병원 홈페이지 방문자는 대부분 휴대폰입니다."
        ),
    ),
    "모바일 가로스크롤": (
        "C",
        lambda n: (
            f"{n} 홈페이지를 휴대폰으로 열면 화면이 좌우로 밀립니다. 레이아웃이 휴대폰 화면 폭에 "
            "맞춰지지 않은 상태입니다.\n\n병원 홈페이지 방문자는 대부분 휴대폰입니다."
        ),
    ),
    "개인정보처리방침 없음": (
        "D",
        lambda n: (
            f"{n} 홈페이지에서 온라인 문의를 받고 계신데, 개인정보처리방침 페이지가 확인되지 "
            "않습니다.\n\n"
            "문의 과정에서 이름이나 연락처를 받으시면 개인정보를 수집하는 것이 되고, "
            "개인정보보호법에 처리방침을 정해 공개하도록 규정되어 있습니다. 병원 홈페이지에서 "
            "흔히 빠져 있는 부분입니다.\n\n표준 양식으로 정리하시면 됩니다."
        ),
    ),
}

# 2번째 후크로 덧붙일 짧은 문장 (한 줄만)
SECOND = {
    "HTTPS 미설정": "https 접속 시 인증서 경고가 뜨는 점",
    "tel: 링크 없음": "휴대폰에서 전화번호를 눌러도 연결되지 않는 점",
    "viewport 없음": "휴대폰 화면에 맞춰지지 않는 점",
    "모바일 가로스크롤": "휴대폰에서 화면이 좌우로 밀리는 점",
    "개인정보처리방침 없음": "개인정보처리방침 페이지가 없는 점",
}


def match(hook_text):
    """후크 문자열에서 템플릿 키를 찾는다."""
    for key in BODIES:
        if key in hook_text:
            return key
    return None


rows = []
skipped = 0
for r in csv.DictReader(open(IN, encoding="utf-8")):
    if r["등급"] != "2":
        continue
    if not (r["문의폼"] and r["문의폼"].isdigit() and int(r["문의폼"]) > 0):
        continue

    hooks = [h.strip() for h in r["후크"].split(" / ")]
    primary = match(hooks[0])
    if not primary:
        # 카피라이트 방치만 있는 경우 등 — 단독 발송하지 않는다
        skipped += 1
        continue

    tid, body_fn = BODIES[primary]
    parts = [OPEN, body_fn(r["요양기관명"])]

    # 2번째 후크가 있으면 한 줄만 추가
    extra = next((SECOND[k] for h in hooks[1:] if (k := match(h)) and k != primary), None)
    if extra:
        parts.append(f"이 외에 {extra}도 함께 확인해 보시면 좋겠습니다.")

    parts += [CLOSE, SIG]

    rows.append({
        "우선순위": 6 - min(len(hooks), 5),  # 결함 많을수록 앞
        "결함수": len(hooks),
        "템플릿": tid,
        "요양기관명": r["요양기관명"],
        "시도": r["시도"],
        "시군구": r["시군구"],
        "홈페이지": r["홈페이지"],
        "전화": r["전화"],
        "후크전체": r["후크"],
        "발송문구": "\n\n".join(parts),
        "발송일": "",
        "회신": "",
        "다음액션": "",
    })

rows.sort(key=lambda x: (x["우선순위"], x["시도"], x["시군구"], x["요양기관명"]))
with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)

from collections import Counter  # noqa: E402

print(f"발송 문구 {len(rows)}곳 생성 → {OUT.name}  (템플릿 미매칭 제외 {skipped}곳)")
print("\n템플릿별:", dict(sorted(Counter(r["템플릿"] for r in rows).items())))
print("결함수별:", dict(sorted(Counter(r["결함수"] for r in rows).items(), reverse=True)))
print(f"\n1차 발송 대상(결함 4개 이상): {sum(1 for r in rows if r['결함수'] >= 4)}곳")
print(f"글자수 평균 {sum(len(r['발송문구']) for r in rows) // len(rows)}자, "
      f"최대 {max(len(r['발송문구']) for r in rows)}자")
