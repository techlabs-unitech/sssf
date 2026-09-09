"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

// Keep in sync with MAX_FILE_SIZE in app/api/admin/gallery/route.ts.
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB

export default function GalleryUploader() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setError(null);

    // Catch an oversized file immediately, before a network round trip —
    // a file too large for the server to accept would otherwise sit as a
    // pending upload with no feedback until it eventually times out.
    if (selected && selected.size > MAX_FILE_SIZE) {
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setError(
        `That image is ${(selected.size / (1024 * 1024)).toFixed(1)}MB — please choose one under ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
      );
      return;
    }

    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Please choose an image to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    // Without this, a request that never gets a response from the server
    // (a killed serverless function, a dropped connection, a proxy that
    // swallows the reply) leaves the button stuck on "Uploading…" forever
    // with no feedback. This guarantees we always resolve one way or the
    // other within 45s.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", alt);

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const contentType = res.headers.get("content-type") ?? "";
      const data = contentType.includes("application/json")
        ? await res.json().catch(() => ({}))
        : {};

      if (!res.ok) {
        // A non-JSON response (e.g. a host's own 413/504 error page for a
        // request that never reached our route handler) has no `data.error`,
        // so fall back to the HTTP status instead of a silent generic string.
        throw new Error(data.error || `Upload failed (${res.status} ${res.statusText}).`);
      }

      setFile(null);
      setAlt("");
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // Re-fetches the server component's data, so the list below and the
      // public /gallery page both reflect the new photo immediately.
      router.refresh();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Upload timed out. Check your connection and try again with a smaller image.");
      } else {
        setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-maroon/10 dark:border-marigold/15 p-7 md:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
        <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-dashed border-maroon/20 bg-ivory-soft dark:border-marigold/25 dark:bg-charcoal-soft">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Selected preview" className="h-full w-full object-cover" />
          ) : (
            <UploadCloud className="h-8 w-8 text-sandalwood/60" strokeWidth={1.5} />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="g-file" className="text-xs text-sandalwood dark:text-ivory-soft/60">
              Image file
            </label>
            <input
              id="g-file"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              required
              onChange={handleFileChange}
              className="mt-2 w-full text-sm text-sandalwood file:mr-4 file:rounded-lg file:border-0 file:bg-marigold file:px-4 file:py-2 file:text-sm file:font-medium file:text-white dark:text-ivory-soft/70"
            />
          </div>
          <div>
            <label htmlFor="g-alt" className="text-xs text-sandalwood dark:text-ivory-soft/60">
              Description (alt text)
            </label>
            <input
              id="g-alt"
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g. Volunteers distributing food supplies"
              className="mt-2 w-full rounded-xl border border-maroon/15 dark:border-marigold/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-marigold"
            />
          </div>
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-vermillion">{error}</p>}

      <button
        type="submit"
        disabled={uploading}
        className="mt-6 rounded-xl bg-marigold px-6 py-3 text-sm font-medium text-white transition hover:bg-marigold-dark disabled:opacity-60"
      >
        {uploading ? "Uploading…" : "Upload image"}
      </button>
    </form>
  );
}
