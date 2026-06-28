import SavedPromptsList from "@/components/dashboard/user/SavedPromptsList";
import { getBookmarksByUseId } from "@/lib/api/bookmarks";
import { getSinglePrompt } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";

const SavedPromptsPage = async () => {
  const user = await getUserSession();
  const savedPrompts = await getBookmarksByUseId(user?.id);

  const savedWithDetails = await Promise.all(
    savedPrompts.map(async (saved) => {
      const prompt = await getSinglePrompt(saved.promptId);
      return { ...saved, prompt };
    }),
  );

  return (
    <div className="flex flex-col gap-6 text-white">
      <div>
        <p className="text-[#AAFF00] text-xs font-semibold mb-2 tracking-wider">
          MY LIBRARY
        </p>
        <h2 className="text-[26px] md:text-[40px] font-bold">Saved Prompts</h2>
        <p className="text-[13px] text-white/35 mt-1">
          {savedWithDetails.length} saved prompts
        </p>
      </div>
      <SavedPromptsList saved={savedWithDetails} />
    </div>
  );
};

export default SavedPromptsPage;
