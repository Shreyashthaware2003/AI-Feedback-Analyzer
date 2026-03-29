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

export default function Dashboard() {
    const [feedback, setFeedback] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const fetchAllFeedback = async () => {
        try {
            setLoading(true);
            const data = await fetchFeedback();

            setFeedback(data?.feedback);
            setStats(data?.stats);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllFeedback();
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

                        <StatsCards stats={stats} loading={loading} />
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
                    </div>

                </main>
            </SidebarInset>
        </>
    );
}