"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Loader2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Skeleton } from "../ui/skeleton";


interface StatsCardsProps {
    stats: {
        total: number;
        positive: number;
        negative: number;
        neutral: number;
        edited: number;
    };
    loading: boolean;
}

const chartConfig: ChartConfig = {
    positive: {
        label: "Positive",
        color: "#1e3a8a", // dark
    },
    negative: {
        label: "Negative",
        color: "#3b82f6", // medium
    },
    neutral: {
        label: "Neutral",
        color: "#93c5fd", // light
    },
};

export function StatsCards({ stats, loading }: StatsCardsProps) {
    const data = [
        { name: "positive", value: stats.positive },
        { name: "negative", value: stats.negative },
        { name: "neutral", value: stats.neutral },
    ];

    console.log(data);

    return (
        <div className="col-span-12 lg:col-span-4 space-y-4 ">

            {loading ? (<>
                <div className="flex flex-col items-center gap-2">
                    <Skeleton className="aspect-video w-full bg-gray-300" />
                    <Skeleton className="aspect-video w-full bg-gray-300" />
                </div>
            </>) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-1 items-center gap-6 flex-1 h-full">
                        <Card className="bg-black text-white flex-1 w-full h-full">
                            <CardContent className="p-6">
                                <p className="text-xs uppercase">Total Analyzed</p>
                                <h2 className="text-4xl sm:text-7xl font-bold">
                                    {stats.total}
                                </h2>
                            </CardContent >
                        </Card >
                        <Card className="bg-gray-200 text-black flex-1 w-full h-full">
                            <CardContent className="p-6">
                                <p className="text-xs uppercase">Total re-analyzed</p>
                                <h2 className="text-4xl sm:text-7xl font-bold">
                                    {stats.edited}
                                </h2>
                            </CardContent >
                        </Card >
                    </div>
                </>
            )
            }
        </div >
    );
}