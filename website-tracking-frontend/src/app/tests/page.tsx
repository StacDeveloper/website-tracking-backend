"use client"
import { useState, useMemo } from "react"
import { NavItems, resultTabs, severityMeta, summaryCards, testRows } from "../assets/assets"
import { ChevronRight, CircleCheckBig, ClipboardList, Crown, Download, ExternalLink, Globe, Headphones, Info, Moon, Play, Search, Share, Sun, X } from "lucide-react"
import { ScoreRing } from "@/lib/ScoreIn"



const TestPage = () => {

    const [theme, setTheme] = useState<"dark" | "light">("dark")
    const [activeNav, setActiveNav] = useState("Results")
    const [resultsTab, setResultsTab] = useState("all")
    const [query, setQuery] = useState("")

    const isDark = theme === "dark"

    const c = {
        mainBg: isDark ? "#050510" : "#f7f7fb",
        sidebarBg: isDark ? "#0a0a16" : "#ffffff",
        cardBg: isDark ? "#0c0c1a" : "#ffffff",
        cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,15,26,0.08)",
        textPrimary: isDark ? "#ffffff" : "#0f0f1a",
        textSecondary: isDark ? "#d1d5db" : "#4b5563",
        textMuted: isDark ? "#9ca3af" : "#6b7280",
        textFaint: isDark ? "#6b7280" : "#9ca3af",
        navHover: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,15,26,0.04)",
        activeNavBg: isDark ? "rgba(129,140,248,0.15)" : "rgba(79,70,229,0.1)",
        accent: isDark ? "#818cf8" : "#4f46e5",
        inputBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,15,26,0.03)",
        toggleBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,15,26,0.06)",
    }

    const filterRows = useMemo(() => {
        return testRows.filter((test) => {
            const matchesTab = resultsTab === "all" || test.type === resultsTab
            const matchesQuery = test.name.toLowerCase().includes(query.toLowerCase())
            return matchesTab && matchesQuery
        })
    }, [resultsTab, query])

    return (
        <div
            className="flex min-h-screen w-full"
            style={{ backgroundColor: c.mainBg, color: c.textPrimary, transition: "background-color 0.3s, color 0.3s" }}
        >
            {/* ---------- Sidebar ---------- */}
            <aside
                className="flex w-64 shrink-0 flex-col justify-between border-r px-4 py-6"
                style={{ backgroundColor: c.sidebarBg, borderColor: c.cardBorder }}
            >
                <div>
                    <div className="mb-8 flex items-center gap-2 px-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600">
                            <CircleCheckBig className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </span>
                        <span className="text-lg font-bold tracking-tight">
                            Web<span style={{ color: c.accent }}>Test</span>
                        </span>
                    </div>

                    <nav className="flex flex-col gap-1">
                        {NavItems.map((item) => {
                            const active = activeNav === item.label;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => setActiveNav(item.label)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                                    style={{
                                        backgroundColor: active ? c.activeNavBg : "transparent",
                                        color: active ? c.accent : c.textSecondary,
                                    }}
                                >
                                    <item.icon className="h-4 w-4" strokeWidth={2} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    <div
                        className="rounded-xl border p-4"
                        style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}
                    >
                        <div className="mb-1 flex items-center gap-2">
                            <Crown className="h-4 w-4 text-amber-400" />
                            <span className="text-sm font-semibold">Pro Plan</span>
                        </div>
                        <p className="text-xs" style={{ color: c.textMuted }}>
                            Tests Remaining
                        </p>
                        <p className="text-lg font-bold">78 / 100</p>
                        <div
                            className="my-2 h-1.5 w-full overflow-hidden rounded-full"
                            style={{ backgroundColor: c.inputBg }}
                        >
                            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600" style={{ width: "78%" }} />
                        </div>
                        <button
                            className="mt-2 w-full rounded-lg border py-1.5 text-xs font-semibold"
                            style={{ borderColor: c.cardBorder, color: c.textPrimary }}
                        >
                            Upgrade Plan
                        </button>
                    </div>

                    <div
                        className="rounded-xl border p-4"
                        style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}
                    >
                        <div className="mb-1 flex items-center gap-2">
                            <Headphones className="h-4 w-4" style={{ color: c.textMuted }} />
                            <span className="text-sm font-semibold">Need Help?</span>
                        </div>
                        <p className="mb-3 text-xs" style={{ color: c.textMuted }}>
                            Check our docs or contact support.
                        </p>
                        <button
                            className="w-full rounded-lg border py-1.5 text-xs font-semibold"
                            style={{ borderColor: c.cardBorder, color: c.textPrimary }}
                        >
                            View Docs
                        </button>
                    </div>
                </div>
            </aside>

            {/* ---------- Main ---------- */}
            <main className="flex-1 overflow-x-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between px-8 py-6">
                    <div className="flex items-center gap-1.5 text-sm" style={{ color: c.textMuted }}>
                        <span>Tests</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span style={{ color: c.textPrimary }} className="font-medium">
                            Test Details
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            aria-label="Toggle theme"
                            className="flex h-9 w-9 items-center justify-center rounded-full"
                            style={{ backgroundColor: c.toggleBg }}
                        >
                            {isDark ? <Moon className="h-4 w-4" style={{ color: c.textSecondary }} /> : <Sun className="h-4 w-4" style={{ color: c.textSecondary }} />}
                        </button>
                        <span
                            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                            style={{ backgroundColor: c.activeNavBg, color: c.accent }}
                        >
                            A
                        </span>
                    </div>
                </div>

                {activeNav !== "Results" ? (
                    <div className="flex flex-col items-center justify-center px-8 py-32 text-center">
                        <p className="text-lg font-semibold">{activeNav}</p>
                        <p className="mt-2 max-w-sm text-sm" style={{ color: c.textMuted }}>
                            This section is coming soon. Switching tabs here updates state only — no page reload.
                        </p>
                    </div>
                ) : (
                    <div className="px-8 pb-16">
                        {/* Test header card */}
                        <div
                            className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border p-5"
                            style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}
                        >
                            <div className="flex items-center gap-4">
                                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10">
                                    <Globe className="h-5 w-5 text-indigo-400" />
                                </span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-semibold">https://example.com</span>
                                        <ExternalLink className="h-4 w-4" style={{ color: c.textFaint }} />
                                    </div>
                                    <p className="text-sm" style={{ color: c.textMuted }}>
                                        Tested on 3 May 2025, 12:42 PM &bull; Test ID: WT-1746272523
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium"
                                    style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                                >
                                    <Download className="h-4 w-4" />
                                    Download Report
                                </button>
                                <button
                                    className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium"
                                    style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                                >
                                    <Share className="h-4 w-4" />
                                    Share
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white">
                                    <Play className="h-4 w-4" />
                                    Re-run Test
                                </button>
                            </div>
                        </div>

                        {/* Summary cards */}
                        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
                            <div
                                className="col-span-2 flex flex-col items-center rounded-xl border p-5 sm:col-span-1"
                                style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}
                            >
                                <div className="mb-2 flex items-center gap-1.5 self-start text-sm font-medium" style={{ color: c.textMuted }}>
                                    Overall Score
                                    <Info className="h-3.5 w-3.5" style={{ color: c.textFaint }} />
                                </div>
                                <div className="relative flex h-[120px] w-[120px] items-center justify-center">
                                    <ScoreRing score={78} accent={c.accent} />
                                    <div className="absolute flex flex-col items-center">
                                        <span className="text-3xl font-bold leading-none">78</span>
                                        <span className="mt-1 text-xs" style={{ color: c.textFaint }}>
                                            /100
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm font-semibold text-emerald-400">Good</p>
                                <p className="mt-1 text-center text-xs" style={{ color: c.textFaint }}>
                                    Keep going! Some issues need your attention.
                                </p>
                            </div>

                            <div
                                className="rounded-xl border p-5"
                                style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}
                            >
                                <p className="text-sm font-medium" style={{ color: c.textMuted }}>
                                    Total Tests
                                </p>
                                <p className="mt-1 text-2xl font-bold">21</p>
                                <p className="mt-1 flex items-center gap-1 text-xs" style={{ color: c.textFaint }}>
                                    <ClipboardList className="h-3 w-3" /> Completed
                                </p>
                            </div>

                            {summaryCards.map((card) => (
                                <div
                                    key={card.label}
                                    className="rounded-xl border p-5"
                                    style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}
                                >
                                    <p className="text-sm font-medium" style={{ color: c.textMuted }}>
                                        {card.label}
                                    </p>
                                    <p className="mt-1 text-2xl font-bold">{card.value}</p>
                                    <p className={`mt-1 flex items-center gap-1 text-xs ${card.color}`}>
                                        <card.icon className="h-3 w-3" /> Issues Found
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Tabs + search */}
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2 rounded-lg border p-1" style={{ borderColor: c.cardBorder }}>
                                {resultTabs.map((tab) => {
                                    const active = resultsTab === tab.value;
                                    return (
                                        <button
                                            key={tab.value}
                                            onClick={() => setResultsTab(tab.value)}
                                            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium"
                                            style={{
                                                backgroundColor: active ? c.activeNavBg : "transparent",
                                                color: active ? c.accent : c.textSecondary,
                                            }}
                                        >
                                            {tab.label}
                                            <span
                                                className="rounded px-1.5 py-0.5 text-xs"
                                                style={{ backgroundColor: c.inputBg, color: c.textFaint }}
                                            >
                                                {tab.count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden items-center gap-3 text-xs sm:flex" style={{ color: c.textMuted }}>
                                    {Object.entries(severityMeta).map(([label, meta]) => (
                                        <span key={label} className="flex items-center gap-1.5">
                                            <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                                            {label}
                                        </span>
                                    ))}
                                </div>

                                <div
                                    className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
                                    style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg }}
                                >
                                    {query ? (
                                        <X className="h-4 w-4 cursor-pointer" style={{ color: c.textFaint }} onClick={() => setQuery("")} />
                                    ) : (
                                        <Search className="h-4 w-4" style={{ color: c.textFaint }} />
                                    )}
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search tests..."
                                        className="w-32 bg-transparent text-sm focus:outline-none"
                                        style={{ color: c.textPrimary }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: c.cardBorder }}>
                            <table className="w-full min-w-[900px] border-collapse text-sm">
                                <thead>
                                    <tr className="border-b text-left" style={{ borderColor: c.cardBorder }}>
                                        {["Test", "Type", "Status", "Issues", "AI Suggestion", ""].map((h) => (
                                            <th key={h} className="px-5 py-3 font-medium" style={{ color: c.textFaint }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterRows.map((row) => {
                                        const sev = severityMeta[row.severity];
                                        const typeColor = row.type === "Active" ? "text-emerald-400 bg-emerald-500/10" : "text-indigo-400 bg-indigo-500/10";
                                        return (
                                            <tr key={row.name} className="border-b last:border-0" style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${row.iconBg}`}>
                                                            <row.icon className={`h-4 w-4 ${row.iconColor}`} />
                                                        </span>
                                                        <div>
                                                            <p className="font-medium">{row.name}</p>
                                                            <p className="text-xs" style={{ color: c.textFaint }}>
                                                                {row.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${typeColor}`}>{row.type}</span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${sev.bg} ${sev.text}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${sev.dot}`} />
                                                        {row.severity}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${sev.bg} ${sev.text}`}>
                                                        {row.issues}
                                                    </span>
                                                </td>
                                                <td className="max-w-xs px-5 py-4 text-xs" style={{ color: c.textMuted }}>
                                                    {row.suggestion}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <button
                                                        className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium"
                                                        style={{ borderColor: c.cardBorder, color: c.accent }}
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {filterRows.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-5 py-10 text-center text-sm" style={{ color: c.textMuted }}>
                                                No tests match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default TestPage