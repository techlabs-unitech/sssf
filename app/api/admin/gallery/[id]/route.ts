import { NextRequest, NextResponse } from "next/server";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const BUCKET = "gallery";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!hasValidAdminSession()) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  try {
    const { data: existing, error: fetchError } = await supabaseAdmin
      .from("gallery_images")
      .select("id, storage_path")
      .eq("id", params.id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }

    const { error: deleteRowError } = await supabaseAdmin
      .from("gallery_images")
      .delete()
      .eq("id", params.id);

    if (deleteRowError) {
      console.error("Supabase delete error (gallery_images):", deleteRowError);
      return NextResponse.json(
        { error: "Could not delete the image. Please try again." },
        { status: 500 }
      );
    }

    if (existing.storage_path) {
      const { error: storageError } = await supabaseAdmin.storage.from(BUCKET).remove([existing.storage_path]);
      if (storageError) {
        // The row is already gone from the table (so it won't show on the
        // site anymore) — log this but don't fail the request over an
        // orphaned file.
        console.error("Supabase storage delete error (gallery):", storageError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("gallery delete error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
