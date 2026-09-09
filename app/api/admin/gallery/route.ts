import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";
// Give slow uploads (large images, cold Supabase connections) enough room to
// finish instead of being silently killed by the platform's default function
// timeout — a killed function never sends a response, which is why the
// client can appear stuck on "Uploading…" forever with no error shown.
export const maxDuration = 60;

const BUCKET = "gallery";
// Kept comfortably under the ~4.5MB request-body ceiling that hosts like
// Vercel enforce on serverless functions. A file over that ceiling doesn't
// reach this handler at all — the platform drops the request before our
// code (or even our try/catch) ever runs, which is what makes an oversized
// upload look like it's stuck on "Uploading…" instead of showing an error.
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const MAX_ALT_LENGTH = 300;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: NextRequest) {
  if (!hasValidAdminSession()) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const altRaw = formData.get("alt");
    const alt = typeof altRaw === "string" ? altRaw.trim().slice(0, MAX_ALT_LENGTH) : "";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Please choose an image to upload." }, { status: 400 });
    }

    const extension = ALLOWED_TYPES[file.type];
    if (!extension) {
      return NextResponse.json(
        { error: "Unsupported image type. Please use JPG, PNG, WEBP or GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image is too large (max 8MB)." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const path = `${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET).upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      console.error("Supabase storage upload error (gallery):", uploadError);
      return NextResponse.json(
        { error: "Could not upload the image. Please try again." },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);

    const { data, error: insertError } = await supabaseAdmin
      .from("gallery_images")
      .insert({ url: publicUrlData.publicUrl, storage_path: path, alt })
      .select("id, url, alt, sort_order, created_at")
      .single();

    if (insertError) {
      console.error("Supabase insert error (gallery_images):", insertError);
      // Best-effort cleanup so we don't leave an orphaned file in storage.
      await supabaseAdmin.storage.from(BUCKET).remove([path]);
      return NextResponse.json(
        { error: "Could not save the image. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, image: data });
  } catch (err) {
    console.error("gallery upload error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
