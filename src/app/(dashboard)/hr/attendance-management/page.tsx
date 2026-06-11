"use client"

import { useState } from "react"

export default function AttendanceManagementPage() {
  const [requests, setRequests] = useState([
    {
      id: "LV-2026-085",
      employee: "Somsak Dev",
      type: "Business Leave",
      details: "Renewing driving license (18 Jun 2026 - 1 day)",
      date: "2026-06-11",
    },
    {
      id: "LAT-0612",
      employee: "Kitti Pornprasert",
      type: "Late Excusal",
      details: "Car engine issue check (12 Jun 2026 - Clocked in at 08:35)",
      date: "2026-06-12",
    },
    {
      id: "OT-9420",
      employee: "Kitti Pornprasert",
      type: "Overtime (OT)",
      details: "Database scaling Batch 3 setup (12 Jun 2026 - 2.0 hrs)",
      date: "2026-06-12",
    },
  ])

  const handleAction = (id: string, action: "Approve" | "Reject") => {
    alert(`Request ${id} has been ${action}d.`)
    setRequests(requests.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Attendance &amp; Day-Off</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Attendance &amp; Leave Management</h1>
        <p className="text-body-md text-secondary mt-1">
          Review pending employee leave requests, late arrivals, overtime claims, and monitor overall attendance.
        </p>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Today's Present Rate</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">94.8%</span>
            <span className="text-body-md text-secondary">36 / 38 employees</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Late Clock-ins Today</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">1</span>
            <span className="text-body-md text-secondary">employee flagged</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-info">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">On Leave Today</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">2</span>
            <span className="text-body-md text-secondary">employees on leave</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-error">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Pending Approvals</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">{requests.length}</span>
            <span className="text-body-md text-secondary">requests awaiting review</span>
          </div>
        </div>
      </div>

      {/* Pending Approvals Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Pending Attendance Approvals</h3>
          <p className="text-body-md text-secondary mt-1">Accept or reject claims from team members.</p>
        </div>

        <div className="overflow-x-auto">
          {requests.length === 0 ? (
            <div className="p-12 text-center text-secondary text-body-lg">
              <span className="material-symbols-outlined text-[48px] text-outline mb-2">assignment_turned_in</span>
              <p className="font-semibold">All caught up!</p>
              <p className="text-body-md text-secondary">No pending leave or OT requests to process.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">ID</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Employee</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Request Type</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Details</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Submission Date</th>
                  <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 text-mono-data text-secondary">{req.id}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface font-bold">{req.employee}</td>
                    <td className="px-6 py-4">
                      <span className={
                        req.type === "Business Leave"
                          ? "chip-warning"
                          : req.type.includes("Late")
                          ? "chip-neutral bg-[#e5eeff] text-[#1e40af]"
                          : "chip-info"
                      }>
                        {req.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-secondary max-w-sm truncate" title={req.details}>
                      {req.details}
                    </td>
                    <td className="px-6 py-4 text-body-md text-secondary">{req.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleAction(req.id, "Approve")}
                          className="bg-success text-white hover:bg-success/90 px-3 py-1.5 rounded-lg text-body-md font-semibold flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">check</span>
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(req.id, "Reject")}
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
