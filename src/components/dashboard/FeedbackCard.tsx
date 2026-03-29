"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { fetchFeedback } from "@/services/fetchFeedback";
import { CloudAlert, Loader2 } from "lucide-react";
import { ReusableAlertDialog } from "@/reusableComponents/ReusableAlertDialog";
import { deleteFeedback } from "@/services/deleteFeedback";
import { toast } from "sonner";
import { ReusableEditDialog } from "@/reusableComponents/ReusableEditDialog";
import { updateFeedback } from "@/services/updateFeedback";
import { analyzeFeedback } from "@/services/ai";

interface FeedbackCardProps {
    feedback: any[];
    setFeedback: React.Dispatch<React.SetStateAction<any[]>>;
    loading: boolean;
}

export function FeedbackCard({ feedback, setFeedback, loading }: FeedbackCardProps) {
  

    const [onDelete, setOnDelete] = useState(false);
    const [onEdit, setOnEdit] = useState(false);

    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    // ✅ DELETE
    const handleDelete = async () => {
        try {
            if (!selectedItem) return;

            const res = await deleteFeedback({
                feedbackId: selectedItem.id,
            });

            setFeedback((prev) =>
                prev.filter((item) => item.id !== res.deletedId)
            );

            toast.success("Feedback deleted successfully");
            setOnDelete(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete feedback");
        }
    };

    const handleEdit = async (data: Record<string, string>) => {
        try {
            if (!selectedItem) return;

            toast("Re-analyzing feedback...", { icon: "🤖" });

            // Reanalyzing with AI to get updated sentiment and summary based on the edited content
            const aiResponse = await analyzeFeedback(data.content);


            const payload = {
                content: data.content,
                sentiment: aiResponse.sentiment,
                summary: aiResponse.summary,
            };

            //once the AI analysis is done, updating the feedback with new content
            const res = await updateFeedback(selectedItem.id, payload);

            setFeedback((prev) =>
                prev.map((f) =>
                    f.id === selectedItem.id ? res.data : f
                )
            );

            toast.success("Feedback updated with AI insights");
            setOnEdit(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to update feedback");
        }
    };


    // ✅ LOADING STATE
    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <p className="text-sm text-gray-500 animate-pulse flex flex-col items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Loading feedback...
                </p>
            </div>
        );
    }

    // ✅ EMPTY STATE
    if (!loading && feedback.length === 0) {
        return (
            <Card className="text-center py-10 text-gray-500 text-xs flex flex-col items-center">
                <CloudAlert className="w-8 h-8" />
                No feedback available.
            </Card>
        );
    }

    return (
        <>
            {feedback.map((item: any) => (
                <Card
                    key={item.id}
                    className="hover:bg-[#e4e4e4] bg-[#f2f2f2] relative"
                >
                    <CardContent className="space-y-4">
                        {item.is_edited && (
                            <>
                                <div className="flex items-center gap-2">
                                    <Badge className=" border-gray-400 text-gray-600 uppercase bg-transparent tracking-wider font-semibold text-[9px]">edited</Badge>
                                    <span className="text-[10px] text-muted-foreground">Last edited: {new Date(item.edited_at).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}</span>
                                </div>
                            </>
                        )}
                        <div className="flex flex-col md:flex-row md:justify-between gap-6 ">

                            <div className="flex flex-col items-start w-full sm:max-w-4xl space-y-4">
                                {/* Content */}
                                <div className="flex-1 space-y-3 group h-full w-full">
                                    <div className="flex gap-2 items-center">
                                        <Badge
                                            className={`uppercase text-[11px] font-semibold tracking-wider bg-transparent ${item.sentiment.toLowerCase() === "positive"
                                                ? " text-green-600 border-green-600"
                                                : item.sentiment.toLowerCase() === "negative"
                                                    ? " text-red-600 border-red-600"
                                                    : " text-yellow-600 border-yellow-600"
                                                }`}
                                        >
                                            {item.sentiment}
                                        </Badge>
                                    </div>

                                    <p className="text-sm italic font-medium w-full break-words">
                                        "{item.content}"
                                    </p>
                                </div>

                                {/* Summary */}
                                <div className="flex-1 border-l-2 border-black bg-white w-full p-4">
                                    <p className="text-[9px] font-semibold tracking-widest text-muted-foreground mb-2 uppercase">
                                        AI Summary
                                    </p>
                                    <p className="text-xs text-gray-600 break-words w-full">
                                        {item.summary}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2 sm:absolute top-4 right-4">
                                <div className="flex gap-2">
                                    {/* ✅ EDIT */}
                                    <Button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setOnEdit(true);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer text-xs"
                                    >
                                        Re-analyze
                                    </Button>

                                    {/* ✅ DELETE */}
                                    <Button
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setOnDelete(true);
                                        }}
                                        variant="destructive"
                                        size="sm"
                                        className="cursor-pointer text-xs"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card >
            ))
            }

            {/* ✅ DELETE DIALOG */}
            {
                onDelete && (
                    <ReusableAlertDialog
                        open={onDelete}
                        onOpenChange={setOnDelete}
                        onConfirm={handleDelete}
                        title="Delete Feedback?"
                        description="This action cannot be undone."
                        button2="delete"
                    />
                )
            }

            {/* ✅ EDIT DIALOG */}
            {
                onEdit && selectedItem && (
                    <ReusableEditDialog
                        title="Edit Feedback"
                        initialContent={selectedItem.content}
                        open={onEdit}
                        onOpenChange={setOnEdit}
                        onSave={handleEdit}
                    />
                )
            }
        </>
    );
}