/**
 * 사업자 정보 단일 출처 — 푸터와 개인정보처리방침이 함께 참조한다.
 *
 * TODO(대표님): 아래 두 항목을 채워야 표기가 완성됩니다.
 *   - representative: 대표자 성명 (성 포함)
 *   - registrationNo: 사업자등록번호. 등록 전이면 빈 문자열로 두면 표시되지 않습니다.
 */
export const BUSINESS = {
  brand: "웅쓰컴퍼니",
  tagline: "병원·의원 홈페이지 제작 · 1인 운영",
  representative: "기웅민",
  registrationNo: "414-01-72239",
  email: "woongs.official@gmail.com",
  /** 개인정보 보호책임자 — 1인 사업이므로 대표가 겸한다 */
  privacyOfficer: "대표",
  /** 문의 정보 보유 기간 */
  retentionPeriod: "1년",
  /** 이메일 발송 수탁사 — 문의 내용이 이 서비스를 거쳐 전달된다 */
  processor: { name: "Resend, Inc.", purpose: "문의 내용 이메일 발송" },
  updatedAt: "2026년 8월 6일",
} as const;
