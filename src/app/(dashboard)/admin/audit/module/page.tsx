"use client"

import { useState } from "react"

export default function ModuleAuditLogPage() {
  const [logs] = useState([
    { time: "2026-06-12 10:14:15", admin: "Supakarn S.", action: "Updated Leaves Limit", module: "HR Module", details: "Sick leave increased from 30 to 45 days due to government policy changes" },
    { time: "2026-06-11 15:40:22", admin: "Pornpen M.", action: "Edited SSO Rate", module: "Finance Module", details: "Changed default social security percentage value to 5.0%" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • Audits</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Module Settings Audit Log</h1>
        <p className="text-body-md text-secondary mt-1">
          Detailed trace list of module settings updates, variables modification, and system variables edits.
        </p>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Module Settings Modification Logs</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Timestamp</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Operator Admin</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Event Action</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Target Module</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Audit Details Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary whitespace-nowrap">{log.time}</td>
                  <td className="px-6 py-4 font-sans font-bold text-on-surface">{log.admin}</td>
                  <td className="px-6 py-4 font-sans text-primary font-semibold">{log.action}</td>
                  <td className="px-6 py-4 font-sans"><span className="chip-neutral">{log.module}</span></td>
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
