import { secureServerFetch, serverFetch } from "../core/server";

export const getPromptsById = async (userId) => {
  return secureServerFetch(`/api/prompts/${userId}`);
};

export const getAllPrompts = async () => {
  return serverFetch("/api/prompts");
};

export const getAllPromptsByQuery = async (query) => {
  return serverFetch(`/api/prompts?${query}`);
};

export const getActivePrompts = async (query) => {
  return serverFetch(`/api/prompts?${query}&status=approved`);
};

export const getSinglePrompt = async (promptId) => {
  return secureServerFetch(`/api/prompt/${promptId}`);
};
