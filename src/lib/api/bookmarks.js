import { secureServerFetch } from "../core/server";

export const getBookmarksByUseId = async (userId) => {
  return secureServerFetch(`/api/get/bookmark/${userId}`);
};
