"use client"

import { useState } from "react"

export default function AttendanceRecordPage() {
  const [currentMonth, setCurrentMonth] = useState("June 2026")

  // Mock daily attendance logs
  const logs = [
    { date: "2026-06-12", in: "07:54", out: "17:05", status: "On Time", hours: 8.5 },
    { date: "2026-06-11", in: "07:48", out: "17:30", status: "On Time", hours: 9.0 },
    { date: "2026-06-10", in: "07:50", out: "17:00", status: "On Time", hours: 8.5 },
    { date: "2026-06-09", in: "08:12", out: "17:02", status: "Late", hours: 8.0 },
    { date: "2026-06-08", in: "07:55", out: "17:15", status: "On Time", hours: 8.5 },
    { date: "2026-06-05", in: "07:44", out: "17:00", status: "On Time", hours: 8.5 },
    { date: "2026-06-04", in: "08:52", out: "17:00", status: "Late (Excused)", hours: 7.0 },
    { date: "2026-06-03", in: "-", out: "-", status: "Holiday (Queen's Birthday)", hours: 0 },
    { date: "2026-06-02", in: "-", out: "-", status: "Sick Leave", hours: 0 },
    { date: "2026-06-01", in: "07:51", out: "17:00", status: "On Time", hours: 8.5 },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Attendance &amp; Day-Off</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Attendance Record</h1>
          <p className="text-body-md text-secondary mt-1">
            View your personal work hours, clock-in logs, and status audits.
          </p>
        </div>
        <button className="bg-white text-on-surface border border-[#e2e8f0] px-4 py-2 rounded-lg font-bold text-body-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[20px]">file_download</span>
          Export Attendance Report
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card bg-white p-5 rounded-xl">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Total Workdays</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">10</span>
            <span className="text-body-md text-secondary">days logged</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Total Hours Worked</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-primary font-bold">76.5</span>
            <span className="text-body-md text-secondary">hours</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">On-Time Rate</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success font-bold">87.5%</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Late/Excused days</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-warning-text font-bold">2</span>
            <span className="text-body-md text-secondary">days</span>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center bg-white">
          <h3 className="text-headline-md text-on-surface font-bold">Clock-in Logs - {currentMonth}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Clock-In</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Clock-Out</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Work Hours</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Location / Device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{log.date}</td>
                  <td className={`px-6 py-4 text-mono-data font-semibold ${
                    log.in !== "-" && log.in > "08:00" ? "text-error" : "text-on-surface"
                  }`}>
                    {log.in}
                  </td>
                  <td className="px-6 py-4 text-mono-data text-on-surface font-semibold">{log.out}</td>
                  <td className="px-6 py-4 text-body-md font-semibold font-mono-data">{log.hours} hrs</td>
                  <td className="px-6 py-4">
                    <span className={
                      log.status === "On Time"
                        ? "chip-success"
                        : log.status.includes("Late (Excused)")
                        ? "chip-neutral bg-[#e5eeff] text-[#1e40af]"
                        : log.status.includes("Late")
                        ? "chip-error"
                        : "chip-warning"
                    }>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-body-md text-secondary">
                    {log.in === "-" ? "-" : "Office HQ (Wifi-Gate: 192.168.12.9)"}
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
