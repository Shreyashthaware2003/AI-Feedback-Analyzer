import { api } from "@/lib/api";

export async function deleteFeedback(data: { feedbackId: string }) {
    const res = await api.delete('/feedback', {
        data
    });
    return res.data;
}