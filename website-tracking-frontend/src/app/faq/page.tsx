"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "Is it safe to test my production website?",
        a: "Passive tests are non-intrusive and safe to run on any live site. Active tests simulate real attack patterns and can generate meaningful load — we recommend running them on staging first, or during low-traffic windows.",
    },
    {
        q: "Why do I need to verify domain ownership?",
        a: "Active tests send real attack-style requests to a target. Verification ensures the tool can't be used to attack sites you don't own or control.",
    },
    {
        q: "How does domain verification work?",
        a: "Choose one of three methods: add a DNS TXT record, upload a file to .well-known/, or add a meta tag to your homepage. Once we detect it, active tests unlock instantly.",
    },
    {
        q: "What happens if my site isn't verified?",
        a: "You can still run all 12 passive tests immediately — no verification needed. Active tests will be skipped until you verify ownership.",
    },
    {
        q: "How accurate are the AI suggestions?",
        a: "Suggestions are generated based on the exact evidence found during your scan (the specific payload, header, or response that triggered the finding), so they're tailored to your result — not generic advice.",
    },
    {
        q: "Can I test any website?",
        a: "You can test any site you own or have permission to test. We block scanning of government, military, and financial institution domains regardless of ownership claims.",
    },
    {
        q: "Do you store my scan results?",
        a: "Yes — your full test history is saved to your account so you can track progress and compare results over time. Only you can access your own scan data.",
    },
    {
        q: "What's the difference between passive and active tests?",
        a: "Passive tests observe your site's existing configuration (headers, cookies, TLS setup) without sending attack payloads. Active tests actively probe for vulnerabilities like SQL injection or broken access control by sending crafted requests.",
    },
    {
        q: "How long does a scan take?",
        a: "Most scans complete within 1–2 minutes, depending on how many tests you select and how your server responds.",
    },
    {
        q: "Is this a replacement for a professional penetration test?",
        a: "No — this tool automates common, well-known vulnerability checks and is a great first line of defense, but it doesn't replace a manual security audit by a professional pentester for critical applications.",
    },
];

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/10 py-2">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
                <span className="text-sm font-medium sm:text-base">{q}</span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && (
                <p className="pb-4 pr-8 text-sm leading-relaxed text-slate-400">{a}</p>
            )}
        </div>
    );
}

export default function FaqPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white">
            <section className="mx-auto max-w-3xl px-6 pb-10 pt-24 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight">
                    Frequently Asked Questions
                </h1>
                <p className="text-base text-slate-400">
                    Everything you need to know before running your first scan.
                </p>
            </section>

            <section className="mx-auto max-w-3xl px-6 pb-24">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6">
                    {faqs.map((item) => (
                        <FaqItem key={item.q} q={item.q} a={item.a} />
                    ))}
                </div>
            </section>

            <section className="border-t border-white/10 py-16 text-center">
                <h2 className="mb-3 text-xl font-semibold">Still have questions?</h2>
                <p className="mb-6 text-sm text-slate-400">We're happy to help.</p>
                <a
                    href="/login"
                    className="inline-block rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
                >
                    Get Started
                </a>
            </section>
        </main>
    );
}