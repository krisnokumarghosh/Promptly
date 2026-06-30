"use client";

import PromptCard from "../PromptCard";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeaturedPrompts = ({ featured = [] }) => {
  return (
    <div className="bg-[#080d08] py-24 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_20%,rgba(170,255,0,0.05),transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center mb-14 px-6"
      >
        <div className="inline-flex items-center gap-2 bg-[#AAFF00]/8 border border-[#AAFF00]/20 text-[#AAFF00] text-[10px] font-bold tracking-[0.13em] uppercase px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
          Most Popular
        </div>
        <h2 className="text-[clamp(24px,4vw,40px)] font-extrabold text-white tracking-tight leading-[1.2] mb-3">
          Featured <span className="text-[#AAFF00]">Prompts</span>
        </h2>
        <p className="text-[14px] text-white/40 max-w-100 mx-auto leading-[1.7]">
          Hand-picked, top-performing prompts trusted by thousands of creators
        </p>
      </motion.div>

      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {featured.map((f) => (
          <motion.div key={f._id} variants={cardVariant}>
            <PromptCard prompt={f} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default FeaturedPrompts;