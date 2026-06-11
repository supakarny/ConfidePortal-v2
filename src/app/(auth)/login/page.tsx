import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import LoginForm from "./LoginForm"

export const metadata = {
  title: "Login | Confide Portal",
  description: "Secure login to the Confide Portal",
}

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-surface relative overflow-hidden">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 technical-grid pointer-events-none"></div>

      {/* Login Container */}
      <main className="relative z-10 w-full max-w-[440px] px-6">
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary-container p-3 rounded-xl mb-4 shadow-sm">
            <span className="material-symbols-outlined text-white text-[32px]">bolt</span>
          </div>
          <h1 className="text-headline-xl text-on-surface text-center mb-1">Confide Technology</h1>
          <p className="text-label-sm text-tertiary uppercase tracking-widest text-center">
            Confide Portal Access
          </p>
        </div>

        {/* Login Card */}
        <LoginForm />

        {/* Security Status Footer */}
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur px-3 py-1.5 rounded-full border border-outline-variant">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-mono-data text-secondary text-[10px] uppercase tracking-wider">Secured Connection</span>
          </div>
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur px-3 py-1.5 rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-[14px] text-secondary">vpn_lock</span>
            <span className="text-mono-data text-secondary text-[10px] uppercase tracking-wider">TLS 1.3 Active</span>
          </div>
        </div>
      </main>
    </div>
  )
}
