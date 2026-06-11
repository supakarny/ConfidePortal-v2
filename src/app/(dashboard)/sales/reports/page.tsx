"use client"

import { useState } from "react"

export default function SalesReportsPage() {
  const [pipeline] = useState([
    { stage: "Lead / Prospect", count: 18, value: "1,240,000.00", conversion: "34%" },
    { stage: "Proposal Sent", count: 8, value: "950,000.00", conversion: "52%" },
    { stage: "Contract Negotiation", count: 4, value: "680,000.00", conversion: "80%" },
    { stage: "Closed Won", count: 12, value: "2,450,000.00", conversion: "100%" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales &amp; Marketing • Performance</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Sales Reports</h1>
          <p className="text-body-md text-secondary mt-1">
            Overview of company sales pipelines, conversion matrices, and deals won.
          </p>
        </div>
        <button className="bg-white text-on-surface border border-[#e2e8f0] px-4 py-2 rounded-lg font-bold text-body-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Export Report (.CSV)
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Total Revenue (Q2)</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">2,450,000.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Deals Converted</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success-text font-bold">12</span>
            <span className="text-body-md text-secondary">deals won</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-warning">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Conversion Rate</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-warning-text font-bold">48.2%</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-info">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Total Pipeline Value</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-primary font-bold">2,870,000.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
      </div>

      {/* Pipeline Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Pipeline Stage Performance</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Pipeline Stage</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Active Deals</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Value (THB)</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Est. Conversion Probability</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Stage Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {pipeline.map((p, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 font-sans font-bold">{p.stage}</td>
                  <td className="px-6 py-4 text-on-surface font-semibold">{p.count}</td>
                  <td className="px-6 py-4 text-right font-bold text-on-surface">{p.value}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="chip-info">{p.conversion}</span>
                  </td>
                  <td className="px-6 py-4 font-sans">
                    <div className="w-24 bg-[#e2e8f0] h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: p.conversion }} />
                    </div>
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
