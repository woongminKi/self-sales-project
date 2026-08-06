"""
표준 라이브러리만으로 xlsx를 스트리밍 읽는다. (openpyxl/pandas 미설치 환경)
xlsx = zip(xml)이므로 sharedStrings + sheet XML을 직접 파싱한다.
"""
import re
import zipfile
from xml.etree import ElementTree as ET

NS = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"


def _col_index(ref):
    """A1 -> 0, B1 -> 1, AA1 -> 26"""
    letters = re.match(r"([A-Z]+)", ref or "")
    if not letters:
        return None
    n = 0
    for ch in letters.group(1):
        n = n * 26 + (ord(ch) - 64)
    return n - 1


def _shared_strings(z):
    """sharedStrings.xml -> 인덱스별 문자열 리스트"""
    name = "xl/sharedStrings.xml"
    if name not in z.namelist():
        return []
    out = []
    with z.open(name) as f:
        for event, el in ET.iterparse(f, events=("end",)):
            if el.tag == f"{NS}si":
                # si 안의 모든 t를 이어붙인다 (서식이 나뉘어 여러 t가 될 수 있음)
                out.append("".join(t.text or "" for t in el.iter(f"{NS}t")))
                el.clear()
    return out


def _first_sheet(z):
    names = [n for n in z.namelist() if re.match(r"xl/worksheets/sheet\d+\.xml$", n)]
    return sorted(names)[0] if names else None


def rows(path, limit=None):
    """행을 리스트(문자열)로 순차 반환한다."""
    with zipfile.ZipFile(path) as z:
        shared = _shared_strings(z)
        sheet = _first_sheet(z)
        if not sheet:
            return
        count = 0
        with z.open(sheet) as f:
            row_vals, row_open = {}, False
            for event, el in ET.iterparse(f, events=("start", "end")):
                if event == "start" and el.tag == f"{NS}row":
                    row_vals, row_open = {}, True
                elif event == "end" and el.tag == f"{NS}c" and row_open:
                    idx = _col_index(el.get("r"))
                    t = el.get("t")
                    if t == "s":
                        v = el.find(f"{NS}v")
                        raw = shared[int(v.text)] if v is not None and v.text else ""
                    elif t == "inlineStr":
                        raw = "".join(x.text or "" for x in el.iter(f"{NS}t"))
                    else:
                        v = el.find(f"{NS}v")
                        raw = v.text if v is not None and v.text else ""
                    if idx is not None:
                        row_vals[idx] = (raw or "").strip()
                    el.clear()
                elif event == "end" and el.tag == f"{NS}row":
                    width = (max(row_vals) + 1) if row_vals else 0
                    yield [row_vals.get(i, "") for i in range(width)]
                    row_vals, row_open = {}, False
                    el.clear()
                    count += 1
                    if limit and count >= limit:
                        return


if __name__ == "__main__":
    import sys

    src = sys.argv[1]
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    for i, r in enumerate(rows(src, limit=n)):
        print(f"[{i}] ({len(r)}컬럼)")
        for j, c in enumerate(r):
            if c:
                print(f"     {j:2} {c[:70]}")
        print()
