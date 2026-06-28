import Image from "next/image";
import { jetbrainsMono } from "@/lib/fonts";
import { CircleCheck, Diamond, Envelope, FileText } from "@gravity-ui/icons";

export default function UserProfile({ user, prompts, savedPrompts }) {
  const isPro = user?.plan === "Pro";

  return (
    <div className="w-full max-w-7xl">
      <h1 className="text-white text-[22px] sm:text-[30px] md:text-[40px] font-semibold mb-1">
        User <span className="text-[#95FF00]">Profile</span> 
      </h1>
      <p className="text-white/30 text-[12px] sm:text-[13px] md:text-[16px] mb-5">
        Manage your plan, credentials, and published prompt details.
      </p>

      {/* Info Card */}
      <div className="bg-[#0d120d] border border-white/[0.07] rounded-[14px] p-4 sm:p-5 mb-3">
        <div className="flex items-center gap-3 sm:gap-3.5 flex-wrap sm:flex-nowrap">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#AAFF00]/30 flex-none">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`${jetbrainsMono.className} w-full h-full bg-[#AAFF00]/10 flex items-center justify-center text-[#AAFF00] text-xl font-bold`}
              >
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-white text-[15px] sm:text-[17px] font-semibold mb-0.5 truncate">
              {user?.name}
            </p>
            <p className="text-white/35 text-[11px] sm:text-[12px] flex items-center gap-1.5 mb-2 truncate">
              <Envelope size={13} className="flex-none" />
              {user?.email}
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span
                className={`${jetbrainsMono.className} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest bg-[#AAFF00]/10 text-[#AAFF00] border border-[#AAFF00]/20`}
              >
                Role: {user?.role}
              </span>
              <span
                className={`${jetbrainsMono.className} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest ${isPro ? "bg-[#AAFF00]/10 text-[#AAFF00]" : "bg-white/5 text-white/40 border border-white/10"}`}
              >
                Plan: {user?.plan ?? "Free"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
        <div className="bg-[#0d120d] border border-white/[0.07] rounded-2xl sm:rounded-3xl p-3 sm:p-4">
          <FileText size={18} className="text-[#AAFF00] mb-2" />
          <p
            className={`${jetbrainsMono.className} text-[9px] sm:text-[10px] font-bold tracking-[0.12em] uppercase text-white/25 mb-1.5`}
          >
            Prompts Published
          </p>
          <p className="text-white text-[22px] sm:text-[28px] font-semibold">
            {prompts.length || 0}
          </p>
        </div>

        <div className="bg-[#0d120d] border border-white/[0.07] rounded-2xl sm:rounded-3xl p-3 sm:p-4">
          <CircleCheck size={18} className="text-[#AAFF00] mb-2" />
          <p
            className={`${jetbrainsMono.className} text-[9px] sm:text-[10px] font-bold tracking-[0.12em] uppercase text-white/25 mb-1.5`}
          >
            Saved Prompts
          </p>
         <p className="text-white text-[22px] sm:text-[28px] font-semibold">
            {savedPrompts.length || 0}
          </p>
        </div>
      </div>

      {/* Upgrade Banner */}
      {!isPro && (
        <div className="bg-[#0d1a0d] border border-[#AAFF00]/15 rounded-[14px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Diamond size={18} className="text-[#AAFF00] flex-none" />
              <span className="text-white text-[14px] sm:text-[15px] font-semibold">
                Upgrade to Pro Lifetime
              </span>
            </div>
            <p className="text-white/35 text-[11px] sm:text-[12px] leading-relaxed">
              Unlock access to all private prompt templates, parameter sets, and
              community reviews for a single one-time contribution of $5.
            </p>
          </div>
          <button className="bg-[#AAFF00] text-[#0a0f0a] font-bold text-[13px] px-5 py-2.5 rounded-full hover:bg-[#99ee00] transition-colors w-full sm:w-auto sm:whitespace-nowrap">
            Upgrade Now ($5)
          </button>
        </div>
      )}
    </div>
  );
}
