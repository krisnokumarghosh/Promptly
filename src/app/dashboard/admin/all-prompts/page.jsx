import AdminPromptsTable from "@/components/dashboard/admin/AdminPromptsTable";
import { getAllPromptsByQuery } from "@/lib/api/prompts";
import React from "react";

const AdminAllPromptPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params?.page || 1;
  const perPage = 10;
  const query = new URLSearchParams({ page, perPage }).toString();
  const { prompts, total } = await getAllPromptsByQuery(query);
  return <div className="flex flex-col gap-6 text-white">
      <div>
        <p className="text-[#AAFF00] text-xs font-semibold mb-2 tracking-wider">
          ADMIN PORTAL
        </p>
        <h2 className="text-[22px] md:text-[30px] font-bold">All Prompts</h2>
        <p className="text-[13px] text-white/35 mt-1">{total} total prompts</p>
      </div>

      <AdminPromptsTable
        prompts={prompts ?? []}
        total={total ?? 0}
        page={parseInt(page)}
        limit={perPage}
      />
    </div>;
};

export default AdminAllPromptPage;
