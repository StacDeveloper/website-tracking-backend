"use client";

import { severityMeta, Test } from "@/app/assets/assets";
import { useBackendContext } from "@/app/context/useBackendContext";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import {
    Ban,
    Cookie,
    FlaskConical,
    FolderTree,
    Globe,
    Link2,
    Search,
    ShieldCheck,
    X,
    Lock,
    LucideIcon,
    ShieldAlert,
    Bug,
    KeyRound,
    Server,
} from "lucide-react";
import { useMemo } from "react";

interface ResultViewProps {
    resultsTab: string;
    setResultsTab: React.Dispatch<React.SetStateAction<string>>;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    openTest: (test: Test) => void;
}

interface ResultRow {
    id: string;
    name: string;
    category: string;
    severity: keyof typeof severityMeta;
    issues: number;
    desc: string;
    scanType: string;
    status: string;
    aiSummary?: string;
    aiSuggestion?: string | null;
    rawResult?: unknown;
}

const categoryMeta: Record<
    string,
    {
        name: string;
        icon: LucideIcon;
        bg: string;
    }
> = {
    SECURITY_HEADERS: {
        name: "Security Headers",
        icon: ShieldCheck,
        bg: "bg-purple-500/10",
    },

    TLS_SSL: {
        name: "TLS / SSL",
        icon: Lock,
        bg: "bg-emerald-500/10",
    },

    CORS: {
        name: "CORS",
        icon: Globe,
        bg: "bg-purple-500/10",
    },

    CLICKJACKING: {
        name: "Clickjacking",
        icon: Ban,
        bg: "bg-pink-500/10",
    },

    INFO_DISCLOSURE: {
        name: "Information Disclosure",
        icon: FlaskConical,
        bg: "bg-sky-500/10",
    },

    SESSION_COOKIE: {
        name: "Session Cookie",
        icon: Cookie,
        bg: "bg-fuchsia-500/10",
    },

    OPEN_REDIRECT: {
        name: "Open Redirect",
        icon: Link2,
        bg: "bg-rose-500/10",
    },

    PATH_TRAVERSAL: {
        name: "Path Traversal",
        icon: FolderTree,
        bg: "bg-emerald-500/10",
    },

    JWT: {
        name: "JWT",
        icon: KeyRound,
        bg: "bg-yellow-500/10",
    },

    CSRF: {
        name: "CSRF",
        icon: ShieldAlert,
        bg: "bg-orange-500/10",
    },

    SSRF: {
        name: "SSRF",
        icon: Server,
        bg: "bg-blue-500/10",
    },

    DEPENDENCY_CVE: {
        name: "Dependency CVE",
        icon: Bug,
        bg: "bg-red-500/10",
    },
};

const defaultCategory = {
    name: "Security Test",
    icon: ShieldCheck,
    bg: "bg-slate-500/10",
};

