"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const inputClasses =
  "h-11 w-full rounded-[7px] border-[1.5px] border-[#E6E4E0] bg-redro-cream px-4 text-sm text-[#111] outline-none focus:border-redro-red";
const labelClasses =
  "font-display mb-1.5 block text-[11px] font-semibold tracking-[0.06em] text-[#444] uppercase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-redro-cream px-5 py-12">
      <div className="w-full max-w-[420px] overflow-hidden rounded-[14px] border border-redro-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
        <div className="bg-[#111] px-8 py-7">
          <div className="font-display text-xl font-black tracking-[0.02em]">
            <span className="text-redro-red">REDRO</span>
            <span className="text-white"> CLEANING</span>
          </div>
          <p className="mt-1 text-[13px] text-white/50">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <h1 className="font-display mb-1 text-2xl font-extrabold text-[#111]">
            Sign in
          </h1>
          <p className="mb-6 text-sm text-[#666]">
            Enter your credentials to access the dashboard.
          </p>

          {error && (
            <div className="mb-5 rounded-[7px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="font-display block w-full rounded-[7px] bg-redro-red px-6 py-3 text-sm font-bold tracking-[0.05em] text-white uppercase shadow-[0_6px_20px_rgba(212,31,31,0.25)] transition-opacity hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
