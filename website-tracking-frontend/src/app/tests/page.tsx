"use client";

import { useState, type ReactNode } from "react";
import {
  CircleCheckBig,
  Moon,
  Sun,
  Crown,
  Headphones,
} from "lucide-react";
import ScanningView from "@/tabs/ScanningView";
import OverviewView from "@/tabs/Overview";
import NewTestView from "@/tabs/NewTestView";
import TestDetailView from "@/tabs/TestDetailView";
import ResultsListView from "@/tabs/ResultsView";
import HistoryView from "@/tabs/HistoryView";
import SavedTargetsView from "@/tabs/SavedTargetsView";
import SettingsView from "@/tabs/SettingsView";
import { accentColors, individualTestOptions, NavItems, Test } from "../assets/assets";


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

  // New Test form state
  const [newTestType, setNewTestType] = useState<"Active" | "Passive">("Active");
  const [selectedTestNames, setSelectedTestNames] = useState<Set<string>>(new Set(individualTestOptions));

  // History state
  const [historyQuery, setHistoryQuery] = useState("");

  // Saved Targets state
  const [savedQuery, setSavedQuery] = useState("");

  // Settings state
  const [settingsTab, setSettingsTab] = useState("General");
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [accentColor, setAccentColor] = useState(accentColors[0]);
  const [defaultTestType, setDefaultTestType] = useState("Active Tests");
  const [requestTimeout, setRequestTimeout] = useState("30 sec");
  const [maxConcurrency, setMaxConcurrency] = useState("5");
  const [followRedirects, setFollowRedirects] = useState(true);
  const [notifyScanCompleted, setNotifyScanCompleted] = useState(false);
  const [notifyCritical, setNotifyCritical] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(true);

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



  const openTest = (test: Test) => {
    setSelectedTest(test);
    setDetailTab("Overview");
  };

  const startScan = () => {
    setScanning(true);
  };



  const toggleTestName = (name: string) => {
    setSelectedTestNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };



  let mainContent;
  if (scanning) {
    mainContent = <ScanningView newTestUrl={newTestUrl} setScanning={setScanning} />;
  } else if (activeNav === "Overview") {
    mainContent = <OverviewView setActiveNav={setActiveNav} />;
  } else if (activeNav === "New Test") {
    mainContent = <NewTestView newTestType={newTestType} newTestUrl={newTestUrl} selectedTestNames={selectedTestNames} setNewTestType={setNewTestType} setNewTestUrl={setNewTestUrl} setSelectedTestNames={setSelectedTestNames} startScan={startScan} toggleTestName={toggleTestName} />;
  } else if (activeNav === "Results") {
    mainContent = selectedTest ? <TestDetailView test={selectedTest} codeLang={codeLang} detailTab={detailTab} setCodeLang={setCodeLang} setDetailTab={setDetailTab} setSelectedTest={setSelectedTest} /> : <ResultsListView openTest={openTest} query={query} resultsTab={resultsTab} setQuery={setQuery} setResultsTab={setResultsTab} />;
  } else if (activeNav === "History") {
    mainContent = <HistoryView historyQuery={historyQuery} setHistoryQuery={setHistoryQuery} />;
  } else if (activeNav === "Saved Targets") {
    mainContent = <SavedTargetsView savedQuery={savedQuery} setNewTestUrl={setNewTestUrl} setSavedQuery={setSavedQuery} startScan={startScan} />;
  } else if (activeNav === "Settings") {
    mainContent = <SettingsView accentColor={accentColor} defaultTestType={defaultTestType} email={email} followRedirects={followRedirects} fullName={fullName} maxConcurrency={maxConcurrency} notifyCritical={notifyCritical} notifyScanCompleted={notifyScanCompleted} notifyWeekly={notifyWeekly} requestTimeout={requestTimeout} setAccentColor={setAccentColor} setDefaultTestType={setDefaultTestType} setEmail={setEmail} setFollowRedirects={setFollowRedirects} setFullName={setFullName} setMaxConcurrency={setMaxConcurrency} setNotifyCritical={setNotifyCritical} setNotifyScanCompleted={setNotifyScanCompleted} setNotifyWeekly={setNotifyWeekly} setRequestTimeout={setRequestTimeout} setSettingsTab={setSettingsTab} settingsTab={settingsTab} />;
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