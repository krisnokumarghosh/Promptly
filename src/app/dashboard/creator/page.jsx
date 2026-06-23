import CreatorSummaryCards from "@/components/dashboard/creator/CreatorSummaryCards";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const Creatorpage = async () => {
  const user = await getUserSession();
  return (
    <div className="text-white">
      <div>
        <p className="text-[#94FD00] text-xs md:text-sm font-semibold mb-3">
          CREATOR PORTAL
        </p>
        <h2 className="text-[26px] md:text-[48px] font-semibold">
          Welcome back,
          <span className="text-[#94FD00] ml-2">{user?.name}</span>{" "}
        </h2>
      </div>
      <CreatorSummaryCards user={user}/>
    </div>
  );
};

export default Creatorpage;
