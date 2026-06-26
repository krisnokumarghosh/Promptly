"use client";

import { ArrowLeft, House } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between items-center font-sans px-4 select-none relative overflow-hidden">
      {/* Top spacing to push content down slightly like the image */}
      <div className="h-12"></div>

      {/* Main Content Container */}
      <div className="flex flex-col items-center max-w-xl text-center z-10">
        {/* 404 Header with glitch/layered text effect */}
        <h1
          className="text-[80px] md:text-[150px] font-black leading-none tracking-tighter text-[#7bf10a] mb-8"
          style={{
            textShadow:
              "4px 4px 0px rgba(123, 241, 10, 0.3), -2px -2px 0px rgba(255, 255, 255, 0.1)",
          }}
        >
          404
        </h1>

        {/* Error Title */}
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] mb-4 text-gray-100">
          Neural Link Severed
        </h2>

        {/* Error Description */}
        <p className="text-sm sm:text-base text-gray-400 tracking-wide leading-relaxed mb-10 max-w-md">
          Oops! The page you&apos;re looking for doesnt exist or has been moved.
          Even the best systems need a check-up sometimes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          {/* Primary Action */}
          <Link href={"/"}>
            <Button className="bg-[#7bf10a] text-black font-semibold px-6 py-6 rounded-full hover:opacity-90 shadow-[0_0_20px_rgba(123,241,10,0.4)] transition-all flex items-center gap-2 text-sm w-full sm:w-auto">
              <House className="w-4 h-4 text-black" />
              Return to Home
            </Button>
          </Link>

          {/* Secondary Action */}
          <Button
            variant="bordered"
            onClick={handleGoBack}
            className="border border-gray-800 text-gray-300 font-medium px-6 py-6 rounded-full hover:bg-zinc-900 transition-all flex items-center gap-2 text-sm w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
            Previous Step
          </Button>
        </div>
      </div>

      {/* Cyberpunk System Footer */}
      <div className="w-full max-w-5xl border-t border-zinc-900/50 py-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] uppercase font-mono tracking-[0.2em] text-[#555555]">
        <div>
          ERROR_CODE: <span className="text-gray-500">0X88404</span>
        </div>
        <div>
          LATENCY: <span className="text-gray-500">0MS</span>
        </div>
        <div>
          REGION: <span className="text-gray-500">EDGE_SERVER_PRIMARY</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
