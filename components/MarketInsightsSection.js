"use client";

import { useState } from "react";
import styles from "./MarketInsightsSection.module.css";

export default function MarketInsightsSection() {
  const [status,setStatus]=useState("");
  const [sending,setSending]=useState(false);
  const [celebrating,setCelebrating]=useState(false);

  async function handleSubmit(event){
    event.preventDefault();
    const form=event.currentTarget;
    setSending(true);setStatus("");setCelebrating(false);
    try{
      const response=await fetch("/api/market-insights",{method:"POST",body:new FormData(form)});
      const result=await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(result.error||"Unable to save your request.");
      form.reset();
      setStatus("Success! You’re on the AGILE Market Insights list.");
      window.setTimeout(()=>setCelebrating(true),180);
      window.setTimeout(()=>setCelebrating(false),3000);
    }catch(error){setStatus(error.message||"We could not save your request. Please try again.");}
    finally{setSending(false);}
  }

  const success=status.startsWith("Success!");

  return (
    <section className={styles.section} id="market-insights" aria-labelledby="market-insights-title">
      <div className={styles.panel}>
        {celebrating?<div className={styles.confetti} aria-hidden="true">{Array.from({length:40}).map((_,index)=><i key={index} style={{"--i":index}} />)}</div>:null}
        <div>
          <p className={styles.eyebrow}>AGILE MARKET INSIGHTS</p>
          <h2 className={styles.title} id="market-insights-title">Stay current on your market.</h2>
          <p className={styles.copy}>Hiring activity, compensation trends, new opportunities, and demand in your discipline and location, <span className={styles.quiet}>quietly emailed to you.</span></p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {status?<p className={`${styles.status} ${success?styles.success:styles.error}`} role="status" aria-live="polite">{status}</p>:null}
          <label>First and Last Name *<input type="text" name="name" placeholder="First and last name" autoComplete="name" required /></label>
          <label>Email *<input type="email" name="email" placeholder="name@example.com" autoComplete="email" required /></label>
          <label>Location<select name="location" defaultValue=""><option value="">Choose a market</option><option>California</option><option>Colorado</option><option>Connecticut</option><option>Florida</option><option>Massachusetts</option><option>New Jersey</option><option>New York</option><option>North Carolina</option><option>Pennsylvania</option></select></label>
          <label>Discipline<select name="discipline" defaultValue=""><option value="">Choose a discipline</option><option>Architecture</option><option>Civil Engineering</option><option>Commissioning</option><option>Construction</option><option>Electrical Engineering</option><option>Fire Protection</option><option>Mechanical Engineering</option><option>Plumbing</option><option>Transportation</option></select></label>
          <label>Experience Level<select name="experience" defaultValue=""><option value="">Choose experience</option><option>Early · 1–2 years</option><option>Intermediate · 3–9 years</option><option>Senior · 10–20 years</option><option>Leadership · 10–35+ years</option></select></label>
          <div className={styles.actions}><p className={styles.consent}>By selecting Keep Me Updated, you are asking AGILE to send occasional professional market and career updates to this email address.</p><button className={styles.button} type="submit" disabled={sending}>{sending?"Saving...":"Keep Me Updated"}</button></div>
        </form>
      </div>
    </section>
  );
}
