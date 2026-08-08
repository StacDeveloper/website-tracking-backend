"use client"
import { codeSamples, detailTabs, severityMeta, Test } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Cardshell";
import { SectionLabel } from "@/lib/SectionLabel";
import { AlertTriangle, ArrowRight, ChevronRight, Copy, ExternalLink, Sparkles } from "lucide-react";


interface TestDetailViewProps {
    test: Test
    setSelectedTest: React.Dispatch<React.SetStateAction<Test | null>>
    setDetailTab: React.Dispatch<React.SetStateAction<string>>
    detailTab: string
    setCodeLang: React.Dispatch<React.SetStateAction<string>>
    codeLang: string
}

const TestDetailView = ({ test, setSelectedTest, setDetailTab, detailTab, codeLang, setCodeLang }: TestDetailViewProps) => {
    const { c } = useColorContext()
    const sev = severityMeta[test.severity];
    return (
        <div className="px-8 pb-16">
            <div className="mb-4 flex items-center gap-1.5 text-sm" style={{ color: c.textMuted }}>
                <button onClick={() => setSelectedTest(null)} className="hover:underline">Results</button>
                <ChevronRight className="h-3.5 w-3.5" />
                <span style={{ color: c.textPrimary }} className="font-medium">Test Details</span>
            </div>

            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold">{test.name}</h1>
                    <span className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${sev.bg} ${sev.text}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sev.dot}`} />
                        {test.severity}
                    </span>
                </div>
                <button className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium" style={{ borderColor: c.cardBorder, color: c.textSecondary }}>
                    Export Finding <ExternalLink className="h-3.5 w-3.5" />
                </button>
            </div>

            <div className="mb-6 flex items-center gap-1 border-b" style={{ borderColor: c.cardBorder }}>
                {detailTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setDetailTab(tab)}
                        className="border-b-2 px-4 py-2.5 text-sm font-medium"
                        style={{
                            borderColor: detailTab === tab ? c.accent : "transparent",
                            color: detailTab === tab ? c.accent : c.textMuted,
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {detailTab === "Overview" && (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
                    <div className="flex flex-col gap-4">
                        <CardShell className="p-5">
                            <SectionLabel>Finding Summary</SectionLabel>
                            <p className="text-sm" style={{ color: c.textSecondary }}>
                                The application is vulnerable to SQL injection. User input is not properly sanitized before being used in SQL queries.
                            </p>
                        </CardShell>
                        <CardShell className="p-5">
                            <SectionLabel>Risk Description</SectionLabel>
                            <p className="text-sm" style={{ color: c.textSecondary }}>
                                An attacker can manipulate the &quot;id&quot; parameter to modify the SQL query and access unauthorized data, bypass authentication, or perform other malicious actions on the database.
                            </p>
                        </CardShell>
                        <CardShell className="p-5">
                            <SectionLabel>How to Reproduce</SectionLabel>
                            <ol className="flex list-decimal flex-col gap-2 pl-4 text-sm" style={{ color: c.textSecondary }}>
                                <li>Go to: <span style={{ color: c.accent }}>https://example.com/product?id=1</span></li>
                                <li>Modify the parameter to <code>id=1&apos; OR &apos;1&apos;=1</code></li>
                                <li>Observe the response contains unexpected data.</li>
                            </ol>
                        </CardShell>
                    </div>

                    <div className="flex flex-col gap-4">
                        <CardShell className="p-5">
                            <div className="flex flex-col gap-3 text-sm">
                                {[
                                    ["Severity", test.severity],
                                    ["CVSS Score", "9.8 (AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H)"],
                                    ["Status", "Confirmed"],
                                    ["Location", "GET /product?id=1"],
                                    ["Parameter", "id"],
                                    ["Discovered", "3 May 2025, 12:45 PM"],
                                ].map(([label, val]) => (
                                    <div key={label} className="flex items-center justify-between">
                                        <span style={{ color: c.textFaint }}>{label}</span>
                                        <span className="text-right font-medium">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </CardShell>
                        <CardShell className="p-5">
                            <SectionLabel>Impact</SectionLabel>
                            <ul className="flex flex-col gap-1.5 text-sm" style={{ color: c.textSecondary }}>
                                {["Unauthorized data access", "Data manipulation", "Authentication bypass", "Database deletion"].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: c.textFaint }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardShell>
                        <CardShell className="p-5">
                            <SectionLabel>Severity Breakdown</SectionLabel>
                            <div className="flex flex-col gap-2 text-sm">
                                {[
                                    ["Attack Vector", "Network"],
                                    ["Attack Complexity", "Low"],
                                    ["Privileges Required", "None"],
                                    ["User Interaction", "None"],
                                    ["Scope", "Unchanged"],
                                    ["Confidentiality", "High"],
                                    ["Integrity", "High"],
                                    ["Availability", "High"],
                                ].map(([label, val]) => (
                                    <div key={label} className="flex items-center justify-between">
                                        <span style={{ color: c.textFaint }}>{label}</span>
                                        <span className="font-medium">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </CardShell>
                    </div>
                </div>
            )}

            {detailTab === "AI Suggestion" && (
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl border p-5" style={{ borderColor: "rgba(129,140,248,0.3)", backgroundColor: c.activeNavBg }}>
                        <div className="mb-2 flex items-center gap-2">
                            <Sparkles className="h-4 w-4" style={{ color: c.accent }} />
                            <span className="text-sm font-semibold">AI Generated Suggestion</span>
                        </div>
                        <p className="text-sm" style={{ color: c.textSecondary }}>
                            Use parameterized queries or prepared statements to prevent SQL injection. Never concatenate user input directly into SQL queries.
                        </p>
                        <button className="mt-3 rounded-lg px-3 py-1.5 text-xs font-semibold text-white" style={{ backgroundColor: c.accent }}>
                            Regenerate Suggestion
                        </button>
                    </div>

                    <CardShell className="p-5">
                        <SectionLabel>Recommended Fix</SectionLabel>
                        <div className="mb-3 flex flex-wrap gap-2">
                            {Object.keys(codeSamples).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setCodeLang(lang)}
                                    className="rounded-md px-3 py-1.5 text-xs font-medium"
                                    style={{
                                        backgroundColor: codeLang === lang ? c.accent : c.inputBg,
                                        color: codeLang === lang ? "#ffffff" : c.textSecondary,
                                    }}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <div className="relative rounded-lg" style={{ backgroundColor: c.codeBg }}>
                            <button
                                className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs"
                                style={{ borderColor: c.cardBorder, color: c.textMuted }}
                            >
                                <Copy className="h-3 w-3" /> Copy Code
                            </button>
                            <pre className="overflow-x-auto p-4 text-xs leading-relaxed" style={{ color: "#a5b4fc" }}>
                                <code>{codeSamples[codeLang]}</code>
                            </pre>
                        </div>
                    </CardShell>

                    <CardShell className="p-5">
                        <div className="mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                            <span className="text-sm font-semibold">Why is this vulnerable?</span>
                        </div>
                        <p className="text-sm" style={{ color: c.textSecondary }}>
                            Directly concatenating user input into SQL queries allows attackers to modify the query structure and execute arbitrary SQL commands.
                        </p>
                        <button className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: c.accent }}>
                            Learn More <ArrowRight className="h-3 w-3" />
                        </button>
                    </CardShell>
                </div>
            )}

            {["Request / Response", "Evidence", "References"].includes(detailTab) && (
                <CardShell className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-sm font-medium">{detailTab}</p>
                    <p className="mt-1 text-xs" style={{ color: c.textMuted }}>Content for this tab is coming soon.</p>
                </CardShell>
            )}
        </div>
    );
};

export default TestDetailView