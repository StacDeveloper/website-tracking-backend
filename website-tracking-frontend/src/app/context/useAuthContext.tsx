"use client"

import { useSession } from "@/auth/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface AuthContextProps {
    isAuthenticated: boolean;
    hasAcceptedDisclaimer: boolean;
    isLoading: boolean;
    acceptDisclaimer: () => void;
    user: UserInterface | null
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}

interface UserInterface {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
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
    const router = useRouter()
    const [user, setUser] = useState<UserInterface | null>()
    const isAuthenticated = !!session?.user

    useEffect(() => {
        if (session?.user) {
            setUser(session?.user)
            setHasAcceptedDisclaimer(localStorage.getItem(`disclaimer_${session.user.id}`) === "true")
        }

    }, [session?.user])

    const acceptDisclaimer = () => {
        if (!session?.user) {
            setHasAcceptedDisclaimer(false)
            return;
        }
        const key = `disclaimer_${session?.user?.id}`
        const acceptDisclaimer = localStorage.getItem(key)

        const today = new Date().toISOString().split("T")[0]
        setHasAcceptedDisclaimer(acceptDisclaimer === today)
    }
    useEffect(() => {
        acceptDisclaimer()
    }, [session?.user?.id])

    const value: any = {
        isAuthenticated, hasAcceptedDisclaimer, isLoading: isPending, acceptDisclaimer, user, setUser
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}