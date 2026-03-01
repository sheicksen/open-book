"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useParams } from 'next/navigation';

const TAGS = ["Post", "Project", "Tutorial"];

const TAG_STYLES = {
  Post:     { pill: "bg-violet-100 text-violet-700", ring: "ring-violet-400", dot: "bg-violet-400" },
  Project:     { pill: "bg-sky-100 text-sky-700",       ring: "ring-sky-400",    dot: "bg-sky-400"    },
  Tutorial: { pill: "bg-teal-100 text-teal-700",     ring: "ring-teal-400",   dot: "bg-teal-400"   },
};

export default function CreatePostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {community} = useParams();

  const [form, setForm] = useState({ title: "", body: "", tag: "", image: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const valid =
    form.title.trim().length >= 3 &&
    form.body.trim().length >= 10 &&
    form.tag !== "";

  const handleSubmit = async () => {
    if (!valid || submitting) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/createpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          body:  form.body.trim(),
          tag:   form.tag,
          image: form.image.trim() || null,
          community: community
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong.");
        return;
      }

      redirect(`/dashboard/${community}`);
    } catch {
      setError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Auth guard
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center max-w-sm w-full">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Sign in required</h2>
          <p className="text-sm text-gray-500 mb-6">You need to be signed in to create a post.</p>
          <a href="/login" className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold py-2.5 rounded-lg text-center transition-colors">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Create a post</h1>
          <p className="text-sm text-gray-500 mt-1">Share something with the community.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* ── Form card ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-violet-500 to-pink-500" />

            <div className="p-6 space-y-5">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Title <span className="text-rose-400">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={update}
                  maxLength={120}
                  placeholder="Give your post a clear, descriptive title"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
                <div className="flex justify-between mt-1">
                  {form.title.length > 0 && form.title.trim().length < 3 ? (
                    <p className="text-xs text-rose-500">Must be at least 3 characters</p>
                  ) : <span />}
                  <p className="text-xs text-gray-400 ml-auto">{form.title.length}/120</p>
                </div>
              </div>

              {/* Tag */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tag <span className="text-rose-400">*</span>
                </label>
                <div className="flex gap-2">
                  {TAGS.map((tag) => {
                    const style = TAG_STYLES[tag];
                    const selected = form.tag === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, tag }))}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          selected
                            ? `${style.pill} border-transparent ring-2 ${style.ring}`
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {selected && <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Body <span className="text-rose-400">*</span>
                </label>
                <textarea
                  name="body"
                  value={form.body}
                  onChange={update}
                  rows={7}
                  placeholder="Write your post content here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none leading-relaxed"
                />
                {form.body.length > 0 && form.body.trim().length < 10 && (
                  <p className="text-xs text-rose-500 mt-1">Must be at least 10 characters</p>
                )}
              </div>

              {/* Image URL (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Image URL
                  <span className="ml-2 text-xs font-normal text-gray-400">optional</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    name="image"
                    value={form.image}
                    onChange={update}
                    placeholder="https://example.com/image.png"
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-600 text-sm px-4 py-3 rounded-lg">
                  <svg className="w-4 h-4 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!valid || submitting}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  valid && !submitting
                    ? "bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Publishing...
                  </>
                ) : "Publish Post"}
              </button>

            </div>
          </div>

          {/* ── Live preview ── */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">Preview</p>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Image preview */}
              {form.image ? (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-36 object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              <div className="p-4 space-y-3">
                {/* Author row */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                    {session.user.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {session.user.username ?? session.user.name}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">just now</span>
                </div>

                {/* Title + tag */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                    {form.title.trim() || <span className="text-gray-300">Your title will appear here</span>}
                  </h3>
                  {form.tag && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-none ${TAG_STYLES[form.tag].pill}`}>
                      {form.tag}
                    </span>
                  )}
                </div>

                {/* Body */}
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {form.body.trim() || <span className="text-gray-300">Your body text will appear here...</span>}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    0
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-teal-700">Tips for a great post</p>
              {[
                "Keep your title short and descriptive",
                "Use Tutorial for step-by-step guides",
                "Images help your post stand out",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-xs text-teal-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
