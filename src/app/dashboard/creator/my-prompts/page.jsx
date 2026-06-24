import { PromptCard } from "@/components/dashboard/PromptCard";
import { getPromptsById } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const CreatorMyPromptPage = async () => {
  const user = await getUserSession();
  const prompts = await getPromptsById(user?.id);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[26px] md:text-[40px] font-extrabold text-white mb-1">
          My <span className="text-[#94FD00]">Prompts</span>
        </h1>
        <p className="text-[13px] md:text-[16px] text-white/35">
          Manage and track all your submitted prompts.
        </p>
      </div>
      <div>
        {prompts.length === 0 ? (
          <div className="text-center py-20 text-white/25 text-[13px]">
            No prompts yet.{" "}
            <a
              href="/dashboard/prompts/new"
              className="text-[#AAFF00] hover:underline"
            >
              Create your first prompt →
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorMyPromptPage;
