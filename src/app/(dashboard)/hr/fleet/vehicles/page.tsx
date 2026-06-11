"use client"

import { useState } from "react"

export default function FleetVehiclesPage() {
  const [vehicles, setVehicles] = useState([
    {
      plate: "กข-1234 กรุงเทพ",
      model: "Toyota Hilux Revo",
      type: "Pickup Truck",
      mileage: "42,150 km",
      status: "Available",
      lastService: "2026-04-10",
      insuranceExpiry: "2027-01-15",
    },
    {
      plate: "ชง-5678 กรุงเทพ",
      model: "Toyota Camry",
      type: "Sedan (Executive)",
      mileage: "18,920 km",
      status: "Booked",
      lastService: "2026-05-02",
      insuranceExpiry: "2026-12-10",
    },
    {
      plate: "มค-9012 นนทบุรี",
      model: "Toyota Commuter",
      type: "Passenger Van",
      mileage: "94,300 km",
      status: "Maintenance",
      lastService: "2026-06-10",
      insuranceExpiry: "2026-11-28",
    },
    {
      plate: "รน-4321 กรุงเทพ",
      model: "Honda City",
      type: "Sedan (Sales)",
      mileage: "25,400 km",
      status: "Available",
      lastService: "2026-03-24",
      insuranceExpiry: "2026-10-05",
    },
  ])

  const handleAddVehicle = () => {
    alert("Function to add vehicle to fleet database - Admin Only.")
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Fleet</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Vehicle Management</h1>
          <p className="text-body-md text-secondary mt-1">
            Database of all corporate vehicles, mileage tracking, service logs, and registration details.
          </p>
        </div>
        <button
          onClick={handleAddVehicle}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Vehicle
        </button>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Fleet Assets Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">License Plate</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Model / Type</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Current Mileage</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Last Serviced</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Insurance Expiry</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {vehicles.map((v, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-mono-data text-on-surface font-extrabold">{v.plate}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-on-surface text-body-md">{v.model}</div>
                    <div className="text-[11px] text-secondary leading-normal">{v.type}</div>
                  </td>
                  <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{v.mileage}</td>
                  <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{v.lastService}</td>
                  <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{v.insuranceExpiry}</td>
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
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-container font-semibold text-body-md inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      Edit
                    </button>
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
