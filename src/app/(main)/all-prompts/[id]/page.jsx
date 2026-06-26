import PromptDetails from "@/components/PromptDetails";
import { getSinglePrompt } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const PromptDetailsPage = async ({ params }) => {
  const { id } = await params;
  const prompt = await getSinglePrompt(id);
  const user = await getUserSession();

  return (
    <div className="py-15 md:py-30 bg-[#080d08]">
      <PromptDetails prompt={prompt} user={user} />
    </div>
  );
};

export default PromptDetailsPage;
