"use client"

import { useState } from "react"

export default function SecurityAuditLogPage() {
  const [logs] = useState([
    { time: "2026-06-12 10:24:11", user: "Kitti Pornprasert", event: "User Sign In", ip: "192.168.1.104", details: "MFA Token verified. Browser session initiated successfully." },
    { time: "2026-06-12 09:12:05", user: "Somsak Dev", event: "User Sign In", ip: "192.168.1.109", details: "Google OAuth token callback verification successful." },
    { time: "2026-06-11 22:15:30", user: "Somchai S.", event: "Password Changed", ip: "192.168.1.102", details: "Admin forced credential reset completed." },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • Audits</p>
        <h1 className="text-headline-xl text-on-surface mt-1">User &amp; Security Audit Log</h1>
        <p className="text-body-md text-secondary mt-1">
          Monitor user login status, credential changes, security audits, and lockout events.
        </p>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">User Authentication Logs</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Timestamp</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Employee account</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Event Activity</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">IP Address</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary whitespace-nowrap">{log.time}</td>
                  <td className="px-6 py-4 font-sans font-bold text-on-surface">{log.user}</td>
                  <td className="px-6 py-4 font-sans text-on-surface">
                    <span className={log.event === "User Sign In" ? "chip-success" : "chip-warning"}>
                      {log.event}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{log.ip}</td>
                  <td className="px-6 py-4 font-sans text-secondary leading-relaxed max-w-sm" title={log.details}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
