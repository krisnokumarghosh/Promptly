"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ href, children, className }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${isActive ? " text-[#95FF00] md:border-b md:border-[#95FF00] font-semibold" : "text-white/70 hover:text-white  font-normal"} ${className}`}
    >
      {children}
    </Link>
  );
};

export default Navlink;
