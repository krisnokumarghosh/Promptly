import { serverFetch } from "../core/server";

export const getPromptsById = async (userId) => {
  return serverFetch(`/api/prompts/${userId}`);
};

export const getAllPrompts = async () => {
  return serverFetch("/api/prompts");
};
