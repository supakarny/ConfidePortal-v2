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
    <div className="min-h-screen w-full flex flex-col bg-canvas-soft">
      {/* Notion style simple top bar */}
      <div className="w-full p-6 flex justify-between items-center bg-canvas border-b border-hairline">
        <div className="font-ibm font-bold text-xl text-ink tracking-tight">
          Confide Portal
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <LoginForm />
      </div>

      {/* Notion style footer band */}
      <div className="w-full p-8 text-center text-ink-faint font-sarabun text-sm">
        Confide Technology Co., Ltd. Internal Portal
      </div>
    </div>
  )
}
