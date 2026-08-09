"use client"
import { useColorContext } from "@/app/context/useColorContext";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";





export const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => {

    const { c } = useColorContext()

    return (
        <button
            onClick={onChange}
            className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
            style={{ backgroundColor: checked ? c.accent : c.inputBg }}
        >
            <span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
                style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
            />
        </button>
    );
}

export const FieldLabel = ({ children }: { children: ReactNode }) => {
    const { c } = useColorContext()
    return (
        <label className="mb-1.5 block text-xs font-medium" style={{ color: c.textMuted }}>
            {children}
        </label>
    );
}

export const TextInput = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    const { c } = useColorContext()
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
            style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg, color: c.textPrimary }}
        />
    );
}

export const SelectInput = ({ value }: { value: string }) => {
    const { c } = useColorContext()
    return (
        <button
            className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: c.cardBorder, backgroundColor: c.inputBg, color: c.textPrimary }}
        >
            {value}
            <ChevronDown className="h-3.5 w-3.5" style={{ color: c.textFaint }} />
        </button>
    );
}


