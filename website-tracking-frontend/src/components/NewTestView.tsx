"use client"
import { useColorContext } from "@/app/context/useColorContext";
import { CardShell } from "@/lib/Cardshell";
import { SectionLabel } from "@/lib/SectionLabel";
import { Play } from "lucide-react";

interface NewTestViewProps {
    startScan: (e: React.FormEvent) => void
    newTestUrl: string
    setNewTestUrl: React.Dispatch<React.SetStateAction<string>>
}


const NewTestView = ({ startScan, newTestUrl, setNewTestUrl }: NewTestViewProps) => {
    const { c } = useColorContext()
    return (
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
}

export default NewTestView