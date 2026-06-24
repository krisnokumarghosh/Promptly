import { PromptCard } from "@/components/dashboard/PromptCard";
import { getPromptsById } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { jetbrainsMono } from "@/lib/fonts";
import { FilePlus, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const CreatorMyPromptPage = async () => {
  const user = await getUserSession();
  const prompts = await getPromptsById(user?.id);
  return (
    <div>
      {prompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-5">
          <div className="w-16 h-16 rounded-4xl bg-[#AAFF00]/6 border border-[#AAFF00]/15 flex items-center justify-center">
            <FilePlus className="h-8 w-8 text-[#94FD00]" />
          </div>

          <div className="text-center">
            <p className="text-[15px] md:text-[25px] font-semibold text-white/50 mb-1.5">
              No prompts yet
            </p>
            <p
              className={`${jetbrainsMono.className} text-[11px] md:text-[16px] text-white/25 `}
            >
              Create your first prompt and start earning
            </p>
          </div>

          <Link href="/dashboard/creator/add-prompt">
            <Button className=" bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a]  font-semibold transition-colors duration-200">
              <Plus />
              Create First Prompt
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-[26px] md:text-[40px] font-extrabold text-white mb-1">
              My <span className="text-[#94FD00]">Prompts</span>
            </h1>
            <p className="text-[13px] md:text-[16px] text-white/35">
              Manage and track all your submitted prompts.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorMyPromptPage;
