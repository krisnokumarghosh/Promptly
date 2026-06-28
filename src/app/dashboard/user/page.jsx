import UserProfile from "@/components/dashboard/user/UserProfile";
import { getBookmarksByUseId } from "@/lib/api/bookmarks";
import { getPromptsById } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const UserProfilePage = async () => {
  const user = await getUserSession();
  const prompts = await getPromptsById(user?.id);
  const savedPrompts = await getBookmarksByUseId(user?.id);
  return (
    <div className="p-6">
      <UserProfile user={user} prompts={prompts} savedPrompts={savedPrompts}/>
    </div>
  );
};

export default UserProfilePage;
