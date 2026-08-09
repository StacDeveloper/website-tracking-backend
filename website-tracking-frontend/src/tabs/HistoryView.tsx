"use client"
import { historyRows } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { Calendar, ChevronDown, Download, Filter, MoreVertical, Search } from "lucide-react";
import { useMemo } from "react";



interface HistoryViewProps {
    historyQuery: string
    setHistoryQuery: React.Dispatch<React.SetStateAction<string>>
}

const HistoryView = ({ historyQuery, setHistoryQuery }: HistoryViewProps) => {
    const filteredHistory = useMemo(
        () => historyRows.filter((r) => r.target.toLowerCase().includes(historyQuery.toLowerCase())),
        [historyQuery]
    );

    const { c } = useColorContext()
    return (
        <div className="px-8 pb-16">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold">Test History</h1>
                    <p className="text-sm" style={{ color: c.textMuted }}>View and manage all your past security tests.</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium" style={{ borderColor: c.cardBorder, color: c.textSecondary }}>
                    <Download className="h-4 w-4" /> Export Report
                </button>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg, minWidth: 220 }}>
                    <Search className="h-4 w-4" style={{ color: c.textFaint }} />
                    <input
                        value={historyQuery}
                        onChange={(e) => setHistoryQuery(e.target.value)}
                        placeholder="Search by domain or URL..."
                        className="w-full bg-transparent text-sm focus:outline-none"
                        style={{ color: c.textPrimary }}
                    />
                </div>
                {["Filter by Status", "Filter by Score"].map((label) => (
                    <button key={label} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: c.cardBorder, color: c.textSecondary }}>
                        <Filter className="h-3.5 w-3.5" /> {label} <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                ))}
                <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: c.cardBorder, color: c.textSecondary }}>
                    <Calendar className="h-3.5 w-3.5" /> Select Date Range
                </button>
            </div>

            <CardShell className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b text-left" style={{ borderColor: c.cardBorder }}>
                                {["Target", "Tests Executed", "Score", "Issues", "Status", "Date", "Action"].map((h) => (
                                    <th key={h} className="px-5 py-3 font-medium" style={{ color: c.textFaint }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.map((row) => (
                                <tr key={row.target} className="border-b last:border-0" style={{ borderColor: c.cardBorder }}>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${row.iconBg}`}>
                                                <row.icon className={`h-4 w-4 ${row.iconColor}`} />
                                            </span>
                                            <span className="font-medium">{row.target}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4" style={{ color: c.textSecondary }}>{row.tests} Tests</td>
                                    <td className="px-5 py-4 font-semibold" style={{ color: row.score >= 75 ? "#34d399" : row.score >= 50 ? "#fbbf24" : "#f87171" }}>
                                        {row.score}/100
                                    </td>
                                    <td className="px-5 py-4" style={{ color: c.textSecondary }}>{row.issues}</td>
                                    <td className="px-5 py-4">
                                        <span
                                            className="rounded-md px-2 py-1 text-xs font-medium"
                                            style={row.status === "Completed" ? { backgroundColor: "rgba(52,211,153,0.1)", color: "#34d399" } : { backgroundColor: "rgba(248,113,113,0.1)", color: "#f87171" }}
                                        >
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap" style={{ color: c.textFaint }}>{row.date}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium" style={{ borderColor: c.cardBorder, color: c.accent }}>
                                                View Report
                                            </button>
                                            <MoreVertical className="h-4 w-4 cursor-pointer" style={{ color: c.textFaint }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardShell>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm" style={{ color: c.textMuted }}>
                <span>Showing 1 to {filteredHistory.length} of 24 results</span>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((p) => (
                        <button
                            key={p}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-xs"
                            style={p === 1 ? { borderColor: c.accent, color: c.accent } : { borderColor: c.cardBorder, color: c.textMuted }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HistoryView