"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";

const CTABanner = () => {
  return (
    <section className="bg-[#080d08] py-16 px-6">
      <div className="max-w-225 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[20px] overflow-hidden px-8 py-14 text-center bg-[radial-gradient(ellipse_at_top_left,#CCFF33,#AAFF00_40%,#66CC00)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_20%,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 text-[clamp(20px,3vw,32px)] font-extrabold text-[#0a0a0a] tracking-tight mb-7"
          >
            Start Prompting Your Future Today.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-center justify-center gap-3 flex-wrap"
          >
            <Button
              href="/marketplace"
              className="bg-[#0a0a0a] text-white text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-[#1a1a1a] transition-colors duration-200"
            >
              Open Marketplace
            </Button>
            <Button
              href="/enterprise"
              className="bg-transparent text-[#0a0a0a] text-[13px] font-semibold px-6 py-2.5 rounded-full border border-[#0a0a0a]/30 hover:bg-[#0a0a0a]/10 transition-colors duration-200"
            >
              Request Enterprise Access
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;