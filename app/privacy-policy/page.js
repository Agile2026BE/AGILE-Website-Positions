import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import styles from "../legal.module.css";

export const metadata = {
  title: "Privacy Policy | AGILE Business Consulting",
  description: "How AGILE Business Consulting collects, uses, and protects information shared by candidates and client firms.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <SiteHeader />

      <section className={`section ${styles.detail}`}>
        <div className={`container ${styles.inner}`}>
          <p className={`contact-eyebrow ${styles.eyebrow}`}>TRUST &amp; SECURITY</p>
          <h1 className="section-title">Privacy Policy</h1>

          <div className={styles.body}>
            <p>
              AGILE Business Consulting is committed to protecting the privacy of the
              professionals and client firms we partner with for recruiting and
              consulting services. We recognize that career discussions involve
              sensitive information, and we treat that information with care and
              professional discretion.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We only collect information you voluntarily provide to us, including
              resumes, professional background, contact details, career
              preferences, and compensation information shared through our
              website, by email, by phone, or during direct conversations with
              our team.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              Information you share with us is used exclusively to support
              recruiting and career advisory services, including evaluating your
              qualifications, discussing opportunities, connecting you with
              hiring firms, and facilitating offers.
            </p>

            <h2>Candidate Confidentiality</h2>
            <p>
              We maintain strict confidentiality around candidate materials and
              personal information. Your resume and personal details are not
              shared with client firms or any third party without first
              discussing the opportunity with you and receiving your approval.
            </p>

            <h2>Client Confidentiality</h2>
            <p>
              Hiring needs, team structures, compensation parameters, and search
              details shared with us by client firms remain confidential within
              the scope of our engagement.
            </p>

            <h2>Security</h2>
            <p>
              We maintain reasonable safeguards designed to protect information
              from unauthorized access, disclosure, or misuse.
            </p>

            <div className={styles.contactCard}>
              <strong>Questions about this policy?</strong>
              <a href="mailto:careers@agileconsultingsolutions.com">careers@agileconsultingsolutions.com</a>
              <br />
              Main Office · 407-868-7254
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
