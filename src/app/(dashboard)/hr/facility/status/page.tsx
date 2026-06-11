"use client"

import { useState } from "react"

export default function FacilityStatusPage() {
  const [rooms, setRooms] = useState([
    { name: "Meeting Room 101 (Large)", capacity: "15 seats", status: "Occupied", project: "Q2 Townhall Dry Run", end: "12:00" },
    { name: "Meeting Room 102 (Medium)", capacity: "8 seats", status: "Available", project: "-", end: "-" },
    { name: "Meeting Room 103 (Small)", capacity: "4 seats", status: "Available", project: "-", end: "-" },
    { name: "Executive Boardroom", capacity: "20 seats", status: "Occupied", project: "Board Meeting", end: "13:30" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Facility</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Office Facility Status</h1>
        <p className="text-body-md text-secondary mt-1">
          Real-time occupancy and status details for meeting rooms, amenities, and office zones.
        </p>
      </div>

      {/* Facilities Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Meeting Rooms Occupancy</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">2 / 4</span>
            <span className="text-body-md text-secondary">rooms in use</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold font-mono-data">AC System State</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success-text font-bold">Optimal</span>
            <span className="text-body-md text-secondary">24.5°C avg temperature</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Today's Cafeteria Menu</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-warning-text font-bold">Basil Pork</span>
            <span className="text-body-md text-secondary">+ Fried Egg (Standard)</span>
          </div>
        </div>
      </div>

      {/* Room Directory */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Meeting Room Directory</h3>
          <p className="text-body-md text-secondary mt-1">Check availability or current reservation slots.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Room Name</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Capacity</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Current Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Reserved Event / Project</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Booking Expiry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {rooms.map((r, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-body-md text-on-surface font-bold">{r.name}</td>
                  <td className="px-6 py-4 text-body-md text-secondary">{r.capacity}</td>
                  <td className="px-6 py-4">
                    <span className={r.status === "Available" ? "chip-success" : "chip-error"}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-body-md text-on-surface">{r.project}</td>
                  <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{r.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
