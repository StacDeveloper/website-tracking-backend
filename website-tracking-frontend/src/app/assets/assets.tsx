import { BarChart3, Bug, Clock, Gauge, LucideIcon, Search, ShieldCheck, Zap, Lock, LayoutGrid, Plus, History, ClipboardList, Bookmark, Share2, Settings, ShieldAlert, Info, Globe, Ban, FlaskConical, Cookie, FolderTree, Link2, Database, FileCode2, Upload, Terminal, KeyRound, UserCog, RefreshCw, Server, ExternalLink, KeySquare, PackageSearch, Bot, UserX, ShoppingCart, FileText, Layers, Smartphone, User, Palette, Bell, Users, CreditCard, AlertOctagon, Timer, EyeOff, ArrowRightLeft, Radar, Fingerprint } from "lucide-react";

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
export const testNameToEnum: Record<string, string> = {
    "SQL Injection": "SQL_INJECTION",
    "XSS (Cross Site Scripting)": "XSS",
    "Command Injection": "COMMAND_INJECTION_XXE",
    "SSRF": "SSRF",
    "Open Redirect": "OPEN_REDIRECT",
    "Path Traversal": "PATH_TRAVERSAL",
    "Rate Limit": "RATE_LIMIT",
    "API Mass Assignment": "API_MASS_ASSIGNMENT",
    "File Upload": "FILE_UPLOAD",
    "Security Headers": "SECURITY_HEADERS",
    "TLS/SSL": "TLS_SSL",
    "CORS": "CORS",
    "Clickjacking": "CLICKJACKING",
    "Information Disclosure": "INFO_DISCLOSURE",
    "Session Cookie": "SESSION_COOKIE",
    "CSRF": "CSRF",
    "JWT": "JWT",
    "Bot Detection": "BOT",
    "Fake User": "FAKE_USER",
    "Broken Access Control": "BROKEN_ACCESS_CONTROL",
    "Dependency Vulnerabilities": "DEPENDENCY_CVE",
};
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
    "CSRF",
    "JWT",
    "Bot Detection",
    "Fake User",
    "Broken Access Control",
    "Dependency Vulnerabilities",
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

export const historyIcons = [
    { icon: ShieldCheck, bg: "bg-purple-500/10", color: "text-purple-400" },
    { icon: Globe, bg: "bg-blue-500/10", color: "text-blue-400" },
    { icon: Lock, bg: "bg-emerald-500/10", color: "text-emerald-400" },
    { icon: FlaskConical, bg: "bg-sky-500/10", color: "text-sky-400" },
    { icon: Cookie, bg: "bg-fuchsia-500/10", color: "text-fuchsia-400" },
    { icon: Link2, bg: "bg-rose-500/10", color: "text-rose-400" },
];



export const testIconMap: Record<string, LucideIcon> = {
    SQL_INJECTION: Database,
    XSS: FileCode2,
    RATE_LIMIT: Timer,
    BOT: Bot,
    FAKE_USER: UserX,
    FILE_UPLOAD: Upload,
    COMMAND_INJECTION_XXE: Terminal,
    BROKEN_ACCESS_CONTROL: Ban,
    API_MASS_ASSIGNMENT: Layers,

    SECURITY_HEADERS: ShieldCheck,
    TLS_SSL: Lock,
    CORS: Globe,
    CLICKJACKING: ShieldAlert,
    INFO_DISCLOSURE: EyeOff,
    SESSION_COOKIE: KeySquare,
    OPEN_REDIRECT: ArrowRightLeft,
    PATH_TRAVERSAL: FolderTree,
    SSRF: Radar,
    CSRF: Fingerprint,
    JWT: KeySquare,
    DEPENDENCY_CVE: PackageSearch,
};

