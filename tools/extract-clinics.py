"""
심평원 「전국 병의원 및 약국 현황 2026.6」에서 서울·경기 피부과 의원을 추출한다.
출처: 건강보험심사평가원 (공공누리 출처표시)

병원정보서비스(기본정보) + 진료과목정보를 암호화요양기호로 조인한다.
"""
import csv
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from xlsx import rows  # noqa: E402

BASE = Path(__file__).parent / "hira/unpacked/전국 병의원 및 약국 현황 2026.6"
F_BASIC = BASE / "1.병원정보서비스(2026.6.).xlsx"
F_DEPT = BASE / "5.의료기관별상세정보서비스_03_진료과목정보(2026.6.).xlsx"
OUT = Path(__file__).parent / "clinics-derma-seoul-gyeonggi.csv"

TARGET_SIDO = {"서울", "경기"}
TARGET_DEPT = "피부과"
TARGET_CL = {"의원"}  # 병원·종합병원 제외 (1인이 뚫을 수 있는 규모)

# --- 1단계: 피부과 진료과목을 신고한 요양기관 집합 ---
derma = {}  # 암호화요양기호 -> 과목별 전문의수
for i, r in enumerate(rows(F_DEPT)):
    if i == 0:
        continue
    if len(r) < 5:
        continue
    if r[3] == TARGET_DEPT:
        derma[r[0]] = r[4]
print(f"전국 피부과 진료과목 신고 기관: {len(derma):,}곳", file=sys.stderr)

# --- 2단계: 기본정보에서 서울·경기 + 의원 + 피부과만 추출 ---
HEADER = [
    "요양기관명", "종별", "시도", "시군구", "읍면동", "주소", "전화번호",
    "홈페이지", "개설일자", "총의사수", "피부과전문의수", "좌표X", "좌표Y",
    "요양기호",
]

picked = []
for i, r in enumerate(rows(F_BASIC)):
    if i == 0:
        continue
    if len(r) < 30:
        r = r + [""] * (30 - len(r))
    key, name, cl_nm, sido, sggu, emd = r[0], r[1], r[3], r[5], r[7], r[8]
    if sido not in TARGET_SIDO or cl_nm not in TARGET_CL or key not in derma:
        continue
    picked.append([
        name, cl_nm, sido, sggu, emd, r[10], r[11],
        r[12], r[13], r[14], derma[key], r[28], r[29], key,
    ])

print(f"서울·경기 피부과 의원: {len(picked):,}곳", file=sys.stderr)

with_url = [p for p in picked if p[7]]
print(f"  └ 홈페이지 보유: {len(with_url):,}곳 ({len(with_url)/max(1,len(picked))*100:.1f}%)", file=sys.stderr)

picked.sort(key=lambda x: (x[2], x[3], x[0]))
with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(HEADER)
    w.writerows(picked)
print(f"\n저장: {OUT}", file=sys.stderr)

# --- 요약 ---
from collections import Counter  # noqa: E402

print("\n시도별:", dict(Counter(p[2] for p in picked)), file=sys.stderr)
print("\n서울 상위 시군구:", file=sys.stderr)
for k, v in Counter(p[3] for p in picked if p[2] == "서울").most_common(8):
    print(f"  {k:12} {v:4}곳", file=sys.stderr)
print("\n경기 상위 시군구:", file=sys.stderr)
for k, v in Counter(p[3] for p in picked if p[2] == "경기").most_common(8):
    print(f"  {k:12} {v:4}곳", file=sys.stderr)
