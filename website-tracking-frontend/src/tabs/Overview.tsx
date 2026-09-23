"use client"
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { DonutChart } from "@/lib/Reusable-Components/DonutChart";
import { SectionLabel } from "@/lib/Reusable-Components/SectionLabel";
import { Download, Globe, ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/lib/FormateDate";
import { severityMeta } from "@/app/assets/assets";
import { useAuthContext } from "@/app/context/useAuthContext";

function formatCategoryName(category: string) {
    return category.toLowerCase().split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}

const OverviewView = ({ setActiveNav }: { setActiveNav: React.Dispatch<React.SetStateAction<string>> }) => {
    const { c } = useColorContext();
    const [scans, setScans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { backendurl } = useAuthContext()
    const fetchOverview = async () => {
        try {
            const res = await fetch(backendurl, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `query GetMyTests($limit: Int) {
                            getAlluserTests(limit: $limit) {
                                items {
                                    id
                                    completedAt
                                    website { url }
                                    testResults { category status severity }
                                }
                            }
                        }`,
                    variables: { limit: 50 },
                }),
            });
            const { data, errors } = await res.json();
            console.log(data)
            if (errors) {
                console.error(errors);
                return;
            }
            setScans(data.getAlluserTests?.items ?? []);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchOverview();
    }, []);

    const allResults = useMemo(
        () => scans.flatMap((scan) => scan.testResults.map((t: any) => ({ ...t, scanUrl: scan.website?.url, completedAt: scan.completedAt }))),
        [scans]
    );

    const failedResults = useMemo(() => allResults.filter((r) => r.status === "FAILED"), [allResults]);

    const severityCount = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const r of failedResults) {
            if (!r.severity) continue;
            counts[r.severity] = (counts[r.severity] ?? 0) + 1;
        }
        return counts;
    }, [failedResults]);

    const totalIssues = failedResults.length;
    const totalTests = allResults.length;
    const passedTests = allResults.filter((r) => r.status === "PASSED").length;
    const overallScore = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
    const scoreLabel = overallScore >= 90 ? "Excellent" : overallScore >= 75 ? "Good" : overallScore >= 50 ? "Fair" : "Poor";

    const topIssues = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const r of failedResults) {
            counts[r.category] = (counts[r.category] ?? 0) + 1;
        }
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([category, count]) => ({ name: formatCategoryName(category), count }));
    }, [failedResults]);

    const mostRecentScan = scans[0];
    const recentTestResults = mostRecentScan?.testResults ?? [];
    const recentPassed = recentTestResults.filter((t: any) => t.status === "PASSED").length;
    const recentScore = recentTestResults.length ? Math.round((recentPassed / recentTestResults.length) * 100) : null;
    const recentIssues = recentTestResults.filter((t: any) => t.status === "FAILED").length;

    const criticalCount = severityCount.CRITICAL ?? 0;
    const highCount = severityCount.HIGH ?? 0;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center px-8 py-32 text-center">
                <p className="text-sm" style={{ color: c.textMuted }}>Loading overview…</p>
            </div>
        );
    }

    if (scans.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center px-8 py-32 text-center">
                <p className="text-lg font-semibold">No tests yet</p>
                <p className="mt-2 max-w-sm text-sm" style={{ color: c.textMuted }}>
                    Run your first security test to see an overview of your results here.
                </p>
                <button
                    onClick={() => setActiveNav("New Test")}
                    className="mt-4 rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                    style={{ backgroundColor: c.accent }}
                >
                    Start a Test
                </button>
            </div>
        );
    }
    console.log("RENDER, scans:", scans)

    return (
        <div className="px-8 pb-16">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-bold">Overview</h1>
                <button
                    className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium"
                    style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                >
                    <Download className="h-4 w-4" /> Download Report
                </button>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                <CardShell className="col-span-2 p-5 sm:col-span-1">
                    <p className="text-sm font-medium" style={{ color: c.textMuted }}>Overall Score</p>
                    <p className="mt-1 text-2xl font-bold">{overallScore}<span className="text-sm font-normal" style={{ color: c.textFaint }}>/100</span></p>
                    <p className="mt-1 text-xs font-semibold text-emerald-400">{scoreLabel}</p>
                </CardShell>
                <CardShell className="p-5">
                    <p className="text-sm font-medium" style={{ color: c.textMuted }}>Total Tests</p>
                    <p className="mt-1 text-2xl font-bold">{totalTests}</p>
                    <p className="mt-1 text-xs" style={{ color: c.textFaint }}>Across {scans.length} scan{scans.length === 1 ? "" : "s"}</p>
                </CardShell>
                {Object.entries(severityCount).map(([label, value]) => (
                    <CardShell key={label} className="p-5">
                        <p className="text-sm font-medium" style={{ color: c.textMuted }}>{label}</p>
                        <p className="mt-1 text-2xl font-bold">{value}</p>
                        <p className={`mt-1 text-xs ${severityMeta[label]?.text ?? ""}`}>Issues Found</p>
                    </CardShell>
                ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
                <CardShell className="p-5">
                    <SectionLabel>Issues by Severity</SectionLabel>
                    {totalIssues === 0 ? (
                        <p className="py-6 text-sm" style={{ color: c.textFaint }}>No issues found across your tests.</p>
                    ) : (
                        <div className="flex items-center gap-8">
                            <DonutChart counts={severityCount} accent={c.cardBg} />
                            <div className="flex flex-col gap-2">
                                {Object.entries(severityCount).map(([label, value]) => (
                                    <span key={label} className="flex items-center gap-2 text-sm" style={{ color: c.textSecondary }}>
                                        <span className={`h-2 w-2 rounded-full ${severityMeta[label]?.dot ?? "bg-slate-400"}`} />
                                        <span>{label}</span>
                                        <span style={{ color: c.textFaint }}>
                                            {value} ({Math.round((value / totalIssues) * 100)}%)
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </CardShell>

                <CardShell className="p-5">
                    <SectionLabel>Recent Test</SectionLabel>
                    {mostRecentScan ? (
                        <>
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                                    <Globe className="h-5 w-5 text-indigo-400" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium">{mostRecentScan.website?.url ?? "Unknown target"}</p>
                                    <p className="text-xs" style={{ color: c.textFaint }}>{formatDate(mostRecentScan.completedAt)}</p>
                                </div>
                            </div>
                            <button
                                className="mt-4 w-full rounded-lg border py-2 text-sm font-medium"
                                style={{ borderColor: c.cardBorder, color: c.textSecondary }}
                                onClick={() => setActiveNav("Results")}
                            >
                                View Report
                            </button>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <p className="text-sm font-bold">{recentTestResults.length}</p>
                                    <p className="text-[11px]" style={{ color: c.textFaint }}>Tests</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{recentScore ?? "—"}</p>
                                    <p className="text-[11px]" style={{ color: c.textFaint }}>Score</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{recentIssues}</p>
                                    <p className="text-[11px]" style={{ color: c.textFaint }}>Issues</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="py-6 text-sm" style={{ color: c.textFaint }}>No recent test available.</p>
                    )}
                </CardShell>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <CardShell className="p-5">
                    <SectionLabel>Risk Summary</SectionLabel>
                    <p className="mb-4 text-xs" style={{ color: c.textMuted }}>
                        {criticalCount === 0 && highCount === 0
                            ? "No critical or high severity issues found across your tests."
                            : `Your websites have ${criticalCount} critical and ${highCount} high severity issues that should be addressed as soon as possible.`}
                    </p>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: c.inputBg }}>
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
                                <ShieldAlert className="h-4 w-4 text-red-400" />
                            </span>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Critical Risk</p>
                                <p className="text-xs" style={{ color: c.textFaint }}>Affects system and data integrity.</p>
                            </div>
                            <span className="text-lg font-bold text-red-400">{criticalCount}</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: c.inputBg }}>
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10">
                                <ShieldAlert className="h-4 w-4 text-orange-400" />
                            </span>
                            <div className="flex-1">
                                <p className="text-sm font-medium">High Risk</p>
                                <p className="text-xs" style={{ color: c.textFaint }}>Could lead to significant security vulnerabilities.</p>
                            </div>
                            <span className="text-lg font-bold text-orange-400">{highCount}</span>
                        </div>
                    </div>
                </CardShell>

                <CardShell className="p-5">
                    <SectionLabel>Top Issues</SectionLabel>
                    {topIssues.length === 0 ? (
                        <p className="py-6 text-sm" style={{ color: c.textFaint }}>No recurring issues found.</p>
                    ) : (
                        <div className="flex flex-col divide-y" style={{ borderColor: c.cardBorder }}>
                            {topIssues.map((issue) => (
                                <div key={issue.name} className="flex items-center justify-between py-2.5 text-sm">
                                    <span className="flex items-center gap-2" style={{ color: c.textSecondary }}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                        {issue.name}
                                    </span>
                                    <span style={{ color: c.textFaint }}>{issue.count}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardShell>
            </div>
        </div>
    );
};

export default OverviewView;