"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            redirect("/dashboard");
        } else {
            setLoading(false);
        }
    }, [redirect]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center w-full">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}