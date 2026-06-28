import AddPromptForm from "@/components/dashboard/AddPromptForm";
import { getPromptsById } from "@/lib/api/prompts";
import { getUserSession } from "@/lib/core/session";
import { jetbrainsMono } from "@/lib/fonts";
import { ProgressBar, Label } from "@heroui/react";
import Link from "next/link";
import React from "react";

const FREE_LIMIT = 3;

const UserAddPromptPage = async () => {
  const user = await getUserSession();
  const prompts = await getPromptsById(user?.id);

  const used = prompts?.length ?? 0;
  const isPro = user?.plan === "Pro";
  const percentage = isPro ? 100 : Math.min((used / FREE_LIMIT) * 100, 100);
  const remaining = Math.max(FREE_LIMIT - used, 0);
  const isMaxed = !isPro && used >= FREE_LIMIT;

  return (
    <div>
      <div className="mb-10 lg:text-center">
        <h1 className="text-[26px] md:text-[40px] font-bold text-white mb-1">
          Add New <span className="text-[#94FD00]">Prompt</span>
        </h1>
        <p className="text-[13px] md:text-[16px] text-white/35 mb-6">
          Fill in the details below. Your prompt will be reviewed before going
          live.
        </p>

        {/* Prompt limit bar */}
        {!isPro && (
          <div className="inline-flex flex-col items-center gap-2 lg:items-center">
            <div className="flex items-center justify-between w-64 mb-1">
              <span
                className={`${jetbrainsMono.className} text-[10px] text-white/30 tracking-widest uppercase`}
              >
                Free Plan Limit
              </span>
              <span
                className={`${jetbrainsMono.className} text-[10px] font-bold ${
                  isMaxed ? "text-red-400" : "text-[#AAFF00]"
                }`}
              >
                {used} / {FREE_LIMIT}
              </span>
            </div>

            <ProgressBar
              aria-label="Prompt usage"
              value={percentage}
              className="w-64"
            >
              <ProgressBar.Track className="h-1.5 bg-white/6 rounded-full overflow-hidden">
                <ProgressBar.Fill
                  className={`h-full rounded-full transition-all duration-500 ${
                    isMaxed
                      ? "bg-red-400"
                      : percentage >= 66
                        ? "bg-yellow-400"
                        : "bg-[#AAFF00]"
                  }`}
                />
              </ProgressBar.Track>
            </ProgressBar>

            {/* Status message */}
            <p
              className={`${jetbrainsMono.className} text-[10px] mt-1 ${
                isMaxed ? "text-red-400" : "text-white/25"
              }`}
            >
              {isMaxed
                ? "Limit reached — upgrade to add more"
                : `${remaining} prompt${remaining !== 1 ? "s" : ""} remaining on free plan`}
            </p>

            {/* Upgrade CTA */}
            {isMaxed && (
              <Link
                href="/pricing"
                className="mt-2 bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[12px] px-5 py-2 rounded-full transition-colors"
              >
                Upgrade to Pro →
              </Link>
            )}
          </div>
        )}

        {/* Pro badge */}
        {isPro && (
          <div
            className={`${jetbrainsMono.className} inline-flex items-center gap-2 bg-[#AAFF00]/10 border border-[#AAFF00]/20 text-[#AAFF00] text-[10px] font-bold px-3 py-1.5 rounded-full`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
            PRO — UNLIMITED PROMPTS
          </div>
        )}
      </div>

      {/* Block form if maxed */}
      {isMaxed ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 bg-[#0d120d] border border-white/[0.07] rounded-4xl">
          <div className="w-12 h-12 rounded-3xl bg-red-500/8 border border-red-500/20 flex items-center justify-center">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[15px] font-semibold text-white/60 mb-1">
              Free limit reached
            </p>
            <p
              className={`${jetbrainsMono.className} text-[11px] text-white/25`}
            >
              You&apos;ve used all {FREE_LIMIT} free prompt slots
            </p>
          </div>
          <Link
            href="/pricing"
            className="bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold text-[13px] px-6 py-2.5 rounded-full transition-colors"
          >
            Upgrade to Pro →
          </Link>
        </div>
      ) : (
        <AddPromptForm />
      )}
    </div>
  );
};

export default UserAddPromptPage;
