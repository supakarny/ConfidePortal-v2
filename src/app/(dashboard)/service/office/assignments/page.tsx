"use client"

import { useState } from "react"

export default function ServiceAssignmentsPage() {
  const [assignments] = useState([
    { id: "ASG-091", task: "Database latency diagnostics", client: "Mega Corp", tech: "Anan S.", status: "Assigned" },
    { id: "ASG-084", task: "Configuring VPN Multi-Factor Authentication", client: "CyberTech Solutions", tech: "Wichai O.", status: "Completed" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Service • Office Sector</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Service Assignments</h1>
        <p className="text-body-md text-secondary mt-1">
          Assign engineering resources to active client support requests.
        </p>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Engineering Dispatch Assignment Board</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Assignment ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Client</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Service Task Details</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Assigned Engineer</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {assignments.map((asg, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{asg.id}</td>
                  <td className="px-6 py-4 font-sans font-bold">{asg.client}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{asg.task}</td>
                  <td className="px-6 py-4 font-sans text-on-surface">{asg.tech}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={asg.status === "Completed" ? "chip-success" : "chip-warning"}>
                      {asg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-sans">
                    <button className="text-primary hover:text-primary-container font-semibold text-body-md inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      Reassign
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
