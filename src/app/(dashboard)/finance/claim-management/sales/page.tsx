"use client"

import { useState } from "react"

export default function SalesClaimManagementPage() {
  const [logs] = useState([
    {
      id: "SCLM-0091",
      rep: "Somchai S. (Sales Head)",
      deal: "Mega Corp License closing",
      type: "Client Entertainment",
      amount: "4,200.00",
      date: "2026-06-11",
      status: "Approved",
    },
    {
      id: "SCLM-0084",
      rep: "Kitti P. (Sales Rep)",
      deal: "CyberTech Onsite Demo",
      type: "Travel & Fuel",
      amount: "1,500.00",
      date: "2026-06-08",
      status: "Disbursed",
    },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Finance • Administration</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Sales Claim Management</h1>
        <p className="text-body-md text-secondary mt-1">
          Monitor and manage sales department budget allocations, client entertaining, and travel claims.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Q2 Sales Budget Spent</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">34,500.00</span>
            <span className="text-body-md text-secondary font-mono-data">/ 100,000 THB</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Total Claims Disbursed</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success-text font-bold">28,800.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold font-mono-data">Pending Reimbursements</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-warning-text font-bold">5,700.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Sales Department Claims Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Claim ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Sales Rep</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Client Deal / Event</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Expense Type</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Amount (THB)</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{log.id}</td>
                  <td className="px-6 py-4 font-sans font-bold">{log.rep}</td>
                  <td className="px-6 py-4 font-sans">{log.deal}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="chip-neutral">{log.type}</span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{log.date}</td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">{log.amount}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={log.status === "Disbursed" ? "chip-success" : "chip-info"}>
                      {log.status}
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
