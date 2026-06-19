// components/Footer.jsx
import Link from "next/link";
import { jetbrainsMono } from "@/lib/fonts";
import { LogoGithub, LogoLinkedin } from "@gravity-ui/icons";
import { RiDiscordLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { ImTerminal } from "react-icons/im";

const LINKS = {
  Product: [
    { label: "Explore Prompts", href: "/explore" },
    { label: "Marketplace", href: "/market" },
    { label: "API Access", href: "/api" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "/status" },
    { label: "Community", href: "/community" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Licenses", href: "/licenses" },
  ],
};

const SOCIALS = [
  { icon: <FaXTwitter />, href: "https://x.com" },
  { icon: <LogoGithub />, href: "https://github.com" },
  { icon: <RiDiscordLine />, href: "https://discord.com" },
  { icon: <LogoLinkedin />, href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080d08] border-t border-white/6 px-6 pt-16 pb-8 ">
      <div className="max-w-225 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-[#AAFF00] font-extrabold text-[20px] leading-none">
                <ImTerminal />
              </span>
              <span className="text-[#AAFF00] font-bold text-[12px] tracking-[0.14em] uppercase">
                Promptly
              </span>
            </Link>
            <p className="text-[12px] text-white/35 leading-[1.7] max-w-45">
              The world&apos;s most advanced neural prompt marketplace.
            </p>

            <div className="flex items-center gap-2.5 mt-6">
              {SOCIALS.map(({ icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="w-8 h-8 bg-white/4 hover:bg-[#AAFF00]/10 border border-white/8 hover:border-[#AAFF00]/25 rounded-2xl flex items-center justify-center text-white/40 hover:text-[#AAFF00] transition-all duration-200"
                >
                  <p>{icon}</p>
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p
                className={`${jetbrainsMono.className} text-[10px] font-bold text-white/25 tracking-[0.14em] uppercase mb-4`}
              >
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label }) => (
                  <li key={label}>
                    <p className="text-[13px] text-white/45 hover:text-white transition-colors duration-150">
                      {label}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/6 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className={`${jetbrainsMono.className} text-[10px] text-white/20 tracking-[0.08em]`}
          >
            © {new Date().getFullYear()} PROMPTLY — ALL RIGHTS RESERVED
          </p>

          <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
            <span
              className={`${jetbrainsMono.className} text-[10px] text-white/35 tracking-[0.08em]`}
            >
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
