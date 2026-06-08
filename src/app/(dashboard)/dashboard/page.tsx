import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { getPendingApprovalsForUser } from "@/modules/approval/actions"
import Link from "next/link"
import { Activity, Users, Inbox, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Dashboard | Confide Portal",
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect("/login")
  }

  // Fetch real statistics
  const [activeEmployees, pendingApprovalsCount, recentActivity] = await Promise.all([
    prisma.employee.count({ where: { status: 'ACTIVE' } }),
    getPendingApprovalsForUser(session.user.id, session.user.roleId).then(reqs => reqs.length),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })
  ])

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <header className="border-b border-hairline pb-8">
        <h1 className="font-ibm text-display-2 font-bold text-ink tracking-tight">
          Welcome back, {session.user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="font-sarabun text-ink-muted text-lg mt-2">
          Here is the overview of your workspace today.
        </p>
      </header>

      {/* Notion style feature cards */}
      <section>
        <h3 className="font-ibm text-heading-3 font-bold text-ink tracking-tight mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-xl p-6 border border-hairline shadow-soft flex items-center justify-between cursor-default">
            <div>
              <p className="text-sm text-ink-muted font-sarabun font-medium mb-1">Active Employees</p>
              <p className="text-4xl font-ibm font-bold text-ink tracking-tight">{activeEmployees}</p>
            </div>
            <div className="bg-[#e8f5e9] p-3 rounded-full">
              <Users className="w-6 h-6 text-[#1aae39]" />
            </div>
          </div>
          <div className="bg-surface rounded-xl p-6 border border-hairline shadow-soft flex items-center justify-between cursor-default">
            <div>
              <p className="text-sm text-ink-muted font-sarabun font-medium mb-1">Pending Approvals</p>
              <p className="text-4xl font-ibm font-bold text-ink tracking-tight">{pendingApprovalsCount}</p>
            </div>
            <div className="bg-[#fff2f2] p-3 rounded-full">
              <Inbox className="w-6 h-6 text-[#dd5b00]" />
            </div>
          </div>
          <div className="bg-surface rounded-xl p-6 border border-hairline shadow-soft flex items-center justify-between cursor-default">
            <div>
              <p className="text-sm text-ink-muted font-sarabun font-medium mb-1">System Health</p>
              <p className="text-4xl font-ibm font-bold text-[#1aae39] tracking-tight">100%</p>
            </div>
            <div className="bg-[#e3f2fd] p-3 rounded-full">
              <Activity className="w-6 h-6 text-[#0075de]" />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-surface rounded-xl border border-hairline shadow-soft overflow-hidden">
          <div className="p-6 border-b border-hairline bg-canvas-soft flex items-center justify-between">
            <h3 className="font-ibm text-heading-3 font-bold text-ink tracking-tight">Recent Activity</h3>
            <Link href="/audit" className="text-sm font-sarabun font-medium text-primary hover:underline flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="p-0">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-ink-muted font-sarabun">No recent activity.</div>
            ) : (
              <ul className="divide-y divide-hairline">
                {recentActivity.map(log => (
                  <li key={log.id} className="p-4 hover:bg-[#fcfcfc] transition-colors flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    </div>
                    <div>
                      <p className="font-sarabun text-sm text-ink font-medium">
                        {log.action} <span className="text-ink-secondary font-normal">on</span> {log.resource}
                      </p>
                      <p className="font-sarabun text-xs text-ink-faint mt-0.5">
                        {log.user ? log.user.name : "SYSTEM"} • {new Date(log.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="bg-surface rounded-xl border border-hairline shadow-soft overflow-hidden flex flex-col justify-center items-center p-10 text-center">
          <div className="w-16 h-16 bg-[#e3f2fd] text-primary rounded-full flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="font-ibm text-heading-3 font-bold text-ink tracking-tight mb-2">My Approvals Inbox</h3>
          <p className="font-sarabun text-ink-secondary mb-6 max-w-sm">
            You have {pendingApprovalsCount} pending request{pendingApprovalsCount === 1 ? '' : 's'} waiting for your review. Check your inbox to unblock your team.
          </p>
          <Link href="/tools/approvals" className="bg-primary text-on-primary hover:bg-primary-active rounded-full px-6 py-2.5 font-sarabun font-medium transition-colors">
            Go to Inbox
          </Link>
        </section>
      </div>
    </div>
  )
}
