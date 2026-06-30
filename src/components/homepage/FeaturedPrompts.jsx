import { featuredPrompt } from "@/lib/api/features";
import React from "react";
import PromptCard from "../PromptCard";
import FeaturedPrompts from "./FeaturedPrompts ";

const FeaturedPromptsSection = async () => {
  const featured = await featuredPrompt();
  return <FeaturedPrompts featured={featured} />;
};

export default FeaturedPromptsSection;
