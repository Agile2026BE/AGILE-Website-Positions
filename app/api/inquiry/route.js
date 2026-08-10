import { NextResponse } from "next/server";

export const runtime = "nodejs";

function safe(value) { return String(value ?? "").trim(); }

export async function POST(request) {
  try {
    const form = await request.formData();
    const name = safe(form.get("career_inquiry_name") || form.get("name"));
    const email = safe(form.get("career_inquiry_email") || form.get("email"));
    const phone = safe(form.get("career_inquiry_phone") || form.get("phone"));
    const textingConsent = safe(form.get("textingConsent"));
    const discipline = safe(form.get("discipline"));
    const positionId = safe(form.get("positionId"));
    const positionTitle = safe(form.get("positionTitle"));
    const shortlistedPositions = safe(form.get("shortlistedPositions"));
    const message = safe(form.get("message"));
    const resume = form.get("resume");

    if (!name) return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    if (!email) return NextResponse.json({ error: "Please enter your email address." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Inquiry delivery is not configured yet. Please email careers@agileconsultingsolutions.com." }, { status: 503 });

    const payload = {
      from: process.env.INQUIRY_FROM_EMAIL || "AGILE Careers <onboarding@resend.dev>",
      to: ["careers@agileconsultingsolutions.com"],
      reply_to: email,
      subject: positionId ? `Career Inquiry · Position ID ${positionId} · ${name}` : `Career Inquiry · ${name}`,
      text: [
        "New AGILE Careers inquiry", "",
        `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`,
        `Texting permission: ${phone ? (textingConsent === "Yes" ? "Yes" : "No") : "Not applicable"}`,
        `Discipline: ${discipline || "Not provided"}`, `Position ID: ${positionId || "Not selected"}`,
        `Position: ${positionTitle || "Not selected"}`,
        shortlistedPositions ? `Shortlisted positions:\n${shortlistedPositions}` : "Shortlisted positions: Not provided",
        "", "Message:", message || "No message provided",
      ].join("\n"),
    };

    if (resume && typeof resume.arrayBuffer === "function" && resume.size > 0) {
      if (resume.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Please attach a résumé smaller than 8 MB." }, { status: 400 });
      const bytes = Buffer.from(await resume.arrayBuffer());
      payload.attachments = [{ filename: resume.name || "resume", content: bytes.toString("base64") }];
    }

    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) {
      const detail = await response.text(); console.error("Inquiry email failed", response.status, detail);
      return NextResponse.json({ error: "We could not send your inquiry. Please try again or contact AGILE directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry endpoint error", error);
    return NextResponse.json({ error: "We could not send your inquiry. Please try again." }, { status: 500 });
  }
}
