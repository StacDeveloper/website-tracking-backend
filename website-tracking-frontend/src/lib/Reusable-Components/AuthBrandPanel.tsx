"use client";

import { Star, ShieldCheck, Sparkles, FileText } from "lucide-react";


const featureList = [
    { icon: ShieldCheck, title: "21+ Security Tests", desc: "Active & Passive Scans" },
    { icon: Sparkles, title: "AI-Powered Insights", desc: "Smart suggestions & fixes" },
    { icon: FileText, title: "Detailed Reports", desc: "Export & share results" },
];

export function AuthBrandPanel() {
    return (
        <div className="hidden w-full max-w-md flex-col justify-center px-4 lg:flex">
            <span className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                <Star className="h-3 w-3" fill="currentColor" /> Pro Security Testing
            </span>

            <h1 className="text-4xl font-extrabold leading-tight">
                Test. Analyze.
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Secure.</span>
            </h1>

            <p className="mt-4 text-sm text-gray-400">
                Comprehensive website security scanning and vulnerability analysis in one powerful platform.
            </p>

            {/* mini stat card */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Security Score</p>
                        <div className="relative mt-2 flex h-20 w-20 items-center justify-center">
                            <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
                                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="34"
                                    fill="none"
                                    stroke="#34d399"
                                    strokeWidth="7"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 34}
                                    strokeDashoffset={2 * Math.PI * 34 * (1 - 0.78)}
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-lg font-bold">78</span>
                                <span className="text-[9px] text-gray-500">/100</span>
                            </div>
                        </div>
                        <p className="mt-1 text-center text-[11px] font-semibold text-emerald-400">Good</p>
                    </div>
                    <div className="flex flex-col gap-3 text-xs">
                        <div>
                            <p className="font-semibold">21</p>
                            <p className="text-gray-500">Tests Run</p>
                        </div>
                        <div>
                            <p className="font-semibold text-amber-400">34</p>
                            <p className="text-gray-500">Issues Found</p>
                        </div>
                        <div>
                            <p className="font-semibold text-red-400">5</p>
                            <p className="text-gray-500">Critical</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mt-8 flex h-40 items-center justify-center">
                {/* glow */}
                <div
                    className="absolute h-40 w-40 rounded-full blur-2xl"
                    style={{ background: "radial-gradient(circle, rgba(129,140,248,0.35), transparent 70%)" }}
                />
                {/* floating particles */}
                <span className="absolute left-6 top-2 h-1.5 w-1.5 rounded-full bg-indigo-300/70" />
                <span className="absolute right-8 top-6 h-1 w-1 rounded-full bg-purple-300/70" />
                <span className="absolute left-10 bottom-8 h-1 w-1 rounded-full bg-indigo-300/50" />
                <span className="absolute right-4 bottom-4 h-1.5 w-1.5 rounded-full bg-purple-300/60" />
                {/* platform */}
                <div
                    className="absolute bottom-0 h-4 w-32 rounded-full"
                    style={{ background: "radial-gradient(ellipse, rgba(129,140,248,0.4), transparent 75%)" }}
                />
                {/* shield */}
                <svg width="100" height="118" viewBox="0 0 120 140" className="relative">
                    <defs>
                        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M60 5 L110 25 V65 C110 100 90 120 60 135 C30 120 10 100 10 65 V25 Z"
                        fill="url(#shieldGrad)"
                    />
                    <path
                        d="M40 68 L54 82 L82 50"
                        stroke="white"
                        strokeWidth="9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </svg>
            </div>

            <div className="mt-8 flex flex-col gap-4">
                {featureList.map((f) => (
                    <div key={f.title} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                            <f.icon className="h-4 w-4 text-indigo-300" />
                        </span>
                        <div>
                            <p className="text-sm font-medium">{f.title}</p>
                            <p className="text-xs text-gray-500">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}