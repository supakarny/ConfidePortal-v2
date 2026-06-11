"use client"

import { useState } from "react"

export default function GeneralClaimManagementPage() {
  const [logs] = useState([
    {
      id: "CLM-8980",
      employee: "Somsak Dev (Product)",
      type: "Training & Courses",
      amount: "4,500.00",
      date: "2026-06-03",
      status: "Disbursed",
    },
    {
      id: "CLM-8911",
      employee: "Kanda P. (HR)",
      type: "Office Stationary",
      amount: "820.00",
      date: "2026-05-28",
      status: "Disbursed",
    },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Finance • Administration</p>
        <h1 className="text-headline-xl text-on-surface mt-1">General Claim Management</h1>
        <p className="text-body-md text-secondary mt-1">
          Monitor and disburse standard employee reimbursement claims for office stationeries, hardware, and courses.
        </p>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">General Claims Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Claim ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Employee</th>
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
                  <td className="px-6 py-4 font-sans font-bold">{log.employee}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="chip-neutral">{log.type}</span>
                  </td>
                  <td className="px-6 py-4 text-secondary">{log.date}</td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">{log.amount}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="chip-success">{log.status}</span>
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
