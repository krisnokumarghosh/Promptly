import AllPaymentsTable from "@/components/dashboard/admin/AllPaymentsTable";
import { getAllPaymets } from "@/lib/api/payments";

const AllPaymentsPage = async () => {
  const payments = await getAllPaymets();

  return (
    <div className="flex flex-col gap-6 text-white">
      <div>
        <p className="text-[#AAFF00] text-xs font-semibold mb-2 tracking-wider">
          ADMIN PORTAL
        </p>
        <h2 className="text-[22px] md:text-[30px] font-bold">All Payments</h2>
        <p className="text-[13px] text-white/35 mt-1">
          {payments.length} total transactions
        </p>
      </div>
      <AllPaymentsTable payments={payments} />
    </div>
  );
};

export default AllPaymentsPage;