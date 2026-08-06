import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Numbers from "@/components/Numbers";
import ThreeStages from "@/components/ThreeStages";
import Portfolio from "@/components/Portfolio";
import Compare from "@/components/Compare";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Numbers />
        <ThreeStages />
        <Portfolio />
        <Compare />
        <Pricing />
        <Process />
        <FAQ />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
