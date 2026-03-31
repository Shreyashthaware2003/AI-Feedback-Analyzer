"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface MetricsCardProps {
    stats?: {
        positive: number;
        negative: number;
        neutral: number;
    };
    loading?: boolean;
}

function MetricsCard({ stats, loading }: MetricsCardProps) {
    const safeStats = stats ?? {
        positive: 0,
        negative: 0,
        neutral: 0,
    };

    const total =
        safeStats.positive + safeStats.negative + safeStats.neutral;

    const getPercent = (value: number) =>
        total > 0 ? (value / total) * 100 : 0;

    if (loading) {
        return <Skeleton className="h-[320px] w-full bg-gray-200" />;
    }

    return (
        <Card className="h-[320px] flex-1 w-full p-4">

            {/* 🔵 Top Color Indicators */}
            <div className="flex items-center justify-between text-xs px-4">
                <div className="flex items-center gap-1">
                    <span className="w-6 h-1 bg-[#1e3a8a]" />
                    Positive
                </div>

                <div className="flex items-center gap-1">
                    <span className="w-6 h-1 bg-[#3b82f6]" />
                    Negative
                </div>

                <div className="flex items-center gap-1">
                    <span className="w-6 h-1 bg-[#93c5fd]" />
                    Neutral
                </div>
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-xs">
                    Sentiment Distribution
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-8">
                {/* Positive */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#1e3a8a]">Positive</span>
                        <span>
                            ({Math.round(getPercent(safeStats.positive))}%)
                        </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 overflow-hidden">
                        <div
                            className="h-full bg-[#1e3a8a] transition-all duration-500"
                            style={{ width: `${getPercent(safeStats.positive)}% ` }}
                        />
                    </div>
                </div>

                {/* Negative */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#3b82f6]">Negative</span>
                        <span>
                            ({Math.round(getPercent(safeStats.negative))}%)
                        </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200  overflow-hidden">
                        <div
                            className="h-full bg-[#3b82f6] transition-all duration-500"
                            style={{ width: `${getPercent(safeStats.negative)}% ` }}
                        />
                    </div>
                </div>

                {/* Neutral */}
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#93c5fd]">Neutral</span>
                        <span>
                            ({Math.round(getPercent(safeStats.neutral))}%)
                        </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200  overflow-hidden">
                        <div
                            className="h-full bg-[#93c5fd] transition-all duration-500"
                            style={{ width: `${getPercent(safeStats.neutral)}% ` }}
                        />
                    </div>
                </div>

            </CardContent>
        </Card>
    );

}

export default MetricsCard;
