"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {
    const router = useRouter();

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/auth");
    };

    return (
        <header className="h-16 bg-white flex items-center justify-between px-6 z-[999]">

            <h1 className="text-lg font-bold">AI ANALYZER</h1>

            <nav className="hidden md:flex gap-8 text-sm font-medium">
                <span className="border-b-2 border-black pb-1">Dashboard</span>
                <span className="text-muted-foreground">History</span>
                <span className="text-muted-foreground">Settings</span>
            </nav>

            {/* Profile Popover */}
            <Popover>
                <PopoverTrigger asChild>
                    <div className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer">
                        <User className="w-5 h-5" />
                    </div>
                </PopoverTrigger>

                <PopoverContent align="end" className="w-56 space-y-1 bg-white">

                    {/* User Info */}
                    <div>
                        <p className="text-sm font-medium max-w-56 truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground max-w-56 truncate">
                            {user.email}
                        </p>
                    </div>

                    <div className="border-t pt-2">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left text-sm text-red-500 hover:bg-red-50 px-2 py-1 rounded cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>

                </PopoverContent>
            </Popover>

        </header>
    );
}