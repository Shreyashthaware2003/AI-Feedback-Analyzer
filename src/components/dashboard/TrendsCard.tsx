"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "../ui/skeleton";

interface TrendChartProps {
    trends?: any[];
    loading?: boolean;
}

const chartConfig = {
    positive: {
        label: "Positive",
        color: "#1e3a8a", // dark blue
    },
    negative: {
        label: "Negative",
        color: "#3b82f6", // medium blue
    },
    neutral: {
        label: "Neutral",
        color: "#93c5fd", // light blue
    },
} satisfies ChartConfig;

export function TrendChart({ trends, loading }: TrendChartProps) {

    const safeData = trends ?? [];

    if (loading) {
        return (
            <Skeleton className="aspect-video w-full bg-gray-300 h-[320px]" />
        );
    }

    if (!safeData.length) {
        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>Sentiment Trends</CardTitle>
                        <CardDescription>
                            No feedback in last 7 days
                        </CardDescription>
                    </CardHeader>
                </Card>
            </>
        );
    }

    return (
        <>
            <Card className="h-[320px] flex-1 ">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs">
                        Sentiment Trends (7 Days)
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-2">
                    <ChartContainer config={chartConfig} className="h-[220px] w-full">
                        <BarChart accessibilityLayer data={safeData}>

                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={8}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                    })
                                }
                            />

                            <Bar
                                dataKey="positive"
                                stackId="a"
                                fill={chartConfig.positive.color}
                                radius={[0, 0, 3, 3]}
                            />

                            <Bar
                                dataKey="negative"
                                stackId="a"
                                fill={chartConfig.negative.color}
                            />

                            <Bar
                                dataKey="neutral"
                                stackId="a"
                                fill={chartConfig.neutral.color}
                                radius={[3, 3, 0, 0]}
                            />

                            <ChartTooltip
                                content={<ChartTooltipContent hideIndicator />}
                                cursor={false}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </>
    );
}