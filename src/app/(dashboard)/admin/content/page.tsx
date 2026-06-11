"use client"

import { useState } from "react"

export default function ContentManagementPage() {
  const [items] = useState([
    { id: "CMS-01", section: "Home Banner", title: "Confide Annual Townhall Meeting 2026", type: "Carousel Banner", status: "Active" },
    { id: "CMS-02", section: "Home Banner", title: "New Health Insurance OPD wellness adjustments", type: "Carousel Banner", status: "Active" },
    { id: "CMS-03", section: "News Feed", title: "Scheduled Database cluster migration Friday 22:00", type: "Announcement Link", status: "Inactive" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • CMS</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Content Management</h1>
          <p className="text-body-md text-secondary mt-1">
            Dispatch, disable, or adjust portal carousel banners, notice links, and homepage content.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Content
        </button>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Homepage Content Layouts</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Content ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Section Scope</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Title / Value</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Content Format</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {items.map((item, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{item.id}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{item.section}</td>
                  <td className="px-6 py-4 font-sans font-bold text-on-surface">{item.title}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{item.type}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={item.status === "Active" ? "chip-success" : "chip-neutral"}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-sans">
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
