import { serverMutation } from "../core/server"

export const changeUserRole = async (userId, data) => {
    return serverMutation(`/api/users/${userId}`, data, "PATCH")
}