"use client"

import { useState } from "react"

export default function FacilityAssetsPage() {
  const [search, setSearch] = useState("")
  const [assets, setAssets] = useState([
    { code: "AST-MON-081", name: "Dell UltraSharp 27\" Monitor", category: "IT Hardware", serial: "CN-08X922-1241", status: "In Use", user: "Kitti P. (Product)" },
    { code: "AST-LAP-049", name: "MacBook Pro 16\" M3 Max", category: "IT Hardware", serial: "C02F249X904D", status: "In Use", user: "Supakarn S. (Product)" },
    { code: "AST-CHR-112", name: "Ergonomic Office Chair (Steelcase)", category: "Office Furniture", serial: "SC-9041-8842", status: "In Storage", user: "-" },
    { code: "AST-KBD-024", name: "Apple Magic Keyboard (TH/EN)", category: "IT Accessories", serial: "CC-11442299", status: "In Repair", user: "-" },
  ])

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.user.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Facility</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Assets Management</h1>
          <p className="text-body-md text-secondary mt-1">
            Inventory directory of corporate hardware, accessories, office furniture, and licenses.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add_box</span>
          Register Asset
        </button>
      </div>

      {/* Filter and Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-headline-md text-on-surface font-bold">Office Assets Registry</h3>
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by asset code, name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Asset Code</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Asset Name</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Category</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Serial / Model</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Current User</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filteredAssets.map((a, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 text-mono-data text-on-surface font-bold">{a.code}</td>
                  <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{a.name}</td>
                  <td className="px-6 py-4 text-body-md text-secondary">{a.category}</td>
                  <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{a.serial}</td>
                  <td className="px-6 py-4 text-body-md text-on-surface font-medium">{a.user}</td>
                  <td className="px-6 py-4">
                    <span className={
                      a.status === "In Use"
                        ? "chip-success"
                        : a.status === "In Storage"
                        ? "chip-neutral"
                        : "chip-warning"
                    }>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary-container font-semibold text-body-md inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      Details
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
