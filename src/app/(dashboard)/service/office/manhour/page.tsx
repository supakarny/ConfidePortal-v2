"use client"

import { useState } from "react"

export default function ManhourTrackingPage() {
  const [project, setProject] = useState("Mega Corp Core Setup")
  const [hours, setHours] = useState("")
  const [description, setDescription] = useState("API sync check and server performance profiling")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [logs, setLogs] = useState([
    { id: "MHR-084", project: "Mega Corp Core Setup", hours: 4.5, date: "2026-06-11", desc: "Setting up test tables and debugging OAuth flow" },
    { id: "MHR-082", project: "CyberTech CRM SLA", hours: 2.0, date: "2026-06-08", desc: "Configuring VPN access points for remote developers" },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!hours || !description) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newLog = {
        id: `MHR-0${Math.floor(85 + Math.random() * 10)}`,
        project,
        hours: parseFloat(hours),
        date: new Date().toISOString().split("T")[0],
        desc: description,
      }

      setLogs([newLog, ...logs])
      setHours("")
      setDescription("")
      setIsSubmitting(false)
      alert("Manhours logged successfully.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Service • Office Sector</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Manhour Tracking</h1>
        <p className="text-body-md text-secondary mt-1">
          Submit and audit working hours spent on client integration accounts and projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Log Manhours</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Project Allocation</label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Mega Corp Core Setup">Mega Corp Core Setup</option>
                  <option value="CyberTech CRM SLA">CyberTech CRM SLA</option>
                  <option value="IT Infrastructure maintenance">IT Infrastructure maintenance</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Logged Hours</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 4.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Tasks Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  {isSubmitting ? "hourglass_empty" : "send"}
                </span>
                {isSubmitting ? "Submitting..." : "Submit Hours"}
              </button>
            </form>
          </div>
        </div>

        {/* List Logs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Manhour Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Log ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Project / Details</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {logs.map((log, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{log.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-on-surface text-body-md">{log.project}</div>
                        <div className="text-[11px] text-secondary leading-normal mt-0.5">{log.desc}</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{log.date}</td>
                      <td className="px-6 py-4 text-right text-body-md text-primary font-bold font-mono-data">
                        {log.hours} hrs
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
