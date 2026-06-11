"use client"

import { useState } from "react"

export default function FleetStatusPage() {
  const [vehicles] = useState([
    { plate: "กข-1234 กรุงเทพ", model: "Toyota Hilux Revo", type: "Pickup Truck", status: "Available", fuel: "82%", mileage: "42,150 km" },
    { plate: "ชง-5678 กรุงเทพ", model: "Toyota Camry", type: "Sedan (Executive)", status: "Booked", fuel: "54%", mileage: "18,920 km" },
    { plate: "มค-9012 นนทบุรี", model: "Toyota Commuter", type: "Passenger Van", status: "Maintenance", fuel: "100%", mileage: "94,300 km" },
    { plate: "รน-4321 กรุงเทพ", model: "Honda City", type: "Sedan (Sales)", status: "Available", fuel: "65%", mileage: "25,400 km" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Fleet</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Vehicle Fleet Status</h1>
        <p className="text-body-md text-secondary mt-1">
          Monitor overall vehicle status, availability, and active bookings.
        </p>
      </div>

      {/* Fleet Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Total Fleet Size</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">4</span>
            <span className="text-body-md text-secondary">vehicles</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Available Today</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success-text font-bold">2</span>
            <span className="text-body-md text-secondary">ready for use</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Active Bookings</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-warning-text font-bold">1</span>
            <span className="text-body-md text-secondary">in transit</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-error">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold font-mono-data">In Service / Maintenance</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-error font-bold">1</span>
            <span className="text-body-md text-secondary">at workshop</span>
          </div>
        </div>
      </div>

      {/* Fleet Live Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Fleet Vehicle Directory</h3>
          <p className="text-body-md text-secondary mt-1">Live status, fuel levels, and current location metrics.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Plate Number</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Vehicle Details</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Mileage</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Fuel Level</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">GPS / Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {vehicles.map((v, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-mono-data text-on-surface font-bold">{v.plate}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-on-surface text-body-md">{v.model}</div>
                    <div className="text-[11px] text-secondary leading-normal">{v.type}</div>
                  </td>
                  <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{v.mileage}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: v.fuel }} />
                      </div>
                      <span className="text-label-sm font-mono-data text-secondary">{v.fuel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={
                      v.status === "Available"
                        ? "chip-success"
                        : v.status === "Booked"
                        ? "chip-info"
                        : "chip-error"
                    }>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-body-md text-secondary">
                    {v.status === "Booked" ? "On route to Pathum Thani" : "Headquarters Parking Area B"}
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
