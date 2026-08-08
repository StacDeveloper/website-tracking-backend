"use client"
import { useColorContext } from "@/app/context/useColorContext";
import { type ReactNode } from "react";

export const SectionLabel = ({ children }: { children: ReactNode }) => {
    const { c } = useColorContext()
    return (
        <p className="mb-3 text-sm font-semibold" style={{ color: c?.textPrimary }}>
            {children}
        </p>
    );
}