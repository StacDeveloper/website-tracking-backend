"use client"
import { individualTestOptions } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { SectionLabel } from "@/lib/Reusable-Components/SectionLabel";
import { AlertTriangle, Check, ChevronDown, ClipboardList, Globe, Loader2, Play, Upload } from "lucide-react";

interface NewTestViewProps {
    startScan: (e: React.FormEvent) => void
    newTestUrl: string
    setNewTestUrl: React.Dispatch<React.SetStateAction<string>>
    newTestType: "Active" | "Passive"
    setNewTestType: React.Dispatch<React.SetStateAction<"Active" | "Passive">>
    selectedTestNames: any
    setSelectedTestNames: any
    toggleTestName: (name: string) => void
}



const NewTestView = ({ startScan, newTestUrl, setNewTestUrl, newTestType, setNewTestType, selectedTestNames, setSelectedTestNames, toggleTestName }: NewTestViewProps) => {
    const { c } = useColorContext()
    return (
        <div className="px-8 pb-16">
            <h1 className="mb-1 text-xl font-bold">New Test</h1>
            <p className="mb-5 text-sm" style={{ color: c.textMuted }}>
                Start a new security test for your website or application.
            </p>

            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
                <CardShell className="p-5">
                    <SectionLabel>1. Enter Target</SectionLabel>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium" style={{ color: c.textMuted }}>Target URL</label>
                        <button className="flex items-center gap-1 text-xs font-medium" style={{ color: c.accent }}>
                            Add from Saved <ChevronDown className="h-3 w-3" />
                        </button>
                    </div>
                    <input
                        value={newTestUrl}
                        onChange={(e) => setNewTestUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="mt-2 w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none"
                        style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg, color: c.textPrimary }}
                    />
                    <p className="mt-2 text-xs" style={{ color: c.textFaint }}>Enter the full URL including https://</p>
                </CardShell>

                <div
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center"
                    style={{ borderColor: c.cardBorder }}
                >
                    <p className="mb-3 text-sm font-medium" style={{ color: c.textSecondary }}>or Upload File</p>
                    <Upload className="mb-3 h-6 w-6" style={{ color: c.textFaint }} />
                    <p className="mb-3 text-xs" style={{ color: c.textFaint }}>Drag &amp; drop your file here or</p>
                    <button className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: c.accent }}>
                        Choose File
                    </button>
                </div>
            </div>

            <CardShell className="mb-4 p-5">
                <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                        2. Select Tests
                        <span className="rounded px-1.5 py-0.5 text-xs" style={{ backgroundColor: c.activeNavBg, color: c.accent }}>
                            {selectedTestNames.size} Selected
                        </span>
                    </span>
                    <button className="text-xs font-medium" style={{ color: c.textMuted }} onClick={() => setSelectedTestNames(new Set())}>
                        Deselect All
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
                    <div className="flex flex-col gap-2">
                        {(["Active", "Passive"] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setNewTestType(t)}
                                className="rounded-lg border p-4 text-left"
                                style={{
                                    borderColor: newTestType === t ? c.accent : c.cardBorder,
                                    backgroundColor: newTestType === t ? c.activeNavBg : "transparent",
                                }}
                            >
                                <p className="text-sm font-semibold">{t} Tests</p>
                                <p className="mt-0.5 text-xs" style={{ color: c.textFaint }}>
                                    {t === "Active" ? "Simulate real attacks" : "Observe & analyze"}
                                </p>
                            </button>
                        ))}
                    </div>

                    <div>
                        <p className="mb-2 text-xs font-medium" style={{ color: c.textMuted }}>Select Individual Tests</p>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {individualTestOptions.slice(0, 7).map((name) => {
                                const checked = selectedTestNames.has(name);
                                return (
                                    <button
                                        key={name}
                                        onClick={() => toggleTestName(name)}
                                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs"
                                        style={{ borderColor: checked ? c.accent : c.cardBorder, backgroundColor: checked ? c.activeNavBg : "transparent" }}
                                    >
                                        <span
                                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
                                            style={{ backgroundColor: checked ? c.accent : c.inputBg, border: checked ? "none" : `1px solid ${c.cardBorder}` }}
                                        >
                                            {checked && <Check className="h-3 w-3 text-white" />}
                                        </span>
                                        {name}
                                    </button>
                                );
                            })}
                            <span className="flex items-center justify-center rounded-lg border px-3 py-2 text-xs font-medium" style={{ borderColor: c.cardBorder, color: c.textFaint }}>
                                + {individualTestOptions.length - 7} more
                            </span>
                        </div>
                    </div>
                </div>
            </CardShell>

            <CardShell className="mb-4 p-5">
                <SectionLabel>3. Test Summary</SectionLabel>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        ["Target", newTestUrl || "https://example.com", Globe],
                        ["Test Type", `${newTestType} Tests`, ClipboardList],
                        ["Tests Selected", String(selectedTestNames.size), Check],
                        ["Est. Duration", "15 - 25 min", Loader2],
                    ].map(([label, value, Icon]: any) => (
                        <div key={label} className="flex items-center gap-2.5">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: c.inputBg }}>
                                <Icon className="h-4 w-4" style={{ color: c.textMuted }} />
                            </span>
                            <div>
                                <p className="text-xs" style={{ color: c.textFaint }}>{label}</p>
                                <p className="text-sm font-medium">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardShell>

            <div
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
                style={{ borderColor: "rgba(245,158,11,0.3)", backgroundColor: "rgba(245,158,11,0.06)" }}
            >
                <p className="flex items-center gap-2 text-xs" style={{ color: "#fbbf24" }}>
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    Ensure you have permission to test this target. Unauthorized testing may be illegal.
                </p>
                <button onClick={startScan} className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: c.accent }}>
                    <Play className="h-4 w-4" /> Start Scan
                </button>
            </div>
        </div>
    );
}

export default NewTestView