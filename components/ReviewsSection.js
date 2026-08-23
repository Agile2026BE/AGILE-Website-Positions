"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ReviewsSection.module.css";

const reviews = [
  {
    quote: "I applied once with AGILE and they expertly guided the complete process from start to finish with multiple MEP firm openings. I now have the position I always wanted, and a great recruiting contact",
    attribution: "C.N. · Senior Engineer, MEP",
    tags: ["mep", "electrical", "mechanical", "senior engineer"],
    type: "general",
  },
  {
    quote: "Lilly, Recruiting and Communications Manager for AGILE, gave me priority access to the leadership team and maintained open, well-coordinated communication throughout the entire placement process.",
    attribution: "J.S. · Senior Electrical Engineer, PE",
    tags: ["electrical", "electrical engineer", "senior electrical", "pe", "leadership"],
    type: "discipline",
  },
  {
    quote: "I wasn’t actively looking, but AGILE took the time to understand what I wanted in my next role and went searching for it. I actually just started this month.",
    attribution: "M.S. · Commissioning Professional, CxA",
    tags: ["commissioning", "cxa", "rcxa", "commissioning professional"],
    type: "discipline",
  },
  {
    quote: "AGILE helped me secure a better offer while keeping the focus on enthusiasm for the role, not just compensation.",
    attribution: "T.W. · Project Manager, MEP",
    tags: ["mep", "project manager", "project management", "construction", "leadership"],
    type: "general",
  },
  {
    quote: "I'm incredibly grateful for the professionalism and dedication AGILE showed throughout the hiring process. The support and insight were instrumental in helping me land a role that's a perfect fit. Because of them, I was able to step outside of my comfort zone and step into a new opportunity for me and my career.",
    attribution: "A.E. · BMS Associate Engineer",
    tags: ["bms", "building management systems", "associate engineer", "controls", "electrical"],
    type: "discipline",
  },
  {
    quote: "I interviewed virtually by MS Teams during my lunch break, and three weeks later stepped into my new role.",
    attribution: "R.P. · Electrical Engineer, ICT",
    tags: ["electrical", "electrical engineer", "ict", "technology", "low voltage"],
    type: "discipline",
  },
  {
    quote: "AGILE in particular did an excellent job finding and identifying the best firm for me. You’re very honest about what you do. I enjoyed working with you and your team.",
    attribution: "L.J. · Electrical Engineer, PE, LEED AP",
    tags: ["electrical", "electrical engineer", "pe", "leed", "building systems"],
    type: "discipline",
  },
  {
    quote: "All pride aside, I learned more in 15 minutes of AGILE’s interview preparation than I had in years of interviewing on my own.",
    attribution: "D.K. · Senior MEP Engineer",
    tags: ["mep", "senior engineer", "electrical", "mechanical", "interview"],
    type: "general",
  },
  {
    quote: "I connected with Lilly on LinkedIn after noticing how she supported others’ professional milestones. That connection turned into momentum. I’m now quietly being considered for some of the most desirable MEP firm roles in NYC.",
    attribution: "A.R. · Senior MEP Engineer",
    tags: ["mep", "senior engineer", "electrical", "mechanical", "nyc"],
    type: "general",
  },
  {
    quote: "AGILE was very responsive, and always answered my questions promptly. They streamlined the whole interview process, also gave me insight into who I would be meeting with, what each interviewer focused on, and what the overall hiring team was looking for in a candidate, which offered me a significant advantage. Later on they were also quickly communicating between me and the company which shortened the whole hiring process. I really appreciate his help.",
    attribution: "Y.S. · Mechanical Engineer, PE",
    tags: ["mechanical", "mechanical engineer", "hvac", "pe", "building systems"],
    type: "discipline",
  },
  {
    quote: "AGILE set the expectations early and kept the process very focused and complete. No pressure. No wasted steps.",
    attribution: "M.L. · Mechanical Engineer, HVAC",
    tags: ["mechanical", "mechanical engineer", "hvac", "building systems"],
    type: "discipline",
  },
  {
    quote: "AGILE made it feel incredibly easy to find a new position that suited both my personal and professional needs. They had a long list of engineering firms for me to choose from, and helped me with the one that I thought would best suit me. All I had to do was prove that I had the skill set these firms were looking for. AGILE handled the rest and did a great job.",
    attribution: "P.B. · Senior Electrical Engineer, PE",
    tags: ["electrical", "electrical engineer", "senior electrical", "pe", "building systems"],
    type: "discipline",
  },
  {
    quote: "One application and one point of contact kept the entire recruiting process discreet and aligned with what I was actually looking to find in my next career move.",
    attribution: "S.H. · Construction Professional, MEP CM",
    tags: ["construction", "construction management", "mep", "mep cm", "project manager"],
    type: "discipline",
  },
  {
    quote: "I’m writing to thank Agile Business Consulting for relentlessly pursuing the market until they found the right fit for me; engaging MEP project types, a higher salary, and a role which cut both my cost and commute time to NYC in half! I really needed career balance and am actually spending quality time with my wife and daughter now. AGILE's not only my Recruiting Consultant—they now are trusted business partners and real friends.",
    attribution: "N.B. · Senior Electrical Designer",
    tags: ["electrical", "electrical designer", "senior electrical", "mep", "nyc"],
    type: "discipline",
  },
  {
    quote: "AGILE’s team appreciated my plumbing and fire protection specialization and only presented opportunities that matched my true skill set. That was refreshing!",
    attribution: "J.M. · Plumbing & Fire Protection Engineer",
    tags: ["plumbing", "fire protection", "plumbing fire protection", "mep"],
    type: "discipline",
  },
  {
    quote: "AGILE was masterful in the way they figured out exactly what I wanted for my next role, and found a perfect fit that allowed me the perfect mix of interesting projects and challenging technical and managerial growth. The way they were able to effectively market me, and negotiate with my future employer, created conditions for the smoothest, and frankly most enjoyable recruitment I have ever been involved with in my 20 years of industry experience. I wish I didn’t only have two thumbs so that I could put them all up!",
    attribution: "J.S. · Project Electrical Engineer, PE",
    tags: ["electrical", "electrical engineer", "project electrical engineer", "project engineer", "pe"],
    type: "discipline",
  },
  {
    quote: "I wasn't actively looking for a new opportunity, but it had definitely been on my mind when AGILE reached out with a role that had tremendous potential. From the very beginning, the experience was exceptional. Their preparation, ongoing communication, interview guidance, and offer negotiation gave me confidence every step of the way. I truly felt they were advocating for me throughout the entire process, not just helping me secure a position. This was one of the very best recruiting experience I've ever had, and I'm incredibly grateful to AGILE for helping me take this exciting next step forward in my career.",
    attribution: "S.C. · Senior Electrical Engineer",
    tags: ["electrical", "electrical engineer", "senior electrical", "building systems"],
    type: "discipline",
  },
];

