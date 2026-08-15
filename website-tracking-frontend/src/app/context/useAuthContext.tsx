"use client"

import { useSession } from "@/auth/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface AuthContextProps {
    isAuthenticated: boolean;
    hasAcceptedDisclaimer: boolean;
    isLoading: boolean;
    acceptDisclaimer: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null)


export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("Auth context is not initiazlied properly")
    return context
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const { data: session, isPending } = useSession()
    const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false)

    const isAuthenticated = !!session?.user

    useEffect(() => {
        if (session?.user) {
            setHasAcceptedDisclaimer(localStorage.getItem(`disclaimer_${session.user.id}`) === "true")
        }

    }, [session?.user])

    const acceptDisclaimer = () => {
        if (!session?.user) return
        localStorage.setItem(`disclaimer_${session.user.id}`, "true")
        setHasAcceptedDisclaimer(true)
    }

    const value: any = {
        isAuthenticated, hasAcceptedDisclaimer, isLoading: isPending, acceptDisclaimer
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}