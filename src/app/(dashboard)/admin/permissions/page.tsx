"use client"

import { useState } from "react"

export default function ModulePermissionsPage() {
  const [matrix, setMatrix] = useState([
    { dept: "Management", tools: true, hr: true, finance: true, sales: true, admin: true },
    { dept: "Product / Dev", tools: true, hr: false, finance: false, sales: false, admin: false },
    { dept: "Human Resources", tools: true, hr: true, finance: false, sales: false, admin: false },
    { dept: "Finance & Acct", tools: true, hr: false, finance: true, sales: false, admin: false },
    { dept: "Sales & Marketing", tools: true, hr: false, finance: false, sales: true, admin: false },
  ])

  const handleToggle = (index: number, module: "tools" | "hr" | "finance" | "sales" | "admin") => {
    const nextMatrix = [...matrix]
    nextMatrix[index][module] = !nextMatrix[index][module]
    setMatrix(nextMatrix)
  }

  const handleSave = () => {
    alert("Permissions matrix updated in DB configuration.")
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • Security</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Module Permissions</h1>
          <p className="text-body-md text-secondary mt-1">
            Configure department-wide access controls and scope credentials.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">save</span>
          Save Access Matrix
        </button>
      </div>

      {/* Permissions Table Matrix */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Access Matrix Configuration</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Department</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-center">Tools</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-center">HR &amp; Fleet</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-center">Finance</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-center">Sales &amp; Mktg</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-center">Admin Console</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface font-semibold">
                  <td className="px-6 py-4 text-headline-md leading-tight text-on-surface">{row.dept}</td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={row.tools}
                      onChange={() => handleToggle(idx, "tools")}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={row.hr}
                      onChange={() => handleToggle(idx, "hr")}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={row.finance}
                      onChange={() => handleToggle(idx, "finance")}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={row.sales}
                      onChange={() => handleToggle(idx, "sales")}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={row.admin}
                      onChange={() => handleToggle(idx, "admin")}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
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
