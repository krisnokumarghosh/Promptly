import PromptDetails from "@/components/PromptDetails";
import { getBookmarksByUseId } from "@/lib/api/bookmarks";
import { getSinglePrompt } from "@/lib/api/prompts";
import { getReviewsByPromptId } from "@/lib/api/reviews";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const PromptDetailsPage = async ({ params }) => {
  const { id } = await params;
  const prompt = await getSinglePrompt(id);
  const user = await getUserSession();
  const getBookmarks = await getBookmarksByUseId(user?.id);
  const getPromptReviews = await getReviewsByPromptId(id);
  console.log(getPromptReviews);
  

  return (
    <div className="py-15 md:py-30 bg-[#080d08]">
      <PromptDetails prompt={prompt} user={user} bookMarks={getBookmarks} promptReviews={getPromptReviews}/>
    </div>
  );
};

export default PromptDetailsPage;
