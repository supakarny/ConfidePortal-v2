"use client"

import { useState } from "react"

export default function AdminRolesPage() {
  const [adminRoles] = useState([
    { name: "Super Administrator", scope: "Full system config access", count: 2, users: "Supakarn S., Pornchai S." },
    { name: "HR Administrator", scope: "Leaves, calendar, fleet, directory scope", count: 1, users: "Kanda P." },
    { name: "Finance Auditor", scope: "SSO parameters, claims approval, payroll ledger access", count: 1, users: "Pornpen M." },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • Security</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Admin Roles</h1>
          <p className="text-body-md text-secondary mt-1">
            Manage administrative privilege tags and configure audit scopes.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Admin Role
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminRoles.map((role, i) => (
          <div key={i} className="data-card bg-white rounded-xl p-6 flex flex-col justify-between border border-[#e2e8f0]">
            <div>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary-container/10 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[24px]">shield_person</span>
                </div>
                <div>
                  <h3 className="text-headline-md text-on-surface font-bold leading-tight">{role.name}</h3>
                  <p className="text-label-sm text-secondary mt-1">{role.count} admin accounts assigned</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#e2e8f0] pt-4">
                <div className="text-body-md text-secondary">
                  <span className="font-bold text-on-surface">Privilege Scope:</span> {role.scope}
                </div>
                <div className="text-body-md text-secondary">
                  <span className="font-bold text-on-surface">Assigned Accounts:</span> {role.users}
                </div>
              </div>
            </div>

            <button className="bg-surface-container-low text-on-surface font-semibold text-body-md py-2 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 mt-6 border border-[#e2e8f0]">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Modify Privileges
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
