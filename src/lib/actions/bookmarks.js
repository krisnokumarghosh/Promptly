"use server";

import { serverMutation } from "../core/server";

export const addBookmark = async (bookmarkData) => {
  return serverMutation("/api/bookmark", bookmarkData, "POST");
};

export const deleteBookmark = async (bookmarkId, data) => {
  return serverMutation(`/api/d/bookmark/${bookmarkId}`, data, "DELETE");
};
