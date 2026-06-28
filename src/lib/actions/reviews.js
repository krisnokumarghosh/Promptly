"use server";

import { serverMutation } from "../core/server";

export const submitReview = async (data) => {
  return serverMutation("/api/reviews", data, "POST");
};
