import PromptCard from "@/components/PromptCard";
import PromptFilters from "@/components/PromptFilters";
import PromptPagination from "@/components/PromptPagination";
import { getActivePrompts } from "@/lib/api/prompts";

const PER_PAGE = 10;

const AllPromptsPage = async ({ searchParams }) => {
  const {
    search = "",
    category = "",
    aiTool = "",
    difficulty = "",
    sort = "latest",
    page = "1",
  } = await searchParams;

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (aiTool) params.set("aiTool", aiTool);
  if (difficulty) params.set("difficulty", difficulty);
  if (sort) params.set("sort", sort);
  params.set("page", page);
  params.set("perPage", String(PER_PAGE));

  const { prompts = [], total = 0 } = await getActivePrompts(params.toString());
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className=" py-30 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[40px] font-semibold text-white mb-1">
            Explore <span className="text-[#95FF00]">Prompts</span>
          </h1>
          <p className="text-white/30 text-[13px] md:text-[16px]">
            <span className="text-[#95FF00]">{total}</span> prompt
            {total !== 1 ? "s" : ""} found
          </p>
        </div>

        <PromptFilters />

        {prompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/25">
            <p className="text-lg font-medium">No prompts found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {prompts.map((prompt) => (
              <PromptCard key={prompt._id} prompt={prompt} />
            ))}
          </div>
        )}

        {totalPages > 1 && <PromptPagination totalPages={totalPages} />}
      </div>
    </div>
  );
};

export default AllPromptsPage;
