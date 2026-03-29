"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("ProtectedLayout rendered");
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth");
    } else {
      setLoading(false);
    }
  }, [pathName, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center w-full">
       <Loader2 className="animate-spin"/>
      </div>
    );
  }

  return <>{children}</>;
}