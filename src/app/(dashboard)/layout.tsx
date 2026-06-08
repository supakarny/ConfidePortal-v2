"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas-soft flex font-sarabun text-ink">
      {/* Notion style sidebar */}
      <aside className="w-[240px] bg-canvas border-r border-hairline flex flex-col fixed h-full z-10">
        <div className="p-4 flex items-center gap-2">
          {/* Logo placeholder */}
          <div className="w-5 h-5 bg-ink rounded-sm flex-shrink-0"></div>
          <h2 className="font-ibm font-bold text-sm text-ink truncate">Confide Portal</h2>
        </div>
        
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <div className="mb-4">
            <Link href="/dashboard" className="flex items-center px-2 py-1 bg-canvas-soft text-ink rounded-md text-sm font-medium hover:bg-[#ebebea] transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="mb-4">
            <p className="px-2 text-xs font-semibold text-ink-faint mb-1">Tools</p>
            <Link href="/tools/approvals" className="block px-2 py-1 text-ink-secondary hover:bg-canvas-soft hover:text-ink rounded-md text-sm transition-colors">
              Approvals Inbox
            </Link>
            <Link href="/tools/approval-flows" className="block px-2 py-1 text-ink-secondary hover:bg-canvas-soft hover:text-ink rounded-md text-sm transition-colors">
              Approval Flows
            </Link>
          </div>

          <div className="mb-4">
            <p className="px-2 text-xs font-semibold text-ink-faint mb-1">Admin Console</p>
            <Link href="/employees" className="block px-2 py-1 text-ink-secondary hover:bg-canvas-soft hover:text-ink rounded-md text-sm transition-colors">
              Employees
            </Link>
            <Link href="/roles" className="block px-2 py-1 text-ink-secondary hover:bg-canvas-soft hover:text-ink rounded-md text-sm transition-colors">
              Roles & Permissions
            </Link>
          </div>

          <div className="mb-4">
            <p className="px-2 text-xs font-semibold text-ink-faint mb-1">System</p>
            <Link href="/notifications" className="block px-2 py-1 text-ink-secondary hover:bg-canvas-soft hover:text-ink rounded-md text-sm transition-colors">
              Notifications
            </Link>
            <Link href="/audit" className="block px-2 py-1 text-ink-secondary hover:bg-canvas-soft hover:text-ink rounded-md text-sm transition-colors">
              Audit Log
            </Link>
          </div>
        </nav>

        <div className="p-3 border-t border-hairline">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-ink-secondary hover:bg-canvas-soft hover:text-ink rounded-md transition-colors"
          >
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[240px]">
        <div className="max-w-[1080px] mx-auto p-12">
          {children}
        </div>
      </main>
    </div>
  )
}
