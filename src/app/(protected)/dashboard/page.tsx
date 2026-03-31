"use client";

import { useEffect, useState } from "react";
import { RootSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { FeedbackForm } from "@/components/dashboard/FeedbackForm";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FeedbackCard } from "@/components/dashboard/FeedbackCard";
import { SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { fetchFeedback } from "@/services/fetchFeedback";
import Pagination from "@/reusableComponents/ReusablePagination";
import { toast } from "sonner";
import { fetchMetrics } from "@/services/fetchMetrics";
import { TrendChart } from "@/components/dashboard/TrendsCard";
import MetricsCard from "@/components/dashboard/MetricsCard";

export default function Dashboard() {
    const [feedback, setFeedback] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({});
    const [trends, setTrends] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [metricsLoading, setMetricsLoading] = useState(false);

    const fetchAllFeedback = async () => {
        try {
            setLoading(true);
            const data = await fetchFeedback(page, 5);

            setFeedback(data?.feedback);
            setTotalPages(data?.pagination?.totalPages || 1);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllMetrics = async () => {
        {
            try {
                setMetricsLoading(true);
                const data = await fetchMetrics();
                setStats(data?.stats);
                setTrends(data?.trends);
            } catch (error) {
                console.log("Error fetching metrics:", error);
                toast.error("Failed to fetch metrics");
            } finally {
                setMetricsLoading(false);
            }
        }
    }

    // fetch all the feedbacks
    useEffect(() => {
        fetchAllFeedback();
    }, [page]);

    // fetch all the metrics
    useEffect(() => {
        fetchAllMetrics();
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>

            <RootSidebar />

            <SidebarInset className="flex flex-col w-full">
                <main className="flex-1 absolute top-12 p-8 space-y-8 w-full bg-[#f9f9f9]">

                    <div>
                        <h1 className="text-4xl font-bold">Dashboard</h1>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                            System Status: Active / Nodes Optimized
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-6">

                        <FeedbackForm onSaveSuccess={fetchAllFeedback} />

                        <StatsCards stats={stats} loading={metricsLoading} />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6">
                        <div className="max-w-3xl w-full">
                            <TrendChart trends={trends} loading={metricsLoading} />
                        </div>
                        <MetricsCard stats={stats} loading={metricsLoading} />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold uppercase tracking-wide">
                            Recent Feedback Feed
                        </h2>
                        <Separator />

                        <FeedbackCard
                            feedback={feedback}
                            setFeedback={setFeedback}
                            loading={loading}
                        />
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>

                </main>
            </SidebarInset>

        </>
    );
}