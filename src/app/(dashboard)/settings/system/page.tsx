"use client"

import { useState } from "react"

export default function SystemSettingsPage() {
  const [domain, setDomain] = useState("confide.co.th")
  const [smtp, setSmtp] = useState("smtp.googlemail.com")
  const [port, setPort] = useState("465")
  const [backup, setBackup] = useState("Daily at 02:00 AM")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("System variables updated globally.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Settings</p>
        <h1 className="text-headline-xl text-on-surface mt-1">System Settings</h1>
        <p className="text-body-md text-secondary mt-1">
          Configure global operational environments, SMTP nodes, authentication domains, and backup policies.
        </p>
      </div>

      <div className="data-card bg-white rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Global System Variables Configuration</h3>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Restricted Domain */}
            <div className="space-y-1.5">
              <label className="text-label-sm text-secondary uppercase tracking-wider">OAuth Domain Constraint</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                required
              />
              <p className="text-[11px] text-secondary mt-1">Strictly restricts Google logins to this domain</p>
            </div>

            {/* SMTP Host */}
            <div className="space-y-1.5">
              <label className="text-label-sm text-secondary uppercase tracking-wider">SMTP Server Host</label>
              <input
                type="text"
                value={smtp}
                onChange={(e) => setSmtp(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                required
              />
            </div>

            {/* SMTP Port */}
            <div className="space-y-1.5">
              <label className="text-label-sm text-secondary uppercase tracking-wider">SMTP Server Port</label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                required
              />
            </div>

            {/* Database Backup schedule */}
            <div className="space-y-1.5">
              <label className="text-label-sm text-secondary uppercase tracking-wider">Automated Backup Interval</label>
              <select
                value={backup}
                onChange={(e) => setBackup(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="Hourly">Hourly</option>
                <option value="Daily at 02:00 AM">Daily at 02:00 AM</option>
                <option value="Weekly on Sundays">Weekly on Sundays</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSaving ? "hourglass_empty" : "save"}
            </span>
            {isSaving ? "Saving..." : "Save System Config"}
          </button>
        </form>
      </div>
    </div>
  )
}
