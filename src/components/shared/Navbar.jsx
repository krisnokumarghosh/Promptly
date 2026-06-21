"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars, FolderCode, Magnifier } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { jetbrainsMono } from "@/lib/fonts";
import { ImTerminal } from "react-icons/im";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Navlink from "./Navlink";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "All-Prompts", href: "/all-prompts" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const dashboardLinks = {
    creator: "/dashboard/creator",
    user: "/dashboard/user",
    admin: "/dashboard/admin",
  };

  const handleLogOut = async () => {
    await authClient.signOut();
    redirect("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between gap-8 px-6 h-14 w-full max-w-215 bg-white/6 backdrop-blur-xl border border-white/12 rounded-full mt-5">
        <Link href="/" className="flex items-center gap-2 flex-none">
          <span className="text-[#95FF00] font-extrabold text-[18px] leading-none">
            <ImTerminal />
          </span>
          <span
            className={`${jetbrainsMono.className} text-[#95FF00] font-bold text-[13px] tracking-[0.14em] uppercase`}
          >
            Promptly
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {NAV_LINKS.map(({ label, href }) => {
            return (
              <Navlink
                key={href}
                href={href}
                className="text-[13px] px-3 py-1.5  transition-all duration-150"
              >
                {label}
              </Navlink>
            );
          })}
        </div>

        <div>
          <div className="md:hidden">
            <Drawer>
              <Button className="bg-transparent">
                <Bars className="text-[#95FF00]" />
              </Button>
              <Drawer.Backdrop>
                <Drawer.Content placement="left">
                  <Drawer.Dialog className="bg-white/6 backdrop-blur-xl border border-none w-50">
                    <Drawer.CloseTrigger className="bg-[#95FF00] text-black" />

                    <Drawer.Body>
                      <nav className="flex flex-col gap-3 h-full justify-between">
                        <div className="flex flex-col gap-3">
                          {NAV_LINKS.map(({ label, href }) => {
                            const isActive = activeLink === label;
                            return (
                              <Link
                                key={label}
                                href={href}
                                onClick={() => setActiveLink(label)}
                                className={[
                                  "text-[13px] px-3 py-1.5  transition-all duration-150 w-25",
                                  isActive
                                    ? "text-[#95FF00]  font-semibold"
                                    : "text-white/70 hover:text-white  font-normal",
                                ].join(" ")}
                              >
                                {label}
                              </Link>
                            );
                          })}
                        </div>

                        {isPending ? (
                          <span className="text-[14px] text-[#95FF00] font-semibold mr-3">
                            Loading...
                          </span>
                        ) : user ? (
                          <div className="flex flex-col gap-3 ">
                            <Button
                              onClick={handleLogOut}
                              variant="outline"
                              className="text-[#95FF00]  border-[#95FF00] h-8 w-full"
                            >
                              Logout
                            </Button>

                            <Link href={dashboardLinks[user?.role || "user"]}>
                              <Button className="bg-[#95FF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold  tracking-wide h-8 rounded-full w-full  transition-colors">
                                Dashboard
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3 ">
                            <Link href={"/signin"}>
                              <Button
                                variant="outline"
                                className="text-[#95FF00]  border-[#95FF00] h-8 w-full"
                              >
                                Login
                              </Button>
                            </Link>
                            <Link href="/signup">
                              <Button className="bg-[#95FF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold  tracking-wide h-8 rounded-full w-full  transition-colors">
                                Register
                              </Button>
                            </Link>
                          </div>
                        )}
                      </nav>
                    </Drawer.Body>
                  </Drawer.Dialog>
                </Drawer.Content>
              </Drawer.Backdrop>
            </Drawer>
          </div>
          <div className="hidden md:flex  ">
            {isPending ? (
              <span className="text-[14px] text-[#95FF00] font-semibold mr-3">
                Loading...
              </span>
            ) : user ? (
              <div className="flex items-center gap-2.5">
                <Button
                  onClick={handleLogOut}
                  className="text-[#95FF00]  bg-transparent"
                >
                  Logout
                </Button>

                <Link href={dashboardLinks[user?.role || "user"]}>
                  <Button className="bg-[#95FF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold  tracking-wide  rounded-full  transition-colors">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href={"/signin"}>
                  <Button className="text-[#95FF00]  bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-[#95FF00] hover:bg-[#BFFF33] text-[#0a0a0a] font-bold  tracking-wide  rounded-full  transition-colors">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
