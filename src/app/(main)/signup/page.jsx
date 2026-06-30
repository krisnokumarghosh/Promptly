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
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { errorToast, successToast } from "@/lib/toasts";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const { data, error } = await authClient.signUp.email({
      ...formData,
      plan: "Free",
    });

    if (data) {
      successToast("Signup Successfull");
      setSigningUp(false);
      redirect("/signin");
    } else if (error) {
      errorToast(error.message);
      setSigningUp(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      role: "user",
      plan: "free",
    });
  };

  return (
    <div className="min-h-screen w-full pt-30 pb-20 px-4 md:px-10 flex items-center justify-center bg-[#0a0a0a]">
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl bg-[#a3e635]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl bg-[#65a30d]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden  md:flex  shadow-2xl bg-[#111111]">
        <div
          className=" flex flex-col justify-between md:w-5/12 p-10 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, #1a2a0a 0%, #0d1a06 40%, #0a0a0a 100%)",
          }}
        >
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

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-25 blur-3xl"
            style={{ background: "#a3e635" }}
          />

          <div className="relative z-10 flex items-center gap-2">
            <span className="text-[#95FF00] font-extrabold text-[18px] leading-none">
              <ImTerminal />
            </span>
            <span className="font-bold tracking-widest text-sm uppercase text-white">
              PROMPTLY
            </span>
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className=" text-2xl md:text-4xl font-extrabold leading-tight mt-5 md:mt-0 text-[#f0fdf4]">
              Your Prompts.
              <br />
              <span className="text-[#95FF00]">Your Power.</span>
              <br />
              Your Future.
            </h2>
            <p className="text-sm leading-relaxed text-[#6b7280]">
              Engineer high-precision AI prompts and take control of your neural
              workflow — only you own your creations.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1 text-[#f9fafb]">
              Create an Account
            </h1>
            <p className="text-sm text-[#6b7280]">
              Enter your details to join the Neural Marketplace
            </p>
          </div>

          <div className=" mb-6">
            <Button
              onClick={handleGoogleSignUp}
              className="w-full rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] transition-all duration-150 hover:opacity-80"
            >
              <FcGoogle /> Google
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "#1f1f1f" }} />
            <span className="text-xs" style={{ color: "#4b5563" }}>
              Or
            </span>
            <div className="flex-1 h-px" style={{ background: "#1f1f1f" }} />
          </div>

          <Form className="flex flex-col gap-4" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-4 my-3">
              <RadioGroup
                defaultValue="user"
                name="role"
                orientation="horizontal"
              >
                <Radio value="user">
                  <Radio.Content className="text-white">
                    <Radio.Control className="bg-[#95FF00]">
                      <Radio.Indicator />
                    </Radio.Control>
                    User
                  </Radio.Content>
                </Radio>
                <Radio value="creator">
                  <Radio.Content className="text-white">
                    <Radio.Control className="bg-[#95FF00]">
                      <Radio.Indicator />
                    </Radio.Control>
                    Creator
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            <TextField isRequired name="name" className="flex-1">
              <Label className="text-xs mb-1 block text-[#9ca3af]">
                Username
              </Label>
              <Input
                placeholder="john_doe"
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 bg-[#1a1a1a] border border-[#2a2a2a] focus:ring-[#95FF00] text-white"
              />
              <FieldError className="text-xs mt-1 text-red-400" />
            </TextField>

            <TextField isRequired name="image" className="flex-1">
              <Label className="text-xs mb-1 block text-[#9ca3af]">
                Image URL
              </Label>
              <Input
                placeholder="Enter Image Url"
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 bg-[#1a1a1a] border border-[#2a2a2a] focus:ring-[#95FF00] text-white"
              />
              <FieldError className="text-xs mt-1 text-red-400" />
            </TextField>

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
              <Description
                className="text-xs mt-1"
                style={{ color: "#4b5563" }}
              >
                <span className="flex items-center gap-1">
                  <span>○</span> Must have special symbols or uppercase
                </span>
                <span className="flex items-center gap-1">
                  <span>○</span> At least 8 characters with 1 number
                </span>
              </Description>
              <FieldError className="text-xs mt-1 text-red-400" />
            </TextField>

            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-sm mt-1 transition-all duration-150 hover:opacity-90 active:scale-95 bg-[#95FF00] text-black"
            >
              {signingUp ? "Signing Up..." : " Sign Up →"}
            </Button>
          </Form>

          <p className="text-xs text-center mt-3" style={{ color: "#4b5563" }}>
            Already have an account?{" "}
            <Link href="/signin" className="font-medium text-[#95FF00]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
