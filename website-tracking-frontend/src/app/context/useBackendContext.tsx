"use client"

import { createContext, type ReactNode, useContext } from "react"


interface BackendContextProps {

}

const BackendContext = createContext<BackendContextProps | null>(null)

export const useBackendContext = () => {
    const context = useContext(BackendContext)
    if (!context) throw new Error("Backend context is not initiazlied properly")
    return context
}

export const BackendContextProvider = ({ children }: { children: ReactNode }) => {




    const value: any = {}

    return <BackendContext.Provider value={value}>
        {children}
    </BackendContext.Provider>
}