"use client"

import { useState } from "react"

export default function TravelExpensePage() {
  const [destination, setDestination] = useState("Rayong Industrial Estate")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("Gasoline refueling & highway toll fares for client site visit")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [claims, setClaims] = useState([
    {
      id: "TRV-9842",
      destination: "Rayong Industrial Estate",
      amount: "1,250.00",
      date: "2026-06-11",
      status: "Pending",
      desc: "Gasoline refueling & highway toll fares for client site visit",
    },
    {
      id: "TRV-9790",
      destination: "Chiang Mai Branch",
      amount: "6,800.00",
      date: "2026-05-24",
      status: "Approved",
      desc: "Air ticket booking & hotel stay (2 nights) for technical training audit",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !destination) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newClaim = {
        id: `TRV-98${Math.floor(43 + Math.random() * 20)}`,
        destination,
        amount: parseFloat(amount).toFixed(2),
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
        desc: description,
      }

      setClaims([newClaim, ...claims])
      setAmount("")
      setDescription("")
      setIsSubmitting(false)
      alert("Travel reimbursement claim logged.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Finance • Reimbursements</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Travel Expense Claims</h1>
        <p className="text-body-md text-secondary mt-1">
          Submit and log transportation, airfare, hotel accommodations, and allowance expenses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Submit Travel Claim</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Rayong Office, Chiang Mai Branch"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Reimbursement Amount (THB)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 1200.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Expense Details</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the highway tolls, fuel bills, flights, hotel stays, etc..."
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Receipt Invoice Upload</label>
                <div className="border border-dashed border-[#e2e8f0] rounded-lg p-4 bg-surface-container-low flex flex-col items-center justify-center cursor-pointer text-center hover:bg-surface-container-low/80 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-[24px] mb-1">receipt_long</span>
                  <p className="text-label-sm font-semibold text-on-surface">Upload travel invoices / slips</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? "hourglass_empty" : "send"}
                </span>
                {isSubmitting ? "Submitting..." : "Submit Travel Claim"}
              </button>
            </form>
          </div>
        </div>

        {/* List Logs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Travel Claims Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Claim ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Destination / Details</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Amount (THB)</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {claims.map((claim, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{claim.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-on-surface text-body-md">{claim.destination}</div>
                        <div className="text-[11px] text-secondary leading-normal mt-0.5">{claim.desc}</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{claim.date}</td>
                      <td className="px-6 py-4 text-right text-body-md text-on-surface font-bold font-mono-data">
                        {claim.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={claim.status === "Approved" ? "chip-success" : "chip-warning"}>
                          {claim.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
