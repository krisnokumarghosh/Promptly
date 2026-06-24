"use server"

import { serverMutation } from "../core/server"

export const createPrompt = async (data) => {
    return serverMutation("/api/prompts", data, "POST")
}

export const updatePrompt = async (promptId, data) => {
    return serverMutation(`/api/prompt/${promptId}`, data, "PATCH")
}