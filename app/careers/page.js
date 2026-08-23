import styles from "./page.module.css";
import ContactSection from "../../components/ContactSection";
import HeroSection from "../../components/HeroSection";
import JobBoard from "../../components/JobBoard";
import MarketInsightsSection from "../../components/MarketInsightsSection";
import ReviewsSection from "../../components/ReviewsSection";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import WhyAgileSection from "../../components/WhyAgileSection";
import { jobs } from "../../data/jobs";

export const metadata = {
  title: "AEC Careers & Engineering Positions | AGILE Business Consulting",
  description:
    "Browse open Architecture, Engineering, and Construction positions with salary, location, and experience listed upfront — electrical, mechanical, commissioning, and more.",
  alternates: { canonical: "/careers" },
};

export default function HomePage() {
  return (
    <>
      <a className={styles.skipLink} href="#main-content">Skip to main content</a>
      <main className={styles.page} id="main-content">
        <SiteHeader />
        <HeroSection />
        <JobBoard jobs={jobs} />
        <WhyAgileSection />
        <MarketInsightsSection />
        <ReviewsSection />
        <ContactSection />
        <SiteFooter />
      </main>
    </>
  );
}
