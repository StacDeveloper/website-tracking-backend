"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Link2, Zap } from "lucide-react"

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" }
    })
}

export default function Hero() {
    const [url, setUrl] = useState<string>("")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        console.log("Testing:", url)
    }

    return (
        <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-16 text-center lg:px-8">
            <motion.span
                initial="hidden"
                animate="show"
                custom={0}
                variants={{fadeUp}}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-white/5 px-4 py-1.5 text-sm text-gray-300"
            >
                <Zap className="h-3.5 w-3.5 text-accent-400" fill="currentColor" />
                Smart. Fast. Reliable
            </motion.span>

            <motion.h1
                initial="hidden"
                animate="show"
                custom={0.1}
                variants={{fadeUp}}
                className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
            >
                Test your website
                <br />
                Get{" "}
                <span className="bg-gradient-to-r from-white to-accent-400 bg-clip-text text-transparent">
                    Real Insights
                </span>
                .
            </motion.h1>

            <motion.p
                initial="hidden"
                animate="show"
                custom={0.2}
                variants={{fadeUp}}
                className="mt-6 max-w-2xl text-lg text-gray-400"
            >
                Run automated tests, check performance, SEO, accessibility and more.
                Everything you need to make your website better.
            </motion.p>

            <motion.form
                initial="hidden"
                animate="show"
                custom={0.3}
                variants={{fadeUp}}
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl rounded-2xl border border-accent-500/30 bg-panel/80 p-2 shadow-glow backdrop-blur"
            >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                        <Link2 className="h-5 w-5 shrink-0 text-gray-500" />
                        <input
                            type="url"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            placeholder="Paste your website URL to get it tested"
                            className="w-full bg-transparent text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-600 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                        Start Testing
                    </button>
                </div>
            </motion.form>
            <motion.p
                initial="hidden"
                animate="show"
                custom={0.4}
                variants={{fadeUp}}
                className="mt-4 text-sm text-gray-500"
            >
                Example={" "}
                <a href="#" className="text-accent-400 hover:underling">
                    https://example.com
                </a>
            </motion.p>
        </section>
    )

}