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
import { activeTests, allTests, codeSamples, detailTabs, liveOutputLines, NavItems, passiveTests, runningTests, severityCount, severityMeta, Test, topIssues, totalIssues } from "../assets/assets";
import { CardShell } from "@/lib/Cardshell";
import { SectionLabel } from "@/lib/SectionLabel";
import { DonutChart } from "@/lib/DonutChart";
import { StatusPill } from "@/lib/StatusPill";
import { useColorContext } from "../context/useColorContext";
import OverviewView from "@/components/Overview";
import ResultsListView from "@/components/ResultsView";
import TestDetailView from "@/components/TestDetailView";
import NewTestView from "@/components/NewTestView";
import ScanningView from "@/components/ScanningView";



export default function WebTestApp() {

  const { c, theme, isDark, setTheme } = useColorContext()

  const [activeNav, setActiveNav] = useState("Overview");
  const [resultsTab, setResultsTab] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [detailTab, setDetailTab] = useState("Overview");
  const [scanning, setScanning] = useState(false);
  const [newTestUrl, setNewTestUrl] = useState("");
  const [codeLang, setCodeLang] = useState("Node.js (mysql2)");


  const openTest = (test: Test) => {
    setSelectedTest(test);
    setDetailTab("Overview");
  };

  const startScan = (e: FormEvent) => {
    e.preventDefault();
    setScanning(true);
  };



  let mainContent;
  if (scanning) {
    mainContent = <ScanningView newTestUrl={newTestUrl} setScanning={setScanning} />;
  } else if (activeNav === "Overview") {
    mainContent = <OverviewView setActiveNav={setActiveNav} />;
  } else if (activeNav === "New Test") {
    mainContent = <NewTestView newTestUrl={newTestUrl} setNewTestUrl={setNewTestUrl} startScan={startScan} />;
  } else if (activeNav === "Results") {
    mainContent = selectedTest ? <TestDetailView codeLang={codeLang} detailTab={detailTab} setCodeLang={setCodeLang} setDetailTab={setDetailTab} setSelectedTest={setSelectedTest} test={selectedTest} /> : <ResultsListView openTest={openTest} query={query} resultsTab={resultsTab} setResultsTab={setResultsTab} setQuery={setQuery} />;
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
            {NavItems.map((item) => {
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