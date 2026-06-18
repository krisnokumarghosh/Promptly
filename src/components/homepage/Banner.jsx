// components/HeroBanner.jsx

import { LocationArrow, Magnifier } from "@gravity-ui/icons";
import { Button, Chip, Input } from "@heroui/react";
import { jetbrainsMono } from "@/lib/fonts";

const TRENDING = ["ChatGPT", "Midjourney-V6", "Coding-Assistant", "Claude", "Deepseek", "Claude-Fable-5"];

export default function Banner() {
  return (
    <section className="relative pt-33 md:pt-0 min-h-screen flex items-center justify-center bg-[#080d08] overflow-hidden">
      {/* Radial green glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(100,200,50,0.13),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-170 px-6">
        {/* Badge */}
        <Chip className="inline-flex items-center gap-2 bg-[#AAFF00]/10 border border-[#AAFF00]/30 text-[#AAFF00] text-[10px] font-bold tracking-[0.13em] uppercase px-4 py-1.5 rounded-full mb-7">
          <span className="w-1.75 h-1.75 rounded-full bg-[#AAFF00] shadow-[0_0_6px_#AAFF00] animate-pulse" />
          Powering 2.4M Prompts Daily
        </Chip>

        {/* Heading */}
        <h1
          className={` text-[29px] md:text-[50px] font-extrabold text-white  tracking-tight mb-5`}
        >
          Master the <span className={`${jetbrainsMono.className} text-[#AAFF00]`}>Art of AI</span> with
          Engineered Precision
        </h1>

        {/* Subtext */}
        <p className=" text-[13px] md:text-[15px] text-white/55 leading-[1.7] max-w-105 mx-auto mb-8">
          Discover, deploy, and monetize high-performance prompts for GPT-4,
          Claude 3, and Midjourney on the worlds most advanced neural
          marketplace.
        </p>

         {/* Trending tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
         
          {TRENDING.map((tag) => (
            <button
              key={tag}
              className="text-white/50 hover:text-[#AAFF00] text-[10px] font-semibold tracking-[0.08em] bg-white/5 hover:border-[#AAFF00]/30 border border-white/10 px-3 py-1 rounded-full transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-white/6 border border-white/12 rounded-full px-5 py-1.5 gap-3 max-w-120 mx-auto mb-5">
          <Magnifier
            width={15}
            height={15}
            className="text-white/35 flex-none"
          />
          <Input
            type="text"
            placeholder="Search prompts for 'Architectural rendering' or 'PySpark sc..."
            className="flex-1 bg-transparent outline-none text-white text-[13px] placeholder:text-white/30 focus:ring-0"
          />
         
        </div>

        <div>
          <Button className="bg-[#AAFF00] shadow-lg shadow-[#334907] mt-3 mb-7 text-black font-bold w-37.5 hover:-translate-y-0.5 transition-all duration-200">
            Explore <LocationArrow/>
          </Button>
        </div>

       
      </div>
    </section>
  );
}
