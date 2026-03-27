import { api } from "@/lib/api";

export async function fetchFeedback() {
    const res = await api.get("/feedback");
    return res.data.data;
}