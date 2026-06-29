"use server";

import { serverMutation } from "../core/server";

export const addFeature = async (data) => {
  return serverMutation("/api/feature", data, "POST");
};
