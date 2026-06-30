import Image from "next/image";
import Link from "next/link";
import { jetbrainsMono } from "@/lib/fonts";
import { Copy, Eye } from "@gravity-ui/icons";
import { Button, Chip } from "@heroui/react";

export default function PromptCard({ prompt }) {
  return (
    <div className="group bg-[#0d120d] border border-white/[0.07] rounded-[14px] overflow-hidden hover:border-white/15 transition-all duration-200 flex flex-col">
      <div className="relative w-full aspect-video bg-[#0a0f0a] overflow-hidden">
        {prompt.thumbnail ? (
          <Image
            src={prompt.thumbnail}
            alt={prompt.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className={`${jetbrainsMono.className} text-white/10 text-xs`}
            >
              No Image
            </span>
          </div>
        )}

        <div className="absolute top-2 left-2">
          {prompt.visibility === "Private" && (
            <Chip color="danger">Premium</Chip>
          )}
        </div>

        {prompt.difficulty && (
          <div className="absolute top-2 right-2">
            <Chip
              color={
                prompt.difficulty === "Beginner"
                  ? "accent"
                  : prompt.difficulty === "Intermediate"
                    ? "success"
                    : "warning"
              }
            >
              {prompt.difficulty}
            </Chip>
          </div>
        )}
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <span
          className={`${jetbrainsMono.className} text-[9px] font-bold tracking-widest uppercase text-[#AAFF00]/60 mb-1.5`}
        >
          {prompt.category}
        </span>

        <h3 className="text-white text-[13px] md:text-[16px] font-semibold leading-snug mb-2 line-clamp-2 flex-1">
          {prompt.title}
        </h3>

        <p className="text-white/30 text-[12px] mb-3">
          by{" "}
          <span className="text-white/50">{prompt.userName ?? "Unknown"}</span>
        </p>

        <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
          <div className="flex items-center gap-1 text-white/30 text-[11px]">
            <Copy size={11} />
            <span className={jetbrainsMono.className}>
              {prompt.copyCount ?? 0}
            </span>
          </div>

          <Link href={`/all-prompts/${prompt._id}`}>
            <Button className="flex items-center gap-1.5 bg-[#AAFF00] text-black hover:bg-[#AAFF00]/90 transition-colors">
              <Eye size={11} />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
