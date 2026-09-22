import { NextRequest, NextResponse } from "next/server";
import { sendContactEnquiry } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
    }
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!subject) {
      return NextResponse.json({ error: "Please choose a subject." }, { status: 400 });
    }
    if (subject.length > MAX_SUBJECT_LENGTH) {
      return NextResponse.json({ error: "Subject is too long." }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: "Please enter your message." }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    await sendContactEnquiry({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact submit error:", err);
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Could not submit your message. Please try again.",
    }, { status: 500 });
  }
}
