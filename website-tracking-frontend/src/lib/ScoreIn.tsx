export function ScoreRing({ score, accent }: { score: number; accent: string }) {
    const r = 46;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - score / 100);

    return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
            <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="10" />
            <circle
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke={accent}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
            />
        </svg>
    );
}