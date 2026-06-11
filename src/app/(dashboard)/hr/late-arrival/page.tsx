"use client"

import { useState } from "react"

export default function LateArrivalPage() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("08:45")
  const [reason, setReason] = useState("Traffic congestion")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [records, setRecords] = useState([
    {
      id: "LAT-0604",
      date: "2026-06-04",
      time: "08:52",
      expectedTime: "08:00",
      reason: "BTS Skytrain delay (incident report attached)",
      status: "Excused",
      approver: "Somchai S. (Manager)",
    },
    {
      id: "LAT-0608",
      date: "2026-06-08",
      time: "08:42",
      expectedTime: "08:00",
      reason: "Heavy rain & flood on Ladprao Road",
      status: "Excused",
      approver: "Somchai S. (Manager)",
    },
    {
      id: "LAT-0612",
      date: "2026-06-12",
      time: "08:35",
      expectedTime: "08:00",
      reason: "Car engine issue check",
      status: "Pending",
      approver: "Somchai S. (Manager)",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newRec = {
        id: `LAT-06${Math.floor(13 + Math.random() * 20)}`,
        date,
        time,
        expectedTime: "08:00",
        reason,
        status: "Pending",
        approver: "Somchai S. (Manager)",
      }

      setRecords([newRec, ...records])
      setDate("")
      setIsSubmitting(false)
      alert("Late arrival excusal request submitted.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Attendance &amp; Day-Off</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Late Arrival Requests</h1>
        <p className="text-body-md text-secondary mt-1">
          Submit excusal requests for late clock-ins with supporting arguments or evidence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Excusal Request Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Request Late Excusal</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Date of Incident</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Expected Clock-in</label>
                  <input
                    type="text"
                    value="08:00"
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-low text-secondary cursor-not-allowed"
                    disabled
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Actual Clock-in</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Reason / Explanation</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain traffic, vehicle issues, train breakdowns, etc..."
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Attach Evidence (Optional)</label>
                <div className="border border-dashed border-[#e2e8f0] rounded-lg p-4 bg-surface-container-low flex flex-col items-center justify-center cursor-pointer text-center hover:bg-surface-container-low/80 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-[24px] mb-1">attach_file</span>
                  <p className="text-label-sm font-semibold text-on-surface">Upload photo, train slip, or receipt</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? "hourglass_empty" : "send"}
                </span>
                {isSubmitting ? "Submitting..." : "Submit Excusal"}
              </button>
            </form>
          </div>
        </div>

        {/* History / Status Logs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Excusal Requests Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Req ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Actual Time</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Reason</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Action By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {records.map((rec, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{rec.id}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{rec.date}</td>
                      <td className="px-6 py-4 text-body-md text-error font-semibold font-mono-data">{rec.time}</td>
                      <td className="px-6 py-4 text-body-md text-secondary max-w-xs truncate" title={rec.reason}>
                        {rec.reason}
                      </td>
                      <td className="px-6 py-4">
                        <span className={rec.status === "Excused" ? "chip-success" : "chip-warning"}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">{rec.approver}</td>
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
