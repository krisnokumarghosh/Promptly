"use server";

import { serverMutation } from "../core/server";

export const reportPrompt = async (data) => {
  return serverMutation("/api/reports", data, "POST");
};

export const dismissOrRemoveReport = async (reportId, data = null) => {
  return serverMutation(`/api/report/${reportId}`, data, "DELETE");
};
