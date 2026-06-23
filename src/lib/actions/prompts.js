"use server"

import { serverMutation } from "../core/server"

export const createPrompt = async (data) => {
    return serverMutation("/api/prompts", data, "POST")
}