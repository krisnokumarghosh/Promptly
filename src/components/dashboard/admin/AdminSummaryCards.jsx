// components/dashboard/admin/AdminSummaryCards.jsx
import { jetbrainsMono } from "@/lib/fonts";
import { Person, Persons, Star, Copy } from "@gravity-ui/icons";

const CARDS = [
  {
    icon: Persons,
    label: "TOTAL USERS",
    badgeColor: "text-[#AAFF00] bg-[#AAFF00]/10",
  },
  {
    icon: Star,
    label: "TOTAL PROMPTS",
    badgeColor: "text-[#AAFF00] bg-[#AAFF00]/10",
  },
  {
    icon: Star,
    label: "TOTAL REVIEWS",
    badgeColor: "text-[#AAFF00] bg-[#AAFF00]/10",
  },
  {
    icon: Copy,
    label: "TOTAL COPIES",
    badgeColor: "text-[#AAFF00] bg-[#AAFF00]/10",
  },
];

export default function AdminSummaryCards({ users, prompts }) {
  const totalUsers   = users?.length ?? 0;
  const totalPrompts = prompts?.length ?? 0;
  const totalReviews = prompts?.reduce((sum, p) => sum + (p.rating ? 1 : 0), 0) ?? 0;
  const totalCopies  = prompts?.reduce((sum, p) => sum + (p.copyCount ?? 0), 0) ?? 0;

  const values = [
    { value: totalUsers.toLocaleString(),   badge: "+12.5%" },
    { value: totalPrompts.toLocaleString(), badge: "+24.3%" },
    { value: totalReviews.toLocaleString(), badge: "+8.2%"  },
    { value: totalCopies.toLocaleString(),  badge: "+15.8%" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {CARDS.map(({ icon: Icon, label, badgeColor }, i) => (
        <div
          key={label}
          className="relative flex flex-col justify-between bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-4 gap-5 overflow-hidden"
        >
          {/* Top row */}
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-[9px] bg-[#AAFF00]/[0.07] border border-[#AAFF00]/15 flex items-center justify-center">
              <Icon width={17} height={17} className="text-[#AAFF00]/60" />
            </div>
            <span className={`${jetbrainsMono.className} text-[9px] font-bold px-2 py-1 rounded-md tracking-[0.06em] ${badgeColor}`}>
              {values[i].badge}
            </span>
          </div>

          {/* Value */}
          <div>
            <p className={`${jetbrainsMono.className} text-[10px] text-white/25 tracking-[0.1em] mb-2`}>
              {label}
            </p>
            <p className={`${jetbrainsMono.className} text-[26px] md:text-[28px] font-bold text-white leading-none`}>
              {values[i].value}
            </p>
          </div>

          {/* Bottom green line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#AAFF00]/40 via-[#AAFF00]/20 to-transparent" />
        </div>
      ))}
    </div>
  );
}