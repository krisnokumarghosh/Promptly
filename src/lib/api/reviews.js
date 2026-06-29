import { serverFetch } from "../core/server";

export const getReviewsByPromptId = async (promptId) => {
  return serverFetch(`/api/pid/reviews/${promptId}`);
};

export const getReviewsByUserId = async (userId) => {
  return serverFetch(`/api/uid/reviews/${userId}`);
};

export const getAllReviews = async () => {
  return serverFetch("/api/reviews");
};
