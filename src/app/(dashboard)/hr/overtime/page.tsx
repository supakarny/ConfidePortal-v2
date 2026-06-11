"use client"

import { useState } from "react"

export default function OvertimeRequestsPage() {
  const [date, setDate] = useState("")
  const [hours, setHours] = useState(2.0)
  const [project, setProject] = useState("Confide Portal v2")
  const [reason, setReason] = useState("Deploying DB updates and completing mockup batch routes")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [otLogs, setOtLogs] = useState([
    {
      id: "OT-9401",
      date: "2026-06-11",
      hours: 3.5,
      project: "Confide Portal v2",
      reason: "Batch 2 layout and forms design development",
      status: "Approved",
      approver: "Somchai S. (Manager)",
    },
    {
      id: "OT-9388",
      date: "2026-06-08",
      hours: 2.0,
      project: "IT Security Audit",
      reason: "VPN configuration updates testing",
      status: "Approved",
      approver: "Somchai S. (Manager)",
    },
    {
      id: "OT-9420",
      date: "2026-06-12",
      hours: 2.0,
      project: "Confide Portal v2",
      reason: "Deploying database changes & Batch 3 routes setup",
      status: "Pending",
      approver: "Somchai S. (Manager)",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !hours) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newOT = {
        id: `OT-94${Math.floor(21 + Math.random() * 20)}`,
        date,
        hours,
        project,
        reason,
        status: "Pending",
        approver: "Somchai S. (Manager)",
      }

      setOtLogs([newOT, ...otLogs])
      setDate("")
      setIsSubmitting(false)
      alert("Overtime hours request submitted.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Attendance &amp; Day-Off</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Overtime (OT) Requests</h1>
        <p className="text-body-md text-secondary mt-1">
          Apply for OT hours with projects, task details, and track approval states.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Request Overtime</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">OT Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">OT Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="8"
                    value={hours}
                    onChange={(e) => setHours(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Project Allocation</label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Tasks &amp; Description</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Detail the tasks completed during overtime..."
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? "hourglass_empty" : "send"}
                </span>
                {isSubmitting ? "Submitting..." : "Apply Overtime"}
              </button>
            </form>
          </div>
        </div>

        {/* List Logs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Overtime Approval Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Req ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Hours</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Project / Reason</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Approved By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {otLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{log.id}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{log.date}</td>
                      <td className="px-6 py-4 text-body-md text-primary font-bold font-mono-data">{log.hours} hrs</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-on-surface text-body-md">{log.project}</div>
                        <div className="text-[11px] text-secondary leading-normal">{log.reason}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={log.status === "Approved" ? "chip-success" : "chip-warning"}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">{log.approver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
