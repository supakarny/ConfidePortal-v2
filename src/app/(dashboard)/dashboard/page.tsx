import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/db"
import { getPendingApprovalsForUser } from "@/modules/approval/actions"
import Link from "next/link"

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

  const metrics = [
    {
      label: "Active Employees",
      value: activeEmployees.toString(),
      change: "+3",
      changeType: "up" as const,
      icon: "group",
      accentColor: "primary",
    },
    {
      label: "Pending Approvals",
      value: pendingApprovalsCount.toString(),
      change: pendingApprovalsCount > 0 ? "Action needed" : "All clear",
      changeType: pendingApprovalsCount > 0 ? "warning" as const : "up" as const,
      icon: "inbox",
      accentColor: pendingApprovalsCount > 0 ? "error" : "primary",
    },
    {
      label: "System Health",
      value: "100%",
      change: "Optimal",
      changeType: "up" as const,
      icon: "monitoring",
      accentColor: "primary",
    },
    {
      label: "Active Modules",
      value: "6",
      change: "Running",
      changeType: "up" as const,
      icon: "apps",
      accentColor: "primary",
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Overview</p>
          <h1 className="text-headline-xl text-on-surface mt-1">
            Welcome back, {session.user?.name?.split(' ')[0] || 'User'}
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-[#e2e8f0] px-4 py-2 rounded-lg flex items-center gap-2 text-body-md text-secondary hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            Today
          </button>
          <Link
            href="/tools/approvals"
            className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-bold text-body-md hover:opacity-90 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">inbox</span>
            Approvals Inbox
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`data-card bg-white p-5 rounded-xl border-l-4 ${
              metric.accentColor === "error" ? "border-l-error" : "border-l-primary"
            } relative overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${
                metric.accentColor === "error" ? "bg-error/10" : "bg-primary-container/10"
              }`}>
                <span className={`material-symbols-outlined ${
                  metric.accentColor === "error" ? "text-error" : "text-primary"
                }`}>
                  {metric.icon}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-label-sm flex items-center gap-1 font-bold ${
                metric.changeType === "up"
                  ? "bg-success-bg text-success-text"
                  : metric.changeType === "warning"
                  ? "bg-warning-bg text-warning-text"
                  : "bg-error-container text-on-error-container"
              }`}>
                {metric.changeType === "up" && (
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                )}
                {metric.changeType === "warning" && (
                  <span className="material-symbols-outlined text-[14px]">priority_high</span>
                )}
                {metric.change}
              </span>
            </div>
            <p className="text-label-sm text-secondary uppercase">{metric.label}</p>
            <h3 className="text-headline-md text-on-surface mt-1">{metric.value}</h3>
            {/* Decorative background icon */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] scale-150">
              <span className="material-symbols-outlined text-[80px]">{metric.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <div className="lg:col-span-2 data-card bg-white rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center">
            <div>
              <h4 className="text-headline-md text-on-surface">Recent Activity</h4>
              <p className="text-body-md text-secondary">Latest system events</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-secondary hover:bg-surface-container-low rounded-lg transition-all">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
              <Link href="/audit" className="p-2 text-secondary hover:bg-surface-container-low rounded-lg transition-all">
                <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-[#e2e8f0]">
                  <th className="px-6 py-3 text-label-sm text-secondary uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-label-sm text-secondary uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-label-sm text-secondary uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-label-sm text-secondary uppercase tracking-wider">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {recentActivity.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-secondary text-body-md">
                      No recent activity.
                    </td>
                  </tr>
                ) : (
                  recentActivity.map(log => (
                    <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-body-md text-on-surface font-semibold">{log.action}</span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">
                        {log.user ? log.user.name : "SYSTEM"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="chip-neutral">
                          <span className="material-symbols-outlined text-[14px]">database</span>
                          {log.resource}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-mono-data text-secondary">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="data-card bg-white rounded-xl p-6 flex flex-col">
          <h4 className="text-headline-md text-on-surface mb-1">Quick Actions</h4>
          <p className="text-body-md text-secondary mb-6">Frequently used shortcuts</p>

          <div className="space-y-3 flex-1">
            <Link
              href="/tools/approvals"
              className="flex items-center gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:bg-surface-container-low transition-colors group"
            >
              <div className="p-2 bg-primary-container/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-[22px]">inbox</span>
              </div>
              <div className="flex-1">
                <p className="text-body-md text-on-surface font-semibold">Approvals Inbox</p>
                <p className="text-label-sm text-secondary">{pendingApprovalsCount} pending</p>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </Link>

            <Link
              href="/employees"
              className="flex items-center gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:bg-surface-container-low transition-colors group"
            >
              <div className="p-2 bg-primary-container/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-[22px]">badge</span>
              </div>
              <div className="flex-1">
                <p className="text-body-md text-on-surface font-semibold">Employee Directory</p>
                <p className="text-label-sm text-secondary">{activeEmployees} active</p>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </Link>

            <Link
              href="/audit"
              className="flex items-center gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:bg-surface-container-low transition-colors group"
            >
              <div className="p-2 bg-primary-container/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-[22px]">history</span>
              </div>
              <div className="flex-1">
                <p className="text-body-md text-on-surface font-semibold">Audit Log</p>
                <p className="text-label-sm text-secondary">System events</p>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </Link>

            <Link
              href="/roles"
              className="flex items-center gap-3 p-3 rounded-lg border border-[#e2e8f0] hover:bg-surface-container-low transition-colors group"
            >
              <div className="p-2 bg-primary-container/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
              </div>
              <div className="flex-1">
                <p className="text-body-md text-on-surface font-semibold">Roles & Permissions</p>
                <p className="text-label-sm text-secondary">Access control</p>
              </div>
              <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors text-[20px]">
                chevron_right
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
