"use client"

import { useState } from "react"

export default function ExpenseApprovalPage() {
  const [requests, setRequests] = useState([
    {
      id: "CLM-9042",
      requester: "Kitti Pornprasert",
      category: "Hardware / Tech",
      amount: "1,540.00",
      date: "2026-06-11",
      desc: "USB-C Hub adapter for office laptop (Belkin 7-in-1)",
      receipt: "receipt_belkin.pdf",
    },
    {
      id: "TRV-9842",
      requester: "Kitti Pornprasert",
      category: "Travel Expense",
      amount: "1,250.00",
      date: "2026-06-11",
      desc: "Gasoline refueling & highway toll fares for client site visit (Rayong Industrial Estate)",
      receipt: "receipt_gas.pdf",
    },
  ])

  const handleAction = (id: string, action: "Approve" | "Reject") => {
    alert(`Claim ${id} has been ${action}d.`)
    setRequests(requests.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Finance • Management</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Expense Claim Approvals</h1>
        <p className="text-body-md text-secondary mt-1">
          Review, auditing, and final payout authorization of general and travel reimbursement claims.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold font-mono-data">Pending Claims Total</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">2,790.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Awaiting Auditing</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-warning-text font-bold">{requests.length}</span>
            <span className="text-body-md text-secondary">tickets pending</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Processed This Month</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success-text font-bold">18,450.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB disbursed</span>
          </div>
        </div>
      </div>

      {/* Pending Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Reimbursements Queue</h3>
        </div>

        <div className="overflow-x-auto">
          {requests.length === 0 ? (
            <div className="p-12 text-center text-secondary text-body-lg">
              <span className="material-symbols-outlined text-[48px] text-outline mb-2">check_circle</span>
              <p className="font-semibold">Zero Pending Claims</p>
              <p className="text-body-md text-secondary">All reimbursement claims have been audited and disbursed.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Claim ID</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Employee</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Category / Details</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 font-mono-data">Receipt</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Amount (THB)</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 text-mono-data text-secondary">{r.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-on-surface text-body-md">{r.requester}</div>
                      <div className="text-[11px] text-secondary font-mono-data mt-0.5">{r.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="chip-neutral mb-1.5">{r.category}</span>
                      <p className="text-body-md text-secondary max-w-sm" title={r.desc}>
                        {r.desc}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-body-md text-primary font-semibold hover:underline cursor-pointer">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">attachment</span>
                        <span>{r.receipt}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-body-md text-on-surface font-extrabold font-mono-data">
                      {r.amount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleAction(r.id, "Approve")}
                          className="bg-success text-white hover:bg-success/90 px-3 py-1.5 rounded-lg text-body-md font-semibold flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(r.id, "Reject")}
                          className="bg-white text-error border border-error hover:bg-error-container/20 px-3 py-1.5 rounded-lg text-body-md font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
