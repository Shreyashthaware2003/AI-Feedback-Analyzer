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
        color: "#22c55e",
    },
    negative: {
        label: "Negative",
        color: "#ef4444",
    },
    neutral: {
        label: "Neutral",
        color: "#eab308",
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
        <div className="col-span-12 lg:col-span-4 space-y-4">

            {/* 🔥 Total Card */}
            {loading ? (<>
                <div className="flex items-center gap-2">
                    <Skeleton className="aspect-video w-full bg-gray-300" />
                    <Skeleton className="aspect-video w-full bg-gray-300" />
                </div>
            </>) : (
                <>
                    <div className="flex items-center gap-2">
                        <Card className="bg-black text-white flex-1">
                            <CardContent className="p-6">
                                <p className="text-xs uppercase">Total Analyzed</p>
                                <h2 className="text-4xl font-bold">
                                    {stats.total}
                                </h2>
                            </CardContent >
                        </Card >
                        <Card className="bg-black text-white flex-1">
                            <CardContent className="p-6">
                                <p className="text-xs uppercase">Total re-analyzed</p>
                                <h2 className="text-4xl font-bold">
                                    {stats.edited}
                                </h2>
                            </CardContent >
                        </Card >
                    </div>
                </>
            )
            }



            {loading ? (<>
                <Skeleton className="aspect-video w-full bg-gray-300" />
            </>) : (

                <>
                    {/* 🔥 Sentiment Chart Card */}
                    <Card>
                        <CardContent className="p-6">
                            <p className="text-xs uppercase text-muted-foreground mb-4">

                                Sentiment Distribution
                            </p>

                            <ChartContainer config={chartConfig} className="h-52 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart width={300} height={200}>
                                        <Pie
                                            data={data}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={4}
                                        >
                                            {data.map((entry, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={chartConfig[entry.name as keyof typeof chartConfig].color}
                                                />
                                            ))}
                                        </Pie>

                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>

                            {/* Legend */}
                            <div className="flex justify-between mt-4 text-xs">
                                <span className="text-green-600">
                                    Positive: {stats.positive}
                                </span>
                                <span className="text-red-600">
                                    Negative: {stats.negative}
                                </span>
                                <span className="text-yellow-600">
                                    Neutral: {stats.neutral}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </>)}

        </div >
    );
}