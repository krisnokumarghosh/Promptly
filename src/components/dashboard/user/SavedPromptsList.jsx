"use client";

import Image from "next/image";
import Link from "next/link";
import { jetbrainsMono } from "@/lib/fonts";
import { Eye, TrashBin, Bookmark } from "@gravity-ui/icons";
import { successToast, errorToast } from "@/lib/toasts";
import { deleteBookmark } from "@/lib/actions/bookmarks";
import { useRouter } from "next/navigation";

const DIFFICULTY_STYLES = {
  Beginner: "bg-[#AAFF00]/10 text-[#AAFF00]",
  Intermediate: "bg-blue-500/10 text-blue-400",
  Pro: "bg-purple-500/10 text-purple-400",
};

function SavedPromptCard({ item, onDelete }) {
  const { prompt, _id: bookmarkId, createdAt } = item;

  if (!prompt) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#0d120d] border border-white/[0.07] hover:border-white/12 rounded-[14px] p-4 transition-colors group">
      <div className="w-full sm:w-16 h-32 sm:h-16 rounded-[10px] overflow-hidden flex-none border border-white/8">
        <Image
          src={prompt.thumbnail}
          alt={prompt.title}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <p className="text-[14px] font-semibold text-white truncate">
            {prompt.title}
          </p>
          <span
            className={`${jetbrainsMono.className} text-[9px] font-bold px-2 py-0.5 rounded ${DIFFICULTY_STYLES[prompt.difficulty] ?? "text-white/40"}`}
          >
            {prompt.difficulty}
          </span>
          <span
            className={`${jetbrainsMono.className} text-[9px] font-bold px-2 py-0.5 rounded bg-white/6 text-white/40 uppercase`}
          >
            {prompt.aiTool}
          </span>
        </div>

        <p className="text-[12px] text-white/35 line-clamp-1 mb-2">
          {prompt.description}
        </p>

        <div className="flex items-center gap-3 text-[11px] text-white/25 flex-wrap">
          <span className={jetbrainsMono.className}>by {prompt.userName}</span>
          <span>·</span>
          <span className={jetbrainsMono.className}>{prompt.category}</span>
          <span>·</span>
          <span
            className={`${jetbrainsMono.className} flex items-center gap-1`}
          >
            <Bookmark width={10} height={10} />
            Saved{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-none">
        <Link
          href={`/all-prompts/${prompt._id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-white/50 hover:text-white bg-white/4 hover:bg-white/8 border border-white/8 transition-all"
        >
          <Eye width={13} height={13} />
          Details
        </Link>
        <button
          onClick={() => onDelete(bookmarkId, prompt._id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium text-red-400/60 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 transition-all"
        >
          <TrashBin width={13} height={13} />
          Remove
        </button>
      </div>
    </div>
  );
}

export default function SavedPromptsList({ saved = [] }) {
  const router = useRouter();
  const handleDelete = async (bookmarkId, promptId) => {
    try {
      const data = {
        promptId: promptId,
      };
      const delSavedPrompt = await deleteBookmark(bookmarkId, data);
      successToast("Removed from saved prompts");
      router.refresh();
    } catch {
      errorToast("Failed to remove bookmark");
    }
  };

  if (saved.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 bg-[#0d120d] border border-white/[0.07] rounded-4xl">
        <div className="w-14 h-14 rounded-[14px] bg-[#AAFF00]/6 border border-[#AAFF00]/15 flex items-center justify-center">
          <Bookmark width={24} height={24} className="text-[#AAFF00]/40" />
        </div>
        <div className="text-center">
          <p className="text-[14px] font-semibold text-white/50 mb-1">
            No saved prompts yet
          </p>
          <p
            className={`${jetbrainsMono.className} text-[11px] text-white/20 tracking-[0.06em]`}
          >
            Browse the marketplace and bookmark prompts you love
          </p>
        </div>
        <Link
          href="/all-prompts"
          className="mt-1 bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[12px] px-5 py-2.5 rounded-full transition-colors"
        >
          Explore Prompts →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {saved.map((item) => (
        <SavedPromptCard key={item._id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}
