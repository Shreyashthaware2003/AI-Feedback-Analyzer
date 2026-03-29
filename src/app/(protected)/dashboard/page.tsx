import { RootSidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { FeedbackForm } from "@/components/dashboard/FeedbackForm";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FeedbackCard } from "@/components/dashboard/FeedbackCard";
import { SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
    return (
        <>
            {/* Sidebar */}
            <RootSidebar />

            {/* THIS IS IMPORTANT */}
            <SidebarInset className="flex flex-col w-full">

                {/* Fixed Header */}
                <div className="fixed top-0 left-0 right-0 z-50">
                    <Header />
                </div>

                {/* Main Content */}
                <main className="flex-1 absolute top-12 p-8 space-y-8 w-full bg-[#f9f9f9]">

                    <div>
                        <h1 className="text-4xl font-bold">Dashboard</h1>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">
                            System Status: Active / Nodes Optimized
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        <FeedbackForm />
                        <StatsCards />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-sm font-semibold uppercase tracking-wide">
                            Recent Feedback Feed
                        </h2>
                        <Separator />
                        <FeedbackCard />
                    </div>

                </main>
            </SidebarInset>
        </>
    );
}