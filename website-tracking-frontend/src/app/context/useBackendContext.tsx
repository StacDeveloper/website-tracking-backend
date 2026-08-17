"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { Test } from "../assets/assets"
import { useSession } from "@/auth/auth"



interface BackendContextProps {

}

const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`! || "http://localhost:4000/graphql"
const BackendContext = createContext<BackendContextProps | null>(null)

export const useBackendContext = () => {
    const context = useContext(BackendContext)
    if (!context) throw new Error("Backend context is not initiazlied properly")
    return context
}

export const BackendContextProvider = ({ children }: { children: ReactNode }) => {

    const [tests, setTests] = useState<Test[]>([])

    const getMyTests = async (userId: string) => {
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `query getAllTests() {
          myScans() {
            id
            status
            scanType
            aiSummary
            testResults {
              category
              status
              severity
              rawResult
              aiSuggestion
            }
          }
        }`
            })
        })

        const { data, errors } = await res.json()
        setTests(data)
        if (errors) throw new Error(errors[0].message)
        console.log(data)

        

    }
    const value: any = { getMyTests }

    return <BackendContext.Provider value={value}>
        {children}
    </BackendContext.Provider>
}