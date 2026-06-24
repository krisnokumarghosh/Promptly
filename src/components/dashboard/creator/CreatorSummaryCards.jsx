import { jetbrainsMono } from "@/lib/fonts";
import { FileText, Copy, Bookmark } from "@gravity-ui/icons";

export default async function CreatorSummaryCards({ user, prompts }) {
  const totalPrompt = prompts.length;
  const totalCopies = prompts.reduce((sum, p) => sum + (p.copyCount ?? 0), 0);
  const totalBookmarks = prompts.reduce(
    (sum, p) => sum + (p.bookmarkCount ?? 0),
    0,
  );
  const CARDS = [
    {
      icon: FileText,
      label: "Total Prompts",
      value: totalPrompt,
      badge: "Active",
      badgeColor: "text-[#AAFF00] bg-[#AAFF00]/10",
    },
    {
      icon: Copy,
      label: "Total Copies",
      value: totalCopies,
      badge: "+12% this month",
      badgeColor: "text-[#AAFF00] bg-[#AAFF00]/10",
    },
    {
      icon: Bookmark,
      label: "Total Bookmarks",
      value: totalBookmarks,
      badge: "High Engagement",
      badgeColor: "text-[#AAFF00] bg-[#AAFF00]/10",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 md:mt-15">
      {CARDS.map(({ icon: Icon, label, value, badge, badgeColor }) => (
        <div
          key={label}
          className="flex flex-col justify-between bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-5 gap-6"
        >
          <div className="flex items-start justify-between">
            <Icon width={20} height={20} className="text-white/40" />
            <span
              className={`${jetbrainsMono.className} text-[10px] font-bold px-2 py-1 rounded-md tracking-[0.06em] ${badgeColor}`}
            >
              {badge}
            </span>
          </div>

          <div>
            <p className="text-[12px] text-white/40 mb-1.5">{label}</p>
            <p
              className={`${jetbrainsMono.className} text-[32px] font-bold text-white leading-none`}
            >
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
