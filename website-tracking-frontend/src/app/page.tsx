"use client"
import { useState } from "react";
import { features, footerItems } from "./assets/assets";
import { FadeIn } from "@/lib/Reusable-Components/FadeIn";
import {
  CircleCheckBig,
  Zap,
  Link2,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";



const HomePage = () => {
  const [url, setUrl] = useState("");
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";


  const c = {
    bg: isDark ? "#050510" : "#f7f7fb",
    panelBg: isDark ? "rgba(12,12,26,0.8)" : "rgba(255,255,255,0.9)",
    cardBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,15,26,0.03)",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,15,26,0.08)",
    footerBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,15,26,0.1)",
    textPrimary: isDark ? "#ffffff" : "#0f0f1a",
    textSecondary: isDark ? "#d1d5db" : "#4b5563",
    textMuted: isDark ? "#9ca3af" : "#6b7280",
    textFaint: isDark ? "#6b7280" : "#9ca3af",
    navBorder: isDark ? "#374151" : "#e5e7eb",
    toggleBg: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,15,26,0.06)",
    gradientFrom: isDark ? "#ffffff" : "#0f0f1a",
    gradientTo: isDark ? "#818cf8" : "#4f46e5",
    accentText: isDark ? "#818cf8" : "#4f46e5",
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: c.bg, color: c.textPrimary, transition: "background-color 0.3s ease, color 0.3s ease" }}
    >
      {/* dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 h-[900px] w-full"
        style={{
          backgroundImage: `radial-gradient(${isDark ? "rgba(255,255,255,0.08)" : "rgba(15,15,26,0.08)"} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Navbar */}
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600">
              <CircleCheckBig className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight" style={{ color: c.textPrimary }}>
              Web<span style={{ color: c.accentText }}>Test</span>
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "Tests", "Pricing", "FAQ"].map((label, index) => (
              <Link
                key={index}
                href={label.toLowerCase()}
                className="text-sm transition-colors"
                style={{ color: c.textSecondary }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: c.toggleBg }}
            >
              {isDark ? (
                <Moon className="h-4 w-4" style={{ color: c.textSecondary }} />
              ) : (
                <Sun className="h-4 w-4" style={{ color: c.textSecondary }} />
              )}
            </button>
            <button
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5"
              style={{ borderColor: c.navBorder, color: c.textSecondary }}
            >
              Log in
            </button>
            <button className="rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:scale-[1.03] transition-transform">
              Sign up
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-16 text-center lg:px-8">
          <FadeIn delay={0}>
            <span
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
              style={{ borderColor: c.navBorder, backgroundColor: c.toggleBg, color: c.textSecondary }}
            >
              <Zap className="h-3.5 w-3.5" style={{ color: c.accentText }} fill="currentColor" />
              Smart. Fast. Reliable.
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              Test your website.
              <br />
              Get{" "}
              <span
                style={{
                  backgroundImage: `linear-gradient(to right, ${c.gradientFrom}, ${c.gradientTo})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                real insights
              </span>
              .
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-lg" style={{ color: c.textMuted }}>
              Run automated tests, check performance, SEO, accessibility and more.
              Everything you need to make your website better.
            </p>
          </FadeIn>

          <FadeIn delay={300} className="mt-10 w-full max-w-2xl">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-2xl border border-indigo-500/30 p-2 backdrop-blur"
              style={{
                boxShadow: "0 0 80px 10px rgba(99,102,241,0.25)",
                backgroundColor: c.panelBg,
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                  <Link2 className="h-5 w-5 shrink-0" style={{ color: c.textFaint }} />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your website URL to get it tested"
                    className="w-full bg-transparent text-sm focus:outline-none"
                    style={{ color: c.textPrimary }}
                  />
                </div>
                <button
                  type="submit"
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:scale-[1.02] transition-transform"
                >
                  Start Testing
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="mt-4 text-sm" style={{ color: c.textFaint }}>
              Example: <span style={{ color: c.accentText }} className="hover:underline cursor-pointer">https://example.com</span>
            </p>
          </FadeIn>
        </section>

        {/* Features */}
        <section className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 pb-20 sm:grid-cols-4 lg:px-8">
          {features.map((feature, i) => (
            <FadeIn key={i} delay={500 + i * 80} className="flex flex-col items-center text-center">
              <span className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} strokeWidth={2} />
              </span>
              <h3 className="text-base font-semibold" style={{ color: c.textPrimary }}>{feature.title}</h3>
              <p className="mt-2 max-w-[200px] text-sm" style={{ color: c.textMuted }}>{feature.description}</p>
            </FadeIn>
          ))}
        </section>

        {/* Footer feature bar */}
        <section
          className="border-t"
          style={{ borderColor: c.footerBorder, backgroundColor: c.cardBg }}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
            {footerItems.map((item, i) => {
              const Item = item.icon
              return (
                <FadeIn key={i} delay={i * 80} className="flex items-start gap-4">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.bg}`}>
                    <Item className={`h-5 w-5 ${item.color}`} strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold" style={{ color: c.textPrimary }}>{item.title}</h4>
                    <p className="mt-1 text-sm" style={{ color: c.textMuted }}>{item.description}</p>
                  </div>
                </FadeIn>
              )

            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;