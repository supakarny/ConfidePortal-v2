"use client"

import { useState } from "react"

export default function FieldServiceRequestPage() {
  const [requests] = useState([
    { id: "SRV-2026-904", client: "Mega Corp", issue: "Database latency checks", tech: "Anan S.", date: "2026-06-11", status: "In Progress" },
    { id: "SRV-2026-901", client: "CyberTech Solutions", issue: "VPN client connectivity diagnostics", tech: "Wichai O.", date: "2026-06-10", status: "Completed" },
    { id: "SRV-2026-905", client: "Siam Logistics", issue: "API webhook sync audit", tech: "Kitti P.", date: "2026-06-12", status: "Assigned" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Service • Office Sector</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Field Service Requests</h1>
          <p className="text-body-md text-secondary mt-1">
            Track and dispatch customer service requests requiring onsite support engineer visits.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          New Request
        </button>
      </div>

      {/* Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Field Service Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Request ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Customer</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Issue Details</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Assigned Tech</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {requests.map((r, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{r.id}</td>
                  <td className="px-6 py-4 font-sans font-bold">{r.client}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{r.issue}</td>
                  <td className="px-6 py-4 font-sans text-on-surface">{r.tech}</td>
                  <td className="px-6 py-4 text-secondary">{r.date}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={
                      r.status === "Completed"
                        ? "chip-success"
                        : r.status === "In Progress"
                        ? "chip-info"
                        : "chip-warning"
                    }>
                      {r.status}
                    </span>
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
