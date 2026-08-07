import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import JobBoard from "../components/JobBoard";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { jobs } from "../data/jobs";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <JobBoard jobs={jobs} />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
