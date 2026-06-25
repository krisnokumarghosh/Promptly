import AdminSummaryCards from "@/components/dashboard/admin/AdminSummaryCards";
import { getAllPrompts } from "@/lib/api/prompts";
import { getUsersList } from "@/lib/api/users";
import React from "react";

const AdminAnalyticsPage = async () => {
  const data = await getUsersList();
  const users = data.filter((user) => user.role !== "admin")

  const allPrompts = await getAllPrompts();

  return (
    <div className="text-white flex flex-col gap-6">
      <div>
        <p className="text-[#AAFF00] text-xs font-semibold mb-2 tracking-wider">
          ADMIN PORTAL
        </p>
        <h2 className="text-[26px] md:text-[36px] font-bold">
          Platform Overview
        </h2>
      </div>
      <AdminSummaryCards users={users} prompts={allPrompts} />
    </div>
  );
};

export default AdminAnalyticsPage;
