"use client"
import { useState, useEffect, type ReactNode } from "react";
export const FadeIn = ({ delay = 0, children, className = "" }: { delay?: number, children?: ReactNode, className?: string }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <div
            className={className}
            style={{
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
        >
            {children}
        </div>
    );
};