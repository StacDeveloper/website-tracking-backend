import {
    ShieldCheck, Bot, Sparkles, Settings2, History, Bookmark, Gauge, Lock,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "21 Automated Security Tests",
        desc: "SQL injection, XSS, CSRF, JWT vulnerabilities, broken access control, rate limiting, security headers, TLS/SSL, CORS, information disclosure, and more — covering OWASP's top risks and real-world misconfigurations.",
    },
    {
        icon: Lock,
        title: "Passive & Active Scanning",
        desc: "Passive tests analyze your site safely with no intrusive payloads. Active tests simulate real attack patterns and unlock once you verify domain ownership.",
    },
    {
        icon: Bot,
        title: "Domain Ownership Verification",
        desc: "Verify via DNS TXT record, a well-known file, or a meta tag — protecting the tool from misuse and unlocking the full active test suite.",
    },
    {
        icon: Sparkles,
        title: "AI-Powered Remediation",
        desc: "Every failed test comes with a plain-language risk explanation and a concrete code fix, plus a prioritized summary of what to tackle first.",
    },
    {
        icon: Settings2,
        title: "Custom Endpoint Testing",
        desc: "Point specific tests at your real login, registration, upload, and API endpoints for deeper, more accurate results.",
    },
    {
        icon: History,
        title: "Full Test History",
        desc: "Every scan is saved. Track your security score over time, compare before and after a fix, and revisit any past report in full detail.",
    },
    {
        icon: Bookmark,
        title: "Saved Targets",
        desc: "Bookmark the sites you test regularly and re-run your last test configuration in a single click.",
    },
    {
        icon: Gauge,
        title: "Security Score & Severity Breakdown",
        desc: "Get an at-a-glance score out of 100, plus a full breakdown by severity so you know exactly where to focus.",
    },
];

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white">
            <section className="mx-auto max-w-5xl px-6 pb-16 pt-24 text-center">
                <span className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                    Built for developers
                </span>
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    Everything you need to test your website&apos;s security
                </h1>
                <p className="mx-auto max-w-2xl text-base text-slate-400">
                    One tool, 21 automated tests, and AI-generated fixes — from quick passive
                    checks to deep active vulnerability scans.
                </p>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-24">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-indigo-500/40"
                        >
                            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
                                <f.icon className="h-5 w-5 text-indigo-400" />
                            </span>
                            <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-400">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="border-t border-white/10 py-16 text-center">
                <h2 className="mb-3 text-2xl font-bold">Ready to test your site?</h2>
                <p className="mb-6 text-sm text-slate-400">No credit card required to get started.</p>
                <a
                    href="/login"
                    className="inline-block rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
                >
                    Start a Free Test
                </a>
            </section>
        </main>
    );
}