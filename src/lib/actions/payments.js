"use server"

import { serverMutation } from "../core/server"

export const submitPayment = async (payInfo) => {
    return serverMutation("/api/payment", payInfo, "POST")
}