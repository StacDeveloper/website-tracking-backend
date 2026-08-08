"use client"
import { c, useColorContext } from "@/app/context/useColorContext";
import { type ReactNode } from "react";

export const CardShell = ({ className = "", children }: { className?: string; children: ReactNode }) => {
    const { c } = useColorContext()
    return (
        <div className={`rounded-xl border ${className}`} style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}>
            {children}
        </div>
    )
}