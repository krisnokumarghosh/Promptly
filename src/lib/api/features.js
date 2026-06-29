import { serverFetch } from "../core/server";

export const featuredPrompt = async () => {
  return serverFetch("/api/featured");
};
