
import { historyIcons } from "@/app/assets/assets";
import { useBackendContext } from "@/app/context/useBackendContext";
import { useColorContext } from "@/app/context/useColorContext";
import { calculateScore } from "@/lib/CalculateScore";
import { formatDate } from "@/lib/FormateDate";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { HistoryTest } from "@/app/context/useBackendContext"
import {
    Bookmark,
    BookmarkCheck,
    Calendar,
    ChevronDown,
    Download,
    Filter,
    MoreVertical,
    Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import LinkResult from "./LinkResult";
import { usePagination } from "@/lib/usePagination";

interface HistoryViewProps {
    historyQuery: string;
    setHistoryQuery: React.Dispatch<React.SetStateAction<string>>;
    viewingId: string | null
    setViewingId: React.Dispatch<React.SetStateAction<string | null>>;
}



const headers = ["Target", "Tests Executed", "Score", "Issues", "Status", "Date", "Save", "Action"]

const HistoryView = ({
    historyQuery,
    setHistoryQuery,
    viewingId,
    setViewingId
}: HistoryViewProps) => {
    const { historyTests } = useBackendContext();
    const { c } = useColorContext();

    const [savedTests, setSavedTests] = useState<string[]>([]);

    const makeApiCallToSave = async (websiteId: string) => {
        const response = await fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                query: `mutation postSavedUrl($websiteId:ID!){
                saveWebsite(websiteId:$websiteId)
                }`, variables: { websiteId }
            })
        })
        const { data, errors } = await response.json()
        if (errors) {
            console.error(errors)
            return;
        }
        console.log(data)
        return data.saveWebsite
    }

    const filteredHistory = useMemo(() => {
        if (!Array.isArray(historyTests)) {
            return [];
        }

        const search = historyQuery.trim().toLowerCase();

        if (!search) {
            return historyTests;
        }

        return historyTests.filter((row: HistoryTest) =>
            row.website?.url
                ?.toLowerCase()
                .includes(search)
        );
    }, [historyTests, historyQuery]);

    const { page, setPage, paginatedItems, totalPages } = usePagination(filteredHistory, 10)


    if (viewingId) {
        return <LinkResult scanId={viewingId} onBack={() => setViewingId(null)} />
    }

    return (
        <div className="px-8 pb-16">
            {/* Header */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold">
                        Test History
                    </h1>

                    <p
                        className="text-sm"
                        style={{
                            color: c.textMuted,
                        }}
                    >
                        View and manage all your past security tests.
                    </p>
                </div>

                <button
                    className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium"
                    style={{
                        borderColor: c.cardBorder,
                        color: c.textSecondary,
                    }}
                >
                    <Download className="h-4 w-4" />
                    Export Report
                </button>
            </div>

            {/* Search / Filters */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
                {/* Search */}
                <div
                    className="flex flex-1 items-center gap-2 rounded-lg border px-3 py-2"
                    style={{
                        borderColor: c.cardBorder,
                        backgroundColor: c.inputBg,
                        minWidth: 220,
                    }}
                >
                    <Search
                        className="h-4 w-4"
                        style={{
                            color: c.textFaint,
                        }}
                    />

                    <input
                        value={historyQuery}
                        onChange={(e) =>
                            setHistoryQuery(e.target.value)
                        }
                        placeholder="Search by domain or URL..."
                        className="w-full bg-transparent text-sm focus:outline-none"
                        style={{
                            color: c.textPrimary,
                        }}
                    />
                </div>

                {/* Status Filter */}
                <button
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    style={{
                        borderColor: c.cardBorder,
                        color: c.textSecondary,
                    }}
                >
                    <Filter className="h-3.5 w-3.5" />
                    Filter by Status
                    <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {/* Score Filter */}
                <button
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    style={{
                        borderColor: c.cardBorder,
                        color: c.textSecondary,
                    }}
                >
                    <Filter className="h-3.5 w-3.5" />
                    Filter by Score
                    <ChevronDown className="h-3.5 w-3.5" />
                </button>

                {/* Date Range */}
                <button
                    className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                    style={{
                        borderColor: c.cardBorder,
                        color: c.textSecondary,
                    }}
                >
                    <Calendar className="h-3.5 w-3.5" />
                    Select Date Range
                </button>
            </div>

            {/* History Table */}
            <CardShell className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse text-sm">
                        <thead>
                            <tr
                                className="border-b text-left"
                                style={{
                                    borderColor: c.cardBorder,
                                }}
                            >
                                {headers.map((heading) => (
                                    <th
                                        key={heading}
                                        className="px-5 py-3 font-medium"
                                        style={{
                                            color: c.textFaint,
                                        }}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedItems.map(
                                (row: HistoryTest, index) => {
                                    const score =
                                        calculateScore(
                                            row.passedCount,
                                            row.testResultsCount
                                        );
                                    const historyIcon = historyIcons[index % historyIcons.length];
                                    const Icon = historyIcon.icon;

                                    const scoreColor =
                                        score >= 75
                                            ? "#34d399"
                                            : score >= 50
                                                ? "#fbbf24"
                                                : "#f87171";

                                    const isCompleted =
                                        row.status ===
                                        "COMPLETED";

                                    return (
                                        <tr
                                            key={row.id}
                                            className="border-b last:border-0"
                                            style={{
                                                borderColor:
                                                    c.cardBorder,
                                            }}
                                        >
                                            {/* Target */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                                                        <Icon className={`h-4 w-4 text-purple-400 ${historyIcon.color}`} />
                                                    </span>

                                                    <div className="max-w-[280px]">
                                                        <span
                                                            className="block truncate font-medium"
                                                            title={
                                                                row
                                                                    .website
                                                                    ?.url
                                                            }
                                                        >
                                                            {row.website
                                                                ?.url ??
                                                                "Unknown target"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Tests */}
                                            <td
                                                className="px-5 py-4"
                                                style={{
                                                    color: c.textSecondary,
                                                }}
                                            >
                                                {
                                                    row.testResultsCount
                                                }{" "}
                                                {row.testResultsCount ===
                                                    1
                                                    ? "Test"
                                                    : "Tests"}
                                            </td>

                                            {/* Score */}
                                            <td
                                                className="px-5 py-4 font-semibold"
                                                style={{
                                                    color: scoreColor,
                                                }}
                                            >
                                                {score}/100
                                            </td>

                                            {/* Issues */}
                                            <td
                                                className="px-5 py-4"
                                                style={{
                                                    color: c.textSecondary,
                                                }}
                                            >
                                                {row.issueCount}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className="rounded-md px-2 py-1 text-xs font-medium"
                                                    style={
                                                        isCompleted
                                                            ? {
                                                                backgroundColor:
                                                                    "rgba(52,211,153,0.1)",
                                                                color:
                                                                    "#34d399",
                                                            }
                                                            : {
                                                                backgroundColor:
                                                                    "rgba(248,113,113,0.1)",
                                                                color:
                                                                    "#f87171",
                                                            }
                                                    }
                                                >
                                                    {row.status}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td
                                                className="whitespace-nowrap px-5 py-4"
                                                style={{
                                                    color: c.textFaint,
                                                }}
                                            >
                                                {formatDate(
                                                    row.completedAt
                                                )}
                                            </td>
                                            {/* Save / Bookmark */}
                                            <td className="px-5 py-4">
                                                <button
                                                    type="button"
                                                    onClick={async () => {
                                                        const nowSaved = await makeApiCallToSave(row.website.id)
                                                        if (nowSaved === null) return;
                                                        setSavedTests((prev) => nowSaved ? [...prev, row.id] : prev.filter((p) => row.id !== p))
                                                    }}
                                                    title={
                                                        savedTests.includes(row.id)
                                                            ? "Remove from saved"
                                                            : "Save report"
                                                    }
                                                    className="group flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-150"
                                                    style={{
                                                        borderColor: savedTests.includes(row.id)
                                                            ? `${c.accent}55`
                                                            : c.cardBorder,
                                                        backgroundColor: savedTests.includes(row.id)
                                                            ? `${c.accent}12`
                                                            : "transparent",
                                                    }}
                                                >
                                                    {savedTests.includes(row.id) ? (
                                                        <BookmarkCheck
                                                            className="h-4 w-4"
                                                            style={{
                                                                color: c.accent,
                                                            }}
                                                        />
                                                    ) : (
                                                        <Bookmark
                                                            className="h-4 w-4 transition-colors"
                                                            style={{
                                                                color: c.textFaint,
                                                            }}
                                                        />
                                                    )}
                                                </button>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium"
                                                        style={{
                                                            borderColor:
                                                                c.cardBorder,
                                                            color:
                                                                c.accent,
                                                        }}
                                                        onClick={() => setViewingId(row.id)}
                                                    >
                                                        View Report
                                                    </button>

                                                    <MoreVertical
                                                        className="h-4 w-4 cursor-pointer"
                                                        style={{
                                                            color:
                                                                c.textFaint,
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>

                    {/* Empty state */}
                    {filteredHistory.length === 0 && (
                        <div className="px-5 py-10 text-center">
                            <p
                                className="text-sm"
                                style={{
                                    color: c.textMuted,
                                }}
                            >
                                {historyQuery
                                    ? "No history matches your search."
                                    : "No test history available."}
                            </p>
                        </div>
                    )}
                </div>
            </CardShell>

            {/* Footer / Pagination */}
            <div
                className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm"
                style={{
                    color: c.textMuted,
                }}
            >
                <span>
                    Showing{" "}
                    {filteredHistory.length > 0 ? 1 : 0} to{" "}
                    {filteredHistory.length} of{" "}
                    {historyTests?.length ?? 0} results
                </span>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm" style={{ color: c.textMuted }}>
                    <span>
                        Showing {paginatedItems.length > 0 ? (page - 1) * 10 + 1 : 0} to {(page - 1) * 10 + paginatedItems.length} of {filteredHistory.length} results
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-xs disabled:opacity-40"
                            style={{ borderColor: c.cardBorder, color: c.textMuted }}
                        >
                            ‹
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border text-xs"
                                style={p === page ? { borderColor: c.accent, color: c.accent } : { borderColor: c.cardBorder, color: c.textMuted }}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-xs disabled:opacity-40"
                            style={{ borderColor: c.cardBorder, color: c.textMuted }}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryView;