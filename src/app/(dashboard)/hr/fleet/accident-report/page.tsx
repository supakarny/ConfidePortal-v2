"use client"

import { useState } from "react"

export default function FleetAccidentReportPage() {
  const [vehicle, setVehicle] = useState("Toyota Camry (ชง-5678)")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("Ratchadapisek Intersection, Bangkok")
  const [description, setDescription] = useState("A motorcycle clipped the left wing mirror while traffic was stopped.")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [reports, setReports] = useState([
    {
      id: "ACC-021",
      vehicle: "Honda City (รน-4321)",
      date: "2026-05-18",
      location: "Vibhavadi Rangsit Rd",
      desc: "Minor rear-end collision in slow traffic. No injuries. Insurance called.",
      status: "Insurance Logged",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newReport = {
        id: `ACC-0${Math.floor(22 + Math.random() * 20)}`,
        vehicle,
        date,
        location,
        desc: description,
        status: "Processing",
      }

      setReports([newReport, ...reports])
      setDate("")
      setIsSubmitting(false)
      alert("Accident report logged successfully. Fleet administrator notified.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Fleet</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Vehicle Accident Reporting</h1>
        <p className="text-body-md text-secondary mt-1">
          Submit insurance and incident damage logs for fleet vehicle accidents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Log Accident Report</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Vehicle Involved</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Toyota Camry (ชง-5678)">Toyota Camry (ชง-5678)</option>
                  <option value="Honda City (รน-4321)">Honda City (รน-4321)</option>
                  <option value="Toyota Hilux Revo (กข-1234)">Toyota Hilux Revo (กข-1234)</option>
                  <option value="Toyota Commuter (มค-9012)">Toyota Commuter (มค-9012)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Accident Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide brief outline of collision, third parties involved, insurance status..."
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Damage Photos (Dropzone)</label>
                <div className="border border-dashed border-[#e2e8f0] rounded-lg p-4 bg-surface-container-low flex flex-col items-center justify-center cursor-pointer text-center hover:bg-surface-container-low/80 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-[24px] mb-1">add_a_photo</span>
                  <p className="text-label-sm font-semibold text-on-surface">Upload collision / damage photos</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-error text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-error/90 transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? "hourglass_empty" : "report_gmailerrorred"}
                </span>
                {isSubmitting ? "Filing..." : "Submit Incident Report"}
              </button>
            </form>
          </div>
        </div>

        {/* History / Logs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Filed Accident Reports</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Report ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Vehicle</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date / Location</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Details</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {reports.map((r, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{r.id}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{r.vehicle}</td>
                      <td className="px-6 py-4 text-body-md text-secondary">
                        <div>{r.date}</div>
                        <div className="text-[10px] text-secondary mt-0.5">{r.location}</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary max-w-xs truncate" title={r.desc}>
                        {r.desc}
                      </td>
                      <td className="px-6 py-4">
                        <span className={r.status === "Insurance Logged" ? "chip-success" : "chip-warning"}>
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
