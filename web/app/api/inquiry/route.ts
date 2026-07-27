import { NextResponse } from "next/server";

type InquiryPayload = {
  name?: string;
  org?: string;
  phone?: string;
  email?: string;
  need?: string;
  budget?: string;
  message?: string;
  company?: string; // honeypot — real users leave this empty
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: InquiryPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  // Honeypot: bots that fill this hidden field get a fake success with no further processing.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, reason: "missing_required_fields" },
      { status: 400 }
    );
  }

  const org = body.org?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const need = body.need?.trim() ?? "";
  const budget = body.budget?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.INQUIRY_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.log("[inquiry] RESEND_API_KEY / INQUIRY_TO_EMAIL not configured. Submission:", {
      name,
      org,
      phone,
      email,
      need,
      budget,
      message,
    });
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  const rows: [string, string][] = [
    ["성함", name],
    ["상호/기관명", org || "-"],
    ["연락처", phone],
    ["이메일", email || "-"],
    ["필요한 것", need || "-"],
    ["예산대", budget || "-"],
    ["내용", message || "-"],
  ];

  const html = `<table style="border-collapse:collapse;font-family:sans-serif">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;background:#f8fafc">${escapeHtml(
          label
        )}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;white-space:pre-wrap">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: toEmail,
        subject: `[견적문의] ${org || "무기명"} - ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[inquiry] Resend API error:", res.status, errText);
      return NextResponse.json({ ok: false, reason: "send_failed" });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] Resend request failed:", err);
    return NextResponse.json({ ok: false, reason: "send_failed" });
  }
}
