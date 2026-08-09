"use client";

import { useState } from "react";
import BrandLogo from "./BrandLogo";
import styles from "./SiteFooter.module.css";

const disciplines=["Electrical Engineering","Mechanical Engineering","Fire Protection","Plumbing"];
const markets=["New York","New Jersey","Philadelphia / Pennsylvania","Connecticut","Massachusetts","North Carolina","Florida","Colorado","California","Other"];
const projectTypes=["Commercial","Data Centers / Mission Critical","Education / Higher Education","Healthcare","Hospitality","Infrastructure / Civil","Transportation / Aviation / Rail","Water / Wastewater","Other"];

export default function SiteFooter() {
  const[clientOpen,setClientOpen]=useState(false);const[sending,setSending]=useState(false);const[status,setStatus]=useState("");
  async function submitClient(event){event.preventDefault();const form=event.currentTarget;setSending(true);setStatus("");try{const response=await fetch("/api/client-hiring-support",{method:"POST",body:new FormData(form)});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||"Unable to send your request.");form.reset();setStatus("AGILE Success! Your hiring request has been sent. We will reach back to you shortly.");}catch(error){setStatus(error.message||"We could not send your request. Please try again.");}finally{setSending(false);}}
  const success=status.startsWith("AGILE Success");
  return (
    <>
      <footer className={`site-footer ${styles.footer}`}>
        <div className={`container footer-grid ${styles.grid}`}>
          <div><BrandLogo className={styles.footerLogo} /><p>Specialized recruiting and consulting career guidance for Architects, Engineers and Construction Professionals.</p></div>
          <div><p className={`footer-eyebrow ${styles.eyebrow}`}>STATES SERVED</p><h2>Connecting AEC professionals and consulting firms across nine key markets.</h2><p>New York · New Jersey · Pennsylvania · Massachusetts · Florida · California · Colorado · North Carolina · Connecticut</p><div className={`footer-actions ${styles.actions}`}><a href="#positions">SEARCH CAREERS</a><button type="button" onClick={()=>{setStatus("");setClientOpen(true);}}>CLIENT HIRING SUPPORT</button></div></div>
          <div><p className={`footer-eyebrow ${styles.eyebrow}`}>CONNECT WITH AGILE</p><p>careers@agileconsultingsolutions.com</p><p><strong>MAIN OFFICE 407-868-7254</strong></p><p>Professional Career Consultants.</p><p className={`footer-eyebrow ${styles.eyebrow}`}>AVAILABLE HOURS · EASTERN</p><p>Monday–Friday · 8:00 AM–8:30 PM</p><p>Saturday · 9:00 AM–12:30 PM</p></div>
        </div>
        <div className={`footer-bottom ${styles.bottom}`}><div className={`container footer-bottom-inner ${styles.bottomInner}`}><span>© 2026 AGILE Business Consulting · All Rights Reserved</span><span>Direct Career Support · No Résumé Required</span><a href="#contact">Start a Conversation</a></div></div>
      </footer>

      {clientOpen?<div className={styles.overlay} role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setClientOpen(false);}}><section className={styles.clientModal} role="dialog" aria-modal="true" aria-labelledby="client-support-title"><button className={styles.close} type="button" onClick={()=>setClientOpen(false)} aria-label="Close client hiring support">×</button><p className={styles.clientEyebrow}>CLIENT HIRING SUPPORT</p><h2 id="client-support-title">Tell us where your team needs help.</h2><p className={styles.clientIntro}>Share the essentials and an AGILE recruiting consultant will reach back to you directly.</p><form className={styles.clientForm} onSubmit={submitClient}>
        <label>Name *<input name="name" required placeholder="First and last name" /></label><label>Business Title<input name="businessTitle" placeholder="Title / role" /></label><label>Email *<input type="email" name="email" required placeholder="name@company.com" /></label><label>Phone<input type="tel" name="phone" placeholder="Best number" /></label><label className={styles.full}>Company Website / URL<input type="url" name="companyUrl" placeholder="https://company.com" /></label>
        <label>Location<select name="location" defaultValue=""><option value="">Choose location</option>{markets.map(item=><option key={item}>{item}</option>)}</select></label><label>Best Time to Reach You<select name="bestTime" defaultValue=""><option value="">Choose time</option><option>Morning · 8 AM–11 AM</option><option>Midday · 11 AM–2 PM</option><option>Afternoon · 2 PM–5 PM</option><option>Evening · 5 PM–8 PM</option><option>Flexible</option></select></label>
        <label>Discipline Needed<select name="discipline1" defaultValue=""><option value="">Choose discipline</option>{disciplines.map(item=><option key={item}>{item}</option>)}</select></label><label>Second Discipline · Optional<select name="discipline2" defaultValue=""><option value="">None</option>{disciplines.map(item=><option key={item}>{item}</option>)}</select></label><label>Third Discipline · Optional<select name="discipline3" defaultValue=""><option value="">None</option>{disciplines.map(item=><option key={item}>{item}</option>)}</select></label><label>Primary Project Type<select name="projectType1" defaultValue=""><option value="">Choose project type</option>{projectTypes.map(item=><option key={item}>{item}</option>)}</select></label><label>Additional Project Type · Optional<select name="projectType2" defaultValue=""><option value="">None</option>{projectTypes.map(item=><option key={item}>{item}</option>)}</select></label><label>Hiring Timing<select name="hiringTiming" defaultValue=""><option value="">Choose timing</option><option>Immediately</option><option>Within 30 days</option><option>Within 60–90 days</option><option>Planning ahead</option></select></label>
        <label className={styles.full}>Anything we should know? · Optional<textarea name="message" rows="3" placeholder="Position level, office, project needs, or anything that will help us prepare." /></label><div className={`${styles.full} ${styles.clientActions}`}><button type="submit" disabled={sending}>{sending?"Sending...":"Please Reach Back to Me"}</button></div>{status?<p className={`${styles.full} ${styles.clientStatus} ${success?styles.clientSuccess:styles.clientError}`} role="status" aria-live="polite">{status}</p>:null}</form></section></div>:null}
    </>
  );
}
