"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, User } from "lucide-react";
import { signIn, signUp } from "@/auth/auth";
import { SecureDataNote, SocialAuthButtons } from "@/lib/Reusable-Components/SocialButton";
import { AuthBrandPanel } from "@/lib/Reusable-Components/AuthBrandPanel";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(true);
    const [loginPage, setLoginPage] = useState(false)
    const url = process.env.NEXT_PUBLIC_BACKEND_URL!

    function getPasswordStrength(password: string) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        const labels = ["Weak", "Fair", "Good", "Strong"];
        const colors = ["#f87171", "#fbbf24", "#38bdf8", "#34d399"];
        return { score, label: password ? labels[Math.max(0, score - 1)] : "", color: colors[Math.max(0, score - 1)] };
    }

    const handleSubmit = async (e: React.FormEvent) => {
        if (loginPage) {
            e.preventDefault();
            setError("");
            setLoading(true);

            const { error: authError } = await signIn.email({
                email,
                password,
            });

            setLoading(false);

            if (authError) {
                setError(
                    authError.message ??
                    "Login failed. Check your credentials."
                );
                return;
            }

            return;
        }

        // Signup
        e.preventDefault();
        setError("");

        if (!agreed) return;

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        setLoading(true);

        const { error: authError } = await signUp.email({
            name,
            email,
            password,
            
        });

        setLoading(false);

        if (authError) {
            setError(authError.message ?? "Sign up failed.");
            return;
        }
    }

    const strength = useMemo(() => getPasswordStrength(password), [password]);

    if (loginPage) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-[#050510] px-6 py-12 text-white">
                <div className="flex w-full max-w-5xl flex-col items-center gap-16 lg:flex-row lg:items-stretch">
                    <AuthBrandPanel />

                    <div className="w-full max-w-md">
                        <div className="mb-6 flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600">
                                <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </span>
                            <span className="text-lg font-bold tracking-tight">WebTest</span>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                            <h2 className="text-2xl font-bold">Create Account</h2>
                            <p className="mt-1 text-sm text-gray-400">Sign up and start securing your websites</p>

                            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Full Name</label>
                                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <input
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Email Address</label>
                                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Password</label>
                                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                                        <Lock className="h-4 w-4 text-gray-500" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a strong password"
                                            className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                        />
                                        <button type="button" onClick={() => setShowPassword((s) => !s)}>
                                            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                        </button>
                                    </div>
                                    {password && (
                                        <div className="mt-2">
                                            <p className="text-xs" style={{ color: strength.color }}>
                                                Password strength: {strength.label}
                                            </p>
                                            <div className="mt-1 grid grid-cols-4 gap-1">
                                                {[0, 1, 2, 3].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="h-1 rounded-full"
                                                        style={{ backgroundColor: i < strength.score ? strength.color : "rgba(255,255,255,0.1)" }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-400">Confirm Password</label>
                                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                                        <Lock className="h-4 w-4 text-gray-500" />
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm your password"
                                            className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                        />
                                        <button type="button" onClick={() => setShowConfirm((s) => !s)}>
                                            {showConfirm ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                        </button>
                                    </div>
                                    {confirmPassword && confirmPassword !== password && (
                                        <p className="mt-1 text-xs text-red-400">Passwords don&apos;t match.</p>
                                    )}
                                </div>

                                <label className="flex items-start gap-2 text-xs text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 rounded accent-indigo-500"
                                    />
                                    I agree to the{" "}
                                    <Link href="#" className="text-indigo-400 hover:underline">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link href="#" className="text-indigo-400 hover:underline">
                                        Privacy Policy
                                    </Link>
                                </label>

                                {error && <p className="text-xs text-red-400">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={!agreed || loading}
                                    className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading ? "Creating account..." : "Create Account"} <ArrowRight className="h-4 w-4" />
                                </button>
                            </form>

                            <div className="my-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-white/10" />
                                <span className="text-xs text-gray-500">or sign up with</span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            <SocialAuthButtons />

                            <p className="mt-6 text-center text-sm text-gray-400">
                                Already have an account?{" "}
                                <span onClick={() => setLoginPage((prev) => !prev)} className="font-medium text-indigo-400 hover:underline">
                                    Login
                                </span>
                            </p>
                        </div>

                        <SecureDataNote />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#050510] px-6 py-12 text-white">
            <div className="flex w-full max-w-5xl flex-col items-center gap-16 lg:flex-row lg:items-stretch">
                <AuthBrandPanel />

                <div className="w-full max-w-md">
                    <div className="mb-6 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600">
                            <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </span>
                        <span className="text-lg font-bold tracking-tight">WebTest</span>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <h2 className="text-2xl font-bold">Welcome Back</h2>
                        <p className="mt-1 text-sm text-gray-400">Login to continue to your account</p>

                        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-400">Email Address</label>
                                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-400">Password</label>
                                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                                    <Lock className="h-4 w-4 text-gray-500" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                                    />
                                    <button type="button" onClick={() => setShowPassword((s) => !s)}>
                                        {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded accent-indigo-500"
                                    />
                                    Remember me
                                </label>
                                <Link href="#" className="text-indigo-400 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>

                            {error && <p className="text-xs text-red-400">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 py-3 text-sm font-semibold text-white hover:scale-[1.01] transition-transform disabled:opacity-60"
                            >
                                {loading ? "Logging in..." : "Login"} <ArrowRight className="h-4 w-4" />
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-xs text-gray-500">or continue with</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <SocialAuthButtons />

                        <p className="mt-6 text-center text-sm text-gray-400">
                            Don&apos;t have an account?{" "}
                            <span onClick={() => setLoginPage((prev) => !prev)} className="font-medium text-indigo-400 hover:underline">
                                Sign up
                            </span>
                        </p>
                    </div>

                    <SecureDataNote />
                </div>
            </div>
        </div>
    );
}