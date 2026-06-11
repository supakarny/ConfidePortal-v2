"use client"

import { useState } from "react"

export default function WorkOrderPage() {
  const [orders, setOrders] = useState([
    { id: "WO-2026-004", client: "Mega Corp Ltd.", task: "Prepare staging server with Demo DB", date: "2026-06-11", priority: "High", status: "Assigned" },
    { id: "WO-2026-003", client: "CyberTech Solutions", task: "Verify firewall configuration parameters", date: "2026-06-08", priority: "Medium", status: "Completed" },
    { id: "WO-2026-005", client: "Siam Logistics Co.", task: "API integration connectivity checks", date: "2026-06-12", priority: "Low", status: "Queued" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales Support</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Work Orders</h1>
          <p className="text-body-md text-secondary mt-1">
            Dispatch and monitor technical support tasks requested by sales teams.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Work Order
        </button>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Active Support Work Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Order ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Client / Prospect</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Technical Task Details</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date Requested</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Priority</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{order.id}</td>
                  <td className="px-6 py-4 font-sans font-bold">{order.client}</td>
                  <td className="px-6 py-4 font-sans text-on-surface">{order.task}</td>
                  <td className="px-6 py-4 text-secondary">{order.date}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={
                      order.priority === "High"
                        ? "chip-error"
                        : order.priority === "Medium"
                        ? "chip-warning"
                        : "chip-neutral"
                    }>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-sans">
                    <span className={
                      order.status === "Completed"
                        ? "chip-success"
                        : order.status === "Assigned"
                        ? "chip-info"
                        : "chip-warning"
                    }>
                      {order.status}
                    </span>
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
