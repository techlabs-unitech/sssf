import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 120;
const MAX_PHONE_LENGTH = 30;
const MAX_LOCATION_LENGTH = 120;
const MAX_AREAS_LENGTH = 200;
const MAX_SKILLS_LENGTH = 200;
const MAX_AVAILABILITY_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const location = typeof body?.location === "string" ? body.location.trim() : "";
    const areas = typeof body?.areas === "string" ? body.areas.trim() : "";
    const skills = typeof body?.skills === "string" ? body.skills.trim() : "";
    const availability = typeof body?.availability === "string" ? body.availability.trim() : "";
    const motivation = typeof body?.motivation === "string" ? body.motivation.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
    }
    if (name.length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (email.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: "Email is too long." }, { status: 400 });
    }

    if (!phone) {
      return NextResponse.json({ error: "Please provide your phone number." }, { status: 400 });
    }
    if (phone.length > MAX_PHONE_LENGTH) {
      return NextResponse.json({ error: "Phone number is too long." }, { status: 400 });
    }

    if (!location) {
      return NextResponse.json({ error: "Please provide your city or location." }, { status: 400 });
    }
    if (location.length > MAX_LOCATION_LENGTH) {
      return NextResponse.json({ error: "Location is too long." }, { status: 400 });
    }

    if (!areas) {
      return NextResponse.json({ error: "Please choose at least one area of interest." }, { status: 400 });
    }
    if (areas.length > MAX_AREAS_LENGTH) {
      return NextResponse.json({ error: "Areas of interest is too long." }, { status: 400 });
    }

    if (!skills) {
      return NextResponse.json({ error: "Please share your skills." }, { status: 400 });
    }
    if (skills.length > MAX_SKILLS_LENGTH) {
      return NextResponse.json({ error: "Skills is too long." }, { status: 400 });
    }

    if (!availability) {
      return NextResponse.json({ error: "Please provide your availability." }, { status: 400 });
    }
    if (availability.length > MAX_AVAILABILITY_LENGTH) {
      return NextResponse.json({ error: "Availability is too long." }, { status: 400 });
    }

    if (!motivation) {
      return NextResponse.json({ error: "Please share your message or motivation." }, { status: 400 });
    }
    if (motivation.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message is too long." }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("volunteer_applications").insert({
      name: name,
      email: email,
      phone: phone,
      location: location,
      areas_of_interest: areas,
      skills: skills,
      availability: availability,
      message: motivation,
      status: "pending",
    });

    if (error) {
      console.error("volunteer insert error:", error);
      return NextResponse.json({ error: "Could not submit your volunteer interest. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("volunteer submit error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
