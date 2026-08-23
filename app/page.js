import SiteFooter from "../components/SiteFooter";
import HomeActionBadges from "../components/home/HomeActionBadges";
import HomeAccessMenu from "../components/home/HomeAccessMenu";
import HomeResourcesAccordion from "../components/home/HomeResourcesAccordion";
import styles from "./page.module.css";

export const metadata = {
  title: "AGILE Business Consulting | AEC Recruiting & Career Representation",
  description: "Specialized recruiting and career representation for Architects, Engineers, and Construction Professionals across key U.S. markets.",
};

export default function CorporateHomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.motion} aria-hidden="true">
          <div className={styles.architecture}></div>
        </div>
        <div className={styles.heroShade}></div>
        <div className={styles.miniHeader}>
          <span className={styles.miniLogo}>AGILE</span>
          <HomeAccessMenu />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><em>AEC</em> RECRUITING AND CONSULTING</p>
          <h1>What’s Your Next <em>Move?</em><sup className={styles.serviceMark}>SM</sup></h1>
          <p className={styles.lead}>Specialized recruiting and professional representation connecting architects, engineers, and construction professionals with firms shaping the built environment.</p>
          <div className={styles.actionGrid}>
            <a href="/careers" className={styles.primary}>Explore Opportunities</a>
            <a href="/careers/#contact" className={styles.secondary}>Start a Conversation</a>
            <HomeActionBadges />
          </div>
          <div className={styles.heroAdvantage} id="professionals">
            <p className={styles.heroAdvantageText}>We work directly with hiring teams across Architecture, Engineering, Construction, Commissioning, and Owner’s Representation, giving experienced professionals genuine insight into each client’s leadership, culture, projects, and expectations - so they can look past the job title to the real opportunity presented and decide with confidence before making their <em>next</em> move.</p>
          </div>
        </div>
        <HomeResourcesAccordion variant="desktop" />

        <div className={styles.mobilePhotoWrap} aria-hidden="false">
          <div className={styles.mobilePhoto}>
            <div className={styles.mobilePhotoFade}></div>
          </div>
          <HomeResourcesAccordion variant="mobile" />
        </div>
      </section>

      <section className={styles.aboutSection} id="about-agile" aria-labelledby="about-agile-title">
        <div className={styles.aboutInner}>
          <p className={styles.aboutEyebrow}>ABOUT AGILE</p>
          <h2 className={styles.aboutTitle} id="about-agile-title">Specialized AEC Recruiting, Built on Trust.</h2>
          <p className={styles.aboutCopy}><strong>AGILE</strong> is a specialized recruiting and consulting firm serving the Architecture, Engineering, and Construction (AEC) industry. We&nbsp;expertly guide professionals through informed, strategic career decisions by developing an effective plan to connect with industry-leading firms, which value their technical expertise, project experience, and long-term career growth.</p>
          <p className={styles.aboutCopy}>We actively recruit across the following markets: New York · New Jersey · Pennsylvania · Massachusetts · Connecticut · North&nbsp;Carolina · Florida · Colorado · California. Our client relationships include ENR Top 100 and Top 500 Design Firms, nationally recognized multidisciplinary consulting firms, notable mid-size and regional consultants, Owner’s Representatives, and Best Places to Work award winners.</p>
          <p className={styles.aboutCopy}>Our carefully chosen client relationships allow us to advise candidates on opportunities across a wide range of project types, firm cultures, and leadership environments.</p>
          <p className={styles.aboutCopy}>Whether you&apos;re an emerging professional beginning your career or a seasoned engineer looking to leverage years of experience toward continued career advancement, understanding changes in the current job market is the first step toward making an informed career decision.</p>
          <p className={styles.aboutCopy}>Professional discretion is maintained throughout the search process, allowing candidates to confidently explore opportunities across our exclusive portfolio of industry-leading clients before being requested to complete a formal job application.</p>
          <p className={styles.aboutCopy}><strong>AGILE</strong> provides candidates with professional representation, access to our trusted business relationships, and an exclusive portfolio of industry-leading clients. They also benefit from current market intelligence, access to direct hire opportunities, personalized interview preparation, coordination throughout the hiring process, compensation and start-date negotiation, and onboarding assistance—all through a dedicated professional point of contact.</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
