"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { jetbrainsMono } from "@/lib/fonts";
import { Button, Pagination as HeroPagination } from "@heroui/react";
import AdminPromptDeleteAlert from "./AdminPromptDeleteAlert";
import { updatePrompt } from "@/lib/actions/prompts";
import { errorToast, successToast } from "@/lib/toasts";
import { addFeature } from "@/lib/actions/features";

const STATUS_STYLES = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  approved: "bg-[#AAFF00]/10 text-[#AAFF00] border border-[#AAFF00]/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const DIFFICULTY_STYLES = {
  Beginner: "bg-[#AAFF00]/10 text-[#AAFF00]",
  Intermediate: "bg-blue-500/10 text-blue-400",
  Pro: "bg-purple-500/10 text-purple-400",
};

const thClass = `${jetbrainsMono.className} text-left text-[10px] font-bold text-white/25 tracking-[0.12em] uppercase px-4 py-3 bg-white/[0.02] border-b border-white/[0.06]`;
const tdClass = "px-4 py-3";

export default function AdminPromptsTable({
  prompts = [],
  total = 0,
  page = 1,
  limit = 10,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (p) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", p);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApprove = async (prompt) => {
    try {
      const promptId = prompt._id;
      const data = {
        status: "approved",
      };
      const update = await updatePrompt(promptId, data);
      if (update.modifiedCount > 0) {
        successToast("Approved");
      } else {
        errorToast("nothing changed");
      }
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  const hanldeFeature = async (prompt) => {
    try {
      const data = {
        ...prompt,
      };
      const add = await addFeature(data);
      successToast("Prompt Featured");
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  const handleReject = async (prompt) => {
    try {
      const promptId = prompt._id;
      const data = {
        status: "rejected",
      };
      const update = await updatePrompt(promptId, data);
      if (update.modifiedCount > 0) {
        successToast("Rejected");
      } else {
        errorToast("nothing changed");
      }
      router.refresh();
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-0 rounded-[14px] border border-white/[0.07] bg-[#0d120d] overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-200 border-collapse">
          <thead>
            <tr>
              <th className={thClass}>Prompt</th>
              <th className={thClass}>Category</th>
              <th className={thClass}>AI Tool</th>
              <th className={thClass}>Difficulty</th>
              <th className={thClass}>Status</th>
              <th className={thClass}>Copies</th>
              <th className={thClass}>Date</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prompts.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-16 text-white/25 text-[13px]"
                >
                  No prompts found.
                </td>
              </tr>
            ) : (
              prompts.map((prompt) => (
                <tr
                  key={prompt._id}
                  className="border-b border-white/4 hover:bg-white/2 transition-colors"
                >
                  <td className={tdClass}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl overflow-hidden flex-none border border-white/6">
                        <Image
                          src={prompt.thumbnail}
                          alt={prompt.title}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-white truncate max-w-40">
                          {prompt.title}
                        </p>
                        <p className="text-[11px] text-white/30 truncate max-w-40">
                          {prompt.userName}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className={tdClass}>
                    <span className="text-[12px] text-white/45">
                      {prompt.category}
                    </span>
                  </td>

                  <td className={tdClass}>
                    <span
                      className={`${jetbrainsMono.className} text-[11px] text-white/50`}
                    >
                      {prompt.aiTool}
                    </span>
                  </td>

                  <td className={tdClass}>
                    <span
                      className={`${jetbrainsMono.className} text-[10px] font-bold px-2 py-1 rounded-md ${DIFFICULTY_STYLES[prompt.difficulty] ?? "text-white/40"}`}
                    >
                      {prompt.difficulty}
                    </span>
                  </td>

                  <td className={tdClass}>
                    <span
                      className={`${jetbrainsMono.className} text-[10px] font-bold px-2.5 py-1 rounded-md border capitalize ${STATUS_STYLES[prompt.status] ?? "text-white/40"}`}
                    >
                      {prompt.status}
                    </span>
                  </td>

                  <td className={tdClass}>
                    <span
                      className={`${jetbrainsMono.className} text-[13px] font-bold text-white/55`}
                    >
                      {prompt.copyCount ?? 0}
                    </span>
                  </td>

                  <td className={tdClass}>
                    <span
                      className={`${jetbrainsMono.className} text-[11px] text-white/30`}
                    >
                      {new Date(prompt.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>

                  <td className={tdClass}>
                    <div>
                      {prompt.status === "pending" ||
                      prompt.status === "rejected" ? (
                        <div className="flex items-center gap-2">
                          {prompt.feature ? (
                            <Button className="bg-purple-500/10 text-purple-400">
                              Featured
                            </Button>
                          ) : (
                            <Button
                              onClick={() => hanldeFeature(prompt)}
                              className="bg-blue-500/10 text-blue-400 font-semibold"
                            >
                              Feature
                            </Button>
                          )}
                          <Button
                            onClick={() => handleApprove(prompt)}
                            className="bg-green-500/6 hover:bg-green-500/12 border border-green-500/20 text-green-400/60 hover:text-green-400 transition-all"
                          >
                            Approve
                          </Button>
                          <AdminPromptDeleteAlert prompt={prompt} />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {prompt.feature ? (
                            <Button className="bg-purple-500/10 text-purple-400">
                              Featured
                            </Button>
                          ) : (
                            <Button
                              onClick={() => hanldeFeature(prompt)}
                              className="bg-blue-500/10 text-blue-400"
                            >
                              Feature
                            </Button>
                          )}
                          <Button
                            onClick={() => handleReject(prompt)}
                            className="bg-yellow-500/6 hover:bg-yellow-500/12 border border-yellow-500/20 text-yellow-400/60 hover:text-yellow-400 transition-all"
                          >
                            Reject
                          </Button>
                          <AdminPromptDeleteAlert prompt={prompt} />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
          <span
            className={`${jetbrainsMono.className} text-[11px] text-white/25`}
          >
            {start}-{end} of {total} prompts
          </span>

          <HeroPagination size="sm">
            <HeroPagination.Content>
              <HeroPagination.Item>
                <HeroPagination.Previous
                  isDisabled={page === 1}
                  onPress={() => goToPage(page - 1)}
                  className="text-white/40 hover:text-white disabled:opacity-20 text-[12px]"
                >
                  <HeroPagination.PreviousIcon />
                  Prev
                </HeroPagination.Previous>
              </HeroPagination.Item>

              {pages.map((p) => (
                <HeroPagination.Item key={p}>
                  <HeroPagination.Link
                    isActive={p === page}
                    onPress={() => goToPage(p)}
                    className={`${jetbrainsMono.className} text-[11px] w-8 h-8 rounded-2xl transition-all ${
                      p === page
                        ? "bg-[#AAFF00] text-[#0a0a0a] font-bold"
                        : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {p}
                  </HeroPagination.Link>
                </HeroPagination.Item>
              ))}

              <HeroPagination.Item>
                <HeroPagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => goToPage(page + 1)}
                  className="text-white/40 hover:text-white disabled:opacity-20 text-[12px]"
                >
                  Next
                  <HeroPagination.NextIcon />
                </HeroPagination.Next>
              </HeroPagination.Item>
            </HeroPagination.Content>
          </HeroPagination>
        </div>
      )}
    </div>
  );
}
