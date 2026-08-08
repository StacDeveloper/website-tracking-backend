"use client";

import { useMemo, useState, type ReactNode, type FormEvent } from "react";
import {
  CircleCheckBig,
  LayoutGrid,
  Plus,
  History,
  ClipboardList,
  Bookmark,
  Share2,
  Settings,
  Moon,
  Sun,
  ChevronRight,
  Globe,
  ExternalLink,
  Download,
  Search,
  X,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Database,
  FileCode2,
  Upload,
  Terminal,
  KeyRound,
  UserCog,
  RefreshCw,
  Server,
  FolderTree,
  Gauge,
  KeySquare,
  PackageSearch,
  Bot,
  UserX,
  Crown,
  Headphones,
  Loader2,
  Circle,
  CircleDashed,
  Copy,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Play,
  XCircle,
} from "lucide-react";
import { severityMeta } from "../assets/assets";

// ============================================================
// static data
// ============================================================

const navItems = [
  { label: "Overview", icon: LayoutGrid },
  { label: "New Test", icon: Plus },
  { label: "History", icon: History },
  { label: "Results", icon: ClipboardList },
  { label: "Saved Targets", icon: Bookmark },
  { label: "Integrations", icon: Share2 },
  { label: "Settings", icon: Settings },
];



const activeTests = [
  { name: "SQL Injection", desc: "Detects SQL injection vulnerabilities.", icon: Database, iconBg: "bg-red-500/10", iconColor: "text-red-400", type: "Active", severity: "Critical", issues: 2 },
  { name: "XSS (Cross Site Scripting)", desc: "Finds reflected, stored and DOM based XSS.", icon: FileCode2, iconBg: "bg-orange-500/10", iconColor: "text-orange-400", type: "Active", severity: "High", issues: 1 },
  { name: "File Upload", desc: "Checks for insecure file upload vulnerabilities.", icon: Upload, iconBg: "bg-orange-500/10", iconColor: "text-orange-400", type: "Active", severity: "High", issues: 2 },
  { name: "Command Injection", desc: "Detects OS command injection vulnerabilities.", icon: Terminal, iconBg: "bg-red-500/10", iconColor: "text-red-400", type: "Active", severity: "Critical", issues: 1 },
  { name: "Broken Access Control", desc: "Identifies broken access control issues.", icon: KeyRound, iconBg: "bg-orange-500/10", iconColor: "text-orange-400", type: "Active", severity: "High", issues: 2 },
  { name: "API Mass Assignment", desc: "Checks for mass assignment vulnerabilities.", icon: UserCog, iconBg: "bg-amber-500/10", iconColor: "text-amber-400", type: "Active", severity: "Medium", issues: 1 },
  { name: "CSRF", desc: "Checks for Cross Site Request Forgery.", icon: RefreshCw, iconBg: "bg-amber-500/10", iconColor: "text-amber-400", type: "Active", severity: "Medium", issues: 1 },
  { name: "SSRF", desc: "Server Side Request Forgery detection.", icon: Server, iconBg: "bg-orange-500/10", iconColor: "text-orange-400", type: "Active", severity: "High", issues: 1 },
  { name: "Open Redirect", desc: "Checks for unvalidated redirects.", icon: ExternalLink, iconBg: "bg-amber-500/10", iconColor: "text-amber-400", type: "Active", severity: "Medium", issues: 1 },
  { name: "Path Traversal", desc: "Checks for directory traversal vulnerabilities.", icon: FolderTree, iconBg: "bg-red-500/10", iconColor: "text-red-400", type: "Active", severity: "Critical", issues: 1 },
  { name: "Rate Limit", desc: "Checks if rate limiting is properly implemented.", icon: Gauge, iconBg: "bg-amber-500/10", iconColor: "text-amber-400", type: "Active", severity: "Medium", issues: 1 },
];

