"use client"
import { activeTests, allTests, passiveTests, severityMeta } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Cardshell";
import { Search, X } from "lucide-react";
import { useMemo } from "react";

const ResultsListView = (
    { resultsTab, setResultsTab, query, setQuery, openTest }:
        { resultsTab: string, setResultsTab: React.Dispatch<React.SetStateAction<string>>, query: string, setQuery: React.Dispatch<React.SetStateAction<string>>, openTest: any }
) => {
    const filteredRows = useMemo(() => {
        const base = resultsTab === "all" ? allTests : resultsTab === "Active" ? activeTests : passiveTests;
        return base.filter((row) => row.name.toLowerCase().includes(query.toLowerCase()));
    }, [resultsTab, query]);
    const { c } = useColorContext()
    const resultTabsList = [
        { label: "All Tests", value: "all", count: allTests.length },
        { label: "Active", value: "Active", count: activeTests.length },
        { label: "Passive", value: "Passive", count: passiveTests.length },
    ]
    return <>
        <div className="px-8 pb-16">
            <h1 className="mb-1 text-xl font-bold">
                {resultsTab === "Active" ? "Active Tests" : resultsTab === "Passive" ? "Passive Tests" : "All Tests"}
            </h1>
            <p className="mb-5 text-sm" style={{ color: c.textMuted }}>
                {resultsTab === "Active"
                    ? "Active tests make requests to your target and analyze the responses."
                    : resultsTab === "Passive"
                        ? "Passive tests analyze responses and configurations without sending intrusive payloads."
                        : "Every test WebTest ran against your target."}
            </p>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 rounded-lg border p-1" style={{ borderColor: c.cardBorder }}>
                    {resultTabsList.map((tab) => {
                        const active = resultsTab === tab.value;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => setResultsTab(tab.value)}
                                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium"
                                style={{ backgroundColor: active ? c.activeNavBg : "transparent", color: active ? c.accent : c.textSecondary }}
                            >
                                {tab.label}
                                <span className="rounded px-1.5 py-0.5 text-xs" style={{ backgroundColor: c.inputBg, color: c.textFaint }}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5" style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg }}>
                    {query ? (
                        <X className="h-4 w-4 cursor-pointer" style={{ color: c.textFaint }} onClick={() => setQuery("")} />
                    ) : (
                        <Search className="h-4 w-4" style={{ color: c.textFaint }} />
                    )}
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={`Search ${resultsTab === "all" ? "" : resultsTab.toLowerCase() + " "}tests...`}
                        className="w-40 bg-transparent text-sm focus:outline-none"
                        style={{ color: c.textPrimary }}
                    />
                </div>
            </div>

            <CardShell>
                <div className="divide-y" style={{ borderColor: c.cardBorder }}>
                    {filteredRows.map((row) => {
                        const sev = severityMeta[row.severity];
                        return (
                            <div key={row.name} className="flex items-center justify-between gap-4 px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${row.iconBg}`}>
                                        <row.icon className={`h-4 w-4 ${row.iconColor}`} />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">{row.name}</p>
                                        <p className="text-xs" style={{ color: c.textFaint }}>{row.desc}</p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-6">
                                    <span className={`flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${sev.bg} ${sev.text}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full ${sev.dot}`} />
                                        {row.severity}
                                    </span>
                                    <span className="text-xs" style={{ color: c.textFaint }}>
                                        {row.issues} {row.issues === 1 ? "Issue" : "Issues"}
                                    </span>
                                    <button
                                        onClick={() => openTest(row)}
                                        className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium"
                                        style={{ borderColor: c.cardBorder, color: c.accent }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {filteredRows.length === 0 && (
                        <p className="px-5 py-10 text-center text-sm" style={{ color: c.textMuted }}>
                            No tests match your search.
                        </p>
                    )}
                </div>
            </CardShell>
        </div>
    </>
}

export default ResultsListView