import { featuredPrompt } from "@/lib/api/features";
import React from "react";
import PromptCard from "../PromptCard";

const FeaturedPrompts = async () => {
  const featured = await featuredPrompt();
  return (
    <div className="bg-[#080d08] py-24">
        <h2 className="text-[clamp(22px,3vw,36px)] font-extrabold text-white tracking-tight mb-10 text-center">
          Featured <span className="text-[#AAFF00]">Prompts</span> 
        </h2>

        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">

      {featured.map((f) => {
        return <PromptCard key={f._id} prompt={f}/>;
      })}
        </div>
    </div>
  );
};

export default FeaturedPrompts;