const passiveTests = [
  { name: "Security Headers", desc: "Checks for missing or misconfigured security headers.", icon: ShieldCheck, iconBg: "bg-purple-500/10", iconColor: "text-purple-400", type: "Passive", severity: "High", issues: 3 },
  { name: "TLS/SSL", desc: "Validates SSL/TLS configuration and certificate setup.", icon: Lock, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", type: "Passive", severity: "Medium", issues: 1 },
  { name: "CORS", desc: "Checks for permissive Cross-Origin Resource Sharing.", icon: Globe, iconBg: "bg-purple-500/10", iconColor: "text-purple-400", type: "Passive", severity: "High", issues: 2 },
  { name: "Clickjacking", desc: "Detects if your site is vulnerable to clickjacking attacks.", icon: ShieldAlert, iconBg: "bg-pink-500/10", iconColor: "text-pink-400", type: "Passive", severity: "High", issues: 1 },
  { name: "Information Disclosure", desc: "Checks for sensitive information exposure.", icon: FileCode2, iconBg: "bg-sky-500/10", iconColor: "text-sky-400", type: "Passive", severity: "Medium", issues: 2 },
  { name: "Session Cookie", desc: "Checks cookie attributes for session management.", icon: KeySquare, iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400", type: "Passive", severity: "Medium", issues: 1 },
  { name: "JWT Security", desc: "Analyzes JSON Web Token implementation.", icon: KeySquare, iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400", type: "Passive", severity: "Medium", issues: 1 },
  { name: "Dependency CVE", desc: "Checks for known vulnerabilities in dependencies.", icon: PackageSearch, iconBg: "bg-rose-500/10", iconColor: "text-rose-400", type: "Passive", severity: "Medium", issues: 1 },
  { name: "Bot Detection", desc: "Checks if bot protection mechanisms exist.", icon: Bot, iconBg: "bg-sky-500/10", iconColor: "text-sky-400", type: "Passive", severity: "Low", issues: 1 },
  { name: "Fake User Detection", desc: "Checks for fake user registration vulnerabilities.", icon: UserX, iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", type: "Passive", severity: "Info", issues: 0 },
];

const allTests = [...activeTests, ...passiveTests];

const severityCounts = { Critical: 5, High: 8, Medium: 6, Low: 2, Info: 7 };
const totalIssues = Object.values(severityCounts).reduce((a, b) => a + b, 0);

const topIssues = [
  { name: "Missing Security Headers", count: 3 },
  { name: "CORS Misconfiguration", count: 2 },
  { name: "SQL Injection", count: 2 },
  { name: "XSS Detected", count: 1 },
];

const runningTests = [
  { name: "Security Headers", icon: ShieldCheck, status: "Completed" },
  { name: "TLS/SSL", icon: Lock, status: "Completed" },
  { name: "CORS", icon: Globe, status: "Completed" },
  { name: "Clickjacking", icon: ShieldAlert, status: "Completed" },
  { name: "Information Disclosure", icon: FileCode2, status: "Completed" },
  { name: "Session Cookie", icon: KeySquare, status: "Completed" },
  { name: "SQL Injection", icon: Database, status: "In Progress" },
  { name: "XSS (Cross Site Scripting)", icon: FileCode2, status: "Pending" },
  { name: "File Upload", icon: Upload, status: "Pending" },
  { name: "Command Injection", icon: Terminal, status: "Pending" },
];

const liveOutputLines = [
  "[12:42:10] Starting scan...",
  "[12:42:10] Target: https://example.com",
  "[12:42:11] [Security Headers] Checking...",
  "[12:42:11] [Security Headers] Completed",
  "[12:42:12] [TLS/SSL] Checking certificate...",
  "[12:42:12] [TLS/SSL] Completed",
  "[12:42:13] [CORS] Analyzing...",
  "[12:42:13] [CORS] Completed",
  "[12:42:14] [Clickjacking] Checking...",
  "[12:42:14] [Clickjacking] Completed",
  "[12:42:15] [Information Disclosure] Checking...",
  "[12:42:15] [Information Disclosure] Completed",
  "[12:42:16] [Session Cookie] Checking...",
  "[12:42:16] [Session Cookie] Completed",
  "[12:42:17] [SQL Injection] Testing payloads...",
  "[12:42:18] [SQL Injection] Testing payload 12/36",
];

const codeSamples: Record<string, string> = {
  "Node.js (mysql2)": `const mysql = require('mysql2/promise');

// Instead of this (vulnerable):
// const query = "SELECT * FROM users WHERE id = " + req.query.id;

// Use this (safe):
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE id = ?',
  [req.query.id]
);`,
  "PHP (PDO)": `$stmt = $pdo->prepare(
  'SELECT * FROM users WHERE id = :id'
);
$stmt->execute(['id' => $_GET['id']]);
$user = $stmt->fetch();`,
  "Java (JDBC)": `String sql = "SELECT * FROM users WHERE id = ?";
PreparedStatement stmt = conn.prepareStatement(sql);
stmt.setInt(1, userId);
ResultSet rs = stmt.executeQuery();`,
  "Python (psycopg2)": `cur.execute(
  "SELECT * FROM users WHERE id = %s",
  (user_id,)
)
user = cur.fetchone()`,
};

const detailTabs = ["Overview", "Request / Response", "Evidence", "AI Suggestion", "References"];

type Test = (typeof activeTests)[number];

// ============================================================
// small building blocks
// ============================================================

function DonutChart({ counts, accent }: { counts: Record<string, number>; accent: string }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  let cumulative = 0;
  const stops = Object.entries(counts).map(([label, count]) => {
    const start = (cumulative / total) * 360;
    cumulative += count;
    const end = (cumulative / total) * 360;
    return `${severityMeta[label].ring} ${start}deg ${end}deg`;
  });

  return (
    <div className="relative flex h-[140px] w-[140px] items-center justify-center">
      <div
        className="h-full w-full rounded-full"
        style={{ background: `conic-gradient(${stops.join(", ")})` }}
      />
      <div
        className="absolute flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full"
        style={{ backgroundColor: accent }}
      >
        <span className="text-xl font-bold">{total}</span>
        <span className="text-[11px]" style={{ opacity: 0.6 }}>
          Total
        </span>
      </div>
    </div>
  );
}

function ScoreRing({ score, accent }: { score: number; accent: string }) {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
      />
    </svg>
  );
}

function StatusPill({ status }: { status: string }) {
  if (status === "Completed")
    return (
      <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
        <CircleCheckBig className="h-3 w-3" /> Completed
      </span>
    );
  if (status === "In Progress")
    return (
      <span className="flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400">
        <Loader2 className="h-3 w-3 animate-spin" /> In Progress
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-gray-400">
      <CircleDashed className="h-3 w-3" /> Pending
    </span>
  );
}

// ============================================================
// page
// ============================================================

export default function WebTestApp() {
  const [theme, setTheme] = useState("dark");
  const [activeNav, setActiveNav] = useState("Overview");
  const [resultsTab, setResultsTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [detailTab, setDetailTab] = useState("Overview");
  const [scanning, setScanning] = useState(false);
  const [newTestUrl, setNewTestUrl] = useState("");
  const [codeLang, setCodeLang] = useState("Node.js (mysql2)");

  const isDark = theme === "dark";

  const c = {
    mainBg: isDark ? "#050510" : "#f7f7fb",
    sidebarBg: isDark ? "#0a0a16" : "#ffffff",
    cardBg: isDark ? "#0c0c1a" : "#ffffff",
    cardBg2: isDark ? "#10101f" : "#fafafe",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,15,26,0.08)",
    textPrimary: isDark ? "#ffffff" : "#0f0f1a",
    textSecondary: isDark ? "#d1d5db" : "#4b5563",
    textMuted: isDark ? "#9ca3af" : "#6b7280",
    textFaint: isDark ? "#6b7280" : "#9ca3af",
    activeNavBg: isDark ? "rgba(129,140,248,0.15)" : "rgba(79,70,229,0.1)",
    accent: isDark ? "#818cf8" : "#4f46e5",
    inputBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,15,26,0.03)",
    toggleBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,15,26,0.06)",
    codeBg: isDark ? "#050510" : "#0f0f1a",
  };

  const filteredRows = useMemo(() => {
    const base = resultsTab === "all" ? allTests : resultsTab === "Active" ? activeTests : passiveTests;
    return base.filter((row) => row.name.toLowerCase().includes(query.toLowerCase()));
  }, [resultsTab, query]);

  const openTest = (test: Test) => {
    setSelectedTest(test);
    setDetailTab("Overview");
  };

  const startScan = (e: FormEvent) => {
    e.preventDefault();
    setScanning(true);
  };

  // ---------- shared bits ----------

  const CardShell = ({ className = "", children }: { className?: string; children: ReactNode }) => (
    <div className={`rounded-xl border ${className}`} style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}>
      {children}
    </div>
  );

  const SectionLabel = ({ children }: { children: ReactNode }) => (
    <p className="mb-3 text-sm font-semibold" style={{ color: c.textPrimary }}>
      {children}
    </p>
  );

  // ---------- Overview view ----------

  const OverviewView = () => (
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
        {Object.entries(severityCounts).map(([label, value]) => (
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
            <DonutChart counts={severityCounts} accent={c.cardBg} />
            <div className="flex flex-col gap-2">
              {Object.entries(severityCounts).map(([label, value]) => (
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

  // ---------- Results list view ----------

  const resultTabsList = [
    { label: "All Tests", value: "all", count: allTests.length },
    { label: "Active", value: "Active", count: activeTests.length },
    { label: "Passive", value: "Passive", count: passiveTests.length },
  ];

  const ResultsListView = () => (
    <div className="px-8 pb-16">
      <h1 className="mb-1 text-xl font-bold">
        {resultsTab === "Active" ? "Active Tests" : resultsTab === "Passive" ? "Passive Tests" : "All Tests"}
      </h1>
      <p className="mb-5 text-sm" style={{ color: c.textMuted }}>
        {resultsTab === "Active"
          ? "Active tests make requests to your target and analyze the responses."
          : resultsTab === "Passive"
          ? "Passive tests analyze responses and configurations without sending intrusive payloads."
          : "Every test WebTest ran against your target."}
      </p>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 rounded-lg border p-1" style={{ borderColor: c.cardBorder }}>
          {resultTabsList.map((tab) => {
            const active = resultsTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setResultsTab(tab.value)}
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium"
                style={{ backgroundColor: active ? c.activeNavBg : "transparent", color: active ? c.accent : c.textSecondary }}
              >
                {tab.label}
                <span className="rounded px-1.5 py-0.5 text-xs" style={{ backgroundColor: c.inputBg, color: c.textFaint }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5" style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg }}>
          {query ? (
            <X className="h-4 w-4 cursor-pointer" style={{ color: c.textFaint }} onClick={() => setQuery("")} />
          ) : (
            <Search className="h-4 w-4" style={{ color: c.textFaint }} />
          )}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${resultsTab === "all" ? "" : resultsTab.toLowerCase() + " "}tests...`}
            className="w-40 bg-transparent text-sm focus:outline-none"
            style={{ color: c.textPrimary }}
          />
        </div>
      </div>

      <CardShell>
        <div className="divide-y" style={{ borderColor: c.cardBorder }}>
          {filteredRows.map((row) => {
            const sev = severityMeta[row.severity];
            return (
              <div key={row.name} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${row.iconBg}`}>
                    <row.icon className={`h-4 w-4 ${row.iconColor}`} />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{row.name}</p>
                    <p className="text-xs" style={{ color: c.textFaint }}>{row.desc}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-6">
                  <span className={`flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${sev.bg} ${sev.text}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${sev.dot}`} />
                    {row.severity}
                  </span>
                  <span className="text-xs" style={{ color: c.textFaint }}>
                    {row.issues} {row.issues === 1 ? "Issue" : "Issues"}
                  </span>
                  <button
                    onClick={() => openTest(row)}
                    className="whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium"
                    style={{ borderColor: c.cardBorder, color: c.accent }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
          {filteredRows.length === 0 && (
            <p className="px-5 py-10 text-center text-sm" style={{ color: c.textMuted }}>
              No tests match your search.
            </p>
          )}
        </div>
      </CardShell>
    </div>
  );

  // ---------- Test detail view ----------

  const TestDetailView = ({ test }: { test: Test }) => {
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

  // ---------- New test / scanning view ----------

  const NewTestView = () => (
    <div className="flex flex-col items-center px-8 pb-16 pt-8">
      <CardShell className="w-full max-w-lg p-6 text-center">
        <SectionLabel>Start a new test</SectionLabel>
        <form onSubmit={startScan} className="flex flex-col gap-3">
          <input
            value={newTestUrl}
            onChange={(e) => setNewTestUrl(e.target.value)}
            placeholder="https://example.com"
            className="rounded-lg border px-4 py-2.5 text-sm focus:outline-none"
            style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg, color: c.textPrimary }}
          />
          <button type="submit" className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: c.accent }}>
            <Play className="h-4 w-4" /> Start Scan
          </button>
        </form>
      </CardShell>
    </div>
  );

  const ScanningView = () => {
    const completed = runningTests.filter((t) => t.status === "Completed").length;
    const inProgress = runningTests.filter((t) => t.status === "In Progress").length;
    const pending = runningTests.filter((t) => t.status === "Pending").length;

    return (
      <div className="px-8 pb-16">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-400" />
            </span>
            <div>
              <p className="text-lg font-semibold">Scanning {newTestUrl || "https://example.com"}</p>
              <p className="text-sm" style={{ color: c.textMuted }}>Test ID: WT-1746272523</p>
            </div>
          </div>
          <button
            onClick={() => setScanning(false)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-red-400"
            style={{ borderColor: "rgba(248,113,113,0.3)" }}
          >
            <XCircle className="h-4 w-4" /> Cancel Scan
          </button>
        </div>

        <CardShell className="mb-6 p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Overall Progress</span>
            <span style={{ color: c.textFaint }}>68%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: c.inputBg }}>
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600" style={{ width: "68%" }} />
          </div>
        </CardShell>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CardShell className="p-5">
            <SectionLabel>Running Tests</SectionLabel>
            <div className="flex flex-col divide-y" style={{ borderColor: c.cardBorder }}>
              {runningTests.map((t) => (
                <div key={t.name} className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-2.5 text-sm" style={{ color: c.textSecondary }}>
                    <t.icon className="h-4 w-4" style={{ color: c.textFaint }} />
                    {t.name}
                  </span>
                  <StatusPill status={t.status} />
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell className="p-5">
            <SectionLabel>Live Output</SectionLabel>
            <div
              className="h-[360px] overflow-y-auto rounded-lg p-3 font-mono text-xs leading-relaxed"
              style={{ backgroundColor: c.codeBg, color: "#a5b4fc" }}
            >
              {liveOutputLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </CardShell>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <CardShell className="p-5">
            <p className="text-sm" style={{ color: c.textMuted }}>Completed</p>
            <p className="mt-1 text-2xl font-bold">{completed}</p>
          </CardShell>
          <CardShell className="p-5">
            <p className="text-sm" style={{ color: c.textMuted }}>In Progress</p>
            <p className="mt-1 text-2xl font-bold">{inProgress}</p>
          </CardShell>
          <CardShell className="p-5">
            <p className="text-sm" style={{ color: c.textMuted }}>Pending</p>
            <p className="mt-1 text-2xl font-bold">{pending}</p>
          </CardShell>
          <CardShell className="p-5">
            <p className="text-sm" style={{ color: c.textMuted }}>Issues Found</p>
            <p className="mt-1 text-2xl font-bold text-red-400">12</p>
          </CardShell>
        </div>
      </div>
    );
  };

  // ---------- render ----------

  let mainContent;
  if (scanning) {
    mainContent = <ScanningView />;
  } else if (activeNav === "Overview") {
    mainContent = <OverviewView />;
  } else if (activeNav === "New Test") {
    mainContent = <NewTestView />;
  } else if (activeNav === "Results") {
    mainContent = selectedTest ? <TestDetailView test={selectedTest} /> : <ResultsListView />;
  } else {
    mainContent = (
      <div className="flex flex-col items-center justify-center px-8 py-32 text-center">
        <p className="text-lg font-semibold">{activeNav}</p>
        <p className="mt-2 max-w-sm text-sm" style={{ color: c.textMuted }}>
          This section is coming soon. Switching tabs here updates state only — no page reload.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: c.mainBg, color: c.textPrimary, transition: "background-color 0.3s, color 0.3s" }}>
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col justify-between border-r px-4 py-6" style={{ backgroundColor: c.sidebarBg, borderColor: c.cardBorder }}>
        <div>
          <div className="mb-8 flex items-center gap-2 px-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600">
              <CircleCheckBig className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Web<span style={{ color: c.accent }}>Test</span>
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = !scanning && activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveNav(item.label);
                    setSelectedTest(null);
                    setScanning(false);
                    if (item.label === "Results") setResultsTab("all");
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                  style={{ backgroundColor: active ? c.activeNavBg : "transparent", color: active ? c.accent : c.textSecondary }}
                >
                  <item.icon className="h-4 w-4" strokeWidth={2} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border p-4" style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}>
            <div className="mb-1 flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold">Pro Plan</span>
            </div>
            <p className="text-xs" style={{ color: c.textMuted }}>Tests Remaining</p>
            <p className="text-lg font-bold">78 / 100</p>
            <div className="my-2 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: c.inputBg }}>
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600" style={{ width: "78%" }} />
            </div>
            <button className="mt-2 w-full rounded-lg border py-1.5 text-xs font-semibold" style={{ borderColor: c.cardBorder, color: c.textPrimary }}>
              Upgrade Plan
            </button>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: c.cardBorder, backgroundColor: c.cardBg }}>
            <div className="mb-1 flex items-center gap-2">
              <Headphones className="h-4 w-4" style={{ color: c.textMuted }} />
              <span className="text-sm font-semibold">Need Help?</span>
            </div>
            <p className="mb-3 text-xs" style={{ color: c.textMuted }}>Check our docs or contact support.</p>
            <button className="w-full rounded-lg border py-1.5 text-xs font-semibold" style={{ borderColor: c.cardBorder, color: c.textPrimary }}>
              View Docs
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden">
        <div className="flex items-center justify-end gap-3 px-8 py-6">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: c.toggleBg }}
          >
            {isDark ? <Moon className="h-4 w-4" style={{ color: c.textSecondary }} /> : <Sun className="h-4 w-4" style={{ color: c.textSecondary }} />}
          </button>
          <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold" style={{ backgroundColor: c.activeNavBg, color: c.accent }}>
            A
          </span>
        </div>
        {mainContent}
      </main>
    </div>
  );
}