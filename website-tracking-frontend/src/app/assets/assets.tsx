import { BarChart3, Bug, Clock, Gauge, LucideIcon, Search, ShieldCheck, Zap, Lock, LayoutGrid, Plus, History, ClipboardList, Bookmark, Share2, Settings, ShieldAlert, Info, Globe, Ban, FlaskConical, Cookie, FolderTree, Link2, Database, FileCode2, Upload, Terminal, KeyRound, UserCog, RefreshCw, Server, ExternalLink, KeySquare, PackageSearch, Bot, UserX, ShoppingCart, FileText, Layers, Smartphone, User, Palette, Bell, Users, CreditCard, AlertOctagon } from "lucide-react";

export const features: {
    icon: LucideIcon,
    title: string,
    description: string,
    color: string,
    bg: string
}[] = [
        { icon: Gauge, title: "Performance Test", description: "Analyze loading speed and performance metrics.", color: "text-purple-400", bg: "bg-purple-500/10" },
        { icon: Search, title: "SEO Analysis", description: "Get insights to improve your search engine rankings.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { icon: ShieldCheck, title: "Accessibility", description: "Ensure your website is usable by everyone.", color: "text-sky-400", bg: "bg-sky-500/10" },
        { icon: Bug, title: "Bug Detection", description: "Find potential issues and errors on your site.", color: "text-orange-400", bg: "bg-orange-500/10" },
    ];
export const footerItems: {
    icon: LucideIcon,
    title: string,
    description: string,
    color: string,
    bg: string
}[] = [
        { icon: Zap, title: "Fast & Accurate", description: "Get results in seconds with detailed insights.", color: "text-indigo-400", bg: "bg-indigo-500/10" },
        { icon: Lock, title: "Secure & Private", description: "Your data is never stored or shared with anyone.", color: "text-sky-400", bg: "bg-sky-500/10" },
        { icon: BarChart3, title: "Detailed Reports", description: "Get comprehensive reports with actionable insights.", color: "text-gray-400", bg: "bg-white/5" },
        { icon: Clock, title: "History & Tracking", description: "Track your tests history and monitor progress.", color: "text-pink-400", bg: "bg-pink-500/10" },
    ];

export const NavItems: {
    label: string,
    icon: LucideIcon
}[] = [
        { label: "Overview", icon: LayoutGrid },
        { label: "New Test", icon: Plus },
        { label: "History", icon: History },
        { label: "Results", icon: ClipboardList },
        { label: "Saved Targets", icon: Bookmark },
        { label: "Integrations", icon: Share2 },
        { label: "Settings", icon: Settings },
    ]
export const detailTabs = ["Overview", "Request / Response", "Evidence", "AI Suggestion", "References"];

export const severityMeta: Record<string, { text: string; bg: string; dot: string; ring: string }> = {
    Critical: { text: "text-red-400", bg: "bg-red-500/10", dot: "bg-red-500", ring: "#ef4444" },
    High: { text: "text-orange-400", bg: "bg-orange-500/10", dot: "bg-orange-500", ring: "#f97316" },
    Medium: { text: "text-amber-400", bg: "bg-amber-500/10", dot: "bg-amber-500", ring: "#f59e0b" },
    Low: { text: "text-sky-400", bg: "bg-sky-500/10", dot: "bg-sky-500", ring: "#38bdf8" },
    Info: { text: "text-cyan-400", bg: "bg-cyan-500/10", dot: "bg-cyan-500", ring: "#22d3ee" },
};

export const summaryCards: {
    label: string,
    value: number,
    icon: LucideIcon,
    color: string,
    bg: string
}[] = [
        { label: "Critical", value: 5, icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10" },
        { label: "High", value: 8, icon: ShieldCheck, color: "text-orange-400", bg: "bg-orange-500/10" },
        { label: "Medium", value: 6, icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-500/10" },
        { label: "Low", value: 2, icon: ShieldCheck, color: "text-sky-400", bg: "bg-sky-500/10" },
        { label: "Info", value: 7, icon: Info, color: "text-cyan-400", bg: "bg-cyan-500/10" },

    ]

export const testRows: {
    name: string,
    desc: string,
    icon: LucideIcon,
    iconBg: string,
    iconColor: string,
    type: string,
    severity: string,
    issues: number,
    suggestion: string,

}[] = [
        { name: "Security Headers", desc: "Checks for missing or misconfigured security headers.", icon: ShieldCheck, iconBg: "bg-purple-500/10", iconColor: "text-purple-400", type: "Passive", severity: "High", issues: 3, suggestion: "Add missing security headers like Content-Security-Policy, X-Frame-Options, X-Content-Type-Options." },
        { name: "TLS/SSL", desc: "Validates SSL/TLS configuration and certificate setup.", icon: Lock, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", type: "Active", severity: "Medium", issues: 1, suggestion: "Enable HSTS and ensure TLS 1.2+ is supported." },
        { name: "CORS", desc: "Checks for permissive Cross-Origin Resource Sharing.", icon: Globe, iconBg: "bg-purple-500/10", iconColor: "text-purple-400", type: "Active", severity: "High", issues: 2, suggestion: "Restrict allowed origins and avoid using wildcard (*) in production." },
        { name: "Clickjacking", desc: "Detects if your site is vulnerable to clickjacking attacks.", icon: Ban, iconBg: "bg-pink-500/10", iconColor: "text-pink-400", type: "Passive", severity: "High", issues: 1, suggestion: "Add X-Frame-Options or Content-Security-Policy frame-ancestors directive." },
        { name: "Information Disclosure", desc: "Checks for sensitive information exposure.", icon: FlaskConical, iconBg: "bg-sky-500/10", iconColor: "text-sky-400", type: "Active", severity: "Medium", issues: 2, suggestion: "Remove stack traces, error messages, and sensitive info from responses." },
        { name: "Session Cookie", desc: "Checks cookie attributes for session management.", icon: Cookie, iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400", type: "Passive", severity: "Medium", issues: 1, suggestion: "Set HttpOnly, Secure, and SameSite flags for session cookies." },
        { name: "Open Redirect", desc: "Checks for unvalidated redirects.", icon: Link2, iconBg: "bg-rose-500/10", iconColor: "text-rose-400", type: "Active", severity: "High", issues: 2, suggestion: "Validate redirect URLs and use allowlist for trusted domains." },
        { name: "Path Traversal", desc: "Checks for directory traversal vulnerabilities.", icon: FolderTree, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", type: "Active", severity: "Critical", issues: 1, suggestion: "Sanitize user input and avoid using user-controlled paths in file operations." },
    ]

export const resultTabs: { label: string, value: string, count: number }[] = [
    { label: "All Tests", value: "all", count: 21 },
    { label: "Active", value: "Active", count: 11 },
    { label: "Passive", value: "Passive", count: 10 },
]
export const detailsTab: string[] = ["Overview", "Request / Response", "Evidence", "AI Suggestion", "References"];
export const activeTests = [
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

export const passiveTests = [
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


export const allTests = [...activeTests, ...passiveTests]
export const severityCount = { Critical: 5, High: 8, Medium: 6, Low: 2, Info: 7 }
export const totalIssues = Object.values(severityCount).reduce((a, b) => a + b, 0)

export const topIssues = [
    { name: "Missing Security Headers", count: 3 },
    { name: "CORS Misconfiguration", count: 2 },
    { name: "SQL Injection", count: 2 },
    { name: "XSS Detected", count: 1 },
]

export const runningTests = [
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
]

export const liveOutputLines = [
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

export const codeSamples: Record<string, string> = {
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

export type Test = (typeof activeTests)[number]

export const historyRows = [
    { target: "https://example.com", icon: Globe, iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400", tests: 21, score: 78, issues: 21, status: "Completed", date: "3 May 2025, 12:42 PM" },
    { target: "https://api.example.com", icon: Server, iconBg: "bg-sky-500/10", iconColor: "text-sky-400", tests: 21, score: 91, issues: 7, status: "Completed", date: "1 May 2025, 10:15 AM" },
    { target: "https://shop.example.com", icon: ShoppingCart, iconBg: "bg-orange-500/10", iconColor: "text-orange-400", tests: 21, score: 64, issues: 34, status: "Completed", date: "29 Apr 2025, 4:30 PM" },
    { target: "https://blog.example.com", icon: FileText, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", tests: 21, score: 82, issues: 15, status: "Completed", date: "27 Apr 2025, 9:20 AM" },
    { target: "https://staging.example.com", icon: Layers, iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400", tests: 21, score: 48, issues: 52, status: "Completed", date: "25 Apr 2025, 2:10 PM" },
    { target: "https://myapp.example.com", icon: Smartphone, iconBg: "bg-white/5", iconColor: "text-gray-400", tests: 21, score: 73, issues: 19, status: "Failed", date: "23 Apr 2025, 11:05 AM" },
    { target: "https://test.example.com", icon: Globe, iconBg: "bg-white/5", iconColor: "text-gray-400", tests: 21, score: 88, issues: 9, status: "Completed", date: "20 Apr 2025, 3:45 PM" },
]

export const savedTargetLists = [
    { domain: "example.com", desc: "Production Website", icon: Globe, iconBg: "bg-indigo-500/10", iconColor: "text-indigo-400", lastTested: "3 May 2025", score: 78, tests: 21 },
    { domain: "api.example.com", desc: "Main API Server", icon: Server, iconBg: "bg-sky-500/10", iconColor: "text-sky-400", lastTested: "1 May 2025", score: 91, tests: 18 },
    { domain: "shop.example.com", desc: "E-commerce Platform", icon: ShoppingCart, iconBg: "bg-red-500/10", iconColor: "text-red-400", lastTested: "29 Apr 2025", score: 64, tests: 21 },
    { domain: "blog.example.com", desc: "Company Blog", icon: FileText, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", lastTested: "27 Apr 2025", score: 82, tests: 14 },
    { domain: "staging.example.com", desc: "Staging Environment", icon: Layers, iconBg: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400", lastTested: "25 Apr 2025", score: 48, tests: 19 },
    { domain: "myapp.example.com", desc: "Web Application", icon: Smartphone, iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", lastTested: "23 Apr 2025", score: 73, tests: 21 },
]

export const settingsNav = [
    { label: "General", icon: Settings },
    { label: "Account", icon: User },
    { label: "Appearance", icon: Palette },
    { label: "Testing", icon: Gauge },
    { label: "Notifications", icon: Bell },
    { label: "Integrations", icon: Share2 },
    { label: "Team", icon: Users },
    { label: "Billing", icon: CreditCard },
    { label: "Danger Zone", icon: AlertOctagon },
]

export const accentColors = ["#6366f1", "#0ea5e9", "#10b981", "#22c55e", "#f59e0b", "#ef4444", "#ec4899"]

export const individualTestOptions = [
    "SQL Injection",
    "XSS (Cross Site Scripting)",
    "Command Injection",
    "Broken Access Control",
    "Security Misconfiguration",
    "Sensitive Data Exposure",
    "CSRF",
    "SSRF",
    "Open Redirect",
    "Path Traversal",
    "Rate Limit",
    "API Mass Assignment",
    "File Upload",
    "Security Headers",
    "TLS/SSL",
    "CORS",
    "Clickjacking",
    "Information Disclosure",
    "Session Cookie",
    "JWT Security",
    "Dependency CVE",
];

export const categoryMeta: Record<
    string,
    {
        name: string;
        icon: LucideIcon;
        bg: string;
    }
> = {
    SECURITY_HEADERS: {
        name: "Security Headers",
        icon: ShieldCheck,
        bg: "bg-purple-500/10",
    },

    TLS_SSL: {
        name: "TLS / SSL",
        icon: Lock,
        bg: "bg-emerald-500/10",
    },

    CORS: {
        name: "CORS",
        icon: Globe,
        bg: "bg-purple-500/10",
    },

    CLICKJACKING: {
        name: "Clickjacking",
        icon: Ban,
        bg: "bg-pink-500/10",
    },

    INFO_DISCLOSURE: {
        name: "Information Disclosure",
        icon: FlaskConical,
        bg: "bg-sky-500/10",
    },

    SESSION_COOKIE: {
        name: "Session Cookie",
        icon: Cookie,
        bg: "bg-fuchsia-500/10",
    },

    OPEN_REDIRECT: {
        name: "Open Redirect",
        icon: Link2,
        bg: "bg-rose-500/10",
    },

    PATH_TRAVERSAL: {
        name: "Path Traversal",
        icon: FolderTree,
        bg: "bg-emerald-500/10",
    },

    JWT: {
        name: "JWT",
        icon: KeyRound,
        bg: "bg-yellow-500/10",
    },

    CSRF: {
        name: "CSRF",
        icon: ShieldAlert,
        bg: "bg-orange-500/10",
    },

    SSRF: {
        name: "SSRF",
        icon: Server,
        bg: "bg-blue-500/10",
    },

    DEPENDENCY_CVE: {
        name: "Dependency CVE",
        icon: Bug,
        bg: "bg-red-500/10",
    },
};