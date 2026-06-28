// components/prompt/PromptDetails.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { jetbrainsMono } from "@/lib/fonts";
import {
  Bookmark,
  Copy,
  Star,
  Flag,
  Lock,
  Check,
  Person,
  Clock,
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { errorToast, successToast } from "@/lib/toasts";
import { increasePromptCopyCount } from "@/lib/actions/prompts";
import { useRouter } from "next/navigation";
import PromptReportModal from "./PromptReportModal";
import { addBookmark, deleteBookmark } from "@/lib/actions/bookmarks";

const DIFFICULTY_STYLES = {
  Beginner: "bg-[#AAFF00]/10 text-[#AAFF00] border border-[#AAFF00]/20",
  Intermediate: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Pro: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

// ── Blurred/locked content overlay ──────────────────────────────
function PremiumLock() {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <div className="blur-sm select-none pointer-events-none bg-[#0d120d] border border-white/[0.07] rounded-3xl px-5 py-5 font-mono text-[13px] text-white/50 leading-[1.8] h-40">
        Act as an experienced consultant. Generate innovative ideas for the
        industry targeting audience. For each idea, provide a short description,
        business model, target market, and potential revenue streams...
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-[2px] rounded-3xl">
        <div className="w-10 h-10 rounded-full bg-[#AAFF00]/10 border border-[#AAFF00]/20 flex items-center justify-center">
          <Lock width={18} height={18} className="text-[#AAFF00]" />
        </div>
        <p className="text-[13px] font-semibold text-white/80">
          Premium Content
        </p>
        <p className="text-[11px] text-white/35 text-center max-w-55">
          Subscribe to unlock this prompt and all premium content
        </p>
        <Link
          href="/pricing"
          className="mt-1 bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[12px] px-5 py-2 rounded-full transition-colors"
        >
          Subscribe to Premium
        </Link>
      </div>
    </div>
  );
}

// ── Star Rating ──────────────────────────────────────────────────
function StarRating({ value = 0, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-colors"
        >
          <Star
            width={18}
            height={18}
            className={
              star <= (hover || value) ? "text-[#AAFF00]" : "text-white/20"
            }
          />
        </button>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function PromptDetails({ prompt, user, bookMarks }) {
  const [copied, setCopied] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  console.log(prompt);

  const isPremium = prompt.visibility === "Private";
  const hasAccess = user?.plan === "Pro" || user?.role !== "user";
  const isLocked = isPremium && !hasAccess;
  const isBookmarked = bookMarks.find((b) => b.promptId === prompt._id);

  // Copy prompt
  const handleCopy = async () => {
    if (isLocked) return;
    try {
      navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      successToast("Prompt copied to clipboard!");
      const countIncrease = await increasePromptCopyCount(prompt._id);
      setTimeout(() => setCopied(false), 2000);
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  // Bookmark toggle
  const handleBookmark = async () => {
    try {
      if (!isBookmarked) {
        const bookmarkData = {
          promptId: prompt._id,
          userId: user?.id,
        };
        const bookmark = await addBookmark(bookmarkData);
        successToast("Bookmarked");
      } else if (isBookmarked) {
        const data = {
          promptId: prompt._id,
        };
        const delBookmark = await deleteBookmark(isBookmarked._id, data);
        successToast("Bookmark Removed");
      }
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  // Submit review
  const handleReviewSubmit = async () => {
    if (!userRating) return errorToast("Please select a rating");
    if (!review.trim()) return errorToast("Please write a review");
    setSubmitting(true);
    try {
      // your API call here
      successToast("Review submitted!");
      setReview("");
      setUserRating(0);
    } catch {
      errorToast("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-215 mx-auto px-4 py-10 flex flex-col gap-8">
      {/* ── Hero ── */}
      <div className="relative w-full h-65 md:h-80 rounded-4xl overflow-hidden border border-white/[0.07]">
        <Image
          src={prompt.thumbnail}
          alt={prompt.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#080d08] via-[#080d08]/40 to-transparent" />

        {/* Title on image */}
        <div className="absolute bottom-5 left-5 right-5">
          <h1 className="text-[22px] md:text-[28px] font-extrabold text-white tracking-tight leading-[1.2]">
            {prompt.title}
          </h1>
        </div>
      </div>

      {/* ── Action bar ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Copy */}

          {/* Bookmark */}
          <Button
            onClick={handleBookmark}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold  transition-all bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a]`}
          >
            {isBookmarked ? (
              <Check width={14} height={14} />
            ) : (
              <Bookmark width={14} height={14} />
            )}

            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>

        {/* Report */}
        {!isLocked && <PromptReportModal prompt={prompt} user={user} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Left / Main ── */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Description */}
          <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase mb-3`}
            >
              Description
            </p>
            <p className="text-[14px] text-white/65 leading-[1.8]">
              {prompt.description}
            </p>
          </div>

          {/* Prompt Content */}
          <div className="flex flex-col gap-3">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase`}
            >
              Prompt Content
            </p>
            {isLocked ? (
              <PremiumLock />
            ) : (
              <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-white/2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span
                    className={`${jetbrainsMono.className} text-[10px] text-white/20 tracking-widest uppercase`}
                  >
                    prompt.txt
                  </span>
                  {/* Copy icon */}
                  <Button
                    onClick={handleCopy}
                    title="Copy Prompt"
                    className={`flex items-center gap-1.5 transition-all px-2.5 py-1 rounded-[7px] text-[11px] font-semibold border ${
                      copied
                        ? "bg-[#AAFF00]/10 text-[#AAFF00] border-[#AAFF00]/25"
                        : "bg-white/4 text-white/35 border-white/8 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {copied ? (
                      <Check width={13} height={13} />
                    ) : (
                      <Copy width={13} height={13} />
                    )}
                  </Button>
                </div>

                {/* Content */}
                <div className="px-5 py-5">
                  <p
                    className={`${jetbrainsMono.className} text-[13px] text-white/70 leading-[1.9] whitespace-pre-wrap`}
                  >
                    {prompt.content}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Usage Instructions */}
          <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase mb-3`}
            >
              Usage Instructions
            </p>
            <ol className="flex flex-col gap-2">
              {[
                `Open ${prompt.aiTool} and start a new conversation.`,
                "Copy the prompt content above.",
                "Replace placeholders like [INDUSTRY] with your actual values.",
                "Paste into the chat and hit send.",
                "Iterate and refine based on the output.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[13px] text-white/55"
                >
                  <span
                    className={`${jetbrainsMono.className} w-5 h-5 rounded-full bg-[#AAFF00]/10 border border-[#AAFF00]/20 text-[#AAFF00] text-[10px] font-bold flex items-center justify-center flex-none mt-0.5`}
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Review Section */}
          <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase mb-4`}
            >
              Reviews & Ratings
            </p>

            {isLocked ? (
              <p className="text-[13px] text-white/30 italic">
                Subscribe to Premium to leave a review.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                <StarRating value={userRating} onChange={setUserRating} />
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review..."
                  rows={3}
                  className={`${jetbrainsMono.className} w-full bg-white/3 border border-white/8 focus:border-[#AAFF00]/30 rounded-[10px] px-4 py-3 text-[12px] text-white/70 placeholder:text-white/20 outline-none resize-none transition-colors`}
                />
                <button
                  onClick={handleReviewSubmit}
                  disabled={submitting}
                  className="self-start bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[12px] px-5 py-2 rounded-full transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right / Sidebar ── */}
        <div className="flex flex-col gap-4">
          {/* Creator */}
          <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase mb-3`}
            >
              Creator
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[9px] bg-[#AAFF00]/10 border border-[#AAFF00]/20 flex items-center justify-center flex-none">
                <span
                  className={`${jetbrainsMono.className} text-[#AAFF00] text-[14px] font-bold`}
                >
                  {prompt.userName?.[0]?.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white/80">
                  {prompt.userName}
                </p>
              </div>
            </div>
          </div>

          {/* Meta info */}
          <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5 flex flex-col gap-3">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase mb-1`}
            >
              Details
            </p>

            {[
              { label: "AI Tool", value: prompt.aiTool },
              { label: "Category", value: prompt.category },
              { label: "Copies", value: prompt.copyCount },
              { label: "Rating", value: `${prompt.rating ?? 0} / 5` },
              { label: "Bookmarks", value: prompt.bookmarkCount ?? 0 },
              {
                label: "Published",
                value: new Date(prompt.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span
                  className={`${jetbrainsMono.className} text-[10px] text-white/25 uppercase tracking-[0.08em]`}
                >
                  {label}
                </span>
                <span className="text-[12px] font-semibold text-white/65">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase mb-3`}
            >
              Tags
            </p>
            <div className="flex flex-wrap gap-2">
              {prompt.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`${jetbrainsMono.className} text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#AAFF00]/[0.07] text-[#AAFF00]/70 border border-[#AAFF00]/15`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5">
            <p
              className={`${jetbrainsMono.className} text-[10px] font-bold text-[#95FF00] tracking-[0.12em] uppercase mb-3`}
            >
              Visibility
            </p>
            <span
              className={`${jetbrainsMono.className} text-[11px] font-bold px-3 py-1.5 rounded-full border ${
                isPremium
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  : "bg-[#AAFF00]/10 text-[#AAFF00] border-[#AAFF00]/20"
              }`}
            >
              {isPremium ? "🔒 Premium" : "🌐 Public"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
