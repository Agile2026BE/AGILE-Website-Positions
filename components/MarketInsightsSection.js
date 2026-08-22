"use client";

import { useState } from "react";
import styles from "./MarketInsightsSection.module.css";
import { disciplineOptions, experienceOptions, stateOptions } from "../data/filterOptions";
import ConfettiBurst from "./ConfettiBurst";

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
        {celebrating?<ConfettiBurst className={styles.confettiBurst} />:null}
        <div>
          <p className={styles.eyebrow}>AGILE MARKET INSIGHTS</p>
          <h2 className={styles.title} id="market-insights-title">Stay current on your market.</h2>
          <p className={styles.copy}>Hiring activity, compensation trends, new opportunities, and demand in your discipline and location, <span className={styles.quiet}>quietly emailed to you.</span></p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {status?<p className={`${styles.status} ${success?styles.success:styles.error} ${celebrating?styles.statusPop:""}`} role="status" aria-live="polite">{status}</p>:null}
          <label>First and Last Name *<input type="text" name="name" placeholder="First and last name" autoComplete="name" required /></label>
          <label>Email *<input type="email" name="email" placeholder="name@example.com" autoComplete="email" required /></label>
          <label>Location<select name="location" defaultValue=""><option value="">Choose a market</option>{stateOptions.map((state)=><option key={state}>{state}</option>)}</select></label>
          <label>Discipline<select name="discipline" defaultValue=""><option value="">Choose a discipline</option>{disciplineOptions.map((discipline)=><option key={discipline}>{discipline}</option>)}</select></label>
          <label>Experience Level<select name="experience" defaultValue=""><option value="">Choose experience</option>{experienceOptions.map((band)=><option key={band.value} value={band.label}>{band.label}</option>)}</select></label>
          <div className={styles.actions}><p className={styles.consent}>By continuing, you agree AGILE may email or text you career and market updates — opt out anytime.</p><button className={styles.button} type="submit" disabled={sending}>{sending?"Saving...":"Keep Me Updated"}</button></div>
        </form>
      </div>
    </section>
  );
}
