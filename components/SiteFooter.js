"use client";

import { useState } from "react";
import BrandLogo from "./BrandLogo";
import styles from "./SiteFooter.module.css";

const disciplines=["Electrical Engineering","Mechanical Engineering","Fire Protection","Plumbing"];
const markets=["New York","New Jersey","Philadelphia / Pennsylvania","Massachusetts","Connecticut","North Carolina","Florida","Colorado","California","Other"];
const projectTypes=["Commercial","Data Centers / Mission Critical","Education / Higher Education","Healthcare","Hospitality","Infrastructure / Civil","Transportation / Aviation / Rail","Water / Wastewater","Other"];
const inquiryMessages={
  hiring:"Hello,\n\nI am interested in discussing our company hiring needs and learning how AGILE may be able to support our recruiting efforts. Please reach back to me to discuss our current priorities and hiring needs.\n\nThank you.",
  services:"Hello,\n\nI am interested in learning more about AGILE's recruiting services, including recruiting fees and placement guarantees. Please reach back to me so we can discuss how your services may support our company.\n\nThank you."
};

function formatPhone(value){
  const digits=value.replace(/\D/g,"").slice(0,10);
  if(digits.length<4)return digits;
  if(digits.length<7)return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
}

export default function SiteFooter() {
  const[clientOpen,setClientOpen]=useState(false);const[sending,setSending]=useState(false);const[status,setStatus]=useState("");const[inquirySubject,setInquirySubject]=useState("hiring");const[clientMessage,setClientMessage]=useState(inquiryMessages.hiring);const[clientPhone,setClientPhone]=useState("");const[celebrating,setCelebrating]=useState(false);
  function openClientSupport(){setStatus("");setInquirySubject("hiring");setClientMessage(inquiryMessages.hiring);setClientPhone("");setCelebrating(false);setClientOpen(true);}
  function changeInquirySubject(event){const value=event.target.value;setInquirySubject(value);setClientMessage(inquiryMessages[value]||"");}
  async function submitClient(event){event.preventDefault();const form=event.currentTarget;setSending(true);setStatus("");setCelebrating(false);try{const response=await fetch("/api/client-hiring-support",{method:"POST",body:new FormData(form)});const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||"Unable to send your request.");form.reset();setInquirySubject("hiring");setClientMessage(inquiryMessages.hiring);setClientPhone("");setStatus("Success! We look forward to connecting soon!");setCelebrating(true);window.setTimeout(()=>setCelebrating(false),1600);}catch(error){setStatus(error.message||"We could not send your request. Please try again.");}finally{setSending(false);}}
  const success=status.startsWith("Success!");
  return (
    <>
      <footer className={`site-footer ${styles.footer}`}>
        <div className={`container footer-grid ${styles.grid}`}>
          <div><BrandLogo className={styles.footerLogo} /><p>Specialized recruiting and consulting career guidance for Architects, Engineers and Construction Professionals.</p></div>
          <div><h2>Connecting AEC Professionals and Consulting Firms across 9 key geographic markets.</h2><p className={`footer-eyebrow ${styles.eyebrow}`}>STATES SERVED</p><p>New York · New Jersey · Pennsylvania · Massachusetts · Connecticut · North Carolina · Florida · Colorado · California</p><div className={`footer-actions ${styles.actions}`}><a href="#positions">SEARCH CAREERS</a><button type="button" onClick={openClientSupport}>CLIENT HIRING SUPPORT</button></div></div>
          <div><p className={`footer-eyebrow ${styles.eyebrow}`}>CONNECT WITH AGILE</p><p>careers@agileconsultingsolutions.com</p><p><strong>MAIN OFFICE 407-868-7254</strong></p><p>Professional Career Consultants.</p><p className={`footer-eyebrow ${styles.eyebrow}`}>AVAILABLE HOURS · EASTERN</p><p>Monday–Friday · 8:00 AM–8:30 PM</p><p>Saturday · 9:00 AM–12:30 PM</p></div>
        </div>
        <div className={`footer-bottom ${styles.bottom}`}><div className={`container footer-bottom-inner ${styles.bottomInner}`}><span>© 2026 AGILE Business Consulting · All Rights Reserved</span><span>Personal Career Support · No Account Setup Required</span><a href="#contact">Start a Conversation</a></div></div>
      </footer>

      {clientOpen?<div className={styles.overlay} role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setClientOpen(false);}}><section className={styles.clientModal} role="dialog" aria-modal="true" aria-labelledby="client-support-title">{celebrating?<div className={styles.confetti} aria-hidden="true">{Array.from({length:22}).map((_,index)=><i key={index} style={{"--i":index}} />)}</div>:null}<button className={styles.close} type="button" onClick={()=>setClientOpen(false)} aria-label="Close client hiring support">×</button><p className={styles.clientEyebrow}>CLIENT HIRING SUPPORT</p><h2 id="client-support-title">Tell us where your team needs help.</h2><p className={styles.clientIntro}>Share the essentials and an AGILE recruiting consultant will reach back to you directly.</p><form className={styles.clientForm} onSubmit={submitClient}>
        <label>Name *<input name="name" required placeholder="First and last name" /></label><label>Business Title<input name="businessTitle" placeholder="Title / role" /></label><label>Email *<input type="email" name="email" required placeholder="name@company.com" /></label><label>Phone<input type="tel" name="phone" placeholder="(407) 868-7254" inputMode="tel" value={clientPhone} onChange={event=>setClientPhone(formatPhone(event.target.value))} /></label><label className={styles.full}>Company Website / URL<input type="url" name="companyUrl" placeholder="https://company.com" /></label>
        <label>Location<select name="location" defaultValue=""><option value="">Choose location</option>{markets.map(item=><option key={item}>{item}</option>)}</select></label><label>Best Time to Reach You<select name="bestTime" defaultValue=""><option value="">Choose time</option><option>Morning · 8 AM–11 AM</option><option>Midday · 11 AM–2 PM</option><option>Afternoon · 2 PM–5 PM</option><option>Evening · 5 PM–8 PM</option><option>Flexible</option></select></label>
        <label>Discipline Needed<select name="discipline1" defaultValue=""><option value="">Choose discipline</option>{disciplines.map(item=><option key={item}>{item}</option>)}</select></label><label>Second Discipline · Optional<select name="discipline2" defaultValue=""><option value="">None</option>{disciplines.map(item=><option key={item}>{item}</option>)}</select></label><label>Third Discipline · Optional<select name="discipline3" defaultValue=""><option value="">None</option>{disciplines.map(item=><option key={item}>{item}</option>)}</select></label><label>Primary Project Type<select name="projectType1" defaultValue=""><option value="">Choose project type</option>{projectTypes.map(item=><option key={item}>{item}</option>)}</select></label><label>Additional Project Type · Optional<select name="projectType2" defaultValue=""><option value="">None</option>{projectTypes.map(item=><option key={item}>{item}</option>)}</select></label><label>Hiring Timing<select name="hiringTiming" defaultValue=""><option value="">Choose timing</option><option>Immediately</option><option>Within 30 days</option><option>Within 60–90 days</option><option>Planning ahead</option></select></label>
        <label className={styles.full}>Inquiry Subject<select name="inquirySubject" value={inquirySubject} onChange={changeInquirySubject}><option value="hiring">Interested in discussing our company hiring needs</option><option value="services">Interested in AGILE services, recruiting fees and placement guarantees</option></select></label>
        <label className={styles.full}>Message<textarea name="message" rows="5" value={clientMessage} onChange={event=>setClientMessage(event.target.value)} /></label><div className={`${styles.full} ${styles.clientActions}`}><button type="submit" disabled={sending}>{sending?"Sending...":"Please Reach Back to Me"}</button></div>{status?<p className={`${styles.full} ${styles.clientStatus} ${success?styles.clientSuccess:styles.clientError}`} role="status" aria-live="polite">{status}</p>:null}</form></section></div>:null}
    </>
  );
}
