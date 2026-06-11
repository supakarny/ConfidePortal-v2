"use client"

import { useState } from "react"

export default function LeaveRequestsPage() {
  const [leaveType, setLeaveType] = useState("Annual Leave")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [leaves, setLeaves] = useState([
    {
      id: "LV-2026-081",
      type: "Annual Leave",
      period: "2026-06-25 to 2026-06-26",
      days: 2,
      reason: "Family vacation trip",
      status: "Approved",
      approver: "Somchai S. (Manager)",
    },
    {
      id: "LV-2026-079",
      type: "Sick Leave",
      period: "2026-06-02",
      days: 1,
      reason: "High fever & flu",
      status: "Approved",
      approver: "Somchai S. (Manager)",
    },
    {
      id: "LV-2026-085",
      type: "Business Leave",
      period: "2026-06-18",
      days: 1,
      reason: "Renewing driving license",
      status: "Pending",
      approver: "Somchai S. (Manager)",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) return

    setIsSubmitting(true)
    setTimeout(() => {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

      const newLeave = {
        id: `LV-2026-0${Math.floor(80 + Math.random() * 20)}`,
        type: leaveType,
        period: `${startDate} to ${endDate}`,
        days: diffDays,
        reason,
        status: "Pending",
        approver: "Somchai S. (Manager)",
      }

      setLeaves([newLeave, ...leaves])
      setStartDate("")
      setEndDate("")
      setReason("")
      setIsSubmitting(false)
      alert("Leave request submitted successfully!")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Attendance &amp; Day-Off</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Leave Requests</h1>
        <p className="text-body-md text-secondary mt-1">
          Apply for leaves (Annual, Sick, Business, Maternity/Paternity) and track balances.
        </p>
      </div>

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Annual Leave Balance</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">12</span>
            <span className="text-body-md text-secondary">/ 15 days remaining</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Sick Leave taken</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">3</span>
            <span className="text-body-md text-secondary">/ 30 days used</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Business Leave taken</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">1</span>
            <span className="text-body-md text-secondary">/ 6 days used</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-info">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Unpaid Leave taken</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">0</span>
            <span className="text-body-md text-secondary">days used</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Leave Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Submit Leave Form</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Annual Leave">Annual Leave (พักร้อน)</option>
                  <option value="Sick Leave">Sick Leave (ลาป่วย)</option>
                  <option value="Business Leave">Business Leave (ลากิจ)</option>
                  <option value="Maternity/Paternity Leave">Maternity / Paternity Leave (ลาคลอด)</option>
                  <option value="Unpaid Leave">Unpaid Leave (ลากิจไม่รับค่าจ้าง)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Reason</label>
                <textarea
                  rows={3}
                  placeholder="Justification for leave request..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
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
                {isSubmitting ? "Submitting..." : "Apply Leave"}
              </button>
            </form>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Leave Request History</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Leave Type</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Period</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Days</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Approver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {leaves.map((leave, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{leave.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-on-surface">{leave.type}</div>
                        <div className="text-[11px] text-secondary leading-normal">{leave.reason}</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary whitespace-nowrap">{leave.period}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{leave.days}d</td>
                      <td className="px-6 py-4">
                        <span className={leave.status === "Approved" ? "chip-success" : "chip-warning"}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">{leave.approver}</td>
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
