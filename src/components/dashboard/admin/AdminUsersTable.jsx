// components/dashboard/admin/AdminUsersTable.jsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { jetbrainsMono } from "@/lib/fonts";
import { TrashBin, ChevronDown } from "@gravity-ui/icons";
import { changeUserRole } from "@/lib/actions/users";
import { useRouter } from "next/navigation";
import UserDeleteAlert from "./UserDeleteAlert";
import { errorToast, successToast } from "@/lib/toasts";

const ROLE_STYLES = {
  user: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  creator: "bg-[#AAFF00]/10 text-[#AAFF00] border border-[#AAFF00]/20",
  admin: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

const ROLES = ["user", "creator", "admin"];

function RoleDropdown({ userId, currentRole }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRoleChange = async (role) => {
    try {
      const data = {
        role: role,
      };
      const changeRole = await changeUserRole(userId, data);
      if (changeRole.modifiedCount > 0) {
        successToast("Role Changed");
      } else {
        errorToast("nothing changed");
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`${jetbrainsMono.className} flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-md capitalize transition-all ${ROLE_STYLES[currentRole]}`}
      >
        {currentRole}
        <ChevronDown width={11} height={11} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div onClick={() => setOpen(false)} />
          {/* Dropdown */}
          <div className="absolute left-0 top-full mt-1.5 z-20 bg-[#0d120d] border border-white/10 rounded-[10px] overflow-hidden min-w-27.5 shadow-xl">
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-[11px] font-semibold capitalize transition-colors hover:bg-white/4 ${
                  currentRole === role ? "text-[#AAFF00]" : "text-white/50"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    role === "user"
                      ? "bg-blue-400"
                      : role === "creator"
                        ? "bg-[#AAFF00]"
                        : "bg-purple-400"
                  }`}
                />
                {role}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const thClass = `${jetbrainsMono.className} text-left text-[10px] font-bold text-white/25 tracking-[0.12em] uppercase px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]`;
const tdClass = "px-4 py-3";

export default function AdminUsersTable({ users = [] }) {
  return (
    <div className="w-full overflow-x-auto overflow-y-auto rounded-[14px] border border-white/[0.07] bg-[#0d120d]">
      <table className="w-full min-w-175 border-collapse">
        {/* Head */}
        <thead>
          <tr>
            <th className={thClass}>User</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Role</th>
            <th className={thClass}>Plan</th>
            <th className={thClass}>Joined</th>
            <th className={thClass}>Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center py-16 text-white/25 text-[13px]"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-white/4 hover:bg-white/2 transition-colors"
              >
                {/* User */}
                <td className={tdClass}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-2xl overflow-hidden flex-none border border-white/8">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`${jetbrainsMono.className} w-full h-full bg-[#AAFF00]/10 flex items-center justify-center text-[#AAFF00] text-[13px] font-bold`}
                        >
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-[13px] font-medium text-white/80">
                      {user.name}
                    </span>
                  </div>
                </td>

                {/* Email */}
                <td className={tdClass}>
                  <span className="text-[12px] text-white/40">
                    {user.email}
                  </span>
                </td>

                {/* Role */}
                <td className={tdClass}>
                  <RoleDropdown userId={user._id} currentRole={user.role} />
                </td>

                {/* Plan */}
                <td className={tdClass}>
                  <span
                    className={`${jetbrainsMono.className} text-[10px] font-bold px-2 py-1 rounded-full ${
                      user.plan === "Pro"
                        ? "bg-[#AAFF00]/10 text-[#AAFF00]"
                        : "bg-white/5 text-white/35"
                    }`}
                  >
                    {user.plan ?? "Free"}
                  </span>
                </td>

                {/* Joined */}
                <td className={tdClass}>
                  <span
                    className={`${jetbrainsMono.className} text-[11px] text-white/30`}
                  >
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className={tdClass}>
                 <UserDeleteAlert user={user}/>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