function normalizeSearch(detail = {}) {
  return [detail.discipline, detail.query, ...(detail.market || [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function rotate(items, offset) {
  if (!items.length) return [];
  const start = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(start), ...items.slice(0, start)];
}

function matchesContext(review, context) {
  if (!context) return false;
  return review.tags.some(tag => context.includes(tag) || tag.includes(context));
}

export default function ReviewsSection() {
  const [searchContext, setSearchContext] = useState("");
  const [rotation, setRotation] = useState(() => Math.floor(Math.random() * reviews.length));

  useEffect(() => {
    function handleCareerSearch(event) {
      setSearchContext(normalizeSearch(event.detail));
      setRotation(current => current + 3);
    }

    window.addEventListener("agile:career-search", handleCareerSearch);
    return () => window.removeEventListener("agile:career-search", handleCareerSearch);
  }, []);

  const visibleReviews = useMemo(() => {
    const matching = searchContext ? reviews.filter(review => matchesContext(review, searchContext)) : [];
    const general = reviews.filter(review => review.type === "general");
    const remainder = reviews.filter(review => !matching.includes(review) && !general.includes(review));

    if (searchContext && matching.length) {
      const selected = [
        ...rotate(matching, rotation).slice(0, 2),
        ...rotate(general, rotation).slice(0, 1),
      ];
      const fallback = rotate(reviews.filter(review => !selected.includes(review)), rotation);
      return [...selected, ...fallback].slice(0, 3);
    }

    return rotate([...general, ...remainder], rotation).slice(0, 3);
  }, [searchContext, rotation]);

  const showPrevious = () => setRotation(current => current - 3);
  const showNext = () => setRotation(current => current + 3);

  return (
    <section className={`section reviews-section ${styles.section}`} id="reviews">
      <div className={`container ${styles.panel}`}>
        <p className={styles.badge}>✓ Reviews from others we’ve helped</p>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>What AEC and MEP Professionals are saying...</h2>
        </div>
        <div className={styles.grid}>
          {visibleReviews.map((review) => (
            <blockquote className={styles.review} key={`${review.attribution}-${review.quote.slice(0, 28)}`}>
              <p>“{review.quote}”</p>
              <footer>{review.attribution}</footer>
            </blockquote>
          ))}
        </div>
        <div
          aria-label="Browse professional reviews"
          className={styles.reviewNav}
        >
          <button
            type="button"
            onClick={showPrevious}
            className={`${styles.reviewNavBtn} ${styles.reviewNavBtnOutline}`}
          >
            ‹ Previous reviews
          </button>
          <button
            type="button"
            onClick={showNext}
            className={`${styles.reviewNavBtn} ${styles.reviewNavBtnFilled}`}
          >
            More reviews ›
          </button>
        </div>
      </div>
    </section>
  );
}
