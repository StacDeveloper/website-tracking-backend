"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { Test } from "../assets/assets"


export interface HistoryTest {
    id: string;
    status: string;
    completedAt: string;
    testResultsCount: number;
    passedCount: number;
    issueCount: number;
    website: {
        id: string
        url: string;
    };
}
interface BackendContextProps {
    tests: Test[];
    setTests: React.Dispatch<React.SetStateAction<Test[]>>;
    historyTests: HistoryTest[];
    setHistoryTests: React.Dispatch<React.SetStateAction<HistoryTest[]>>;
    getMyTests: () => Promise<void>;
    getHistoryOfUser: () => Promise<void>;

}

const BackendContext = createContext<BackendContextProps | null>(null)

export const useBackendContext = () => {
    const context = useContext(BackendContext)
    if (!context) throw new Error("Backend context is not initiazlied properly")
    return context
}

export const BackendContextProvider = ({ children }: { children: ReactNode }) => {
    const value: any = {

    }

    return <BackendContext.Provider value={value}>
        {children}
    </BackendContext.Provider>
}