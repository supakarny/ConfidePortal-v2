"use client"

import { useState } from "react"

export default function SalesProjectTrackingPage() {
  const [deals, setDeals] = useState([
    { id: "DEAL-084", name: "Mega Corp Core Portal Integration", client: "Mega Corp Ltd.", value: "255,000.00", stage: "Negotiation", rep: "Somchai S." },
    { id: "DEAL-081", name: "CyberTech CRM Migration SLA", client: "CyberTech Solutions", value: "98,000.00", stage: "Closed Won", rep: "Kitti P." },
    { id: "DEAL-089", name: "Siam Logistics Mobile App Draft", client: "Siam Logistics Co.", value: "120,000.00", stage: "Proposal", rep: "Wichai O." },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales &amp; Marketing • Pipeline</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Project &amp; Deal Tracking</h1>
        <p className="text-body-md text-secondary mt-1">
          Monitor active sales deals, lead pipelines, deal ownership, and closing stages.
        </p>
      </div>

      {/* Main Table / Pipeline view */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Active Projects &amp; Deals</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Deal ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Project / Client</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Value (THB)</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Deal Owner</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Pipeline Stage</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {deals.map((deal, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{deal.id}</td>
                  <td className="px-6 py-4 font-sans">
                    <div className="font-bold text-on-surface text-body-md">{deal.name}</div>
                    <div className="text-[11px] text-secondary mt-0.5">{deal.client}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">{deal.value}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{deal.rep}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={
                      deal.stage === "Closed Won"
                        ? "chip-success"
                        : deal.stage === "Negotiation"
                        ? "chip-warning"
                        : "chip-info"
                    }>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-sans">
                    <button className="text-primary hover:text-primary-container font-semibold text-body-md inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      Update
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
