"use client"

import { useState } from "react"

export default function FieldCheckinPage() {
  const [client, setClient] = useState("Mega Corp Factory (Chonburi)")
  const [remarks, setRemarks] = useState("")
  const [checkedIn, setCheckedIn] = useState(false)
  const [logs, setLogs] = useState([
    { time: "09:05", client: "Mega Corp HQ", type: "Clock In", coords: "13.7563° N, 100.5018° E" },
    { time: "12:15", client: "Mega Corp HQ", type: "Clock Out", coords: "13.7563° N, 100.5018° E" },
  ])

  const handleToggleCheck = () => {
    const time = new Date().toTimeString().split(" ")[0].slice(0, 5)
    const newLog = {
      time,
      client,
      type: checkedIn ? "Clock Out" : "Clock In",
      coords: "13.3612° N, 100.9822° E (Mock GPS Location)",
    }

    setLogs([newLog, ...logs])
    setCheckedIn(!checkedIn)
    alert(checkedIn ? "Clock Out recorded." : "Clock In recorded.")
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Service • Field Sector</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Check In / Out</h1>
        <p className="text-body-md text-secondary mt-1">
          Record your attendance on field deployments using verified geographic location checks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Check-in Actions Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Clock Attendance</h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Select Client Site</label>
                <select
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={checkedIn}
                >
                  <option value="Mega Corp Factory (Chonburi)">Mega Corp Factory (Chonburi)</option>
                  <option value="CyberTech Office (Bangkok)">CyberTech Office (Bangkok)</option>
                  <option value="Siam Logistics Hub (Samut Prakan)">Siam Logistics Hub (Samut Prakan)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Remarks / Notes</label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Task overview..."
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={checkedIn}
                />
              </div>

              {/* GPS HUD */}
              <div className="bg-surface-container-low border border-[#e2e8f0] rounded-lg p-4 flex flex-col justify-between">
                <span className="text-label-sm text-secondary uppercase tracking-widest font-bold">GPS Coordinates</span>
                <div className="text-body-md font-mono-data text-on-surface mt-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  <span>13.3612° N, 100.9822° E</span>
                </div>
              </div>

              <button
                onClick={handleToggleCheck}
                className={`w-full py-3 rounded-lg font-bold text-body-md transition-colors flex items-center justify-center gap-2 ${
                  checkedIn
                    ? "bg-error text-white hover:bg-error/95"
                    : "bg-success text-white hover:bg-success/95"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {checkedIn ? "logout" : "login"}
                </span>
                {checkedIn ? "Clock Out" : "Clock In"}
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Today's Check-in History</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Time</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Client Site</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Clock Type</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">GPS Coordinate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
                  {logs.map((log, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                      <td className="px-6 py-4 text-secondary">{log.time}</td>
                      <td className="px-6 py-4 font-sans font-bold">{log.client}</td>
                      <td className="px-6 py-4 font-sans">
                        <span className={log.type === "Clock In" ? "chip-success" : "chip-neutral"}>
                          {log.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-secondary">{log.coords}</td>
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
