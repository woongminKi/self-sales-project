import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import WhyMe from "@/components/WhyMe";
import Portfolio from "@/components/Portfolio";
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
        <Problems />
        <WhyMe />
        <Portfolio />
        <Pricing />
        <Process />
        <FAQ />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}
