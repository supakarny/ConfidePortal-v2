"use client"

import { useState } from "react"

export default function QuotationBuilderPage() {
  const [client, setClient] = useState("Mega Corp Ltd.")
  const [address, setAddress] = useState("45/2 Ratchada Rd, Bangkok")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Items State
  const [items, setItems] = useState([
    { desc: "Confide Enterprise Portal Setup (Core License)", qty: 1, price: 150000.0 },
    { desc: "Custom Module Development (Fleet & Sales integration)", qty: 1, price: 75000.0 },
    { desc: "Post-Deployment Premium Support (1 Year)", qty: 1, price: 30000.0 },
  ])

  const [descInput, setDescInput] = useState("")
  const [priceInput, setPriceInput] = useState("")

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!descInput || !priceInput) return

    setItems([
      ...items,
      { desc: descInput, qty: 1, price: parseFloat(priceInput) },
    ])
    setDescInput("")
    setPriceInput("")
  }

  const handleDeleteItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
  const vat = subtotal * 0.07
  const netTotal = subtotal + vat

  const handleCreateQuote = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Quotation generated successfully and saved to drafts.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales &amp; Marketing</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Quotation Builder</h1>
          <p className="text-body-md text-secondary mt-1">
            Build, edit, and export official project cost quotations for client prospects.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-on-surface border border-[#e2e8f0] px-4 py-2 rounded-lg font-bold text-body-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px]">drafts</span>
            Drafts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="data-card bg-white rounded-xl p-6 space-y-6">
            <h3 className="text-headline-md text-on-surface">Client Metadata</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Client Name</label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Billing Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="border-t border-[#e2e8f0] pt-6 space-y-4">
              <h3 className="text-headline-md text-on-surface">Line Items Builder</h3>

              {/* Add item inline form */}
              <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter item description..."
                  value={descInput}
                  onChange={(e) => setDescInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
                <input
                  type="number"
                  placeholder="Price (THB)"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full sm:w-40 px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add
                </button>
              </form>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                      <th className="text-label-sm text-secondary uppercase tracking-wider px-4 py-2">Description</th>
                      <th className="text-label-sm text-secondary uppercase tracking-wider px-4 py-2 text-right">Qty</th>
                      <th className="text-label-sm text-secondary uppercase tracking-wider px-4 py-2 text-right">Unit Price</th>
                      <th className="text-label-sm text-secondary uppercase tracking-wider px-4 py-2 text-right">Total (THB)</th>
                      <th className="text-label-sm text-secondary uppercase tracking-wider px-4 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0]">
                    {items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                        <td className="px-4 py-3">{item.desc}</td>
                        <td className="px-4 py-3 text-right font-mono-data">{item.qty}</td>
                        <td className="px-4 py-3 text-right font-mono-data">{item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="px-4 py-3 text-right font-mono-data font-bold">{(item.qty * item.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleDeleteItem(idx)}
                            className="text-error hover:text-error-container p-1 rounded"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="data-card bg-white rounded-xl p-5 flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="pb-3 border-b border-[#e2e8f0]">
                <span className="text-label-sm text-secondary uppercase tracking-widest font-bold">Invoice Summary Preview</span>
                <h4 className="text-body-md font-bold text-on-surface mt-1">QUOTATION DRAFT</h4>
              </div>

              {/* Metadata details */}
              <div className="my-4 space-y-1.5 text-body-md text-secondary">
                <div className="flex justify-between">
                  <span>Client:</span>
                  <span className="font-semibold text-on-surface">{client}</span>
                </div>
                <div className="flex justify-between">
                  <span>Address:</span>
                  <span className="font-semibold text-on-surface truncate max-w-[180px]" title={address}>{address}</span>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-[#e2e8f0] pt-4 space-y-2 font-mono-data text-body-md text-secondary">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-on-surface font-semibold">{subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} THB</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (7%):</span>
                  <span className="text-on-surface font-semibold">{vat.toLocaleString("en-US", { minimumFractionDigits: 2 })} THB</span>
                </div>
                <div className="flex justify-between text-body-lg font-bold text-on-surface border-t border-dashed border-[#e2e8f0] pt-2">
                  <span>Net Total:</span>
                  <span className="text-primary">{netTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} THB</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCreateQuote}
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isSubmitting ? "hourglass_empty" : "description"}
              </span>
              {isSubmitting ? "Generating..." : "Generate Quotation"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
