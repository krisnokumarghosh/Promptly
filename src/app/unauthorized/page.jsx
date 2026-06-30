import { getUserSession } from "@/lib/core/session";
import { jetbrainsMono } from "@/lib/fonts";
import { Lock } from "@gravity-ui/icons";
import Link from "next/link";
import React from "react";

const UnauthorizedPage = async () => {
  const user = await getUserSession();
  const dashboardRoles = {
    user: "/dashboard/user",
    creator: "/dashboard/creator",
    admin: "/dashboard/admin",
  };
  return (
    <div className="min-h-screen bg-[#080d08] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,rgba(100,200,50,0.07),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-md">
        <div className="w-20 h-20 rounded-[20px] bg-[#AAFF00]/6 border border-[#AAFF00]/15 flex items-center justify-center mx-auto mb-6">
          <Lock width={30} height={30} className="text-[#AAFF00]/40" />
        </div>

        <span
          className={`${jetbrainsMono.className} inline-block text-[10px] font-bold tracking-[0.2em] text-[#AAFF00]/40 uppercase mb-3`}
        >
          — 403 ACCESS DENIED —
        </span>

        <h1 className="text-[26px] font-extrabold text-white tracking-tight mb-3">
          Access Denied
        </h1>
        <p className="text-[13px] text-white/35 leading-[1.7] mb-8 max-w-[320px] mx-auto">
          You don&apos;t have permission to view this page. Please contact your
          administrator or return to a safe place.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href={dashboardRoles[user?.role || "/"]}
            className="flex items-center gap-2 bg-[#AAFF00] hover:bg-[#BFFF33] text-[#0a0a0a] text-[13px] font-bold px-5 py-2.5 rounded-full transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/signin"
            className="flex items-center gap-2 bg-white/4 hover:bg-white/8 border border-white/8 text-white/60 hover:text-white text-[13px] font-medium px-5 py-2.5 rounded-full transition-colors"
          >
            Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
