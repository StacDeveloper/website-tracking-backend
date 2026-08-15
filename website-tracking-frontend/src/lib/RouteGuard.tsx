"use client"
import { type ReactNode } from "react";
import { useAuthContext } from "@/app/context/useAuthContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RouteGuard({ children }: { children: ReactNode }) {
    const { isAuthenticated, hasAcceptedDisclaimer, isLoading } = useAuthContext();
    const pathname = usePathname();
    const router = useRouter();
    const PUBLIC_PATHS = ["/login"]

    useEffect(() => {
        if (isLoading) return; // wait for localStorage read to finish first

        const isPublicPath = PUBLIC_PATHS.includes(pathname);
        const isDisclaimerPath = pathname === "/disclaimer";

        if (!isAuthenticated && !isPublicPath) {
            router.replace("/login");
        } else if (isAuthenticated && !hasAcceptedDisclaimer && !isDisclaimerPath) {
            router.replace("/disclaimer");
        } else if (isAuthenticated && hasAcceptedDisclaimer && (isPublicPath || isDisclaimerPath)) {
            router.replace("/tests");
        }
    }, [isAuthenticated, hasAcceptedDisclaimer, isLoading, pathname, router]);

    return <>{children}</>;
}