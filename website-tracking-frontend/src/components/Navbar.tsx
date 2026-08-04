"use client"

import { CheckCircle2 } from "lucide-react"

const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
]

const Navbar = () => {
    return (
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
            <a href="#" className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grading-to-br from-accent-400 to-accent-600">
                    <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-lg font-bold tracking-tight">
                    Web<span className="text-accent-400">Test</span>
                </span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="text-sm text-gray-300 tranistion-colors hover:text-white"
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
            <div className="flex items-center gap-3">
                <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 tranistion-colors hover:border-gray-500 hover:bg-white/5">
                    Log in
                </button>
                <button className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent-600/20 transition-transform hover:scale-[1.03]">
                    Sign Up
                </button>
            </div>
        </header>
    )
}

export default Navbar