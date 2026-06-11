"use client"

import { useState } from "react"

export default function ServiceReportsPage() {
  const [reports] = useState([
    { id: "SREP-0421", project: "Mega Corp Core Setup", date: "2026-06-11", status: "Approved", lead: "Anan S." },
    { id: "SREP-0419", project: "CyberTech CRM SLA", date: "2026-06-08", status: "Approved", lead: "Wichai O." },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Service • Office Sector</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Service Reports</h1>
          <p className="text-body-md text-secondary mt-1">
            Access compiled customer satisfaction surveys, SLA compliance ratings, and project sign-off metrics.
          </p>
        </div>
        <button className="bg-white text-on-surface border border-[#e2e8f0] px-4 py-2 rounded-lg font-bold text-body-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Export Reports
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold font-mono-data">SLA Compliance Rate</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">98.5%</span>
            <span className="text-body-md text-secondary">Q2 targets achieved</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Average CSAT Rating</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success-text font-bold">4.9</span>
            <span className="text-body-md text-secondary">/ 5.0 points</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Tickets Resolved (MTD)</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-warning-text font-bold">24</span>
            <span className="text-body-md text-secondary">tasks completed</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Service Deliveries Report Directory</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Report ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Project / Account</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Publish Date</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Technical Lead</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Verification Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {reports.map((r, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{r.id}</td>
                  <td className="px-6 py-4 font-sans font-bold">{r.project}</td>
                  <td className="px-6 py-4 text-secondary">{r.date}</td>
                  <td className="px-6 py-4 font-sans text-on-surface">{r.lead}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="chip-success">{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-sans">
                    <button className="text-primary hover:text-primary-container font-semibold text-body-md inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      Download
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
