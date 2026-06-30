"use client";

import { jetbrainsMono } from "@/lib/fonts";
import {
  Brush,
  Diamond,
  FaceRobot,
  Palette,
  Picture,
  Sparkles,
} from "@gravity-ui/icons";
import { motion } from "framer-motion";

const MODELS = [
  { icon: <FaceRobot />, label: "GPT-40" },
  { icon: <Sparkles />, label: "CLAUDE 3.5" },
  { icon: <Picture />, label: "MIDJOURNEY V6" },
  { icon: <Brush />, label: "STABLE DIFFUSION" },
  { icon: <Palette />, label: "DALL-E 3" },
  { icon: <Diamond />, label: "GEMINI PRO" },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function EngineeredForEveryModel() {
  return (
    <section className="bg-[#080d08e3] py-10 md:py-24 px-6">
      <div className="max-w-225 mx-auto text-center">

        {/* Title */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0)}
          className="text-[clamp(22px,3vw,36px)] font-extrabold text-white tracking-tight mb-4"
        >
          Engineered <span className="text-[#AAFF00]">for Every</span> Model
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp(0.1)}
          className="text-[13px] md:text-[14px] text-white/40 leading-[1.7] max-w-90 mx-auto mb-14"
        >
          Optimized prompt structures for the worlds most powerful LLMs and
          image generators.
        </motion.p>

        {/* Model Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariant}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {MODELS.map(({ icon, label }) => (
            <motion.div
              key={label}
              variants={cardVariant}
              className="group flex flex-col items-center justify-center gap-3 bg-[#1A1A1A] rounded-[14px] px-3 py-6 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Icon box */}
              <div className="w-10 h-10 bg-[#AAFF00]/8 border border-[#AAFF00]/20 rounded-[10px] flex items-center justify-center group-hover:bg-[#AAFF00]/[0.14] transition-colors duration-200">
                <p className="text-[#AAFF00] text-[18px]">{icon}</p>
              </div>

              {/* Label */}
              <span className={`${jetbrainsMono.className} text-[9px] text-white/40 group-hover:text-white/60 tracking-widest leading-[1.4] text-center transition-colors duration-200`}>
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}