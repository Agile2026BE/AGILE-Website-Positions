import { NextResponse } from "next/server";

export const runtime = "nodejs";

function safe(value){return String(value??"").trim();}

export async function POST(request){
  try{
    const form=await request.formData();
    const name=safe(form.get("name"));
    const businessTitle=safe(form.get("businessTitle"));
    const email=safe(form.get("email"));
    const phone=safe(form.get("phone"));
    const companyUrl=safe(form.get("companyUrl"));
    const location=safe(form.get("location"));
    const bestTime=safe(form.get("bestTime"));
    const disciplines=[safe(form.get("discipline1")),safe(form.get("discipline2")),safe(form.get("discipline3"))].filter(Boolean);
    const projectTypes=[safe(form.get("projectType1")),safe(form.get("projectType2"))].filter(Boolean);
    const hiringTiming=safe(form.get("hiringTiming"));
    const inquirySubject=safe(form.get("inquirySubject"));
    const inquirySubjectLabel=inquirySubject==="services"?"AGILE services, recruiting fees and placement guarantees":"Company hiring needs";
    const message=safe(form.get("message"));

    if(!name||!email)return NextResponse.json({error:"Please enter your name and business email."},{status:400});
    const apiKey=process.env.RESEND_API_KEY;
    if(!apiKey)return NextResponse.json({error:"Client Hiring Support delivery is not configured yet. Please email careers@agileconsultingsolutions.com."},{status:503});

    const payload={
      from:process.env.INQUIRY_FROM_EMAIL||"AGILE Careers <onboarding@resend.dev>",
      to:["careers@agileconsultingsolutions.com"],
      reply_to:email,
      subject:`Client Hiring Support · ${inquirySubjectLabel} · ${name}${businessTitle?` · ${businessTitle}`:""}`,
      text:[
        "New AGILE Client Hiring Support request","",
        `Inquiry Subject: ${inquirySubjectLabel}`,
        `Name: ${name}`,
        `Business Title: ${businessTitle||"Not provided"}`,
        `Email: ${email}`,
        `Phone: ${phone||"Not provided"}`,
        `Company Website: ${companyUrl||"Not provided"}`,
        `Location: ${location||"Not provided"}`,
        `Disciplines Needed: ${disciplines.length?disciplines.join(", "):"Not provided"}`,
        `Project Types: ${projectTypes.length?projectTypes.join(", "):"Not provided"}`,
        `Hiring Timing: ${hiringTiming||"Not provided"}`,
        `Best Time to Reach: ${bestTime||"Not provided"}`,
        "",
        "Message:",message||"None provided"
      ].join("\n")
    };

    const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify(payload)});
    if(!response.ok){const detail=await response.text();console.error("Client Hiring Support email failed",response.status,detail);return NextResponse.json({error:"We could not send your request. Please try again or email AGILE directly."},{status:502});}
    return NextResponse.json({ok:true});
  }catch(error){console.error("Client Hiring Support endpoint error",error);return NextResponse.json({error:"We could not send your request. Please try again."},{status:500});}
}
