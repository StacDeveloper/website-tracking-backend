import { severityMeta } from "@/app/assets/assets";

export function DonutChart({ counts, accent }: { counts: Record<string, number>, accent: string }) {
    const total = Object.values(counts).reduce((a, b) => a + b, 0)
    let cumulative = 0;
    const stops = Object.entries(counts).map(([label, count]) => {
        const start = (cumulative / total) * 360
        cumulative += count
        const end = (cumulative / total) * 360
        return `${severityMeta[label].ring} ${start}deg ${end}deg`
    })
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