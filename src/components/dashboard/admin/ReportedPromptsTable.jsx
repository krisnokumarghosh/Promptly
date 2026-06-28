// components/dashboard/admin/ReportedPromptsTable.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { jetbrainsMono } from "@/lib/fonts";
import { TrashBin, Bell, Check } from "@gravity-ui/icons";
import { successToast, errorToast } from "@/lib/toasts";
import { dismissOrRemoveReport } from "@/lib/actions/reports";
import { useRouter } from "next/navigation";
import { updatePrompt } from "@/lib/actions/prompts";

const CATEGORY_STYLES = {
  Spam: "bg-red-500/10 text-red-400 border border-red-500/20",
  Irrelevant: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Harmful: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  Misleading: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Other: "bg-white/[0.05] text-white/40 border border-white/[0.1]",
};

const thClass = `${jetbrainsMono.className} text-left text-[10px] font-bold text-white/25 tracking-[0.12em] uppercase px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]`;
const tdClass = "px-4 py-3.5";

export default function ReportedPromptsTable({ reports = [] }) {
  const router = useRouter();
  const handleRemovePrompt = async (promptId, reportId) => {
    try {
      const data = {
        promptId: promptId,
      };
      const remove = await dismissOrRemoveReport(reportId, data);
      if (remove) {
        successToast("Prompt removed successfully");
      }
      router.refresh();
    } catch {
      errorToast("Failed to remove prompt");
    }
  };

  const handleWarnCreator = async (promptId, reportCategory) => {
    try {
      console.log(promptId, reportCategory);
      const data = {
        warning: reportCategory,
      };
      const warn = await updatePrompt(promptId, data);
      if (warn.modifiedCount > 0) {
        successToast(`Warning sent to creator`);
      } else {
        errorToast("Nothing Changed");
      }
      router.refresh();
    } catch {
      errorToast("Failed to send warning");
    }
  };

  const handleDismiss = async (reportId) => {
    try {
      const dismiss = await dismissOrRemoveReport(reportId);
      if (dismiss) {
        successToast("Report dismissed");
      }
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-[14px] border border-white/[0.07] bg-[#0d120d]">
      <table className="w-full min-w-225 border-collapse">
        {/* Head */}
        <thead>
          <tr>
            <th className={thClass}>Prompt</th>
            <th className={thClass}>Report Category</th>
            <th className={thClass}>Description</th>
            <th className={thClass}>Reported By</th>
            <th className={thClass}>Date</th>
            <th className={thClass}>Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-20">
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-[14px] bg-[#AAFF00]/6 border border-[#AAFF00]/15 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#AAFF00"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.5"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <p className="text-[14px] font-semibold text-white/50 mb-1">
                      No reports found
                    </p>
                    <p
                      className={`${jetbrainsMono.className} text-[11px] text-white/20 tracking-[0.06em]`}
                    >
                      All prompts are clean — no violations reported
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr
                key={report._id}
                className="border-b border-white/4 hover:bg-white/2 transition-colors"
              >
                {/* Prompt */}
                <td className={tdClass}>
                  {report.prompt ? (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl overflow-hidden flex-none border border-white/6">
                        <Image
                          src={report.prompt.thumbnail}
                          alt={report.prompt.title}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/all-prompts/${report.promptId}`}
                          className="text-[13px] font-semibold text-white hover:text-[#AAFF00] transition-colors truncate max-w-37.5 block"
                        >
                          {report.prompt.title}
                        </Link>
                        <p
                          className={`${jetbrainsMono.className} text-[10px] text-white/30 truncate max-w-37.5`}
                        >
                          by {report.prompt.userName}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[12px] text-white/25 italic">
                      Prompt deleted
                    </span>
                  )}
                </td>

                {/* Report Category */}
                <td className={tdClass}>
                  <span
                    className={`${jetbrainsMono.className} text-[10px] font-bold px-2.5 py-1 rounded-md ${CATEGORY_STYLES[report.category] ?? CATEGORY_STYLES.Other}`}
                  >
                    {report.category}
                  </span>
                </td>

                {/* Description */}
                <td className={tdClass}>
                  <p className="text-[12px] text-white/45 max-w-50 line-clamp-2 leading-[1.6]">
                    {report.description}
                  </p>
                </td>

                {/* Reported By */}
                <td className={tdClass}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#AAFF00]/10 border border-[#AAFF00]/15 flex items-center justify-center flex-none">
                      <span
                        className={`${jetbrainsMono.className} text-[#AAFF00] text-[9px] font-bold`}
                      >
                        {report.reportedBy?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[12px] text-white/50 truncate max-w-25">
                      {report.reportedBy}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className={tdClass}>
                  <span
                    className={`${jetbrainsMono.className} text-[11px] text-white/30`}
                  >
                    {new Date(report.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </td>

                {/* Actions */}
                <td className={tdClass}>
                  <div className="flex items-center gap-2">
                    {/* Remove Prompt */}
                    <button
                      onClick={() =>
                        handleRemovePrompt(report.promptId, report._id)
                      }
                      title="Remove Prompt"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium text-red-400/60 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 transition-all whitespace-nowrap"
                    >
                      <TrashBin width={12} height={12} />
                      Remove
                    </button>

                    {/* Warn Creator */}
                    <button
                      onClick={() =>
                        handleWarnCreator(report.promptId, report.category)
                      }
                      title="Warn Creator"
                      className=" px-2.5 py-1.5 rounded-full text-[11px] font-medium text-yellow-400/60 hover:text-yellow-400 bg-yellow-500/5 hover:bg-yellow-500/10 border border-yellow-500/20 transition-all whitespace-nowrap"
                    >
                      {" "}
                      {report.prompt.warning ? (
                        <span className="flex items-center gap-1.5">
                          <Check width={12} height={12} />
                          Warned
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Bell width={12} height={12} />
                          Warn
                        </span>
                      )}
                    </button>

                    {/* Dismiss */}
                    <button
                      onClick={() => handleDismiss(report._id)}
                      title="Dismiss - Not Harmful"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-medium text-[#AAFF00]/60 hover:text-[#AAFF00] bg-[#AAFF00]/5 hover:bg-[#AAFF00]/10 border border-[#AAFF00]/20 transition-all whitespace-nowrap"
                    >
                      <Check width={12} height={12} />
                      Dismiss
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
