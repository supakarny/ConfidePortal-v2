"use client"

import { useState } from "react"

export default function DailyCheckinPage() {
  const [clientName, setClientName] = useState("")
  const [remarks, setRemarks] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [history, setHistory] = useState([
    { time: "09:15", client: "Mega Corp HQ", coords: "13.7563° N, 100.5018° E", status: "Checked In", remark: "Initial proposal discussion" },
    { time: "14:30", client: "CyberTech Office", coords: "13.7367° N, 100.5231° E", status: "Checked Out", remark: "Follow-up meeting about cloud SLAs" },
  ])

  const handleCheckin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newCheck = {
        time: new Date().toTimeString().split(" ")[0].slice(0, 5),
        client: clientName,
        coords: "13.7242° N, 100.5115° E (Mock GPS Location)",
        status: "Checked In",
        remark: remarks,
      }

      setHistory([newCheck, ...history])
      setClientName("")
      setRemarks("")
      setIsSubmitting(false)
      alert("GPS Check-in recorded successfully.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales &amp; Marketing • Activity</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Daily GPS Check-in</h1>
        <p className="text-body-md text-secondary mt-1">
          Record your onsite client visits with verified geographic location audits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Checkin Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0] flex items-center justify-between">
              <h3 className="text-headline-md text-on-surface">Clock Site Visit</h3>
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            </div>

            <form onSubmit={handleCheckin} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mega Corp HQ, CyberTech"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Remarks / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Briefly state meeting purpose..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Mock Map / GPS HUD */}
              <div className="bg-surface-container-low border border-[#e2e8f0] rounded-lg p-4 flex flex-col justify-between">
                <span className="text-label-sm text-secondary uppercase tracking-widest">GPS Telemetry</span>
                <div className="text-body-md font-mono-data text-on-surface mt-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  <span>13.7242° N, 100.5115° E (Accuracy: 5m)</span>
                </div>
                <div className="text-[11px] text-secondary mt-1">Verified via Confide Geo-Authenticator</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? "hourglass_empty" : "pin_drop"}
                </span>
                {isSubmitting ? "Verifying GPS..." : "Record Check-in"}
              </button>
            </form>
          </div>
        </div>

        {/* History Logs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Today's Activity Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Time</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Client</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">GPS Coordinates</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Remark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {history.map((h, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{h.time}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-bold">{h.client}</td>
                      <td className="px-6 py-4 text-mono-data text-secondary">{h.coords}</td>
                      <td className="px-6 py-4">
                        <span className={h.status === "Checked In" ? "chip-success" : "chip-neutral"}>
                          {h.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary max-w-xs truncate" title={h.remark}>
                        {h.remark}
                      </td>
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
