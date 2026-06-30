import { PromptCard } from "./PromptCard";

export default function PromptsList({ prompts = [], onDelete }) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-20 text-white/25 text-[13px]">
        No prompts yet.{" "}
        <a href="/dashboard/prompts/new" className="text-[#AAFF00] hover:underline">
          Create your first prompt →
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}