interface TestKnowLedge {
    name: string
    description: string
    riskDescription: string
    impact: string[]
    reproduce: (rawResult: any, url: string) => string[]
    codeSamples: Record<string, string>
    references?: string[]
}
export const testknowledgebase: Record<string, TestKnowLedge> = {
    SQL_INJECTION: {
        name: "SQL Injection",
        description: "The application does not properly sanitize user input before using it in SQL queries, allowing attackers to alter query logic.",
        riskDescription: "An attacker can manipulate input parameters to modify SQL queries, potentially accessing unauthorized data, bypassing authentication, or corrupting the database.",
        impact: ["Unauthorized data access", "Authentication bypass", "Data manipulation or deletion", "Full database compromise"],
        reproduce: (raw) => {
            const findings = raw?.findings ?? [];
            if (!findings.length) return ["No specific payload recorded for this finding."];
            return findings.slice(0, 3).map((f: any) =>
                f.type === "LOGIN_BYPASS"
                    ? `Login bypass: submitting email "${f.payload?.email}" returned a successful (${f.status}) response without valid credentials.`
                    : `Payload "${f.payload}" triggered a database error or timing anomaly (${f.errorMatch ? "error signature matched" : "time-based delay detected"}).`
            );
        },
        codeSamples: {
            "Node.js": `// Vulnerable\ndb.query(\`SELECT * FROM users WHERE email = '\${email}'\`);\n\n// Fixed — parameterized query\ndb.query('SELECT * FROM users WHERE email = ?', [email]);`,
            "Python": `# Vulnerable\ncursor.execute(f"SELECT * FROM users WHERE email = '{email}'")\n\n# Fixed — parameterized query\ncursor.execute("SELECT * FROM users WHERE email = %s", (email,))`,
        },
    },

    XSS: {
        name: "Cross-Site Scripting (XSS)",
        description: "User-supplied input is reflected in the page or API response without proper encoding, allowing script injection.",
        riskDescription: "An attacker can inject malicious scripts that execute in other users' browsers, potentially stealing session cookies or performing actions on their behalf.",
        impact: ["Session hijacking", "Credential theft", "Defacement", "Malware distribution"],
        reproduce: (raw) => {
            const findings = raw?.findings ?? [];
            if (!findings.length) return ["No reflected payload recorded for this finding."];
            return findings.slice(0, 3).map((f: any) => `Payload "${f.payload}" was reflected unescaped in the response at ${f.url}.`);
        },
        codeSamples: {
            "Node.js": `// Vulnerable\nres.send(\`<div>\${userInput}</div>\`);\n\n// Fixed — escape output\nimport { escape } from 'html-escaper';\nres.send(\`<div>\${escape(userInput)}</div>\`);`,
            "React": `// Vulnerable\n<div dangerouslySetInnerHTML={{ __html: userInput }} />\n\n// Fixed — React escapes by default\n<div>{userInput}</div>`,
        },
    },

    RATE_LIMIT: {
        name: "Missing Rate Limiting",
        description: "The endpoint accepts a high volume of requests in a short period without throttling.",
        riskDescription: "Without rate limiting, attackers can brute-force credentials, scrape data at scale, or overwhelm the server with requests.",
        impact: ["Brute-force attacks", "Credential stuffing", "Resource exhaustion / denial of service", "Data scraping"],
        reproduce: (raw) => [
            `Sent ${raw?.totalRequest ?? 30} rapid requests to the target; ${raw?.got429 ? "some were throttled." : "none received a 429 (Too Many Requests) response."}`,
        ],
        codeSamples: {
            "Node.js / Express": `import rateLimit from 'express-rate-limit';\n\nconst limiter = rateLimit({ windowMs: 60_000, max: 20 });\napp.use('/api/', limiter);`,
        },
    },

    BOT: {
        name: "Missing Bot Protection",
        description: "The application does not distinguish between real browser traffic and automated bot requests.",
        riskDescription: "Without bot detection, automated scripts can scrape content, abuse forms, or perform credential stuffing at scale.",
        impact: ["Content scraping", "Automated abuse", "Fake account creation", "Inventory/price scraping"],
        reproduce: (raw) => [
            `Requests sent with a non-browser User-Agent (curl) returned status codes: ${(raw?.statusCodes ?? []).join(", ")} — ${raw?.blocked ? "some were blocked." : "none were blocked."}`,
        ],
        codeSamples: {
            "General": `// Add bot-detection middleware or a challenge service (e.g. Cloudflare Turnstile, hCaptcha)\n// on sensitive endpoints: login, signup, checkout, search.`,
        },
    },

    FAKE_USER: {
        name: "Missing Signup Protection",
        description: "The registration endpoint accepts new accounts without verification, CAPTCHA, or throttling.",
        riskDescription: "Attackers can script mass account creation for spam, fraud, or to bypass per-account limits.",
        impact: ["Spam account creation", "Fraud", "Resource abuse", "Fake reviews/engagement"],
        reproduce: () => ["Multiple signup attempts with disposable emails all succeeded without CAPTCHA or email verification."],
        codeSamples: {
            "General": `// Add email verification before activating accounts, and a CAPTCHA\n// (e.g. hCaptcha, reCAPTCHA) on the signup form.`,
        },
    },

    FILE_UPLOAD: {
        name: "Unrestricted File Upload",
        description: "The upload endpoint accepts files without validating their type or extension.",
        riskDescription: "An attacker can upload executable scripts (e.g. .php) disguised as regular files, potentially achieving remote code execution if the file is later served or executed.",
        impact: ["Remote code execution", "Server compromise", "Malware hosting", "Defacement"],
        reproduce: (raw) => (raw?.findings ?? []).map((f: any) => f.issue) ?? ["A .php file was accepted without extension filtering."],
        codeSamples: {
            "Node.js": `// Vulnerable — accepts any extension\n\n// Fixed — allowlist extensions and validate MIME type\nconst allowed = ['.png', '.jpg', '.pdf'];\nif (!allowed.includes(path.extname(file.originalname))) {\n  throw new Error('File type not allowed');\n}`,
        },
    },

    COMMAND_INJECTION_XXE: {
        name: "Command Injection / XXE",
        description: "User input is passed to a system shell command or XML parser without sanitization.",
        riskDescription: "An attacker can execute arbitrary system commands or read local files via crafted XML entities, potentially compromising the entire server.",
        impact: ["Remote code execution", "File system access", "Full server compromise"],
        reproduce: (raw) => (raw?.findings ?? []).map((f: any) => f.type === "xxe" ? `XXE payload leaked local file contents (${f.evidence}).` : `Command injection payload "${f.payload}" executed successfully.`),
        codeSamples: {
            "Node.js": `// Vulnerable\nexec(\`ping \${userInput}\`);\n\n// Fixed — use safe APIs, never shell out with raw input\nexecFile('ping', [userInput]);`,
            "XML (any language)": `<!-- Fixed — disable external entity resolution in your XML parser -->\n<!-- e.g. libxmljs: noent: false, in Java: disable DOCTYPE_DECL -->`,
        },
    },

    BROKEN_ACCESS_CONTROL: {
        name: "Broken Access Control",
        description: "Resources are accessible by manipulating an identifier (e.g. user ID) without verifying the requester's authorization.",
        riskDescription: "An attacker can access or modify other users' data simply by changing an ID in the request, without needing valid credentials for that account.",
        impact: ["Unauthorized data access", "Privacy violation", "Account takeover", "Data tampering"],
        reproduce: (raw) => (raw?.findings ?? []).map((f: any) => `Resource with ID "${f.id}" was accessible without proper authorization.`),
        codeSamples: {
            "General": `// Always verify the authenticated user owns or has permission\n// for the requested resource before returning it — never trust\n// a client-supplied ID alone.\nif (resource.ownerId !== req.user.id) throw new ForbiddenException();`,
        },
    },

    API_MASS_ASSIGNMENT: {
        name: "API Mass Assignment",
        description: "The API accepts and applies fields from the request body that should not be user-controllable (e.g. role, isAdmin).",
        riskDescription: "An attacker can escalate privileges by including protected fields in an otherwise normal request, such as setting their own account to admin.",
        impact: ["Privilege escalation", "Account takeover", "Data integrity violation"],
        reproduce: (raw) => [`Submitting a request with an added "isAdmin"/"role" field ${raw?.accepted ? "was accepted by the server." : "was rejected."}`],
        codeSamples: {
            "General": `// Vulnerable — spreads entire request body into the update\nawait db.user.update({ where: { id }, data: req.body });\n\n// Fixed — allowlist updatable fields explicitly\nconst { name, bio } = req.body;\nawait db.user.update({ where: { id }, data: { name, bio } });`,
        },
    },

    SECURITY_HEADERS: {
        name: "Missing Security Headers",
        description: "The server response is missing one or more recommended security headers.",
        riskDescription: "Missing headers like CSP or HSTS reduce the browser's built-in protections against common attacks like XSS and man-in-the-middle downgrade attacks.",
        impact: ["Increased XSS risk", "Clickjacking exposure", "Protocol downgrade attacks"],
        reproduce: (raw) => [`Missing headers: ${(raw?.missing ?? []).join(", ") || "see evidence"}.`],
        codeSamples: {
            "Node.js / Express": `import helmet from 'helmet';\napp.use(helmet()); // sets CSP, HSTS, X-Frame-Options, etc. by default`,
        },
    },

    TLS_SSL: {
        name: "Weak TLS/SSL Configuration",
        description: "The server's TLS configuration uses an outdated protocol version or an expired certificate.",
        riskDescription: "Weak TLS settings can allow attackers to intercept or downgrade encrypted connections between users and the server.",
        impact: ["Man-in-the-middle attacks", "Data interception", "Browser security warnings"],
        reproduce: (raw) => [
            raw?.expired ? `Certificate expired on ${raw?.validTo}.` : `Server negotiated protocol ${raw?.protocol}, which is considered outdated.`,
        ],
        codeSamples: {
            "General": `// Renew the TLS certificate and disable TLSv1/TLSv1.1\n// at the load balancer or reverse proxy (e.g. Nginx: ssl_protocols TLSv1.2 TLSv1.3;)`,
        },
    },

    CORS: {
        name: "CORS Misconfiguration",
        description: "The server reflects any origin or uses a wildcard in the Access-Control-Allow-Origin header.",
        riskDescription: "A permissive CORS policy allows any website to make authenticated cross-origin requests to your API on behalf of a logged-in user.",
        impact: ["Cross-origin data theft", "CSRF-like attacks on APIs", "Session abuse"],
        reproduce: (raw) => [`Server responded with Access-Control-Allow-Origin: ${raw?.allowedOrigin ?? "*"} for an arbitrary origin.`],
        codeSamples: {
            "Node.js / Express": `// Vulnerable\napp.use(cors({ origin: '*' }));\n\n// Fixed — allowlist known origins\napp.use(cors({ origin: ['https://yourapp.com'], credentials: true }));`,
        },
    },

    CLICKJACKING: {
        name: "Clickjacking",
        description: "The page can be embedded in an iframe on another site, since X-Frame-Options or CSP frame-ancestors is missing.",
        riskDescription: "An attacker can overlay your page in an invisible iframe to trick users into clicking buttons they didn't intend to (e.g. transferring funds, changing settings).",
        impact: ["UI redress attacks", "Unauthorized actions on behalf of the user"],
        reproduce: () => ["The page loaded successfully inside a test iframe with no X-Frame-Options or frame-ancestors restriction."],
        codeSamples: {
            "Node.js / Express": `app.use((req, res, next) => {\n  res.setHeader('X-Frame-Options', 'SAMEORIGIN');\n  next();\n});`,
        },
    },

    INFO_DISCLOSURE: {
        name: "Sensitive Information Disclosure",
        description: "Sensitive files or paths (e.g. .env, .git) are publicly accessible.",
        riskDescription: "Exposed configuration files can leak database credentials, API keys, and source code, giving attackers a direct path to full compromise.",
        impact: ["Credential leakage", "Source code exposure", "Full application compromise"],
        reproduce: (raw) => [`Publicly accessible paths found: ${(raw?.exposedPaths ?? []).join(", ")}.`],
        codeSamples: {
            "General": `// Ensure your web server / deployment config blocks access to\n// dotfiles and config files, e.g. in Nginx:\nlocation ~ /\\. { deny all; }`,
        },
    },

    SESSION_COOKIE: {
        name: "Insecure Session Cookies",
        description: "Session cookies are missing the Secure, HttpOnly, or SameSite attributes.",
        riskDescription: "Without these flags, cookies can be stolen via XSS (missing HttpOnly), sent over unencrypted connections (missing Secure), or used in cross-site request forgery (missing SameSite).",
        impact: ["Session hijacking", "Cookie theft via XSS", "CSRF"],
        reproduce: (raw) => [`Insecure cookies found: ${(raw?.insureCookies ?? raw?.insecureCookies ?? []).join(", ") || "see evidence"}.`],
        codeSamples: {
            "Node.js / Express": `res.cookie('session', token, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'strict',\n});`,
        },
    },

    OPEN_REDIRECT: {
        name: "Open Redirect",
        description: "A redirect parameter accepts arbitrary external URLs without validation.",
        riskDescription: "Attackers can craft links that appear to originate from your trusted domain but redirect victims to a phishing site.",
        impact: ["Phishing", "Brand impersonation", "Credential theft via fake login pages"],
        reproduce: (raw) => [`A redirect parameter pointing to an external domain resulted in a redirect to: ${raw?.location ?? "an external site"}.`],
        codeSamples: {
            "General": `// Fixed — only allow relative paths or an allowlist of domains\nconst allowed = ['/dashboard', '/settings'];\nif (!allowed.includes(redirectTo)) redirectTo = '/';`,
        },
    },

    PATH_TRAVERSAL: {
        name: "Path Traversal",
        description: "A file path parameter allows navigating outside the intended directory using sequences like ../.",
        riskDescription: "An attacker can read arbitrary files on the server, including configuration files or system files like /etc/passwd.",
        impact: ["Arbitrary file read", "Source code / config disclosure", "Credential leakage"],
        reproduce: (raw) => (raw?.findings ?? []).map((f: string) => `Payload "${f}" successfully accessed a file outside the intended directory.`),
        codeSamples: {
            "Node.js": `// Fixed — resolve and verify the path stays within the allowed base directory\nconst safePath = path.resolve(baseDir, userInput);\nif (!safePath.startsWith(baseDir)) throw new Error('Invalid path');`,
        },
    },

    SSRF: {
        name: "Server-Side Request Forgery (SSRF)",
        description: "The server fetches a user-supplied URL without restricting which hosts can be targeted.",
        riskDescription: "An attacker can make the server send requests to internal-only services (like cloud metadata endpoints), potentially leaking credentials or accessing internal infrastructure.",
        impact: ["Internal network access", "Cloud credential theft", "Internal service exploitation"],
        reproduce: (raw) => (raw?.findings ?? []).map((f: any) => `Parameter "${f.param}" fetched an internal target (${f.target}), exposing: ${f.evidence}.`),
        codeSamples: {
            "General": `// Fixed — allowlist permitted domains for server-side fetches,\n// and block requests to private IP ranges (10.x, 192.168.x, 169.254.x).`,
        },
    },

    CSRF: {
        name: "Cross-Site Request Forgery (CSRF)",
        description: "State-changing requests do not include or verify a CSRF token.",
        riskDescription: "An attacker can trick a logged-in user's browser into submitting unwanted requests (e.g. changing their password) without their knowledge.",
        impact: ["Unauthorized actions on behalf of the user", "Account settings tampering"],
        reproduce: () => ["No CSRF token was found in the form or request, meaning cross-site requests would be accepted."],
        codeSamples: {
            "Node.js / Express": `import csurf from 'csurf';\napp.use(csurf());\n// include the token in your forms and verify it server-side`,
        },
    },

    JWT: {
        name: "JWT Vulnerabilities",
        description: "The JWT implementation has a weak signing secret, missing expiry, or accepts an unsigned (alg:none) token.",
        riskDescription: "A weak or missing JWT verification allows attackers to forge valid-looking tokens and impersonate any user.",
        impact: ["Account takeover", "Privilege escalation", "Full authentication bypass"],
        reproduce: (raw) => (raw?.findings ?? []).map((f: any) => f.issue),
        codeSamples: {
            "Node.js": `// Fixed — use a strong random secret, set expiry, and reject alg:none\njwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });`,
        },
    },

    DEPENDENCY_CVE: {
        name: "Vulnerable Dependency",
        description: "The server is running a version of a library or framework with a known public vulnerability (CVE).",
        riskDescription: "Known vulnerabilities in outdated dependencies are actively exploited since attackers can look up public exploit code for a specific version.",
        impact: ["Depends on the specific CVE — ranges from information disclosure to remote code execution"],
        reproduce: (raw) => (raw?.findings ?? []).map((f: any) => `${f.name} ${f.version} has known vulnerabilities: ${(f.vulnerabilities ?? []).join(", ")}.`),
        codeSamples: {
            "General": `// Update the affected package to the latest patched version,\n// and set up automated dependency scanning (e.g. Dependabot, Snyk).`,
        },
    },
}

export function getTestKnowledge(category: string): TestKnowLedge {
    return testknowledgebase[category] ?? {
        name: category,
        description: "No detailed information available for this test category yet.",
        riskDescription: "",
        impact: [],
        reproduce: () => [],
        codeSamples: {},
    }
}