"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type ReusableEditDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    initialContent: string;
    onSave: (data: { content: string }) => Promise<void> | void;
};

export function ReusableEditDialog({
    title = "Edit Feedback",
    open,
    onOpenChange,
    initialContent,
    onSave,
}: ReusableEditDialogProps) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ sync when dialog opens / item changes
    useEffect(() => {
        setContent(initialContent || "");
    }, [initialContent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) return;

        try {
            setLoading(true);
            await onSave({ content });
            onOpenChange(false);
        } finally {
            setLoading(false);
        }
    };

    const isUnchanged = content === initialContent;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-white">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader className="mb-4">
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    {/* CONTENT */}
                    <div className="space-y-1">
                        <Label className="text-xs">Content</Label>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="
                min-h-[120px] w-full resize-none
                border rounded-md border-gray-300 px-3 py-2
                focus:outline-none focus:ring-2 focus:ring-gray-300
                break-all whitespace-pre-wrap
              "
                        />
                    </div>

                    {/* FOOTER */}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                type="button"
                                className="sm:flex-1 text-xs cursor-pointer"
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            disabled={loading || isUnchanged}
                            className="sm:flex-1 text-xs cursor-pointer"
                        >
                            {loading ? "Re-analyzing..." : "Re-analyze"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}