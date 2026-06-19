import { jetbrainsMono } from "@/lib/fonts";
import {
  ChartAreaStacked,
  CircleDollar,
  GearBranches,
  Persons,
  Shield,
  Thunderbolt,
} from "@gravity-ui/icons";

const FEATURES = [
  {
    icon: <Thunderbolt />,
    stat: "2.4M+",
    title: "Prompts Executed Daily",
    desc: "Our infrastructure handles millions of prompt executions daily with near-zero latency across all major AI models.",
  },
  {
    icon: <Shield />,
    stat: "100%",
    title: "Verified & Tested",
    desc: "Every prompt on the marketplace is human-reviewed and benchmark-tested before going live. No junk, only quality.",
  },
  {
    icon: <CircleDollar />,
    stat: "$0 Fee",
    title: "Monetize Instantly",
    desc: "List your prompts for free and start earning. We take zero platform fees on your first $500 in sales.",
  },
  {
    icon: <GearBranches />,
    stat: "15+",
    title: "AI Models Supported",
    desc: "GPT-4, Claude 3, Midjourney, Gemini, Llama, Mistral — one marketplace, every frontier model covered.",
  },
  {
    icon: <ChartAreaStacked />,
    stat: "Real-time",
    title: "Analytics Dashboard",
    desc: "Track prompt performance, usage trends, and revenue with a live analytics dashboard built for prompt creators.",
  },
  {
    icon: <Persons />,
    stat: "50K+",
    title: "Active Community",
    desc: "Join a thriving community of prompt engineers, AI enthusiasts, and developers pushing the limits of what's possible.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#080d08e3] py-24 px-6">
      <div className="max-w-225 mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#AAFF00]/8 border border-[#AAFF00]/20 text-[#AAFF00] text-[10px] font-bold tracking-[0.13em] uppercase px-4 py-1.5 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00]" />
          Why Choose Us
        </div>

        <h2 className="text-[clamp(26px,4vw,42px)] font-extrabold text-white tracking-tight leading-[1.2] mb-4">
          Built for <span className="text-[#AAFF00]">Prompt Engineers</span>
          <br />
          Who Mean Business
        </h2>

        <p className="text-[14px] text-white/45 leading-[1.7] max-w-110 mx-auto mb-12">
          Everything you need to discover, deploy, and profit from the most
          powerful AI prompts on the planet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {FEATURES.map(({ icon, stat, title, desc }) => (
            <div
              key={title}
              className="group relative bg-[#1A1A1A] border border-white/8 hover:border-[#AAFF00]/25 rounded-[14px] p-6 text-left overflow-hidden transition-colors duration-200"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#AAFF00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              <div className="w-10 h-10 bg-[#AAFF00]/8 border border-[#AAFF00]/20 rounded-[10px] flex items-center justify-center mb-4">
                <p className="text-[20px] text-[#AAFF00]">{icon}</p>
              </div>

              <span
                className={`${jetbrainsMono.className} text-[22px] font-extrabold text-[#AAFF00] block mb-1`}
              >
                {stat}
              </span>

              <p className="text-[14px] font-bold text-white mb-2">{title}</p>

              <p className="text-[12.5px] text-white/45 leading-[1.7]">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
