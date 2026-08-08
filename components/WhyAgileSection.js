import styles from "./WhyAgileSection.module.css";

const people = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  lane: index % 4,
  type: index % 6,
  direction: index % 3 === 0 ? "reverse" : "forward",
  duration: 13 + (index % 7) * 1.45,
  delay: -(index * 1.9),
  opacity: 0.52 + (index % 4) * 0.1,
  scale: 0.82 + (index % 5) * 0.11,
}));

function BusinessPerson({ type = 0, highlighted = false }) {
  const tone = highlighted ? "#67c6e9" : "currentColor";
  return (
    <svg viewBox="0 0 90 190" role="presentation" focusable="false">
      <circle cx="45" cy="22" r="17" fill={tone} />
      {type === 1 || type === 4 ? <path d="M27 19 Q45 -2 63 19 L59 30 Q45 23 31 30Z" fill={tone} /> : null}
      <path d={type === 2 ? "M24 48 L66 48 L75 112 L57 118 L55 78 L35 78 L33 118 L15 112Z" : "M24 48 L66 48 L72 116 L57 120 L54 77 L36 77 L33 120 L18 116Z"} fill={tone} />
      <path d="M35 50 L45 68 L55 50 L51 86 L39 86Z" fill={highlighted ? "#effaff" : "rgba(255,255,255,.42)"} />
      <path d="M29 56 L12 101 L22 106 L38 72Z" fill={tone} />
      <path d="M61 56 L78 98 L68 104 L52 72Z" fill={tone} />
      <path d="M31 115 L41 115 L39 181 L24 181Z" fill={tone} />
      <path d="M49 115 L59 115 L66 181 L51 181Z" fill={tone} />
      {(type === 0 || type === 3) && <g><rect x="66" y="96" width="19" height="25" rx="2" fill={tone} /><path d="M70 96 Q75 87 81 96" fill="none" stroke={tone} strokeWidth="4" /></g>}
      {type === 1 && <g><rect x="5" y="92" width="17" height="22" rx="5" fill={tone} /><path d="M8 92 Q13 83 19 92" fill="none" stroke={tone} strokeWidth="4" /></g>}
      {type === 2 && <g transform="rotate(-20 77 82)"><rect x="72" y="66" width="9" height="18" rx="2" fill={highlighted ? "#effaff" : "rgba(255,255,255,.56)"} /></g>}
      {type === 4 && <path d="M20 118 Q45 139 70 118 L63 153 L27 153Z" fill={tone} opacity=".95" />}
      {type === 5 && <g><rect x="7" y="91" width="20" height="27" rx="2" fill={tone} /><path d="M11 91 Q17 82 23 91" fill="none" stroke={tone} strokeWidth="4" /><rect x="67" y="70" width="8" height="17" rx="2" fill={highlighted ? "#effaff" : "rgba(255,255,255,.55)"} /></g>}
    </svg>
  );
}

const steps = [
  { number: "01", title: "You built the experience", copy: "We learn what you have done, where you want to go, and what matters before your name ever reaches a client." },
  { number: "02", title: "We build the introduction", copy: "AGILE presents your background directly to hiring leaders we know and keeps your experience in the conversation as needs develop." },
  { number: "03", title: "You move with an advocate", copy: "Interview preparation, feedback, offer strategy, negotiation and follow through stay coordinated through one relationship." },
];

export default function WhyAgileSection() {
  return (
    <section className={styles.section} id="why-agile" aria-label="Why AGILE">
      <span id="contact-guide" className={styles.contactAnchor} aria-hidden="true" />
      <div className={styles.motionStage}>
        <div className={styles.cityGlow} aria-hidden="true" />
        <div className={styles.cityBlocks} aria-hidden="true" />
        <div className={styles.street} aria-hidden="true" />
        <div className={styles.traffic} aria-hidden="true"><span className={styles.cabOne} /><span className={styles.cabTwo} /></div>
        <div className={styles.crowd} aria-hidden="true">
          {people.map((person) => (
            <span
              className={`${styles.person} ${styles[`lane${person.lane}`]} ${styles[person.direction]}`}
              key={person.id}
              style={{ "--duration": `${person.duration}s`, "--delay": `${person.delay}s`, "--opacity": person.opacity, "--scale": person.scale }}
            ><BusinessPerson type={person.type} /></span>
          ))}
          <span className={styles.focusPerson}><BusinessPerson type={2} highlighted /></span>
        </div>
        <div className={styles.motionCopy}>
          <p className={styles.eyebrow}>THE AGILE ADVANTAGE</p>
          <h2>We only work with the best. <span className={styles.question}>Shouldn&apos;t you?</span></h2>
          <p className={styles.challenge}>You&apos;ve worked hard to build your career. Why leave your representation to chance?</p>
          <p className={styles.supporting}>In a crowded market, strong experience can still disappear into the noise. AGILE works directly with more than 40 consulting and engineering firms and helps make sure the right hiring leaders know who you are.</p>
          <p className={styles.doorLine}>We do not knock on doors. We open them for our candidates.</p>
        </div>
      </div>
      <div className={styles.bridge}><p className={styles.bridgeLead}>You can promote your own accomplishments.</p><h3>When AGILE speaks about you, we can turn that solo into a symphony.</h3></div>
      <div className={styles.grid}>{steps.map((step) => <article className={styles.step} key={step.number}><span className={styles.number}>{step.number}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
    </section>
  );
}
