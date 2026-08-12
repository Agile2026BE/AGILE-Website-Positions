import { NextResponse } from "next/server";

export const runtime = "nodejs";

function safe(value) { return String(value ?? "").trim(); }

export async function POST(request) {
  try {
    const form = await request.formData();
    const name = safe(form.get("name"));
    const email = safe(form.get("email"));
    const discipline = safe(form.get("discipline"));
    const location = safe(form.get("location"));
    const experience = safe(form.get("experience"));

    if (!name) return NextResponse.json({ error: "Please enter your first and last name." }, { status: 400 });
    if (!email) return NextResponse.json({ error: "Please enter your email address." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "Market Insights delivery is not configured yet." }, { status: 503 });

    const payload = {
      from: process.env.INQUIRY_FROM_EMAIL || "AGILE Careers <onboarding@resend.dev>",
      to: ["careers@agileconsultingsolutions.com"],
      reply_to: email,
      subject: `Market Insights · ${name} · ${discipline || "AEC Professional"} · ${location || "Location open"}`,
      text: [
        "New AGILE Market Insights request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Discipline: ${discipline || "Not provided"}`,
        `Location: ${location || "Not provided"}`,
        `Experience Level: ${experience || "Not provided"}`,
        "",
        "The professional requested occasional AGILE Market Insights by email.",
      ].join("\n"),
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Market Insights email failed", response.status, detail);
      return NextResponse.json({ error: "We could not save your Market Insights request. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Market Insights endpoint error", error);
    return NextResponse.json({ error: "We could not save your request. Please try again." }, { status: 500 });
  }
}
