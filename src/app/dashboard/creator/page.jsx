import CreatorSummaryCards from "@/components/dashboard/creator/CreatorSummaryCards";
import PromptCopyChart from "@/components/dashboard/creator/PromptCopyChart";
import PromptGrowthChart from "@/components/dashboard/PromptGrowthChart";
import { getPromptsById } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const Creatorpage = async () => {
  const user = await getUserSession();
  const prompts = await getPromptsById(user?.id)
  return (
    <div className="text-white">
      <div>
        <p className="text-[#94FD00] text-xs md:text-sm font-semibold mb-3">
          CREATOR PORTAL
        </p>
        <h2 className="text-[26px] md:text-[40px] font-bold">
          Welcome back,
          <span className="text-[#94FD00] ml-2">{user?.name}</span>{" "}
        </h2>
      </div>
      <CreatorSummaryCards user={user} prompts={prompts}/>
      <PromptGrowthChart prompts={prompts}/>
      <PromptCopyChart prompts={prompts}/>
    </div>
  );
};

export default Creatorpage;
