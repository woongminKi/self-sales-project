import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: `개인정보처리방침 | ${BUSINESS.brand}`,
  description: `${BUSINESS.brand}가 문의 접수 과정에서 수집하는 개인정보의 항목·목적·보유기간과 정보주체의 권리를 안내합니다.`,
  robots: { index: false, follow: true },
};

/*
  이 방침은 실제 처리 실태를 그대로 반영해야 한다.
  이 사이트가 실제로 하는 일: 문의 폼 입력값을 Resend를 통해 대표 이메일로 발송.
  분석 도구·광고 픽셀·쿠키 기반 추적은 사용하지 않으므로 해당 조항을 넣지 않았다.
  수집 항목이나 도구가 바뀌면 이 문서를 함께 고쳐야 한다.
*/
const sections = [
  {
    title: "1. 수집하는 개인정보 항목과 수집 방법",
    body: [
      "홈페이지의 무료 점검 신청 양식을 통해 아래 항목을 수집합니다.",
    ],
    list: [
      "필수: 성함, 연락처",
      "선택: 이메일, 의원·기관명, 홈페이지 주소, 문의 내용, 관심 구성",
    ],
    after: [
      "정보주체가 양식에 직접 입력하는 방법으로만 수집하며, 그 밖의 경로로 수집하지 않습니다.",
    ],
  },
  {
    title: "2. 개인정보의 수집 및 이용 목적",
    list: [
      "문의에 대한 회신 및 상담",
      "홈페이지 점검 리포트 작성과 전달",
      "견적 안내 및 계약 관련 연락",
    ],
    after: ["위 목적 외의 용도로 이용하지 않습니다."],
  },
  {
    title: "3. 개인정보의 보유 및 이용 기간",
    body: [
      `수집·이용 목적이 달성된 후 지체 없이 파기합니다. 다만 상담 이력 관리를 위해 최대 ${BUSINESS.retentionPeriod}간 보관하며, 기간이 지나면 복구할 수 없는 방법으로 파기합니다.`,
      "정보주체가 파기를 요청하시면 보유 기간과 관계없이 즉시 파기합니다.",
    ],
  },
  {
    title: "4. 개인정보 처리의 위탁",
    body: ["문의 내용을 전달받기 위해 아래와 같이 처리를 위탁하고 있습니다."],
    list: [`${BUSINESS.processor.name} — ${BUSINESS.processor.purpose}`],
    after: [
      "위탁 업무의 내용이나 수탁자가 변경될 경우 이 방침을 통해 공개하겠습니다.",
    ],
  },
  {
    title: "5. 개인정보의 제3자 제공",
    body: [
      "정보주체의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만 법령에 근거가 있거나 수사기관이 적법한 절차에 따라 요구하는 경우는 예외로 합니다.",
    ],
  },
  {
    title: "6. 정보주체의 권리와 행사 방법",
    body: [
      "정보주체는 언제든지 아래 권리를 행사하실 수 있습니다.",
    ],
    list: [
      "개인정보 열람 요구",
      "오류가 있을 경우 정정 요구",
      "삭제 요구",
      "처리 정지 요구",
    ],
    after: [
      `아래 연락처로 요청하시면 지체 없이 조치하겠습니다. 요청은 ${BUSINESS.email} 으로 접수받습니다.`,
    ],
  },
  {
    title: "7. 개인정보의 파기 절차 및 방법",
    body: [
      "보유 기간이 지나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일 형태의 정보는 복구할 수 없는 기술적 방법으로 영구 삭제합니다.",
    ],
  },
  {
    title: "8. 개인정보의 안전성 확보 조치",
    list: [
      "개인정보 취급자를 최소한으로 제한 (1인 운영)",
      "전송 구간 암호화(HTTPS) 적용",
      "접근 권한 관리 및 비밀번호 관리",
    ],
  },
  {
    title: "9. 쿠키 등 자동 수집 장치의 운영",
    body: [
      "이 홈페이지는 방문자 분석 도구나 광고 식별자 등 개인정보를 자동으로 수집하는 장치를 사용하지 않습니다. 추후 도입할 경우 이 방침을 개정하고 사전에 공지하겠습니다.",
    ],
  },
  {
    title: "10. 개인정보 보호책임자",
    list: [
      `책임자: ${BUSINESS.privacyOfficer} (${BUSINESS.representative})`,
      `연락처: ${BUSINESS.email}`,
    ],
    after: [
      "개인정보 처리에 관한 문의, 불만, 피해 구제는 위 연락처로 접수해 주시기 바랍니다.",
    ],
  },
  {
    title: "11. 권익침해 구제 방법",
    body: [
      "개인정보 침해로 인한 구제가 필요하신 경우 아래 기관에 도움을 요청하실 수 있습니다.",
    ],
    list: [
      "개인정보 침해신고센터 (privacy.kisa.or.kr / 국번 없이 118)",
      "개인정보 분쟁조정위원회 (kopico.go.kr / 1833-6972)",
      "대검찰청 사이버수사과 (spo.go.kr / 1301)",
      "경찰청 사이버수사국 (ecrm.police.go.kr / 182)",
    ],
  },
  {
    title: "12. 방침의 변경",
    body: [
      `이 개인정보처리방침은 ${BUSINESS.updatedAt}부터 적용됩니다. 내용의 추가·삭제·수정이 있을 경우 시행 7일 전부터 홈페이지를 통해 공지하겠습니다.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            개인정보처리방침
          </h1>
          <p className="mt-4 text-sm text-slate-500">
            {BUSINESS.brand}(이하 &lsquo;회사&rsquo;)는 정보주체의 개인정보를
            중요하게 생각하며, 「개인정보 보호법」을 준수하고 있습니다.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            시행일 {BUSINESS.updatedAt}
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-lg font-semibold text-white">{s.title}</h2>
                {s.body?.map((p) => (
                  <p
                    key={p}
                    className="mt-3 text-sm leading-relaxed text-slate-400"
                  >
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-400">
                    {s.list.map((li) => (
                      <li key={li} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400/70" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.after?.map((p) => (
                  <p
                    key={p}
                    className="mt-3 text-sm leading-relaxed text-slate-400"
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <a
            href="/"
            className="mt-14 inline-block text-sm text-sky-300 transition hover:text-sky-200"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
