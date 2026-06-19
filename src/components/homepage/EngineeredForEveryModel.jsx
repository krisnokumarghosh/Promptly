// components/EngineeredForEveryModel.jsx
import { jetbrainsMono } from "@/lib/fonts";
import { Brush, Diamond, FaceRobot, Palette, Picture, Sparkles } from "@gravity-ui/icons";

const MODELS = [
  { icon: <FaceRobot/>, label: "GPT-40" },
  { icon: <Sparkles/>, label: "CLAUDE 3.5" },
  { icon: <Picture/>, label: "MIDJOURNEY V6" },
  { icon: <Brush/>, label: "STABLE DIFFUSION" },
  { icon:<Palette/>, label: "DALL-E 3" },
  { icon:<Diamond/>, label: "GEMINI PRO" },
];

export default function EngineeredForEveryModel() {
  return (
    <section className="bg-[#080d08e3] py-24 px-6">
      <div className="max-w-225 mx-auto text-center">

        {/* Title */}
        <h2 className="text-[clamp(22px,3vw,36px)] font-extrabold text-white tracking-tight mb-4">
          Engineered for Every Model
        </h2>

        {/* Subtitle */}
        <p className="text-[13px] md:text-[14px] text-white/40 leading-[1.7] max-w-90 mx-auto mb-14">
          Optimized prompt structures for the worlds most powerful LLMs and
          image generators.
        </p>

        {/* Model Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {MODELS.map(({ icon, label }) => (
            <div
              key={label}
              className="group flex flex-col items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-white/[0.07] border border-white/8 hover:border-[#AAFF00]/20 rounded-[14px] px-3 py-6 cursor-pointer transition-all duration-200"
            >
              {/* Icon box */}
              <div className="w-10 h-10 bg-[#AAFF00]/8 border border-[#AAFF00]/20 rounded-[10px] flex items-center justify-center group-hover:bg-[#AAFF00]/[0.14] transition-colors duration-200">
               <p className="text-[#AAFF00] text-[18px]">{icon}</p>
              </div>

              {/* Label */}
              <span className={`${jetbrainsMono.className} text-[9px] text-white/40 group-hover:text-white/60 tracking-widest leading-[1.4] text-center transition-colors duration-200`}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}