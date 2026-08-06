"""
triage-results.jsonl → 후크 등급별 리드 CSV.

등급 규칙 (마포 파일럿에서 검증된 후크 강도 순):
  1군 = 단정 가능 + 환자 영향 즉시 (사이트 차단·DB오류·인증서 문제)
  2군 = 단정 가능 + 전환 손실 (tel 없음·모바일 미대응·방침 없음)
  3군 = 후크 약함 (기술 정상 — 제56조 검수로만 접근 가능)
  X  = 접촉 불가/보류 (사이트 죽음 등 확인 불가)

출력: docs/leads/clinics-triaged.csv (의원 1행 단위 — 같은 도메인 공유 체인은 전개)
"""
import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IN = ROOT / "docs/leads/triage-results.jsonl"
OUT = ROOT / "docs/leads/clinics-triaged.csv"


def classify(d):
    """(등급, 후크 목록) 반환"""
    hooks = []
    err = d.get("error") or ""

    # --- 접속 자체가 막히는 결함 (1군) ---
    if "ERR_CERT_DATE_INVALID" in err:
        return "1", ["SSL 인증서 만료 — 사이트 진입 차단"]
    if "ERR_CERT" in err or "ERR_SSL" in err:
        return "1", [f"SSL 오류({err}) — 사이트 진입 차단"]
    if err:  # 타임아웃·DNS 실패 등 — 재시도까지 실패한 곳
        return "X", [f"접속 실패: {err}"]

    http = d.get("http")
    if http and http >= 400:
        return "1", [f"홈페이지 HTTP {http} 오류 — 검색 유입이 오류 화면"]

    if d.get("dbError"):
        hooks.append("화면에 DB 오류 메시지 노출")
    if d.get("finalUrl", "").startswith("http://") and not d.get("error"):
        hooks.append("HTTPS 미설정(http로만 접속)")

    # --- 전환 손실 결함 (2군) ---
    if d.get("telLinks") == 0:
        hooks.append("tel: 링크 없음 — 휴대폰에서 전화 연결 안 됨")
    if not d.get("viewport"):
        hooks.append("viewport 없음 — 모바일 미대응")
    elif d.get("hScroll"):
        hooks.append("모바일 가로스크롤 발생")
    if not d.get("privacyHref"):
        hooks.append("개인정보처리방침 없음")
    yr = d.get("copyrightYear")
    if yr and yr <= 2022:
        hooks.append(f"푸터 카피라이트 {yr} — 방치 인상")

    if d.get("dbError"):
        return "1", hooks
    grade = "2" if hooks else "3"
    return grade, hooks or ["기술 결함 없음 — 제56조 검수 접근"]


rows = []
grade_count = Counter()
with open(IN, encoding="utf-8") as f:
    for line in f:
        if not line.strip():
            continue
        d = json.loads(line)
        grade, hooks = classify(d)
        for c in d.get("clinics", []):
            rows.append({
                "등급": grade,
                "요양기관명": c["name"],
                "시도": c["sido"],
                "시군구": c["sggu"],
                "전화": c["tel"],
                "홈페이지": d["url"],
                "후크": " / ".join(hooks),
                "문의폼": d.get("forms", ""),
                "카카오채널": "O" if d.get("kakao") else "",
                "방침페이지": d.get("privacyHref") or "",
                "HTTP": d.get("http", ""),
                "점검일": d.get("ts", "")[:10],
            })
        grade_count[grade] += 1

rows.sort(key=lambda r: (r["등급"], r["시도"], r["시군구"], r["요양기관명"]))
with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)

total = sum(grade_count.values())
print(f"도메인 {total}개 분류 (의원 {len(rows)}곳) → {OUT}")
for g in ["1", "2", "3", "X"]:
    print(f"  {g}군: {grade_count.get(g, 0):4}개 도메인")
form_ok = sum(1 for r in rows if r["문의폼"] and int(r["문의폼"] or 0) > 0)
privacy_ok = sum(1 for r in rows if r["방침페이지"])
print(f"  문의폼 보유 의원: {form_ok}곳 (§50의2 무관 발송 채널)")
print(f"  방침페이지 보유: {privacy_ok}곳 (이메일 사람 확인 후보)")
