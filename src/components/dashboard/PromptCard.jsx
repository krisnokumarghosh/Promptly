"use client";

import Image from "next/image";
import { jetbrainsMono } from "@/lib/fonts";
import { Eye, Globe } from "@gravity-ui/icons";
import { Button, Chip } from "@heroui/react";
import PromptEditModal from "./PromptEditModal";
import DeletePromptAlert from "./DeletePromptAlert";

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  approved: "bg-[#AAFF00]/10 text-[#AAFF00] border border-[#AAFF00]/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const DIFFICULTY_STYLES = {
  Beginner: "bg-[#AAFF00]/10 text-[#AAFF00]",
  Intermediate: "bg-blue-500/10 text-blue-400",
  Pro: "bg-purple-500/10 text-purple-400",
};

export function PromptCard({ prompt }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-[#0d120d] border border-white/[0.07] hover:border-white/12 rounded-[14px] p-4 transition-colors">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-[10px] overflow-hidden flex-none border border-white/8">
          <Image
            src={prompt.thumbnail}
            alt={prompt.title}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <p className="text-[13px] sm:text-[14px] font-semibold text-white">
              {prompt.title}
            </p>
            <Chip
              className={`${jetbrainsMono.className} text-[9px] font-bold px-2 py-0.5  ${DIFFICULTY_STYLES[prompt.difficulty] ?? "text-white/40"}`}
            >
              {prompt.difficulty}
            </Chip>

            <Chip
              className={`${jetbrainsMono.className} text-[9px] font-bold px-2 py-0.5  capitalize border ${STATUS_STYLES[prompt.status] ?? "text-white/40"}`}
            >
              {prompt.status}
            </Chip>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-[11px] text-white/30">
            <span className="flex items-center gap-1">
              <Globe width={11} height={11} />
              {prompt.visibility}
            </span>
            <span>·</span>
            <span>
              Submitted{" "}
              {new Date(prompt.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            {prompt.warning && (
              <span className="text-amber-300">Warning: {prompt.warning}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-around md:justify-center items-center gap-2 ">
        <Button
          size="sm"
          className=" text-white/50 hover:text-white bg-white/4 hover:bg-white/8 border border-white/8 transition-all"
        >
          <Eye width={13} height={13} />
          <span className="hidden md:flex">View</span>
        </Button>
        <PromptEditModal prompt={prompt} />
        <DeletePromptAlert prompt={prompt} />
      </div>
    </div>
  );
}
