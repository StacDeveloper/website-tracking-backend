import { BarChart3, Bug, Clock, Gauge, LucideIcon, Search, ShieldCheck, Zap, Lock, LayoutGrid, Plus, History, ClipboardList, Bookmark, Share2, Settings, ShieldAlert, Info, Globe, Ban, FlaskConical, Cookie, FolderTree, Link2 } from "lucide-react";

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

export const severityMeta: Record<string, { text: string, bg: string, dot: string }> = {
    Critical: { text: "text-red-400", bg: "bg-red-500/10", dot: "bg-red-500" },
    High: { text: "text-orange-400", bg: "bg-orange-500/10", dot: "bg-orange-500" },
    Medium: { text: "text-amber-400", bg: "bg-amber-500/10", dot: "bg-amber-500" },
    Low: { text: "text-sky-400", bg: "bg-sky-500/10", dot: "bg-sky-500" },
    Info: { text: "text-cyan-400", bg: "bg-cyan-500/10", dot: "bg-cyan-500" },

}

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