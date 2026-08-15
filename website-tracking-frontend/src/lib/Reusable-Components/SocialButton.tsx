"use client"

import { signIn } from "@/auth/auth"
import { GitBranchPlus, Lock } from "lucide-react"


const google = <img src={"./google.jpg"} />
const github = <img src={"./github.jpg"}/>
const discord = <img src={"./discord.jpg"} />


const providers = [
    { id: "google", label: google, bg: "#4285F4" },
    { id: "github", label: github, bg: "#1f2937" }, 
    { id: "discord", label: discord, bg: "#5865F2" }
]

export function SocialAuthButtons() {
    const handleSocial = (provider: "google" | "github" | "discord") => {
        signIn.social({ provider, callbackURL: "/disclaimer" })
    }

    return (
        <div className="grid grid-cols-3 gap-3">
            {providers.map((p) => (
                <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSocial(p.id as any)}
                    className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] py-2.5 transition-colors hover:bg-white/[0.06]"
                >
                    {p.id === "github" ? (
                        <GitBranchPlus className="h-5 w-5 text-white" />
                    ) : (
                        <span
                            className="flex h-5 w-5 items-center justify-center rounded-sm text-xs font-bold text-white"
                            style={{ backgroundColor: p.bg }}
                        >
                            {p.label}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );

}

export function SecureDataNote() {
    return (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                <Lock className="h-4 w-4 text-emerald-400" />
            </span>
            <div>
                <p className="text-sm font-medium">Your data is encrypted and secure</p>
                <p className="text-xs text-gray-500">We never share your information with third parties.</p>
            </div>
        </div>
    );
}