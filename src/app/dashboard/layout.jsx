import DashboardSideBar from "@/components/dashboard/DashboardSideBar";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const DashBoardLayout = async ({ children }) => {
    const user = await getUserSession()
  return (
    <div className="md:flex min-h-screen bg-[#080d08e3]">
      <DashboardSideBar user={user}/>
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
