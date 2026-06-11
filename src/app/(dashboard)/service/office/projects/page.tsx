"use client"

import { useState } from "react"

export default function ServiceProjectsPage() {
  const [projects] = useState([
    { id: "PROJ-8941", name: "Confide Portal Core Setup", client: "Mega Corp", progress: 85, status: "Active" },
    { id: "PROJ-8920", name: "CyberTech CRM Integrator SLA", client: "CyberTech Solutions", progress: 40, status: "Active" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Service • Office Sector</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Service Projects</h1>
        <p className="text-body-md text-secondary mt-1">
          Monitor and track project progress, deliveries, and milestone checklists.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="data-card bg-white rounded-xl p-6 flex flex-col justify-between border border-[#e2e8f0]">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-mono-data text-secondary">{p.id}</span>
                  <h3 className="text-headline-md text-on-surface font-bold mt-1">{p.name}</h3>
                  <p className="text-label-sm text-secondary mt-0.5">{p.client}</p>
                </div>
                <span className="chip-success">{p.status}</span>
              </div>

              {/* Progress bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-body-md text-secondary font-mono-data">
                  <span>Project Progress:</span>
                  <span className="font-bold text-on-surface">{p.progress}%</span>
                </div>
                <div className="w-full bg-[#e2e8f0] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-4 border-t border-[#e2e8f0]">
              <button className="flex-1 bg-surface-container-low text-on-surface font-semibold text-body-md py-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[18px]">attachment</span>
                Documents
              </button>
              <button className="flex-1 bg-primary text-white font-bold text-body-md py-2 rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[18px]">list_alt</span>
                Reports
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
