import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const MAX_MESSAGE_LENGTH = 1000;
const MAX_NAME_LENGTH = 100;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, relationship, message, rating } = body ?? {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Please share your name." }, { status: 400 });
    }
    if (name.trim().length > MAX_NAME_LENGTH) {
      return NextResponse.json({ error: "Name is too long." }, { status: 400 });
    }
    if (email && (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email))) {
      return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Please write a few words for your review." }, { status: 400 });
    }
    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Review is too long — please keep it under 1000 characters." }, { status: 400 });
    }

    let numericRating: number | null = null;
    if (rating !== undefined && rating !== null && rating !== "") {
      numericRating = Number(rating);
      if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
        return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
      }
    }

    const allowedRelationships = ["Wellwisher", "Friend", "Volunteer", "Donor", "Beneficiary", "Partner"];
    const cleanRelationship =
      typeof relationship === "string" && allowedRelationships.includes(relationship)
        ? relationship
        : "Wellwisher";

    const { error } = await supabaseAdmin.from("reviews").insert({
      name: name.trim(),
      email: email ? String(email).trim().toLowerCase() : null,
      relationship: cleanRelationship,
      message: message.trim(),
      rating: numericRating,
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error (reviews):", error);
      return NextResponse.json({ error: "Could not submit your review. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("reviews submit error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
