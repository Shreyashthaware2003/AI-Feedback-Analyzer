import { api } from "@/lib/api";

export async function saveFeedback(data: {
    content: string;
    sentiment: string;
    summary: string;
}) {
    const res = await api.post('/feedback', data);
    return res.data;
}