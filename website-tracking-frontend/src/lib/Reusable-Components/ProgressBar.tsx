import { useEffect, useRef, useState } from "react"

interface ScanStatusData {
    id: string
    status: string
    testResultsCount: number
    expectedCount: number
}

export default function ProgressBar(scanId: string) {
    console.log("Progress Bar Called")
    console.log(scanId)
    const [progress, setProgress] = useState(0)
    const [scan, setScan] = useState<ScanStatusData | null>(null)
    const [isDone, setIsDone] = useState(false)
    const pollRef = useRef<NodeJS.Timeout | null>(null)
    const progressRef = useRef<NodeJS.Timeout | null>(null)


    useEffect(() => {
        if (!scanId) return;
        console.log("Progress Bar triggered")
        progressRef.current = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? prev : Math.min(prev + (Math.random() * 8 + 4), 90)))
        }, 4000)
        return () => {
            if (progressRef.current) clearInterval(progressRef.current)
        }
    }, [scanId])

     useEffect(() => {
        console.log("BARE MINIMUM EFFECT FIRED");
    }, [scanId]);

    useEffect(() => {
        if (!scanId) return
        console.log(scanId)
        console.log("Scan started for" + scanId)
        const poll = async () => {
            const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `query ScanStatus($scanId:ID!){
                        scanStatus(scanId:$scanId){
                        id,
                        status
                        testResultsCount
                        expectedCount
                        }
                    }`, variables: { scanId }
                })

            })
            const { data, errors } = await res.json()
            if (errors) {
                console.error(errors)
                return
            }
            setScan(data.scanStatus)

            if (data.scanStatus.status === "COMPLETED") {
                setProgress(100)
                setIsDone(true)
                if (pollRef.current) clearInterval(pollRef.current)
                if (progressRef.current) clearInterval(progressRef.current)
            }
        }
        poll()
        pollRef.current = setInterval(poll, 4000)
        return () => {
            if (pollRef.current) clearInterval(pollRef.current)
        }


    }, [scanId])

    return { progress: Math.round(progress), scan, isDone }
}