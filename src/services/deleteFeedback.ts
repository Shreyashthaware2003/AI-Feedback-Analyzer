import { api } from "@/lib/api";

export async function deleteFeedback(data: { feedbackId: string }) {
    try {
        const res = await api.delete('/feedback', {
            data
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting feedback:", error);
    }
}