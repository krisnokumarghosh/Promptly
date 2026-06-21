"use client";

import { LocationArrow, Magnifier } from "@gravity-ui/icons";
import { Button, Chip, Input } from "@heroui/react";
import { jetbrainsMono } from "@/lib/fonts";
import { motion } from "framer-motion";
import { useScramble } from "@/lib/animations";

const TRENDING = [
  "ChatGPT",
  "Midjourney-V6",
  "Coding-Assistant",
  "Claude",
  "Deepseek",
  "Claude-Fable-5",
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

export default function Banner() {
  const scrambled = useScramble("Art of AI", 2000);

  return (
    <section className="relative pt-33 min-h-screen flex items-center justify-center bg-[#080d08] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(100,200,50,0.13),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-170 px-6">
        <motion.div variants={fadeUp(0)} initial="hidden" animate="visible">
          <Chip className="inline-flex items-center gap-2 bg-[#AAFF00]/10 border border-[#AAFF00]/30 text-[#AAFF00] text-[10px] font-bold tracking-[0.13em] uppercase px-4 py-1.5 rounded-full mb-7">
            <span className="w-1.75 h-1.75 rounded-full bg-[#AAFF00] shadow-[0_0_6px_#AAFF00] animate-pulse" />
            Powering 2.4M Prompts Daily
          </Chip>
        </motion.div>

        <motion.h1
          variants={fadeUp(0.15)}
          initial="hidden"
          animate="visible"
          className="text-[29px] md:text-[50px] font-extrabold text-white tracking-tight mb-5"
        >
          Master the{" "}
          <span className={`${jetbrainsMono.className} text-[#AAFF00]`}>
            {scrambled}
          </span>{" "}
          with Engineered Precision
        </motion.h1>

        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate="visible"
          className={`${jetbrainsMono.className} w-full max-w-160 mx-auto bg-[#141a14] border border-white/8 rounded-[14px] overflow-hidden my-8`}
        >
          <div className="flex items-center gap-1.75 px-4.5 py-3.5 border-b border-white/6 bg-white/2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="px-5.5 py-5.5 text-[13px] leading-[1.85] text-left">
            <p className="text-white/75">
              <span className="text-[#AAFF00] font-bold">SYSTEM_ROLE:</span>{" "}
              Delivers High-Performance Prompts
            </p>
            <div className="h-3.5" />
            <p className="text-[#AAFF00] font-bold">OBJECTIVE:</p>
            <p className="text-white/75">
              Discover, deploy, and monetize high-performance prompts for GPT-4,
              Claude 3, and Midjourney on the world&apos;s most advanced neural
              marketplace.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
        >
          {TRENDING.map((tag, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.45 + i * 0.06,
                duration: 0.35,
                ease: "easeOut",
              }}
            >
              <Chip className="text-white/50 hover:text-[#AAFF00] text-[10px] font-semibold tracking-[0.08em] bg-white/5 hover:border-[#AAFF00]/30 border border-white/10 px-3 py-1 transition-colors cursor-pointer">
                {tag}
              </Chip>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp(0.55)}
          initial="hidden"
          animate="visible"
          className="flex items-center bg-white/6 border border-white/12 rounded-full px-5 py-1.5 gap-3 max-w-120 mx-auto mb-5"
        >
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
        </motion.div>

        <motion.div variants={fadeUp(0.65)} initial="hidden" animate="visible">
          <Button className="bg-[#AAFF00] shadow-lg shadow-[#334907] mt-3 mb-7 text-black font-bold w-37.5 hover:-translate-y-0.5 transition-all duration-200">
            Explore <LocationArrow />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
