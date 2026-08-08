"use client"

import { createContext, ReactNode, useContext, useState } from "react"

export type c = Record<string, string>


interface ColorContextProps {
    c: c,
    theme: string,
    isDark: boolean,
    setTheme: React.Dispatch<React.SetStateAction<string>>
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined)

export const useColorContext = () => {
    const context = useContext(ColorContext)
    if (!context) throw new Error("Color context is not initialized")
    return context
}

export const ColorContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("dark");
    const isDark = theme === "dark"
    const c: c = {
        mainBg: isDark ? "#050510" : "#f7f7fb",
        sidebarBg: isDark ? "#0a0a16" : "#ffffff",
        cardBg: isDark ? "#0c0c1a" : "#ffffff",
        cardBg2: isDark ? "#10101f" : "#fafafe",
        cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,15,26,0.08)",
        textPrimary: isDark ? "#ffffff" : "#0f0f1a",
        textSecondary: isDark ? "#d1d5db" : "#4b5563",
        textMuted: isDark ? "#9ca3af" : "#6b7280",
        textFaint: isDark ? "#6b7280" : "#9ca3af",
        activeNavBg: isDark ? "rgba(129,140,248,0.15)" : "rgba(79,70,229,0.1)",
        accent: isDark ? "#818cf8" : "#4f46e5",
        inputBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,15,26,0.03)",
        toggleBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,15,26,0.06)",
        codeBg: isDark ? "#050510" : "#0f0f1a",
    }

    const value: any = {
        theme,
        c,
        isDark,
        setTheme
    }

    return <ColorContext.Provider value={value}>
        {children}
    </ColorContext.Provider>
}

