import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";
import { getUsersList } from "@/lib/api/users";
import React from "react";

const AllUsersPage = async () => {
  const data = await getUsersList();
  const users = data.filter((user) => user.role !== "admin");
  return (
    <div className="flex flex-col gap-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#AAFF00] text-xs font-semibold mb-2 tracking-wider">
            ADMIN PORTAL
          </p>
          <h2 className="text-[22px] md:text-[30px] font-bold">All Users</h2>
          <p className="text-[13px] text-white/35 mt-1">
            {users.length} total users
          </p>
        </div>
      </div>
      <AdminUsersTable users={users} />
    </div>
  );
};

export default AllUsersPage;
