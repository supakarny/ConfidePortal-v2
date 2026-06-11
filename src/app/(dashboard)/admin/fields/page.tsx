"use client"

import { useState } from "react"

export default function FieldManagementPage() {
  const [fields] = useState([
    { code: "FLD-01", name: "Driving License Number", type: "String", model: "Employee Profile", required: "Optional" },
    { code: "FLD-02", name: "GPS Checkin Radius", type: "Integer (meters)", model: "Sales Location", required: "Required" },
    { code: "FLD-03", name: "SSO Contribution Rate", type: "Float (%)", model: "Payroll Report", required: "Required" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • Metadata</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Field Management</h1>
          <p className="text-body-md text-secondary mt-1">
            Configure global custom field inputs, required constraints, and data validation scopes.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Custom Field
        </button>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Metadata Custom Field Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Field Code</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Field Name</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Data Type</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Target Model</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Constraint</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {fields.map((field, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{field.code}</td>
                  <td className="px-6 py-4 font-sans font-bold text-on-surface">{field.name}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{field.type}</td>
                  <td className="px-6 py-4 font-sans text-on-surface">{field.model}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={field.required === "Required" ? "chip-error" : "chip-neutral"}>
                      {field.required}
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
