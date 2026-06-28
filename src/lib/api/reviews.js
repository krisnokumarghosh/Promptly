import { serverFetch } from "../core/server";

export const getReviewsByPromptId = async (promptId) => {
  return serverFetch(`/api/pid/reviews/${promptId}`);
};
