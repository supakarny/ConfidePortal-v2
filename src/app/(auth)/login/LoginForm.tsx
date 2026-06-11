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
    <section className="data-card p-8 rounded-xl hover:transform-none">
      <div className="space-y-5">
        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white text-on-surface py-3 px-4 rounded-lg border border-[#e2e8f0] hover:bg-surface-container-low transition-colors text-body-md font-semibold"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span
              className="px-3 bg-white text-secondary cursor-pointer hover:text-primary transition-colors text-label-sm"
              onClick={() => setIsManual(!isManual)}
            >
              {isManual ? "Hide Admin Login" : "Admin Login"}
            </span>
          </div>
        </div>

        {/* Manual Login Form */}
        {isManual && (
          <form onSubmit={handleManualSignIn} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {error && (
              <div className="p-3 rounded-lg bg-error-container text-on-error-container text-body-md font-medium border border-error/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-label-sm text-secondary uppercase tracking-wider" htmlFor="login-email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  mail
                </span>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="admin@confide.co.th"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-label-sm text-secondary uppercase tracking-wider" htmlFor="login-password">
                Security Key
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  lock
                </span>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-on-primary-container py-3.5 px-6 rounded-lg font-bold text-body-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98] focus:ring-2 focus:ring-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  <span>Secure Login</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-outline-variant flex flex-col items-center gap-3">
        <p className="text-label-sm text-on-surface-variant text-center opacity-70">
          Unauthorized access is strictly prohibited.
        </p>
        <div className="flex gap-6">
          <a className="text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-1.5" href="#">
            <span className="material-symbols-outlined text-[16px]">help</span> Help Center
          </a>
          <a className="text-label-sm text-secondary hover:text-primary transition-colors flex items-center gap-1.5" href="#">
            <span className="material-symbols-outlined text-[16px]">policy</span> Protocol
          </a>
        </div>
      </div>
    </section>
  )
}
