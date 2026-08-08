"use client"
import { severityCount, severityMeta, topIssues, totalIssues } from '@/app/assets/assets';
import { useColorContext } from '@/app/context/useColorContext';
import { CardShell } from '@/lib/Cardshell';
import { DonutChart } from '@/lib/DonutChart';
import { SectionLabel } from '@/lib/SectionLabel';
import { Download, Globe, ShieldAlert } from 'lucide-react';
import { useState } from 'react';


export const OverviewView = () => {
    const [activeNav, setActiveNav] = useState<string | null>(null)
    const { c } = useColorContext()
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
                    <p className="mt-1 text-2xl font-bold">78<span className="text-sm font-normal" style={{ color: c.textFaint }}>/100</span></p>
                    <p className="mt-1 text-xs font-semibold text-emerald-400">Good</p>
                </CardShell>
                <CardShell className="p-5">
                    <p className="text-sm font-medium" style={{ color: c.textMuted }}>Total Tests</p>
                    <p className="mt-1 text-2xl font-bold">21</p>
                    <p className="mt-1 text-xs" style={{ color: c.textFaint }}>Completed</p>
                </CardShell>
                {Object.entries(severityCount).map(([label, value]) => (
                    <CardShell key={label} className="p-5">
                        <p className="text-sm font-medium" style={{ color: c.textMuted }}>{label}</p>
                        <p className="mt-1 text-2xl font-bold">{value}</p>
                        <p className={`mt-1 text-xs ${severityMeta[label].text}`}>Issues Found</p>
                    </CardShell>
                ))}
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
                <CardShell className="p-5">
                    <SectionLabel>Issues by Severity</SectionLabel>
                    <div className="flex items-center gap-8">
                        <DonutChart counts={severityCount} accent={c.cardBg} />
                        <div className="flex flex-col gap-2">
                            {Object.entries(severityCount).map(([label, value]) => (
                                <span key={label} className="flex items-center gap-2 text-sm" style={{ color: c.textSecondary }}>
                                    <span className={`h-2 w-2 rounded-full ${severityMeta[label].dot}`} />
                                    {label} &nbsp;
                                    <span style={{ color: c.textFaint }}>
                                        {value} ({Math.round((value / totalIssues) * 100)}%)
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </CardShell>

                <CardShell className="p-5">
                    <SectionLabel>Recent Test</SectionLabel>
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                            <Globe className="h-5 w-5 text-indigo-400" />
                        </span>
                        <div>
                            <p className="text-sm font-medium">https://example.com</p>
                            <p className="text-xs" style={{ color: c.textFaint }}>3 May 2025, 12:42 PM</p>
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
                            <p className="text-sm font-bold">21</p>
                            <p className="text-[11px]" style={{ color: c.textFaint }}>Tests</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">78</p>
                            <p className="text-[11px]" style={{ color: c.textFaint }}>Score</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">{totalIssues}</p>
                            <p className="text-[11px]" style={{ color: c.textFaint }}>Issues</p>
                        </div>
                    </div>
                </CardShell>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <CardShell className="p-5">
                    <SectionLabel>Risk Summary</SectionLabel>
                    <p className="mb-4 text-xs" style={{ color: c.textMuted }}>
                        Your website has 5 critical and 8 high severity issues that should be addressed as soon as possible.
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
                            <span className="text-lg font-bold text-red-400">5</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg p-3" style={{ backgroundColor: c.inputBg }}>
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10">
                                <ShieldAlert className="h-4 w-4 text-orange-400" />
                            </span>
                            <div className="flex-1">
                                <p className="text-sm font-medium">High Risk</p>
                                <p className="text-xs" style={{ color: c.textFaint }}>Could lead to significant security vulnerabilities.</p>
                            </div>
                            <span className="text-lg font-bold text-orange-400">8</span>
                        </div>
                    </div>
                </CardShell>

                <CardShell className="p-5">
                    <SectionLabel>Top Issues</SectionLabel>
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
                </CardShell>
            </div>
        </div>
    );
}