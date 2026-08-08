import { CircleCheckBig, CircleDashed, Loader2 } from "lucide-react";

export function StatusPill({ status }: { status: string }) {
    if (status === "Completed")
        return (
            <span className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                <CircleCheckBig className="h-3 w-3" /> Completed
            </span>
        );
    if (status === "In Progress")
        return (
            <span className="flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400">
                <Loader2 className="h-3 w-3 animate-spin" /> In Progress
            </span>
        );
    return (
        <span className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-gray-400">
            <CircleDashed className="h-3 w-3" /> Pending
        </span>
    );
}