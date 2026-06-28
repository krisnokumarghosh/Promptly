import { serverFetch } from "../core/server";

export const getBookmarksByUseId = async (userId) => {
  return serverFetch(`/api/get/bookmark/${userId}`);
};
