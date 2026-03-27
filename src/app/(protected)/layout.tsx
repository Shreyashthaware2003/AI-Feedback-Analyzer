"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/auth");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // 🔥 Prevent UI flash before auth check
  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center w-full">
       <Loader2 className="animate-spin"/>
      </div>
    );
  }

  return <>{children}</>;
}