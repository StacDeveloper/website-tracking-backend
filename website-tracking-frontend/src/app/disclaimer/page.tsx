"use client";

import { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Globe,
  Code2,
  Ban,
  Lock,
  FileCheck2,
  Info,
  Server,
} from "lucide-react";
import { useAuthContext } from "../context/useAuthContext";

const policies = [
  {
    icon: Globe,
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    title: "Authorize Only",
    desc: "You must have explicit written permission or be the owner of the website or API you are testing.",
  },
  {
    icon: Code2,
    color: "#fb923c",
    bg: "rgba(251,146,60,0.1)",
    title: "Development Use",
    desc: "This tool is intended for local environments, staging servers, and development purposes only.",
  },
  {
    icon: Ban,
    color: "#f87171",
    bg: "rgba(248,113,113,0.1)",
    title: "No Harmful Intent",
    desc: "Do not use this platform to scan, test, or exploit any production systems without authorization.",
  },
  {
    icon: Lock,
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.1)",
    title: "Legal Responsibility",
    desc: "You are solely responsible for ensuring your actions comply with all applicable laws and regulations.",
  },
  {
    icon: FileCheck2,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.1)",
    title: "Report Responsibly",
    desc: "Use the insights you gain to improve security and never to misuse or share vulnerabilities.",
  },
];

export default function DisclaimerPage() {
  const { acceptDisclaimer } = useAuthContext();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#050510] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* top bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600">
              <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight">WebTest</span>
            <span className="mx-1 h-5 w-px bg-white/15" />
            <span className="text-sm text-gray-400">Responsible Use Policy</span>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
            <ShieldCheck className="h-5 w-5 text-indigo-300" />
          </span>
        </div>

        {/* disclaimer banner */}
        <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/[0.06] p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/10">
              <AlertTriangle className="h-6 w-6 text-indigo-300" />
            </span>
            <div>
              <p className="text-lg font-bold uppercase tracking-wide text-indigo-300">Important Disclaimer</p>
              <p className="mt-2 max-w-2xl text-sm text-gray-300">
                WebTest is a security testing and API analysis platform designed for authorized testing{" "}
                <span className="text-indigo-300">
                  only on websites and APIs that you own, have explicit permission to test,
                </span>{" "}
                or are in your local development environment.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center justify-center gap-3 self-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30">
              <ShieldCheck className="h-10 w-10 text-indigo-300" strokeWidth={1.5} />
            </span>
            <span className="flex h-16 w-12 items-center justify-center rounded-lg bg-white/[0.04]">
              <Server className="h-6 w-6 text-gray-500" />
            </span>
          </div>
        </div>

        {/* strict policy divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-indigo-300">
            <ShieldCheck className="h-4 w-4" /> STRICT POLICY <ShieldCheck className="h-4 w-4" />
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* policy cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {policies.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <span
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: p.bg }}
              >
                <p.icon className="h-5 w-5" style={{ color: p.color }} />
              </span>
              <p className="text-sm font-semibold" style={{ color: p.color }}>
                {p.title}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* agree row */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 rounded accent-indigo-500"
            />
            <span>
              <span className="text-base font-bold">I Understand and Agree</span>
              <p className="mt-1 max-w-2xl text-sm text-gray-400">
                By using WebTest, I confirm that I will use this platform only for authorized testing on websites
                and APIs I own or have permission to test. I will not use it for any illegal or unethical
                activities.
              </p>
            </span>
          </label>
          <button
            onClick={acceptDisclaimer}
            disabled={!agreed}
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShieldCheck className="h-4 w-4" /> <span>I Agree &amp; Continue</span>
          </button>
        </div>

        {/* bottom note */}
        <div className="flex flex-col items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-xs text-gray-400 sm:flex-row">
          <span className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5 text-indigo-300" />
            <span className="text-indigo-300">Misuse of this platform may lead to legal consequences.</span> Always
            act ethically and responsibly.
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Secure the web. Build trust.
          </span>
        </div>
      </div>
    </div>
  );
}