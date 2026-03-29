import { api } from "@/lib/api";

export async function updateFeedback(feedbackId: string, data: { content?: string; sentiment?: string; summary?: string }) {
    try {
        const response = await api.patch("/feedback", {
            feedbackId,
            ...data
        });
        return response.data;
    } catch (error) {
        console.error("Error updating feedback:", error);
        throw error;
    }
}