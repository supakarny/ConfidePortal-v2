"use client"

import { useState } from "react"

export default function AdminAuditLogPage() {
  const [logs] = useState([
    { time: "2026-06-12 10:14:15", admin: "Supakarn S.", action: "Created User Account", target: "Somsak Dev (Developer)", ip: "192.168.1.101" },
    { time: "2026-06-11 15:40:22", admin: "Pornchai S.", action: "Assigned Privilege Scopes", target: "Pornpen M. (Finance Auditor)", ip: "192.168.1.100" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • Audits</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Admin Events Audit Log</h1>
        <p className="text-body-md text-secondary mt-1">
          Monitor modifications of user profiles, departments additions, flow changes, and permission adjustments.
        </p>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Admin Activity Logs</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Timestamp</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Administrator</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Action Activity</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Target Subject</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary whitespace-nowrap">{log.time}</td>
                  <td className="px-6 py-4 font-sans font-bold text-on-surface">{log.admin}</td>
                  <td className="px-6 py-4 font-sans text-primary font-semibold">{log.action}</td>
                  <td className="px-6 py-4 font-sans text-on-surface font-semibold">{log.target}</td>
                  <td className="px-6 py-4 text-secondary">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
