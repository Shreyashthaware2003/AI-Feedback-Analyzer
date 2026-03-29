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

import { usePathname, useRouter } from "next/navigation";

import {
    LayoutDashboard,
    BarChart3,
    FileText,
    Archive,
} from "lucide-react";

import {toast} from 'sonner'

const menuItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Reports", href: "/reports", icon: FileText },
    { label: "Archive", href: "/archive", icon: Archive },
];

export function RootSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleNavigation = (href: string) => {
        if (href !== "/dashboard") {
            toast.error("Only 'Overview' page is available in this demo");
            return;
        }

        router.push(href);
    };

    return (
        <Sidebar className="bg-gray-100 mt-20">

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        onClick={() => handleNavigation(item.href)}
                                        className={`
                                            flex items-center gap-2
                                            transition-colors rounded-md px-3 py-2 my-1
                                            ${isActive
                                                ? "bg-black text-white"
                                                : "hover:bg-gray-200"}
                                        `}
                                    >
                                        <Icon size={18} />
                                        <span>{item.label}</span>
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