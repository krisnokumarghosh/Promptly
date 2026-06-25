import { serverMutation } from "../core/server";

export const changeUserRole = async (userId, data) => {
  return serverMutation(`/api/users/${userId}`, data, "PATCH");
};

export const deleteUser = async (userId) => {
  return serverMutation(`/api/users/${userId}`, null, "DELETE");
};
