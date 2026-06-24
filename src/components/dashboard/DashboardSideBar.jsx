// components/dashboard/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { jetbrainsMono } from "@/lib/fonts";
import { FileText, Plus, Bars, House } from "@gravity-ui/icons";
import { Drawer, Button } from "@heroui/react";
import { ImTerminal } from "react-icons/im";

const NAV_ITEMS = [
  { label: "Home", href: "/dashboard/creator", icon: House },
  { label: "Add Prompt", href: "/dashboard/creator/add-prompt", icon: Plus },
  { label: "My Prompts", href: "/dashboard/creator/my-prompts", icon: FileText },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
              ${
                isActive
                  ? "bg-[#AAFF00]/8 text-[#94FD00]"
                  : "text-white/45 hover:bg-white/4 hover:text-white/80"
              }`}
          >
            {isActive && (
              <span className="absolute left-0 top-[20%] bottom-[20%] w-[2.5px] bg-[#AAFF00] rounded-full" />
            )}
            <Icon width={18} height={18} className="flex-none" />
            <span className="flex-1">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard({ user }) {
  return (
    <div className="flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-white/4 transition-colors cursor-pointer">
      <div className="w-8 h-8 rounded-2xl bg-[#AAFF00]/10 border border-[#AAFF00]/20 flex items-center justify-center flex-none">
        <span
          className={`${jetbrainsMono.className} text-[#94FD00] text-[13px] font-bold`}
        >
          {user?.name?.[0]?.toUpperCase() ?? "U"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12.5px] font-semibold text-white/80 truncate">
          {user?.name ?? "User"}
        </p>
        <p
          className={`${jetbrainsMono.className} text-[10px] text-white/28 uppercase tracking-[0.06em]`}
        >
          {user?.plan ?? "Free"}
        </p>
      </div>
    </div>
  );
}

export default function Sidebar({ user }) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-none h-screen sticky top-0 flex-col bg-[#080d08e3] border-r border-white/6">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-5.5 border-b border-white/5"
        >
          <span className="text-[#94FD00] font-extrabold text-[18px] leading-none">
            <ImTerminal />
          </span>
          <span
            className={`${jetbrainsMono.className} text-[#94FD00] font-bold text-[11px] tracking-[0.14em] uppercase`}
          >
            Promptly
          </span>
        </Link>

        <div className="flex-1 overflow-y-auto p-3">
          <NavLinks />
        </div>

        <div className="p-3 border-t border-white/5">
          <UserCard user={user} />
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className="md:hidden flex justify-between items-center h-10 border-b border-white/5 px-4 py-6">
        <Drawer>
          <Button className="bg-transparent ">
            <Bars className="text-[#94FD00]" />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog className="bg-white/6 backdrop-blur-xl border border-none  w-60 h-full flex flex-col p-0">
                <Drawer.CloseTrigger className="absolute top-4 right-4 bg-[#95FF00] text-black" />

                <Drawer.Header className="px-5 py-5.5 border-b border-white/5">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-[#94FD00] font-black text-[18px] leading-none">
                      <ImTerminal />
                    </span>
                    <span
                      className={`${jetbrainsMono.className} text-[#94FD00] font-bold text-[11px] tracking-[0.14em] uppercase`}
                    >
                      Promptly
                    </span>
                  </Link>
                </Drawer.Header>

                <Drawer.Body className="flex-1 overflow-y-auto p-3">
                  <NavLinks />
                </Drawer.Body>

                <div className="p-3 border-t border-white/5">
                  <UserCard user={user} />
                </div>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
        <div>
          <h3 className="text-white font-semibold">Dashboard</h3>
        </div>
        <div>

        </div>
      </div>
    </>
  );
}
