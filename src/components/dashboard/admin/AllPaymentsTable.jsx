// components/dashboard/admin/AllPaymentsTable.jsx
import { jetbrainsMono } from "@/lib/fonts";

const thClass = `${jetbrainsMono.className} text-left text-[10px] font-bold text-white/25 tracking-[0.12em] uppercase px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]`;
const tdClass = "px-4 py-3.5";

const CARD_ICONS = {
  visa:       "💳",
  mastercard: "💳",
  amex:       "💳",
};

export default function AllPaymentsTable({ payments = [] }) {
  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount ?? 0), 0);

  return (
    <div className="flex flex-col gap-4">

      {/* Total Revenue card */}
      <div className="inline-flex items-center gap-4 bg-[#0d120d] border border-white/[0.07] rounded-[14px] px-6 py-4 self-start">
        <div>
          <p className={`${jetbrainsMono.className} text-[10px] text-white/25 tracking-[0.12em] uppercase mb-1`}>
            Total Revenue
          </p>
          <p className={`${jetbrainsMono.className} text-[28px] font-bold text-[#AAFF00]`}>
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="h-10 w-px bg-white/[0.06]" />
        <div>
          <p className={`${jetbrainsMono.className} text-[10px] text-white/25 tracking-[0.12em] uppercase mb-1`}>
            Transactions
          </p>
          <p className={`${jetbrainsMono.className} text-[28px] font-bold text-white`}>
            {payments.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-[14px] border border-white/[0.07] bg-[#0d120d]">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr>
              <th className={thClass}>User</th>
              <th className={thClass}>Card</th>
              <th className={thClass}>Plan</th>
              <th className={thClass}>Amount</th>
              <th className={thClass}>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <p className="text-white/25 text-[13px]">No payments yet.</p>
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  {/* User */}
                  <td className={tdClass}>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[13px] font-semibold text-white/80">
                        {payment.userName}
                      </p>
                      <p className="text-[11px] text-white/30">
                        {payment.userEmail}
                      </p>
                    </div>
                  </td>

                  {/* Card */}
                  <td className={tdClass}>
                    <div className="flex items-center gap-2">
                      <span className={`${jetbrainsMono.className} text-[11px] font-bold px-2 py-1 rounded-md bg-white/[0.05] text-white/50 capitalize`}>
                        {payment.cardBrand}
                      </span>
                      <span className={`${jetbrainsMono.className} text-[12px] text-white/40`}>
                        •••• {payment.cardLast4}
                      </span>
                    </div>
                  </td>

                  {/* Plan */}
                  <td className={tdClass}>
                    <span className={`${jetbrainsMono.className} text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#AAFF00]/10 text-[#AAFF00] border border-[#AAFF00]/20`}>
                      {payment.plan}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className={tdClass}>
                    <span className={`${jetbrainsMono.className} text-[14px] font-bold text-[#AAFF00]`}>
                      ${payment.amount.toFixed(2)}
                      <span className="text-[10px] text-white/25 ml-1">
                        {payment.currency}
                      </span>
                    </span>
                  </td>

                  {/* Date */}
                  <td className={tdClass}>
                    <span className={`${jetbrainsMono.className} text-[11px] text-white/30`}>
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}