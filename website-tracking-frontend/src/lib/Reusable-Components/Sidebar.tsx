import { NavItems } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CircleCheckBig, Crown, Headphones } from "lucide-react";


interface SidebarProps {
    scanning: any
    activeNav: any
    setActiveNav: any
    setSelectedTest: any
    setResultsTab: any
    setScanning:any 
}

export default function Sidebar({ scanning, activeNav, setActiveNav, setSelectedTest, setResultsTab, setScanning }: SidebarProps) {
    const { c } = useColorContext()
    return (
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
    )
}

