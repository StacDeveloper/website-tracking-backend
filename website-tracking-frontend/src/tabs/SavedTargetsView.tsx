"use client"

import { savedTargetLists } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { MoreVertical, Plus, Search } from "lucide-react";
import { useMemo } from "react";


interface SavedTargetsViewProps {
    savedQuery: string
    setSavedQuery: React.Dispatch<React.SetStateAction<string>>
    startScan: () => void
    setNewTestUrl: React.Dispatch<React.SetStateAction<string>>
}


const SavedTargetsView = ({ savedQuery, setSavedQuery, startScan, setNewTestUrl }: SavedTargetsViewProps) => {
    const filteredSaved = useMemo(() => savedTargetLists.filter((t) => t.domain.toLowerCase().includes(savedQuery.toLowerCase())),
        [savedQuery])

    const { c } = useColorContext()

    return (
        <div className="px-8 pb-16">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold">Saved Targets</h1>
                    <p className="text-sm" style={{ color: c.textMuted }}>Your saved websites and applications for quick testing.</p>
                </div>
                <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: c.accent }}>
                    <Plus className="h-4 w-4" /> Add Target
                </button>
            </div>

            <div className="mb-5 flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg, maxWidth: 320 }}>
                <Search className="h-4 w-4" style={{ color: c.textFaint }} />
                <input
                    value={savedQuery}
                    onChange={(e) => setSavedQuery(e.target.value)}
                    placeholder="Search saved targets..."
                    className="w-full bg-transparent text-sm focus:outline-none"
                    style={{ color: c.textPrimary }}
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSaved.map((t) => (
                    <CardShell key={t.domain} className="p-5">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${t.iconBg}`}>
                                    <t.icon className={`h-5 w-5 ${t.iconColor}`} />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">{t.domain}</p>
                                    <p className="text-xs" style={{ color: c.textFaint }}>{t.desc}</p>
                                </div>
                            </div>
                            <MoreVertical className="h-4 w-4 cursor-pointer" style={{ color: c.textFaint }} />
                        </div>
                        <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-xs" style={{ color: c.textFaint }}>Last Tested</p>
                                <p className="text-xs font-medium">{t.lastTested}</p>
                            </div>
                            <div>
                                <p className="text-xs" style={{ color: c.textFaint }}>Score</p>
                                <p className="text-xs font-medium" style={{ color: t.score >= 75 ? "#34d399" : t.score >= 50 ? "#fbbf24" : "#f87171" }}>{t.score}/100</p>
                            </div>
                            <div>
                                <p className="text-xs" style={{ color: c.textFaint }}>Tests</p>
                                <p className="text-xs font-medium">{t.tests}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setNewTestUrl(`https://${t.domain}`);
                                startScan();
                            }}
                            className="w-full rounded-lg py-2 text-sm font-semibold text-white"
                            style={{ backgroundColor: c.accent }}
                        >
                            Test Now
                        </button>
                    </CardShell>
                ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm" style={{ color: c.textMuted }}>
                <span>Showing 1 to {filteredSaved.length} of 12 targets</span>
                <div className="flex items-center gap-1">
                    {[1, 2].map((p) => (
                        <button
                            key={p}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border text-xs"
                            style={p === 1 ? { borderColor: c.accent, color: c.accent } : { borderColor: c.cardBorder, color: c.textMuted }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SavedTargetsView