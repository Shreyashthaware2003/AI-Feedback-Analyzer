"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    LayoutDashboard,
    BarChart3,
    FileText,
    Archive,
} from "lucide-react";

const menuItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Reports", href: "/reports", icon: FileText },
    { label: "Archive", href: "/archive", icon: Archive },
];

export function RootSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="bg-gray-100">

            <SidebarHeader>
                <div className="px-4 py-2">
                    <h1 className="text-lg font-bold">PROJECT_ALPHA</h1>
                    <p className="text-xs text-muted-foreground">
                        Precision Feedback
                    </p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>

                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`
          flex items-center gap-2
          transition-colors rounded-md px-3 py-2 my-1
          ${isActive
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-200"}
        `}
                                    >
                                        <Link href={item.href} className="flex items-center gap-2 w-full">
                                            <Icon size={18} />
                                            <span>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}

                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    );
}