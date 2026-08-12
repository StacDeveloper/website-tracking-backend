"use client"

import { createContext, useContext, type ReactNode } from "react"

const AuthContext = createContext(null)

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error("Auth context is not initiazlied properly")
    return context
}

const AuthContextProvider = ({ children }: { children: ReactNode }) => {


    const value: any = {

    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}