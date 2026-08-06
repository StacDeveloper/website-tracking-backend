"use client";

import { CircleCheckBig, Zap, Link2, ArrowRight, Gauge, Search, ShieldCheck, Bug } from "lucide-react";
import { useEffect, useState } from "react";

const features = [
  { icon: Gauge, title: "Performance Test", description: "Analyze loading speed and performance metrics.", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: Search, title: "SEO Analysis", description: "Get insights to improve your search engine rankings.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: ShieldCheck, title: "Accessibility", description: "Ensure your website is usable by everyone.", color: "text-sky-400", bg: "bg-sky-500/10" },
  { icon: Bug, title: "Bug Detection", description: "Find potential issues and errors on your site.", color: "text-orange-400", bg: "bg-orange-500/10" },
];

const logos = ["airbnb", "Google", "Microsoft", "Spotify", "Twilio"];

const FadeIn = ({
  delay = 0,
  children,
  className = "",
}: {
  delay?: number;
  children?: any;
  className?: string;
}) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  const [url, setUrl] = useState("");

  return (
    <div
      className="min-h-screen w-full text-white relative overflow-hidden"
      style={{ backgroundColor: "#050510" }}
    >
      {/* dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 h-[900px] w-full"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
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
            <span className="text-lg font-bold tracking-tight">
              Web<span className="text-indigo-400">Test</span>
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {["Features", "How it Works", "Pricing", "FAQ"].map((label, index) => (
              <a key={index} href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:border-gray-500 hover:bg-white/5 transition-colors">
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
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
              <Zap className="h-3.5 w-3.5 text-indigo-400" fill="currentColor" />
              Smart. Fast. Reliable.
            </span>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              Test your website.
              <br />
              Get{" "}
              <span className="bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
                real insights
              </span>
              .
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-lg text-gray-400">
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
                backgroundColor: "rgba(12,12,26,0.8)",
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                  <Link2 className="h-5 w-5 shrink-0 text-gray-500" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your website URL to get it tested"
                    className="w-full bg-transparent text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none"
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
            <p className="mt-4 text-sm text-gray-500">
              Example: <span className="text-indigo-400 hover:underline cursor-pointer">https://example.com</span>
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
              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 max-w-[200px] text-sm text-gray-400">{feature.description}</p>
            </FadeIn>
          ))}
        </section>

        {/* Trusted by */}
        <section className="mx-auto max-w-5xl px-6 pb-24 text-center lg:px-8">
          <p className="text-sm text-gray-500">Trusted by developers, marketers and businesses worldwide.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logos.map((name, i) => (
              <span key={i} className="text-lg font-semibold tracking-tight text-gray-500 opacity-60">
                {name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;