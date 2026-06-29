import { serverFetch } from "../core/server"

export const getAllPaymets = async () => {
    return serverFetch("/api/payments")
}