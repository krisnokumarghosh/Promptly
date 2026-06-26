import { serverFetch } from "../core/server";

export const getPromptsById = async (userId) => {
  return serverFetch(`/api/prompts/${userId}`);
};

export const getAllPrompts = async () => {
  return serverFetch("/api/prompts");
};

export const getAllPromptsByQuery = async (query) => {
  return serverFetch(`/api/prompts?${query}`);
};
