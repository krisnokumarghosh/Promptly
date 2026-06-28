import { getReportedPrompts } from "@/lib/api/reports";
import { getSinglePrompt } from "@/lib/api/prompts";
import ReportedPromptsTable from "@/components/dashboard/admin/ReportedPromptsTable";

const ReportedPromptsPage = async () => {
  const reportedPrompts = await getReportedPrompts();

  const reportsWithPrompts = await Promise.all(
    reportedPrompts.map(async (report) => {
      const prompt = await getSinglePrompt(report.promptId);
      return { ...report, prompt };
    }),
  );

  console.log(reportsWithPrompts);
  

  return (
    <div className="flex flex-col gap-6 text-white">
      <div>
        <p className="text-[#AAFF00] text-xs font-semibold mb-2 tracking-wider">
          ADMIN PORTAL
        </p>
        <h2 className="text-[22px] md:text-[30px] font-bold">
          Reported Prompts
        </h2>
        <p className="text-[13px] text-white/35 mt-1">
          {reportedPrompts.length} total reports
        </p>
      </div>
      <ReportedPromptsTable reports={reportsWithPrompts} />
    </div>
  );
};

export default ReportedPromptsPage;
