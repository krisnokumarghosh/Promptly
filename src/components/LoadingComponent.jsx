"use client";

import { Spinner } from "@heroui/react";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="w-full h-[80vh] min-h-100  flex flex-col justify-center items-center font-sans select-none relative overflow-hidden rounded-xl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#7bf10a]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center gap-6 z-10">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full border border-[#7bf10a]/20 animate-ping duration-1000" />

          <Spinner size="lg" className="text-[#7bf10a]" />
        </div>

        {/* Cyberpunk Style Loading Text */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#7bf10a] animate-pulse">
            Establishing Link...
          </p>
          <span className="text-[10px] font-mono tracking-[0.15em] text-zinc-600 uppercase">
            Syncing data matrix
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
