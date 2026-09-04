"use client"
import { liveOutputLines, testIconMap } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import useProgressBar from "@/lib/Reusable-Components/ProgressBar";
import { SectionLabel } from "@/lib/Reusable-Components/SectionLabel";
import { StatusPill } from "@/lib/Reusable-Components/StatusPill";
import { ArrowLeft, Loader2, ShieldAlert, ShieldCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";




interface ScanningViewProps {
    newTestUrl: string
    setScanning: React.Dispatch<React.SetStateAction<boolean>>
    scanId: string
    setScanId: React.Dispatch<React.SetStateAction<string>>
    selectedTestNames: string[];
    setActiveNav: React.Dispatch<React.SetStateAction<string>>
}


const ScanningView = ({ setScanning, newTestUrl, scanId, selectedTestNames, setScanId, setActiveNav }: ScanningViewProps) => {
    const { c } = useColorContext()
    const { isDone, progress, scan } = useProgressBar({ scanId })
    const [error, setError] = useState("")

    const completedCount = scan?.testResultsCount ?? 0;
    const totalCount = selectedTestNames.length;
    const pendingCount = totalCount - completedCount;
    const inProgressCount = 0;


    useEffect(() => {
        if (isDone) {
            const timeOut = setTimeout(() => {
                setScanning(false)
                setActiveNav("History")
            }, 4000)
            return () => clearTimeout(timeOut)
        }
    }, [isDone])

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
                <ShieldAlert className="mb-4 h-10 w-10" style={{ color: c.textFaint }} />
                <p className="mb-1 text-lg font-semibold">Test Not Found</p>
                <p className="mb-6 text-sm" style={{ color: c.textMuted }}>{error}</p>
                <button
                    className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: c.accent }}
                    onClick={() => setScanning(false)}
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
                    <button
                        onClick={() => setScanning(false)}
                        className="mr-2 flex h-9 w-9 items-center justify-center rounded-lg border"
                        style={{ borderColor: c.cardBorder }}
                    >
                        <ArrowLeft className="h-4 w-4" style={{ color: c.textMuted }} />
                    </button>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10">
                        <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
                    </span>
                    <div>
                        <p className="text-lg font-semibold">Scanning {newTestUrl}</p>
                        <p className="text-sm" style={{ color: c.textMuted, width: `${progress}` }}></p>
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
                    <span style={{ color: c.textFaint }}>{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: c.inputBg }}>
                    <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600" style={{ width: `${progress}%` }} />
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
                    <p className="mt-1 text-2xl font-bold">{completedCount}</p>
                </CardShell>
                <CardShell className="p-5">
                    <p className="text-sm" style={{ color: c.textMuted }}>In Progress</p>
                    <p className="mt-1 text-2xl font-bold">{inProgressCount}</p>
                </CardShell>
                <CardShell className="p-5">
                    <p className="text-sm" style={{ color: c.textMuted }}>Pending</p>
                    <p className="mt-1 text-2xl font-bold">{pendingCount}</p>
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