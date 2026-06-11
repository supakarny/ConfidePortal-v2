"use client"

import { useState } from "react"

export default function FleetMaintenancePage() {
  const [vehicle, setVehicle] = useState("Toyota Commuter (มค-9012)")
  const [type, setType] = useState("Routine Service")
  const [details, setDetails] = useState("Replace engine oil and filter. Front break pads check.")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [requests, setRequests] = useState([
    {
      id: "MNT-209",
      vehicle: "Toyota Commuter (มค-9012)",
      type: "Routine Service",
      date: "2026-06-10",
      status: "In Progress",
      workshop: "Toyota Auto Body Shop",
    },
    {
      id: "MNT-198",
      vehicle: "Toyota Hilux Revo (กข-1234)",
      type: "Repair",
      date: "2026-05-15",
      status: "Completed",
      workshop: "Goodyear Autocare",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setTimeout(() => {
      const newMnt = {
        id: `MNT-${Math.floor(210 + Math.random() * 50)}`,
        vehicle,
        type,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
        workshop: "Confide Approved Center",
      }

      setRequests([newMnt, ...requests])
      setDetails("")
      setIsSubmitting(false)
      alert("Maintenance request submitted successfully.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Fleet</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Vehicle Maintenance Requests</h1>
        <p className="text-body-md text-secondary mt-1">
          Submit and track scheduled servicing or emergency repair requests for fleet cars.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Request Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Submit Maintenance Request</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Select Vehicle</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Toyota Commuter (มค-9012)">Toyota Commuter (มค-9012)</option>
                  <option value="Toyota Camry (ชง-5678)">Toyota Camry (ชง-5678)</option>
                  <option value="Honda City (รน-4321)">Honda City (รน-4321)</option>
                  <option value="Toyota Hilux Revo (กข-1234)">Toyota Hilux Revo (กข-1234)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Service Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Routine Service">Routine Service (Oil change, 10k check-up)</option>
                  <option value="Repair">Repair (Suspension, Engine, Electrical issue)</option>
                  <option value="Inspection">Inspection (Pre-trip checks, insurance renewal checks)</option>
                  <option value="Tire / Wheel Alignment">Tire / Wheel Alignment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Request Details / Symptoms</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Detail the engine lights, sound issues, or regular interval servicing requirements..."
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
                  {isSubmitting ? "hourglass_empty" : "build"}
                </span>
                {isSubmitting ? "Filing..." : "File Request"}
              </button>
            </form>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Maintenance Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Req ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Vehicle</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Service Details</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Workshop</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {requests.map((r, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{r.id}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{r.vehicle}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-on-surface text-body-md">{r.type}</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">{r.date}</td>
                      <td className="px-6 py-4">
                        <span className={
                          r.status === "Completed"
                            ? "chip-success"
                            : r.status === "In Progress"
                            ? "chip-info"
                            : "chip-warning"
                        }>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">{r.workshop}</td>
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
