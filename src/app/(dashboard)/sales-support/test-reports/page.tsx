"use client"

import { useState } from "react"

export default function TestReportsPage() {
  const [reports] = useState([
    { id: "REP-0421", system: "VPN Gateway", inspector: "Anan S.", date: "2026-06-11", status: "Passed" },
    { id: "REP-0419", system: "Staging database clusters", inspector: "Somsak Dev", date: "2026-06-08", status: "Passed" },
    { id: "REP-0422", system: "OAuth callback domain validation", inspector: "Anan S.", date: "2026-06-12", status: "Failed" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales Support • Audits</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Test Reports</h1>
        <p className="text-body-md text-secondary mt-1">
          Review configuration check reports and integration validation audits.
        </p>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Integration Testing Reports Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Report ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Checked System</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Auditor</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Verification Date</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {reports.map((r, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{r.id}</td>
                  <td className="px-6 py-4 font-sans font-bold">{r.system}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{r.inspector}</td>
                  <td className="px-6 py-4 text-secondary">{r.date}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={r.status === "Passed" ? "chip-success" : "chip-error"}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-sans">
                    <button className="text-primary hover:text-primary-container font-semibold text-body-md inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      Details
                    </button>
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
