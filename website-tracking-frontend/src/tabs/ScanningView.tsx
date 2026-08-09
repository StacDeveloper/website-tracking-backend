import { liveOutputLines, runningTests } from "@/app/assets/assets";
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Reusable-Components/Cardshell";
import { SectionLabel } from "@/lib/Reusable-Components/SectionLabel";
import { StatusPill } from "@/lib/Reusable-Components/StatusPill";
import { Loader2, XCircle } from "lucide-react";


interface ScanningViewProps {
    setScanning: React.Dispatch<React.SetStateAction<boolean>>
    newTestUrl: string
}

const ScanningView = ({ setScanning, newTestUrl }: ScanningViewProps) => {
    const { c } = useColorContext()
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
export default ScanningView