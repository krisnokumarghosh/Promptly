"use client";

import { typeAnimation } from "@/lib/animations";
import { jetbrainsMono } from "@/lib/fonts";
import { Fingerprint, PlugWire, Rocket } from "@gravity-ui/icons";

const FEATURES = [
  {
    icon: <Fingerprint />,
    title: "Identity Preservation",
    desc: "Every prompt is digitally signed and tracked via our neural ledger to ensure originality and provenance.",
  },
  {
    icon: <Rocket />,
    title: "Zero Latency Delivery",
    desc: "Instant fulfillment through our global edge network, delivering prompt structures to your IDE in milliseconds.",
  },
  {
    icon: <PlugWire />,
    title: "Native Model Integration",
    desc: "One-click testing across GPT-4, Claude, and Gemini to ensure cross-model compatibility.",
  },
];

const TERMINAL_LINES = [
  { label: "Token optimization:", value: "84% reduction" },
  { label: "Latency check:", value: "14ms" },
  { label: "Temperature calibration:", value: "0.7" },
];

const BuiltForNextEra = () => {
  return (
    <section className="bg-[#080d08] py-10 md:py-24 px-6">
      <div className="max-w-225 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold text-white leading-[1.2] tracking-tight mb-10">
            Built for the <br />
            <span className="text-[#AAFF00]">Next Era of Work</span>
          </h2>
          <div className="flex flex-col gap-7">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-9 h-9 bg-[#AAFF00]/8 border border-[#AAFF00]/20 rounded-[9px] flex items-center justify-center flex-none mt-0.5">
                  <p className="text-[#AAFF00] ">{icon}</p>
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white mb-1.5">
                    {title}
                  </p>
                  <p className="text-[12.5px] text-white/40 leading-[1.7]">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative z-10 w-full bg-[#111711] border border-white/8 rounded-[14px] overflow-hidden">
            <div className="flex items-center gap-1.75 px-4 py-3.5 border-b border-white/6 bg-white/2">
              <span className="w-2.75 h-2.75 rounded-full bg-[#ff5f57]" />
              <span className="w-2.75 h-2.75 rounded-full bg-[#febc2e]" />
              <span className="w-2.75 h-2.75 rounded-full bg-[#28c840]" />
            </div>

            <div
              className={`${jetbrainsMono.className} px-5 py-5 text-[12px] leading-[1.8]`}
            >
              <p className="text-[#AAFF00]/35 text-[10px] tracking-widest mb-3">
                — INITIATING NEURAL RECONSTRUCTION —
              </p>
              <p className="text-[#AAFF00] mb-2.5">
                Analyzing prompt syntax structure...
              </p>

              {TERMINAL_LINES.map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="text-white/45">{label}</span>
                  <span className="text-white/70">{value}</span>
                </div>
              ))}

              <p className="text-[#AAFF00] font-bold mt-4">
                <span className="mr-2">{">"}</span>
                {typeAnimation("READY FOR DEPLOYMENT")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BuiltForNextEra;
