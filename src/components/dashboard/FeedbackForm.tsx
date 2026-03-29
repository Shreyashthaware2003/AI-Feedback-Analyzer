"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { analyzeFeedback } from "@/services/ai";
import { toast } from "sonner";
import { saveFeedback } from "@/services/saveFeedback";
import { ReusableAlertDialog } from "@/reusableComponents/ReusableAlertDialog";
import { Badge } from "../ui/badge";

export function FeedbackForm() {
    const [content, setContent] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [result, setResult] = useState<{
        sentiment: string;
        summary: string;
    } | null>(null);

    const handleAnalyze = async () => {
        if (!content.trim()) return(
            toast.error("Please enter some feedback content to analyze.")
        );

        try {
            setLoading(true);

            const data = await analyzeFeedback(content);

            setResult(data);
        } catch (error) {
            console.error("Analysis failed:", error);
            toast.error("Something went wrong, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setOpenDialog(true);
    }

    const handleSave = async () => {
        if (!content.trim() || !result) return;
        try {
            setSaveLoading(true);
            const data = await saveFeedback({ content, sentiment: result.sentiment, summary: result.summary });

            setContent("");
            setResult(null);
            toast.success("Feedback saved successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to save feedback try again later.")
        } finally {
            setSaveLoading(false);
        }
    }

    return (
        <>
            <Card className="col-span-12 lg:col-span-8">
                <CardContent className="p-6 space-y-4">

                    {/* Header */}
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wide">
                            New Feedback Input
                        </h2>
                        <div className="bg-black h-1 w-10 mt-1" />
                    </div>

                    <span className="text-xs text-muted-foreground font-medium tracking-wide">
                        Paste Content for Analysis
                    </span>

                    {/* Input */}
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        readOnly={loading || saveLoading}
                        placeholder="Enter raw customer feedback, survey responses or interview transcripts here..."
                        className="h-40 resize-none mt-1"
                    />

                    {/* Button */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="
              bg-gradient-to-r from-black to-gray-800
              text-white
              hover:opacity-90
              h-10 text-xs cursor-pointer
              flex items-center gap-2 w-36
            "
                        >{
                                loading ?
                                    <span className="flex flex-nowrap items-center gap-2">
                                        <Loader2 className="animate-spin w-4 h-4" /> Analyzing
                                    </span> :
                                    <span className="flex flex-nowrap items-center gap-2">
                                        <Sparkles className="w-3 h-3" />Execute Analysis
                                    </span>
                            }

                        </Button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="border rounded-md p-4 space-y-2 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase text-muted-foreground">
                                    Result
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button onClick={handleCancel} variant={'outline'} className="text-xs cursor-pointer">Cancel</Button>
                                    <Button onClick={handleSave} variant={'ghost'} disabled={saveLoading} className={`text-xs bg-green-200 text-green-800 hover:bg-green-300/60 hover:text-green-700 cursor-pointer`}>{saveLoading ? <Loader2 className="animate-spin" /> : "Save"}</Button>
                                </div>
                            </div>

                            <div className="text-sm flex items-center flex-nowrap gap-1">
                                <strong>Sentiment:</strong>
                                <Badge
                                    className={`
    ${result.sentiment.toLowerCase() === "positive"
                                            ? "bg-green-100 border-green-600 text-green-600"
                                            : result.sentiment.toLowerCase() === "negative"
                                                ? "bg-red-100 text-red-600 border-red-600"
                                                : "bg-yellow-100 text-yellow-600 border-yellow-600"
                                        }
  `}
                                >
                                    {result.sentiment}
                                </Badge>

                            </div>

                            <p className="text-sm">
                                <strong>Summary:</strong> {result.summary}
                            </p>
                        </div>
                    )}

                </CardContent>
            </Card>

            {openDialog && (
                <ReusableAlertDialog
                    open={openDialog}
                    onOpenChange={setOpenDialog}
                    title="Discard changes?"
                    description="If you cancel now, your feedback and analysis will not be saved. Are you sure you want to continue?"
                    onConfirm={() => {
                        setResult(null);
                        setContent("");
                        setOpenDialog(false);
                    }}
                />
            )}
        </>
    );
}