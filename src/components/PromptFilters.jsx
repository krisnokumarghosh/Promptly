"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Magnifier, Xmark } from "@gravity-ui/icons";
import { Button, Input, ListBox, Select } from "@heroui/react";

const CATEGORIES = [
  "Coding",
  "Writing",
  "Marketing",
  "Design",
  "Education",
  "Business",
  "Research",
  "Other",
];
const AI_TOOLS = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Midjourney",
  "Stable Diffusion",
  "DALL-E 3",
  "Llama",
  "Mistral",
];
const DIFFICULTIES = ["Beginner", "Intermediate", "Pro"];
const SORTS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Most Popular" },
  { value: "copied", label: "Most Copied" },
];

export default function PromptFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParam = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set("page", "1");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, router],
  );

  const clearAll = () => {
    startTransition(() => router.push(pathname));
  };

  const current = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    aiTool: searchParams.get("aiTool") || "",
    difficulty: searchParams.get("difficulty") || "",
    sort: searchParams.get("sort") || "latest",
  };

  const hasFilters =
    current.search || current.category || current.aiTool || current.difficulty;

  return (
    <div
      className={`mb-10 space-y-5 ${isPending ? "opacity-60 pointer-events-none" : ""} transition-opacity`}
    >
      <div className="relative">
        <Magnifier
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none"
        />
        <Input
          type="text"
          placeholder="Search by title, tags, or AI tool..."
          defaultValue={current.search}
          onChange={(e) => {
            const v = e.target.value;

            clearTimeout(window.__searchTimer);
            window.__searchTimer = setTimeout(
              () => updateParam("search", v),
              400,
            );
          }}
          className="w-full bg-[#0d120d] border border-white/[0.07] rounded-[10px] pl-9 pr-4 py-3 text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:ring-[#AAFF00]/40 transition-colors"
        />
        {current.search && (
          <button
            onClick={() => updateParam("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            <Xmark size={14} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center ">
        <Select
          value={current.category}
          onChange={(value) => updateParam("category", value)}
          placeholder="Categories"
        >
          <Select.Trigger className="bg-[#0d120d] border border-white/[0.07]">
            <Select.Value className="text-white/70" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-[#0d120d] border border-white/8 text-white">
            <ListBox>
              {CATEGORIES.map((c) => (
                <ListBox.Item
                  key={c}
                  id={c}
                  value={c}
                  className="hover:bg-[#94FD00] hover:text-black transition-all"
                >
                  {c}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          value={current.category}
          onChange={(value) => updateParam("aiTool", value)}
          placeholder="AI Tools"
        >
          <Select.Trigger className="bg-[#0d120d] border border-white/[0.07]">
            <Select.Value className="text-white/70" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-[#0d120d] border border-white/8 text-white">
            <ListBox>
              {AI_TOOLS.map((c) => (
                <ListBox.Item
                  key={c}
                  id={c}
                  value={c}
                  className="hover:bg-[#94FD00] hover:text-black transition-all"
                >
                  {c}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          value={current.category}
          onChange={(value) => updateParam("difficulty", value)}
          placeholder="All Levels"
        >
          <Select.Trigger className="bg-[#0d120d] border border-white/[0.07]">
            <Select.Value className="text-white/70" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-[#0d120d] border border-white/8 text-white">
            <ListBox>
              {DIFFICULTIES.map((c) => (
                <ListBox.Item
                  key={c}
                  id={c}
                  value={c}
                  className="hover:bg-[#94FD00] hover:text-black transition-all"
                >
                  {c}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <div className="w-px h-5 bg-white/10 mx-1" />

        <div className="flex gap-1.5">
          {SORTS.map((s) => (
            <button
              key={s.value}
              onClick={() => updateParam("sort", s.value)}
              className={` text-[12px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                current.sort === s.value
                  ? "bg-[#AAFF00]/10 text-[#AAFF00] border-[#AAFF00]/30"
                  : "text-white/40 border-white/10 hover:border-white/20"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {hasFilters && (
          <Button
            onClick={clearAll}
            className="ml-auto text-[11px] bg-transparent flex items-center gap-1 transition-colors"
          >
            <Xmark size={12} /> Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
