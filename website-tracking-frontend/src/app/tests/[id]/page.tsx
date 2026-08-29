"use client"
import { liveOutputLines, runningTests, testIconMap } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import ProgressBar from "@/lib/Reusable-Components/ProgressBar";
import { SectionLabel } from "@/lib/Reusable-Components/SectionLabel";
import { StatusPill } from "@/lib/Reusable-Components/StatusPill";
import { Loader2, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";




interface ScanningViewProps {
    newTestUrl: string
   
}





const ScanningView = ({  newTestUrl }: ScanningViewProps) => {
    const { id:scanId } = useParams()
    const { c } = useColorContext()
    const { isDone, progress, scan } = ProgressBar(scanId as string)
    const [error, setError] = useState("")
    const [selectedTestNames, setSelectedTestNames] = useState([])

    useEffect(() => {

        const isValidUuid = (id: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

        if (!scanId || !isValidUuid(scanId as string || "78aad6fd-c336-4b58-8478-0e28a89b25dd")) {
            console.error("Invalid Scan Id")
            return;
        }

        const getScanData = async () => {
            try {
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        query: `query ScanStatus($scanId:ID!){
                scanStatus(scanId:$scanId){
                id
                  status
                  scanType
                  completedAt
                  website {
                    url
                  }
                  testResults {
                    category
                    status
                    severity
                    }
                    }
                }`, variables: { scanId }
                    })
                })
                const { data, errors } = await response.json()

                if (errors || !data?.scanStatus) {
                    setError("We couldn't find this test. It may have been removed or the link is incorrect.");
                    return;
                }
                setSelectedTestNames(data.scanStatus)

            } catch (error) {
                console.error(error)
                setError("Something went wrong loading this test. Please try again.")
            }

        }
        getScanData()

    }, [scanId])



    const completed = runningTests.filter((t) => t.status === "Completed").length;
    const inProgress = runningTests.filter((t) => t.status === "In Progress").length;
    const pending = runningTests.filter((t) => t.status === "Pending").length;

    if (error) {
    return (
        <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
            <ShieldAlert className="mb-4 h-10 w-10" style={{ color: c.textFaint }} />
            <p className="mb-1 text-lg font-semibold">Test Not Found</p>
            <p className="mb-6 text-sm" style={{ color: c.textMuted }}>{error}</p>
            <button
                className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: c.accent }}
            >
                Back to New Test
            </button>
        </div>
    );
}

    return (
        <div className="px-8 pb-16">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10">
                        <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                    </span>
                    <div>
                        <p className="text-lg font-semibold">Scanning {newTestUrl}</p>
                        <p className="text-sm" style={{ color: c.textMuted }}>Test ID: WT-1746272523</p>
                    </div>
                </div>
                <button
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-red-400"
                    style={{ borderColor: "rgba(248,113,113,0.3)" }}
                >
                    <XCircle className="h-4 w-4" /> Cancel Scan
                </button>
            </div>

            <CardShell className="mb-6 p-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">Overall Progress</span>
                    <span style={{ color: c.textFaint }}>68%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: c.inputBg }}>
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600" style={{ width: "68%" }} />
                </div>
            </CardShell>

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <CardShell className="p-5">
                    <SectionLabel>Running Tests</SectionLabel>
                    <div className="flex flex-col divide-y" style={{ borderColor: c.cardBorder }}>
                        {Array.from(selectedTestNames).map((name) => {
                            const Icon = testIconMap[name] ?? ShieldCheck;
                            return (
                                <div key={name} className="flex items-center justify-between py-2.5">
                                    <span className="flex items-center gap-2.5 text-sm" style={{ color: c.textSecondary }}>
                                        <Icon className="h-4 w-4" style={{ color: c.textFaint }} />
                                        {name}
                                    </span>
                                    <StatusPill status={isDone ? "Completed" : "Pending"} />
                                </div>
                            );
                        })}
                    </div>
                </CardShell>

                <CardShell className="p-5">
                    <SectionLabel>Live Output</SectionLabel>
                    <div
                        className="h-[360px] overflow-y-auto rounded-lg p-3 font-mono text-xs leading-relaxed"
                        style={{ backgroundColor: c.codeBg, color: "#a5b4fc" }}
                    >
                        {liveOutputLines.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </CardShell>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <CardShell className="p-5">
                    <p className="text-sm" style={{ color: c.textMuted }}>Completed</p>
                    <p className="mt-1 text-2xl font-bold">{completed}</p>
                </CardShell>
                <CardShell className="p-5">
                    <p className="text-sm" style={{ color: c.textMuted }}>In Progress</p>
                    <p className="mt-1 text-2xl font-bold">{inProgress}</p>
                </CardShell>
                <CardShell className="p-5">
                    <p className="text-sm" style={{ color: c.textMuted }}>Pending</p>
                    <p className="mt-1 text-2xl font-bold">{pending}</p>
                </CardShell>
                <CardShell className="p-5">
                    <p className="text-sm" style={{ color: c.textMuted }}>Issues Found</p>
                    <p className="mt-1 text-2xl font-bold text-red-400">12</p>
                </CardShell>
            </div>
        </div>
    );
};
export default ScanningView