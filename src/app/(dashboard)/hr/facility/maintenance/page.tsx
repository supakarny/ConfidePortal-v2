"use client"

import { useState } from "react"

export default function FacilityMaintenancePage() {
  const [category, setCategory] = useState("Electrical")
  const [priority, setPriority] = useState("Medium")
  const [description, setDescription] = useState("Light bulb flickering in meeting room 103")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [requests, setRequests] = useState([
    {
      id: "FMT-104",
      category: "HVAC / AC",
      priority: "High",
      desc: "AC leak dripping in Sales Department open workspace",
      date: "2026-06-11",
      status: "Assigned",
    },
    {
      id: "FMT-098",
      category: "Plumbing",
      priority: "Medium",
      desc: "Restroom sink faucet leaking",
      date: "2026-06-08",
      status: "Resolved",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setTimeout(() => {
      const newReq = {
        id: `FMT-${Math.floor(105 + Math.random() * 50)}`,
        category,
        priority,
        desc: description,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
      }

      setRequests([newReq, ...requests])
      setDescription("")
      setIsSubmitting(false)
      alert("Facility repair ticket submitted.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Facility</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Facility Maintenance Requests</h1>
        <p className="text-body-md text-secondary mt-1">
          File tickets for office building repairs, plumbing, air conditioning, and electrical issues.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Repair Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Submit Repair Ticket</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Electrical">Electrical (Lights, switches, power sockets)</option>
                  <option value="Plumbing">Plumbing (Leaking sink, toilets, water dispenser)</option>
                  <option value="HVAC / AC">HVAC / Air Conditioning</option>
                  <option value="Furniture / Carpentry">Furniture / Office Desk / Door Lock</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Priority</label>
                <div className="flex gap-2">
                  {["Low", "Medium", "High"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setPriority(lvl)}
                      className={`flex-1 py-2 rounded-lg font-semibold text-body-md border transition-all ${
                        priority === lvl
                          ? lvl === "High"
                            ? "bg-error-container text-on-error-container border-error"
                            : lvl === "Medium"
                            ? "bg-warning/10 text-warning-text border-warning"
                            : "bg-primary-container/10 text-primary border-primary"
                          : "bg-white text-secondary border-[#e2e8f0] hover:bg-surface-container-low"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the issue, location, room number, or seat number..."
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
                  {isSubmitting ? "hourglass_empty" : "handyman"}
                </span>
                {isSubmitting ? "Submitting..." : "File Ticket"}
              </button>
            </form>
          </div>
        </div>

        {/* Tickets History */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Facility Tickets Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Ticket ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Category</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Description</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Priority</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {requests.map((r, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{r.id}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{r.category}</td>
                      <td className="px-6 py-4 text-body-md text-secondary max-w-xs truncate" title={r.desc}>
                        {r.desc}
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{r.date}</td>
                      <td className="px-6 py-4">
                        <span className={
                          r.priority === "High"
                            ? "chip-error"
                            : r.priority === "Medium"
                            ? "chip-warning"
                            : "chip-neutral"
                        }>
                          {r.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={
                          r.status === "Resolved"
                            ? "chip-success"
                            : r.status === "Assigned"
                            ? "chip-info"
                            : "chip-warning"
                        }>
                          {r.status}
                        </span>
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
