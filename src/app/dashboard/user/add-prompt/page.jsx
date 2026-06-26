import AddPromptForm from "@/components/dashboard/AddPromptForm";
import React from "react";

const UserAddPromptPage = () => {
  return (
    <div>
      <div className="mb-15 lg:text-center">
        <h1 className="text-[26px] md:text-[40px] font-bold text-white mb-1">
          Add New <span className="text-[#94FD00]">Prompt</span>
        </h1>
        <p className="text-[13px] md:text-[16px] text-white/35">
          Fill in the details below. Your prompt will be reviewed before going
          live.
        </p>
      </div>
      <AddPromptForm/>
    </div>
  );
};

export default UserAddPromptPage;
