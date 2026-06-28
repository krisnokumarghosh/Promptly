import { serverFetch } from "../core/server";

export const getReportedPrompts = async () => {
  return serverFetch("/api/reports");
};
