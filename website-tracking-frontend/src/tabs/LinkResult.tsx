import { testIconMap } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { FormatCategoryMeta } from "@/lib/FormatCategory";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { SectionLabel } from "@/lib/Reusable-Components/SectionLabel";
import { StatusPill } from "@/lib/Reusable-Components/StatusPill";
import { ArrowLeft, Download, ExternalLink, RefreshCw, Share2, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";


interface TestResult {
    category: string
    status: string
    severity: string
    aiSuggestion?: string
}

interface ScanDetail {
    id: string
    status: string
    scanType: string
    completedAt: string | null
    aiSummary: string | null
    website: { url: string }
    testResults: TestResult[]
}

interface LinkResultsProps {
    scanId: string
    onBack: () => void;
}

const SEVERITY_ORDER = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"]

const SEVERITY_COLOR: Record<string, string> = {
    CRITICAL: "#ef4444",
    HIGH: "#f97316",
    MEDIUM: "#eab308",
    LOW: "#3b82f6",
    INFO: "#8b5cf6",
}


function CalculateScore(testResults: TestResult[]) {
    if (!testResults.length) return 0
    const scorable = testResults.filter((test) => test.status !== "SKIPPED")
    if (!scorable.length) return 100;
    const penalties: Record<string, number> = { CRITICAL: 25, HIGH: 15, MEDIUM: 8, LOW: 3, INFO: 1 };
    const totalPenalties = scorable.filter((test) => test.status === "FAILED").reduce((sum, test) => sum + (penalties[test.severity ?? ""] ?? 5), 0)
    return Math.max(0, Math.min(100, Math.round(100 - totalPenalties)))
}

function scoreLable(score: number) {
    if (score >= 90) return { label: "Excellent", color: "#22c55e" }
    if (score >= 75) return { label: "Good", color: "#22c55e" }
    if (score >= 50) return { label: "Fair", color: "#eab308" }
    return { label: "Poor", color: "#ef4444" }
}

const LinkResult = ({ scanId, onBack }: LinkResultsProps) => {
    const { c } = useColorContext()
    const [scan, setScan] = useState<ScanDetail | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const [activeTab, setActiveTab] = useState<"overview" | "results" | "ai">("overview")

    const fetchScan = async () => {
        console.log("fetchscan triggered")
        try {
            const res = await fetch("http://localhost:4000/graphql", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `query ScanStatus($scanId: ID!) {
                            scanStatus(scanId: $scanId) {
                                id
                                status
                                scanType
                                completedAt
                                aiSummary
                                website { url }
                                testResults {
                                    category
                                    status
                                    severity
                                    aiSuggestion
                                }
                            }
                        }`,
                    variables: { scanId },
                }),
            });
            const { data, errors } = await res.json();
            console.log(data, errors)
            if (errors || !data?.scanStatus) {
                setError("We couldn't load this test. It may have been removed.");
                return;
            }
            setScan(data.scanStatus);
        } catch {
            setError("Something went wrong loading this test.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!scanId) return;
        fetchScan();
    }, [scanId, scan?.status]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
                <p className="text-sm" style={{ color: c.textMuted }}>Loading results…</p>
            </div>
        );
    }
    if (error || !scan) {
        return (
            <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
                <ShieldAlert className="mb-4 h-10 w-10" style={{ color: c.textFaint }} />
                <p className="mb-1 text-lg font-semibold">Test Not Found</p>
                <p className="mb-6 text-sm" style={{ color: c.textMuted }}>{error}</p>
                <button
                    onClick={onBack}
                    className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: c.accent }}
                >
                    Back to History
                </button>
            </div>
        );
    }


    const score = CalculateScore(scan.testResults);
    const { label: scoreText, color: scoreColor } = scoreLable(score);

    const failed = scan.testResults.filter((t) => t.status === "FAILED");
    const severityCounts = SEVERITY_ORDER.reduce((acc, sev) => {
        acc[sev] = failed.filter((t) => t.severity === sev).length;
        return acc;
    }, {} as Record<string, number>);
    const totalIssues = failed.length;

    const topIssues = [...failed]
        .sort((a, b) => SEVERITY_ORDER.indexOf(a.severity ?? "INFO") - SEVERITY_ORDER.indexOf(b.severity ?? "INFO"))
        .slice(0, 5);

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    let offsetAccum = 0;
    const donutSegments = SEVERITY_ORDER
        .filter((sev) => severityCounts[sev] > 0)
        .map((sev) => {
            const fraction = severityCounts[sev] / (totalIssues || 1);
            const dash = fraction * circumference;
            const seg = { sev, dash, offset: offsetAccum, color: SEVERITY_COLOR[sev] };
            offsetAccum += dash;
            return seg;
        });

    return (
        <div className="px-8 pb-16">
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-xs font-medium"
                    style={{ color: c.textMuted }}
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to History
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={fetchScan}
                        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                        style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                    >
                        <RefreshCw className="h-3.5 w-3.5" /> Refresh
                    </button>
                    <button
                        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                        style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                    >
                        <Download className="h-3.5 w-3.5" /> Export Report
                    </button>
                    <button
                        className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
                        style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                    >
                        <Share2 className="h-3.5 w-3.5" /> Share Report
                    </button>
                </div>
            </div>

            {/* Header summary */}
            <CardShell className="mb-4 grid grid-cols-1 gap-6 p-5 lg:grid-cols-[1.4fr_auto_auto_auto]">
                <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: c.inputBg }}>
                        <ShieldCheck className="h-5 w-5" style={{ color: c.accent }} />
                    </span>
                    <div>
                        <p className="text-base font-semibold">{scan.website.url}</p>
                        <a href={scan.website.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs" style={{ color: c.textFaint }}>
                            {scan.website.url} <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs" style={{ color: c.textFaint }}>Security Score</p>
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        <svg viewBox="0 0 120 120" className="h-24 w-24 -rotate-90">
                            <circle cx="60" cy="60" r="52" fill="none" stroke={c.inputBg} strokeWidth="10" />
                            <circle
                                cx="60" cy="60" r="52" fill="none" stroke={scoreColor} strokeWidth="10"
                                strokeDasharray={2 * Math.PI * 52}
                                strokeDashoffset={2 * Math.PI * 52 * (1 - score / 100)}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-bold">{score}</span>
                            <span className="text-[10px]" style={{ color: c.textFaint }}>/100</span>
                        </div>
                    </div>
                    <span className="mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: `${scoreColor}20`, color: scoreColor }}>
                        {scoreText}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <p className="mb-1 text-xs" style={{ color: c.textFaint }}>Issues by Severity</p>
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        <svg viewBox="0 0 120 120" className="h-24 w-24 -rotate-90">
                            <circle cx="60" cy="60" r={radius} fill="none" stroke={c.inputBg} strokeWidth="10" />
                            {donutSegments.map((seg) => (
                                <circle
                                    key={seg.sev}
                                    cx="60" cy="60" r={radius} fill="none" stroke={seg.color} strokeWidth="10"
                                    strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
                                    strokeDashoffset={-seg.offset}
                                />
                            ))}
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-2xl font-bold">{totalIssues}</span>
                            <span className="text-[10px]" style={{ color: c.textFaint }}>Total</span>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-0.5">
                        {SEVERITY_ORDER.filter((s) => severityCounts[s] > 0).map((sev) => (
                            <div key={sev} className="flex items-center gap-1.5 text-[10px]" style={{ color: c.textMuted }}>
                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: SEVERITY_COLOR[sev] }} />
                                {sev.charAt(0) + sev.slice(1).toLowerCase()} {severityCounts[sev]}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-2 text-xs">
                    <span
                        className="w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ backgroundColor: scan.status === "COMPLETED" ? "#22c55e20" : `${c.accent}20`, color: scan.status === "COMPLETED" ? "#22c55e" : c.accent }}
                    >
                        {scan.status}
                    </span>
                    {scan.completedAt && (
                        <p style={{ color: c.textFaint }}>Tested on {new Date(scan.completedAt).toLocaleString()}</p>
                    )}
                    <p style={{ color: c.textFaint }}>Type: {scan.scanType === "ACTIVE" ? "Active + Passive" : "Passive Only"}</p>
                    <p style={{ color: c.textFaint }}>Tests Executed: {scan.testResults.length}</p>
                </div>
            </CardShell>

            {/* Tabs */}
            <div className="mb-4 flex gap-1 border-b" style={{ borderColor: c.cardBorder }}>
                {(["overview", "results", "ai"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="px-4 py-2 text-sm font-medium"
                        style={{
                            color: activeTab === tab ? c.accent : c.textFaint,
                            borderBottom: activeTab === tab ? `2px solid ${c.accent}` : "2px solid transparent",
                        }}
                    >
                        {tab === "overview" ? "Overview" : tab === "results" ? "All Results" : "AI Summary"}
                    </button>
                ))}
            </div>

            {activeTab === "overview" && (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <CardShell className="p-5">
                        <SectionLabel>Top Issues</SectionLabel>
                        {topIssues.length === 0 ? (
                            <p className="py-4 text-sm" style={{ color: c.textFaint }}>No issues found. Nice work.</p>
                        ) : (
                            <div className="flex flex-col divide-y" style={{ borderColor: c.cardBorder }}>
                                {topIssues.map((t) => (
                                    <div key={t.category} className="flex items-center justify-between py-2.5">
                                        <span className="text-sm" style={{ color: c.textSecondary }}>{FormatCategoryMeta(t.category)}</span>
                                        <span
                                            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                                            style={{ backgroundColor: `${SEVERITY_COLOR[t.severity ?? "INFO"]}20`, color: SEVERITY_COLOR[t.severity ?? "INFO"] }}
                                        >
                                            {t.severity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardShell>

                    <CardShell className="p-5">
                        <SectionLabel>Recommended Actions</SectionLabel>
                        {failed.length === 0 ? (
                            <p className="py-4 text-sm" style={{ color: c.textFaint }}>Nothing to fix right now.</p>
                        ) : (
                            <ul className="flex flex-col gap-2 py-2">
                                {failed.slice(0, 5).map((t) => (
                                    <li key={t.category} className="flex items-start gap-2 text-sm" style={{ color: c.textSecondary }}>
                                        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: c.accent }} />
                                        Fix {FormatCategoryMeta(t.category).toLowerCase()}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardShell>
                </div>
            )}

            {activeTab === "results" && (
                <CardShell className="p-5">
                    <SectionLabel>Test Progress</SectionLabel>
                    <div className="flex flex-col divide-y" style={{ borderColor: c.cardBorder }}>
                        {scan.testResults.map((t) => {
                            const Icon = testIconMap[t.category] ?? ShieldCheck;
                            return (
                                <div key={t.category} className="flex items-center justify-between py-2.5">
                                    <span className="flex items-center gap-2.5 text-sm" style={{ color: c.textSecondary }}>
                                        <Icon className="h-4 w-4" style={{ color: c.textFaint }} />
                                        {FormatCategoryMeta(t.category)}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        {t.severity && (
                                            <span className="text-xs" style={{ color: SEVERITY_COLOR[t.severity] }}>{t.severity}</span>
                                        )}
                                        <StatusPill status={t.status} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardShell>
            )}

            {activeTab === "ai" && (
                <CardShell className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" style={{ color: c.accent }} />
                        <SectionLabel>AI Summary</SectionLabel>
                    </div>
                    <p className="mb-6 text-sm leading-relaxed" style={{ color: c.textSecondary }}>
                        {scan.aiSummary ?? "AI summary not available for this scan."}
                    </p>
                    <div className="flex flex-col gap-4">
                        {failed.map((t) => (
                            <div key={t.category} className="rounded-lg border p-4" style={{ borderColor: c.cardBorder }}>
                                <p className="mb-1 text-sm font-semibold">{FormatCategoryMeta(t.category)}</p>
                                <p className="text-xs" style={{ color: c.textMuted }}>
                                    {t.aiSuggestion ?? "No suggestion available."}
                                </p>
                            </div>
                        ))}
                    </div>
                </CardShell>
            )}
        </div>
    );
}

export default LinkResult