import AddPromptForm from "@/components/dashboard/AddPromptForm";

export default function CreatorAddPromptPage() {
  return (
    <div className="">
      <div className="mb-15 lg:text-center">
        <h1 className="text-[40px] font-extrabold text-white mb-1">
          Create New <span className="text-[#94FD00]">Prompt</span>
        </h1>
        <p className="text-[13px] text-white/35">
          Fill in the details below. Your prompt will be reviewed before going
          live.
        </p>
      </div>

      <AddPromptForm />
    </div>
  );
}
