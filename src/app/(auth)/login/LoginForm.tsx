"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const router = useRouter()
  const [isManual, setIsManual] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" })
  }

  const handleManualSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError("Invalid email or password.")
      setLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="w-full max-w-[400px]">
      <div className="bg-surface p-10 rounded-xl border border-hairline shadow-soft">
        <div className="mb-10 text-center">
          <h1 className="font-ibm text-[32px] font-bold text-ink mb-2 tracking-[-1px] leading-tight">
            Log in
          </h1>
          <p className="font-sarabun text-ink-secondary text-sm">
            Continue to Confide Portal
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-surface text-ink py-2.5 px-4 rounded-[4px] border border-hairline hover:bg-canvas-soft transition-colors font-sarabun font-medium text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-hairline"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-surface text-ink-faint font-sarabun cursor-pointer hover:text-ink transition-colors" onClick={() => setIsManual(!isManual)}>
                {isManual ? "Hide Admin Login" : "Admin Login"}
              </span>
            </div>
          </div>

          {isManual && (
            <form onSubmit={handleManualSignIn} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {error && (
                <div className="p-3 rounded-md bg-[#fff2f2] text-[#d93025] text-sm font-sarabun border border-[#fce4e4]">
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-[12px] font-sarabun font-semibold text-ink-secondary">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-[#dddddd] rounded-[4px] px-3 py-2 text-sm font-sarabun text-ink focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,117,222,0.2)] transition-all"
                  placeholder="admin@confide.co.th"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-sarabun font-semibold text-ink-secondary">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface border border-[#dddddd] rounded-[4px] px-3 py-2 text-sm font-sarabun text-ink focus:outline-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(0,117,222,0.2)] transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-on-primary font-sarabun font-medium py-2.5 px-4 rounded-full hover:bg-primary-active transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-sm mt-2"
              >
                {loading ? "Authenticating..." : "Continue"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
