"""
tier1-verified.jsonl → 접촉용 확정 목록.

verdict 의미:
  CONFIRMED      모든 변형(www/apex × http/https)이 죽음 → 사이트 전체 진입 불가
  PARTIAL        일부 변형만 살아있음 → 후크는 유효하되 강도 조정
                 (심평원·검색에 등록된 주소가 오류 / HTTPS만 차단 등)
  FALSE_POSITIVE 원본 URL이 재방문에서 정상 → 1패스 오탐, 2군으로 강등

출력: docs/leads/tier1-contact-list.csv
"""
import csv
import json
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
IN = ROOT / "docs/leads/tier1-verified.jsonl"
TRIAGED = ROOT / "docs/leads/clinics-triaged.csv"
OUT = ROOT / "docs/leads/tier1-contact-list.csv"

# 문의폼·방침·카카오 정보는 1패스 집계본에서 끌어온다 (도메인 기준)
extra = {}
if TRIAGED.exists():
    for r in csv.DictReader(open(TRIAGED, encoding="utf-8")):
        extra[r["홈페이지"]] = r


def describe(rec):
    """검증 결과를 접촉 시 그대로 읽을 수 있는 후크 문장으로."""
    p1 = rec["pass1"]
    orig = rec["url"]
    v = rec["verdict"]

    if v == "CONFIRMED":
        if p1.get("error"):
            return f"홈페이지 접속 차단 — 보안 인증서 오류({p1['error']}). www·apex, http·https 4가지 경로 모두 실패"
        return f"홈페이지 접속 불가 — HTTP {p1.get('http')} 오류. www·apex, http·https 4가지 경로 모두 실패"

    if v == "PARTIAL":
        alive = rec.get("aliveUrl", "")
        a_scheme = urlparse(alive).scheme
        o_scheme = urlparse(orig).scheme
        if a_scheme == "http" and o_scheme == "https":
            return f"HTTPS 접속 시 인증서 오류로 차단({p1.get('error')}) — http로만 접속 가능. 브라우저가 '안전하지 않음' 표시"
        return (
            f"심평원·검색에 등록된 주소({orig})가 오류 — 실제 사이트는 {alive}. "
            f"환자가 등록 주소로 들어오면 오류 화면"
        )

    return "1패스 오탐 — 재방문 시 정상. 2군으로 강등"


rows, counts = [], Counter()
for line in open(IN, encoding="utf-8"):
    if not line.strip():
        continue
    rec = json.loads(line)
    counts[rec["verdict"]] += 1
    if rec["verdict"] == "FALSE_POSITIVE":
        continue
    ex = extra.get(rec["url"], {})
    for c in rec["clinics"]:
        rows.append({
            "판정": rec["verdict"],
            "요양기관명": c["name"],
            "시도": c["sido"],
            "시군구": c["sggu"],
            "전화": c["tel"],
            "등록홈페이지": rec["url"],
            "살아있는주소": rec.get("aliveUrl", ""),
            "후크": describe(rec),
            "문의폼": ex.get("문의폼", ""),
            "카카오채널": ex.get("카카오채널", ""),
            "방침페이지": ex.get("방침페이지", ""),
            "검증일": rec["ts"][:10],
        })

order = {"CONFIRMED": 0, "PARTIAL": 1}
rows.sort(key=lambda r: (order.get(r["판정"], 9), r["시도"], r["시군구"], r["요양기관명"]))

with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)

total = sum(counts.values())
print(f"검증 {total}개 도메인 → 접촉 대상 {len(rows)}곳  ({OUT.name})")
for k in ["CONFIRMED", "PARTIAL", "FALSE_POSITIVE"]:
    print(f"  {k:15} {counts.get(k, 0):3}")
if total:
    fp = counts.get("FALSE_POSITIVE", 0)
    print(f"  1패스 오탐률: {fp / total * 100:.1f}%")
print()
print("접촉 채널 가용:")
print(f"  전화 보유:   {sum(1 for r in rows if r['전화'])}곳")
print(f"  문의폼 보유: {sum(1 for r in rows if r['문의폼'] and r['문의폼'] not in ('', '0'))}곳")
print(f"  카카오채널:  {sum(1 for r in rows if r['카카오채널'])}곳")
