
import { historyIcons } from "@/app/assets/assets";
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
    Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import LinkResult from "./LinkResult";
import { toast } from "react-toastify";
import { useAuthContext } from "@/app/context/useAuthContext";

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
    const [historyTests, sethistoryTests] = useState<HistoryTest[]>([])
    const [cursorStack, setCursorStack] = useState<(string | undefined)[]>([undefined])
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)
    const [laodingMore, setLoadingMore] = useState<boolean>(false)
    const [pageIndex, setPageIndex] = useState<number>(0)
    const { backendurl } = useAuthContext()
    const { c } = useColorContext();
    const [statusFilter, setStatusFilter] = useState("ALL")
    const [scoreFilter, setScoreFilter] = useState("ALL")
    const [dateFilter, setDateFilter] = useState("ALL")
    const [openFilter, setOpenFilter] = useState<"status" | "score" | "date" | null>(null)
    const [savedTests, setSavedTests] = useState<string[]>([]);

    const getHistoryOfUser = async (index: number) => {
        if (index < 0) return;
        const cursor = cursorStack[index];
        setLoadingMore(true);
        try {
            const res = await fetch(`${backendurl}/graphql`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `query GetHistory($cursor: String, $limit: Int) {
                        getHistoryofUser(cursor: $cursor, limit: $limit) {
                            items {
                                id
                                status
                                completedAt
                                testResultsCount
                                passedCount
                                website { id url }
                                issueCount
                            }
                            nextCursor
                            hasNextPage
                        }
                    }`,
                    variables: { cursor, limit: 20 },
                }),
            });
            const { data, errors } = await res.json();
            if (errors) {
                toast.error("Failed to load history");
                return;
            }

            const result = data.getHistoryofUser;
            sethistoryTests(result.items);
            setHasNextPage(result.hasNextPage);
            if (index === cursorStack.length - 1 && result.nextCursor) {
                setCursorStack((prev) => [...prev, result.nextCursor]);
            }
            setPageIndex(index);
        } catch {
            toast.error("Failed to load history");
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        getHistoryOfUser(0);
    }, []);

    const deleteScanOfUser = async (scanId: string) => {
        try {
            const result = await fetch(`${backendurl}/graphql`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `mutation DeleteScan($scanId:ID!){
                            deleteScanOfUser(scanId:$scanId)
                        }`, variables: { scanId }
                })
            })
            const { data, errors } = await result.json()
            if (data.deleteScanOfUser === true) {
                sethistoryTests((prev) => prev.filter((test) => test.id !== scanId))
                toast.success(`Deleted Scan ${historyTests.find((test) => test.id === scanId)?.website.url}`)
            }
            if (errors) console.error(errors)
            return;
        } catch (error: any) {
            console.log(error)
            toast.error(error)
        }
    }
    const makeApiCallToSave = async (websiteId: string) => {
        const response = await fetch(`${backendurl}/graphql`, {
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
            return []
        }

        const search = historyQuery.trim().toLowerCase()

        return historyTests.filter((row: HistoryTest) => {
            // Search
            const matchesSearch =
                !search ||
                row.website?.url?.toLowerCase().includes(search)

            if (!matchesSearch) return false

            // Status
            const matchesStatus =
                statusFilter === "ALL" ||
                row.status === statusFilter

            if (!matchesStatus) return false

            // Score
            const score = calculateScore(
                row.passedCount,
                row.testResultsCount
            )

            let matchesScore = true

            if (scoreFilter === "90+") {
                matchesScore = score >= 90
            } else if (scoreFilter === "75-89") {
                matchesScore = score >= 75 && score < 90
            } else if (scoreFilter === "50-74") {
                matchesScore = score >= 50 && score < 75
            } else if (scoreFilter === "0-49") {
                matchesScore = score < 50
            }

            if (!matchesScore) return false

            // Date
            if (dateFilter !== "ALL") {
                const completedDate = new Date(row.completedAt)
                const now = new Date()

                const startDate = new Date()

                if (dateFilter === "TODAY") {
                    startDate.setHours(0, 0, 0, 0)
                }

                if (dateFilter === "7_DAYS") {
                    startDate.setDate(now.getDate() - 7)
                }

                if (dateFilter === "30_DAYS") {
                    startDate.setDate(now.getDate() - 30)
                }

                if (completedDate < startDate) {
                    return false
                }
            }

            return true
        })
    }, [
        historyTests,
        historyQuery,
        statusFilter,
        scoreFilter,
        dateFilter
    ])


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
                <div className="relative">
                    <button
                        type="button"
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "status" ? null : "status"
                            )
                        }
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                        style={{
                            borderColor:
                                statusFilter !== "ALL"
                                    ? c.accent
                                    : c.cardBorder,
                            color:
                                statusFilter !== "ALL"
                                    ? c.accent
                                    : c.textSecondary,
                        }}
                    >
                        <Filter className="h-3.5 w-3.5" />

                        {statusFilter === "ALL"
                            ? "Filter by Status"
                            : statusFilter}

                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>

                    {openFilter === "status" && (
                        <div
                            className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border p-1 shadow-xl"
                            style={{
                                backgroundColor: c.cardBg,
                                borderColor: c.cardBorder,
                            }}
                        >
                            {[
                                ["ALL", "All Status"],
                                ["COMPLETED", "Completed"],
                                ["FAILED", "Failed"],
                                ["RUNNING", "Running"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        setStatusFilter(value)
                                        setOpenFilter(null)
                                    }}
                                    className="w-full rounded-md px-3 py-2 text-left text-sm transition-colors"
                                    style={{
                                        color:
                                            statusFilter === value
                                                ? c.accent
                                                : c.textSecondary,
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Score Filter */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "score" ? null : "score"
                            )
                        }
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                        style={{
                            borderColor:
                                scoreFilter !== "ALL"
                                    ? c.accent
                                    : c.cardBorder,
                            color:
                                scoreFilter !== "ALL"
                                    ? c.accent
                                    : c.textSecondary,
                        }}
                    >
                        <Filter className="h-3.5 w-3.5" />

                        {scoreFilter === "ALL"
                            ? "Filter by Score"
                            : scoreFilter === "90+"
                                ? "Score: 90+"
                                : `Score: ${scoreFilter}`}

                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>

                    {openFilter === "score" && (
                        <div
                            className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border p-1 shadow-xl"
                            style={{
                                backgroundColor: c.cardBg,
                                borderColor: c.cardBorder,
                            }}
                        >
                            {[
                                ["ALL", "All Scores"],
                                ["90+", "90 - 100"],
                                ["75-89", "75 - 89"],
                                ["50-74", "50 - 74"],
                                ["0-49", "0 - 49"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        setScoreFilter(value)
                                        setOpenFilter(null)
                                    }}
                                    className="w-full rounded-md px-3 py-2 text-left text-sm"
                                    style={{
                                        color:
                                            scoreFilter === value
                                                ? c.accent
                                                : c.textSecondary,
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Date Range */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() =>
                            setOpenFilter(
                                openFilter === "date" ? null : "date"
                            )
                        }
                        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"
                        style={{
                            borderColor:
                                dateFilter !== "ALL"
                                    ? c.accent
                                    : c.cardBorder,
                            color:
                                dateFilter !== "ALL"
                                    ? c.accent
                                    : c.textSecondary,
                        }}
                    >
                        <Calendar className="h-3.5 w-3.5" />

                        {dateFilter === "ALL"
                            ? "Select Date Range"
                            : dateFilter === "TODAY"
                                ? "Today"
                                : dateFilter === "7_DAYS"
                                    ? "Last 7 Days"
                                    : "Last 30 Days"}
                    </button>

                    {openFilter === "date" && (
                        <div
                            className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border p-1 shadow-xl"
                            style={{
                                backgroundColor: c.cardBg,
                                borderColor: c.cardBorder,
                            }}
                        >
                            {[
                                ["ALL", "All Time"],
                                ["TODAY", "Today"],
                                ["7_DAYS", "Last 7 Days"],
                                ["30_DAYS", "Last 30 Days"],
                            ].map(([value, label]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        setDateFilter(value)
                                        setOpenFilter(null)
                                    }}
                                    className="w-full rounded-md px-3 py-2 text-left text-sm"
                                    style={{
                                        color:
                                            dateFilter === value
                                                ? c.accent
                                                : c.textSecondary,
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
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
                            {filteredHistory.map(
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
                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">

                                                    {/* View Report */}
                                                    <button
                                                        type="button"
                                                        className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                                                        style={{
                                                            borderColor: c.cardBorder,
                                                            color: c.accent,
                                                        }}
                                                        onClick={() => setViewingId(row.id)}
                                                    >
                                                        View Report
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        type="button"
                                                        title="Delete test"
                                                        className="group flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-150"
                                                        style={{
                                                            borderColor: c.cardBorder,
                                                            color: c.textFaint,
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.color = "#f87171";
                                                            e.currentTarget.style.borderColor = "rgba(248, 113, 113, 0.35)";
                                                            e.currentTarget.style.backgroundColor = "rgba(248, 113, 113, 0.08)";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.color = c.textFaint;
                                                            e.currentTarget.style.borderColor = c.cardBorder;
                                                            e.currentTarget.style.backgroundColor = "transparent";
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" onClick={() => deleteScanOfUser(row.id)} />
                                                    </button>

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
            <div className="mt-4 flex items-center justify-between gap-3 text-sm" style={{ color: c.textMuted }}>
                <span>Showing {filteredHistory.length} result{filteredHistory.length === 1 ? "" : "s"}</span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => getHistoryOfUser(pageIndex - 1)}
                        disabled={pageIndex === 0 || laodingMore}
                        className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40"
                        style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                    >
                        ‹ Previous
                    </button>
                    <button
                        onClick={() => getHistoryOfUser(pageIndex + 1)}
                        disabled={!hasNextPage || laodingMore}
                        className="rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40"
                        style={{ borderColor: c.cardBorder, color: c.accent }}
                    >
                        Next ›
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryView;