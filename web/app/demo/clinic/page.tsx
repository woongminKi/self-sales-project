import DemoBanner from "./_components/DemoBanner";
import ClinicHeader from "./_components/ClinicHeader";
import ClinicHero from "./_components/ClinicHero";
import DepartmentsSection from "./_components/DepartmentsSection";
import DoctorsSection from "./_components/DoctorsSection";
import NonCoveredFeesSection from "./_components/NonCoveredFeesSection";
import LocationSection from "./_components/LocationSection";
import ContactSection from "./_components/ContactSection";
import ClinicFooter from "./_components/ClinicFooter";

// 실존하지 않는 가상 의료기관의 JSON-LD 데모 — AEO/구조화 데이터 대응 역량 증명용
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "성수바른내과의원",
  description:
    "서울 성동구 소재 내과 의원(웹사이트 제작 데모용 가상 의료기관). 소화기·호흡기·순환기 진료 및 건강검진.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "○○로 00 (데모용 가상 주소)",
    addressLocality: "성동구",
    addressRegion: "서울특별시",
    addressCountry: "KR",
  },
  telephone: "02-000-0000",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"],
      opens: "09:00",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  medicalSpecialty: ["Gastroenterologic", "Pulmonary", "Cardiovascular"],
};

export default function ClinicDemoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sticky top-0 z-50 flex flex-col">
        <DemoBanner />
        <ClinicHeader />
      </div>
      <main>
        <ClinicHero />
        <DepartmentsSection />
        <DoctorsSection />
        <NonCoveredFeesSection />
        <LocationSection />
        <ContactSection />
      </main>
      <ClinicFooter />
    </>
  );
}
