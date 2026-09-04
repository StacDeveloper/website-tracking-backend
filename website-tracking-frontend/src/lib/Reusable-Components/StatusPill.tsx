const STATUS_STYLES: Record<string, { label: string; bg: string; color: string }> = {
    PASSED: { label: "Passed", bg: "rgba(52,211,153,0.1)", color: "#34d399" },
    FAILED: { label: "Failed", bg: "rgba(248,113,113,0.1)", color: "#f87171" },
    ERROR: { label: "Error", bg: "rgba(248,113,113,0.1)", color: "#f87171" },
    SKIPPED: { label: "Skipped", bg: "rgba(148,163,184,0.1)", color: "#94a3b8" },
    Completed: { label: "Completed", bg: "rgba(52,211,153,0.1)", color: "#34d399" },
    Pending: { label: "Pending", bg: "rgba(251,191,36,0.1)", color: "#fbbf24" },
};

export const StatusPill = ({ status }: { status: string }) => {
    const style = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
    return (
        <span
            className="rounded-md px-2 py-1 text-xs font-medium"
            style={{ backgroundColor: style.bg, color: style.color }}
        >
            {style.label}
        </span>
    );
};