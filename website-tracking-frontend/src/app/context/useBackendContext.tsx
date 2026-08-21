"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { Test } from "../assets/assets"



interface BackendContextProps {
    tests: Test | null,
    setTests: React.Dispatch<React.SetStateAction<Test | null>>
    getMyTests: () => void
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

    useEffect(() => {
        getMyTests()
    }, [])


    const getMyTests = async () => {
        const res = await fetch("http://localhost:4000/graphql", {
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
        setTests(data.getAlluserTests)
        if (errors) throw new Error(errors[0].message)



    }
    const value: any = { tests, setTests }

    return <BackendContext.Provider value={value}>
        {children}
    </BackendContext.Provider>
}