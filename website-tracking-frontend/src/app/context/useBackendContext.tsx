"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { Test } from "../assets/assets"


interface HistoryTest {
    id: string;
    status: string;
    completedAt: string;
    testResultsCount: number;
    passedCount: number;
    issueCount: number;
    website: {
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

    const [tests, setTests] = useState<Test[]>([])
    const [historyTests, sethistoryTests] = useState<HistoryTest[]>([])

    useEffect(() => {
        getHistoryOfUser()
        getMyTests()
    }, [])

    const url = "http://localhost:4000/graphql"

    const getMyTests = async () => {
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
        query {
          getAlluserTests {
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
        }
      `,
            })
        })

        const { data, errors } = await res.json()
        console.log(data)
        setTests(data.getAlluserTests ?? [])
        if (errors) throw new Error(errors[0].message)
    }

    const getHistoryOfUser = async () => {
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
        query {
  getHistoryofUser {
    id
    status
    completedAt
    testResultsCount
    passedCount
    website { url }
    issueCount
  }
}
      `,
            })
        })
        const { data, errors } = await res.json()
        sethistoryTests(data.getHistoryofUser ?? [])
        console.log(data, errors)
    }
    const value: any = { tests, setTests, historyTests, sethistoryTests }

    return <BackendContext.Provider value={value}>
        {children}
    </BackendContext.Provider>
}