const ResultsListView = ({
    resultsTab,
    setResultsTab,
    query,
    setQuery,
    openTest,
}: ResultViewProps) => {
    const { tests } = useBackendContext();
    const { c } = useColorContext();

    /**
     * Convert backend GraphQL response:
     *
     * getAlluserTests[]
     *    └── testResults[]
     *
     * into a flat array that the UI can render.
     */
    const resultsRow = useMemo<ResultRow[]>(() => {
        if (!Array.isArray(tests)) {
            return [];
        }

        return tests.flatMap((test: any) => {
            if (!Array.isArray(test.testResults)) {
                return [];
            }

            return test.testResults.map((result: any, index: number) => {
                const category = result.category ?? "UNKNOWN";

                /**
                 * Backend severity is currently null.
                 * We use "Info" as a safe fallback so
                 * severityMeta[row.severity] never becomes undefined.
                 */
                const severity =
                    result.severity &&
                    severityMeta[result.severity as keyof typeof severityMeta]
                        ? result.severity
                        : "Info";

                return {
                    id: `${test.id}-${category}-${index}`,

                    name:
                        categoryMeta[category]?.name ??
                        category
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char: string) =>
                                char.toUpperCase()
                            ),

                    category,

                    severity: severity as keyof typeof severityMeta,

                    issues:
                        result.status === "VULNERABLE" ||
                        result.status === "FAILED"
                            ? 1
                            : 0,

                    desc:
                        result.aiSuggestion ||
                        "No description available",

                    scanType: test.scanType ?? "UNKNOWN",

                    status: result.status ?? "UNKNOWN",

                    aiSummary: test.aiSummary,

                    aiSuggestion: result.aiSuggestion,

                    rawResult: result.rawResult,
                };
            });
        });
    }, [tests]);

    /**
     * Tabs
     *
     * Backend returns:
     * "PASSIVE"
     * "ACTIVE"
     *
     * So we compare against uppercase values.
     */
    const resultTabsList = [
        {
            label: "All Tests",
            value: "all",
            count: resultsRow.length,
        },
        {
            label: "Active",
            value: "Active",
            count: resultsRow.filter(
                (row) => row.scanType === "ACTIVE"
            ).length,
        },
        {
            label: "Passive",
            value: "Passive",
            count: resultsRow.filter(
                (row) => row.scanType === "PASSIVE"
            ).length,
        },
    ];

    /**
     * Search + tab filtering
     */
    const filteredRows = useMemo(() => {
        let base = resultsRow;

        if (resultsTab === "Active") {
            base = base.filter(
                (row) => row.scanType === "ACTIVE"
            );
        }

        if (resultsTab === "Passive") {
            base = base.filter(
                (row) => row.scanType === "PASSIVE"
            );
        }

        const search = query.trim().toLowerCase();

        if (!search) {
            return base;
        }

        return base.filter((row) =>
            row.name.toLowerCase().includes(search)
        );
    }, [resultsTab, resultsRow, query]);

    return (
        <div className="px-8 pb-16">
            {/* Header */}
            <h1 className="mb-1 text-xl font-bold">
                {resultsTab === "Active"
                    ? "Active Tests"
                    : resultsTab === "Passive"
                        ? "Passive Tests"
                        : "All Tests"}
            </h1>

            <p
                className="mb-5 text-sm"
                style={{ color: c.textMuted }}
            >
                {resultsTab === "Active"
                    ? "Active tests make requests to your target and analyze the responses."
                    : resultsTab === "Passive"
                        ? "Passive tests analyze responses and configurations without sending intrusive payloads."
                        : "Every test WebTest ran against your target."}
            </p>

            {/* Tabs + Search */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                {/* Tabs */}
                <div
                    className="flex items-center gap-2 rounded-lg border p-1"
                    style={{
                        borderColor: c.cardBorder,
                    }}
                >
                    {resultTabsList.map((tab) => {
                        const active =
                            resultsTab === tab.value;

                        return (
                            <button
                                key={tab.value}
                                onClick={() =>
                                    setResultsTab(tab.value)
                                }
                                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium"
                                style={{
                                    backgroundColor: active
                                        ? c.activeNavBg
                                        : "transparent",
                                    color: active
                                        ? c.accent
                                        : c.textSecondary,
                                }}
                            >
                                {tab.label}

                                <span
                                    className="rounded px-1.5 py-0.5 text-xs"
                                    style={{
                                        backgroundColor: c.inputBg,
                                        color: c.textFaint,
                                    }}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div
                    className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
                    style={{
                        borderColor: c.cardBorder,
                        backgroundColor: c.inputBg,
                    }}
                >
                    {query ? (
                        <X
                            className="h-4 w-4 cursor-pointer"
                            style={{
                                color: c.textFaint,
                            }}
                            onClick={() => setQuery("")}
                        />
                    ) : (
                        <Search
                            className="h-4 w-4"
                            style={{
                                color: c.textFaint,
                            }}
                        />
                    )}

                    <input
                        value={query}
                        onChange={(e) =>
                            setQuery(e.target.value)
                        }
                        placeholder={`Search ${
                            resultsTab === "all"
                                ? ""
                                : resultsTab.toLowerCase() + " "
                        }tests...`}
                        className="w-40 bg-transparent text-sm focus:outline-none"
                        style={{
                            color: c.textPrimary,
                        }}
                    />
                </div>
            </div>

            {/* Results */}
            <CardShell>
                <div
                    className="divide-y"
                    style={{
                        borderColor: c.cardBorder,
                    }}
                >
                    {filteredRows.map((row) => {
                        /**
                         * Get severity metadata safely.
                         */
                        const sev =
                            severityMeta[row.severity] ??
                            severityMeta.Info;

                        /**
                         * Get category metadata.
                         */
                        const category =
                            categoryMeta[row.category] ??
                            defaultCategory;

                        const IconToDisplay =
                            category.icon;

                        return (
                            <div
                                key={row.id}
                                className="flex items-center justify-between gap-4 px-5 py-4"
                            >
                                {/* Left */}
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${category.bg}`}
                                    >
                                        <IconToDisplay
                                            className="h-4 w-4"
                                        />
                                    </span>

                                    <div>
                                        <p className="text-sm font-medium">
                                            {row.name}
                                        </p>

                                        <p
                                            className="text-xs"
                                            style={{
                                                color: c.textFaint,
                                            }}
                                        >
                                            {row.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex shrink-0 items-center gap-6">
                                    {/* Severity */}
                                    <span
                                        className={`flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${sev.bg} ${sev.text}`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${sev.dot}`}
                                        />

                                        {row.severity}
                                    </span>

                                    {/* Issues */}
                                    <span
                                        className="text-xs"
                                        style={{
                                            color: c.textFaint,
                                        }}
                                    >
                                        {row.issues}{" "}
                                        {row.issues === 1
                                            ? "Issue"
                                            : "Issues"}
                                    </span>

                                    {/* Status */}
                                    <span
                                        className="text-xs"
                                        style={{
                                            color: c.textFaint,
                                        }}
                                    >
                                        {row.status}
                                    </span>

                                    {/* View details */}
                                    <button
                                        onClick={() =>
                                            openTest(
                                                row as unknown as Test
                                            )
                                        }
                                        className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium"
                                        style={{
                                            borderColor:
                                                c.cardBorder,
                                            color: c.accent,
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {/* Empty state */}
                    {filteredRows.length === 0 && (
                        <p
                            className="px-5 py-10 text-center text-sm"
                            style={{
                                color: c.textMuted,
                            }}
                        >
                            {query
                                ? "No tests match your search."
                                : "No test results available."}
                        </p>
                    )}
                </div>
            </CardShell>
        </div>
    );
};

export default ResultsListView;