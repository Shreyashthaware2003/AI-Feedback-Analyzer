import { api } from "@/lib/api";

export async function analyzeFeedback(content: string) {
    const res = await api.post("/ai/analyze", { content });
    return res.data;
}