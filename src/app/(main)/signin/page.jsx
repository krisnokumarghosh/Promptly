"use client";

import { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Description,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { ImTerminal } from "react-icons/im";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { TypeAnimation } from "react-type-animation";
import { jetbrainsMono } from "@/lib/fonts";

const TERMINAL_LINES = [
  { label: "Memory Layer:", value: "ACTIVE" },
  { label: "Creativity Engine:", value: "ONLINE" },
  { label: "Prompt Network:", value: "CONNECTED" },
];

export default function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);
  }

  return (
    <div
      className="min-h-screen w-full pt-30 pb-20 px-4 md:px-10 flex items-center justify-center "
      style={{ background: "#0a0a0a" }}
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "#a3e635" }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "#65a30d" }}
        />
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden  md:flex  shadow-2xl"
        style={{ background: "#111111", border: "1px solid #1f1f1f" }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          className=" flex flex-col gap-10 justify-between md:w-5/12 p-10 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, #1a2a0a 0%, #0d1a06 40%, #0a0a0a 100%)",
          }}
        >
          {/* Crosshatch grid */}
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#a3e635"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Lime glow orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-25 blur-3xl"
            style={{ background: "#a3e635" }}
          />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-[#95FF00] font-extrabold text-[18px] leading-none">
              <ImTerminal />
            </span>
            <span className="font-bold tracking-widest text-sm uppercase text-white">
              PROMPTLY
            </span>
          </div>

          {/* Hero copy */}
          <div className="relative z-10 space-y-4">
            <h2
              className=" text-2xl md:text-4xl font-extrabold leading-tight mt-5 md:mt-0"
              style={{ color: "#f0fdf4" }}
            >
              Your Prompts.
              <br />
              <span className="text-[#95FF00]">Still Here.</span>
              <br />
              Wating.
            </h2>
            <p className="text-sm leading-relaxed text-[#6b7280]">
              Pick up where you left off and unlock your AI-powered workflow.
            </p>
          </div>

          <div className=" flex items-center justify-center ">
            <div className="relative z-10 w-full h-65 bg-[#111711] border border-white/8 rounded-[14px] overflow-hidden">
              <div className="flex items-center gap-1.75 px-4 py-3.5 border-b border-white/6 bg-white/2">
                <span className="w-2.75 h-2.75 rounded-full bg-[#ff5f57]" />
                <span className="w-2.75 h-2.75 rounded-full bg-[#febc2e]" />
                <span className="w-2.75 h-2.75 rounded-full bg-[#28c840]" />
              </div>

              <div
                className={`${jetbrainsMono.className} px-5 py-5 text-[12px] leading-[1.8]`}
              >
                <p className="text-[#AAFF00]/35 text-[10px] tracking-widest mb-3">
                  {" > INITIALIZING HUMAN x AI INTERFACE"}
                </p>

                {TERMINAL_LINES.map(({ label, value }) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-white/45">{label}</span>
                    <span className="text-white/70">{value}</span>
                  </div>
                ))}

                <p className="text-[#AAFF00] font-bold mt-4">
                  <span className="mr-2">{">"}</span>
                  <TypeAnimation
                    sequence={[
                      " BEGIN CREATING AND EXPLORING",
                      2000, // full text দেখাবে 2s
                      "", // erase
                      800, // pause
                    ]}
                    speed={55}
                    repeat={Infinity}
                    cursor={true}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-[#f9fafb]">Sign In</h1>
            <p className="text-sm text-[#6b7280]">
              Enter your credentials to access your workspace
            </p>
          </div>

          {/* OAuth buttons */}
          <div className=" mb-6">
            <Button className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] transition-all duration-150 hover:opacity-80">
              <FcGoogle /> Google
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "#1f1f1f" }} />
            <span className="text-xs" style={{ color: "#4b5563" }}>
              Or
            </span>
            <div className="flex-1 h-px" style={{ background: "#1f1f1f" }} />
          </div>

          {/* Form */}
          <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex-1"
              validate={(v) =>
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v)
                  ? "Enter a valid email"
                  : null
              }
            >
              <Label className="text-xs mb-1 block text-[#9ca3af]">Email</Label>
              <Input
                placeholder="john@example.com"
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 bg-[#1a1a1a] border border-[#2a2a2a] focus:ring-[#95FF00] text-white"
              />
              <FieldError className="text-xs mt-1 text-red-400" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              minLength={8}
              name="password"
              type={showPassword ? "text" : "password"}
              validate={(v) => {
                if (v.length < 8) return "At least 8 characters";
                if (!/[A-Z]/.test(v)) return "Include one uppercase letter";
                if (!/[0-9]/.test(v)) return "Include one number";
                return null;
              }}
            >
              <Label className="text-xs mb-1 block text-[#9ca3af]">
                Password
              </Label>
              <div className="relative">
                <Input
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 bg-[#1a1a1a] border border-[#2a2a2a] focus:ring-[#95FF00] text-white"
                />
                <Button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent text-[#4b5563]"
                  onClick={() => setShowPassword((p) => !p)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </div>

              <FieldError className="text-xs mt-1 text-red-400" />
            </TextField>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-sm mt-1 transition-all duration-150 hover:opacity-90 active:scale-95 bg-[#95FF00] text-black"
            >
              Sign In →
            </Button>
          </Form>

          {/* Footer */}

          <p className="text-xs text-center mt-3" style={{ color: "#4b5563" }}>
            Already have an account?{" "}
            <Link href="/signup" className="font-medium text-[#95FF00]">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
