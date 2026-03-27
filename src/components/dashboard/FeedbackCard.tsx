'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { fetchFeedback } from "@/services/fetchFeedback";

export function FeedbackCard() {

    const [feedback, setFeedback] = useState<any[]>([]);

    useEffect(() => {
        console.log("FETCHING DATA NOW...");
        const getData = async () => {
            const data = await fetchFeedback();
            setFeedback(data);
        };

        getData();
    }, []);

    return (
        <>
            {
                feedback.map((item: any) => (
                    <Card key={item.id} className="hover:bg-[#e4e4e4] bg-[#f2f2f2]">
                        <CardContent className="p-6 flex flex-col md:flex-row md:justify-between gap-6">
                            <div className="flex items-start w-full">

                                {/* Content */}
                                <div className="flex-1 space-y-3 max-w-sm group">
                                    <div className="flex gap-2 items-center">
                                        <Badge className={`${item.sentiment.toLowerCase() === 'positive' ? "bg-green-100 text-green-600 border-green-600"
                                            : item.sentiment.toLowerCase() === 'negative' ? "bg-red-100 text-red-600 border-red-600" : "bg-yellow-100 text-yellow-600 border-yellow-600"
                                            }`}>
                                            {item.sentiment}
                                        </Badge>
                                    </div>

                                    <p className="text-sm italic font-medium line-clamp-3 group-hover:line-clamp-none break-words transition-all">
                                        "{item.content}"
                                    </p>
                                </div>

                                {/* Summary */}
                                <div className="flex-1 border-l-2 border-black bg-white max-w-md p-4">
                                    <p className="text-[9px] font-semibold tracking-widest text-muted-foreground mb-2 uppercase">
                                        AI Summary
                                    </p>
                                    <p className="text-xs text-gray-600 line-clamp-4">
                                        {item.summary}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="cursor-pointer">
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" className="cursor-pointer">
                                        Delete
                                    </Button>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                ))
            }
        </>
    );
}