"use client"

import { useState } from "react"

export default function SalesPettyCashPage() {
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("Client coffee meeting at Starbucks Cyber Tower")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [claims, setClaims] = useState([
    {
      id: "SCLM-CSH-024",
      amount: "340.00",
      date: "2026-06-11",
      status: "Pending",
      desc: "Client coffee meeting at Starbucks Cyber Tower",
    },
    {
      id: "SCLM-CSH-021",
      amount: "150.00",
      date: "2026-06-03",
      status: "Approved",
      desc: "Express documents delivery postage to Mega Corp HQ",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newClaim = {
        id: `SCLM-CSH-0${Math.floor(25 + Math.random() * 10)}`,
        amount: parseFloat(amount).toFixed(2),
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
        desc: description,
      }

      setClaims([newClaim, ...claims])
      setAmount("")
      setDescription("")
      setIsSubmitting(false)
      alert("Petty cash claim logged successfully.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales &amp; Marketing • Claims</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Petty Cash Claims</h1>
        <p className="text-body-md text-secondary mt-1">
          File quick reimbursement claims for parking fares, client coffee pitches, or express courier shipping.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Request Petty Cash</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Claim Amount (THB)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 250.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Details</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Receipt Slip Upload</label>
                <div className="border border-dashed border-[#e2e8f0] rounded-lg p-4 bg-surface-container-low flex flex-col items-center justify-center cursor-pointer text-center hover:bg-surface-container-low/80 transition-colors">
                  <span className="material-symbols-outlined text-secondary text-[24px] mb-1">receipt</span>
                  <p className="text-label-sm font-semibold text-on-surface">Upload coffee receipt or parking ticket</p>
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
                {isSubmitting ? "Submitting..." : "Submit Petty Cash"}
              </button>
            </form>
          </div>
        </div>

        {/* History */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Petty Cash Logs</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Claim ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Details</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Amount (THB)</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {claims.map((c, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{c.id}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{c.desc}</td>
                      <td className="px-6 py-4 text-body-md text-secondary font-mono-data">{c.date}</td>
                      <td className="px-6 py-4 text-right text-body-md text-on-surface font-bold font-mono-data">
                        {c.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={c.status === "Approved" ? "chip-success" : "chip-warning"}>
                          {c.status}
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
