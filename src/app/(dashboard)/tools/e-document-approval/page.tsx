"use client"

import { useState } from "react"

export default function EDocumentApprovalPage() {
  const [comments, setComments] = useState("")
  const [isApproved, setIsApproved] = useState<boolean | null>(null)
  const [commentHistory, setCommentHistory] = useState([
    {
      author: "Somchai S. (Manager)",
      avatar: "S",
      date: "2026-06-10 14:32",
      text: "Item specs checked. Budget is within quarterly department limits.",
    },
    {
      author: "Patsara K. (Procurement)",
      avatar: "P",
      date: "2026-06-11 09:15",
      text: "Vendor quotes matched. CyberTech offers best pricing with SLA agreement.",
    },
  ])

  const handleAction = (type: "approve" | "reject") => {
    if (type === "approve") {
      setIsApproved(true)
      alert("Document approved successfully. Sent to final finance disbursement.")
    } else {
      setIsApproved(false)
      alert("Document rejected. Notification sent to requester.")
    }

    if (comments.trim()) {
      setCommentHistory([
        ...commentHistory,
        {
          author: "Current User (You)",
          avatar: "U",
          date: new Date().toISOString().slice(0, 16).replace("T", " "),
          text: comments,
        },
      ])
      setComments("")
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Tools</p>
          <h1 className="text-headline-xl text-on-surface mt-1">E-Document Approval</h1>
          <p className="text-body-md text-secondary mt-1">
            Review detailed document contents and authorize routing flows.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-on-surface border border-[#e2e8f0] px-4 py-2 rounded-lg font-bold text-body-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px]">print</span>
            Print
          </button>
          <button className="bg-white text-on-surface border border-[#e2e8f0] px-4 py-2 rounded-lg font-bold text-body-md hover:bg-surface-container-low transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Viewer Column (Left) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden shadow-sm border border-[#e2e8f0] flex flex-col min-h-[700px]">
            {/* Viewer Header */}
            <div className="bg-surface-container-low px-6 py-4 border-b border-[#e2e8f0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error">picture_as_pdf</span>
                <span className="font-semibold text-body-lg text-on-surface">PO-2026-0421_CyberTech_ServerRent.pdf</span>
              </div>
              <div className="text-label-sm text-secondary">Page 1 of 1</div>
            </div>

            {/* Document Body (Simulated Page) */}
            <div className="p-8 md:p-12 flex-1 bg-white select-none">
              {/* Confide Logo Header */}
              <div className="flex justify-between border-b-2 border-primary pb-6">
                <div>
                  <h2 className="text-headline-md font-extrabold text-primary">CONFIDE TECHNOLOGY</h2>
                  <p className="text-label-sm text-secondary uppercase mt-0.5">Confide Technology Co., Ltd.</p>
                  <p className="text-body-md text-secondary mt-2">
                    123/45 Cyber Tower, 18th Floor<br />
                    Ratchadaphisek Rd, Din Daeng, Bangkok 10400
                  </p>
                </div>
                <div className="text-right">
                  <h3 className="text-headline-xl text-secondary font-light">PURCHASE ORDER</h3>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-4 text-left">
                    <span className="text-label-sm text-secondary uppercase">PO Number:</span>
                    <span className="text-body-md font-bold text-on-surface">PO-2026-0421</span>
                    <span className="text-label-sm text-secondary uppercase">PO Date:</span>
                    <span className="text-body-md text-on-surface">11 Jun 2026</span>
                    <span className="text-label-sm text-secondary uppercase">Payment Terms:</span>
                    <span className="text-body-md text-on-surface">Net 30 Days</span>
                  </div>
                </div>
              </div>

              {/* Vendor & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                <div>
                  <p className="text-label-sm text-secondary uppercase font-bold border-b border-[#e2e8f0] pb-1">Vendor</p>
                  <p className="text-body-md font-semibold text-on-surface mt-2">CyberTech Solutions Co., Ltd.</p>
                  <p className="text-body-md text-secondary mt-1">
                    99/1 Modern Cloud Park, Building B<br />
                    Phayathai Road, Ratchathewi, Bangkok 10400<br />
                    Tax ID: 0105560012345
                  </p>
                </div>
                <div>
                  <p className="text-label-sm text-secondary uppercase font-bold border-b border-[#e2e8f0] pb-1">Deliver To</p>
                  <p className="text-body-md font-semibold text-on-surface mt-2">IT Department (Server Room)</p>
                  <p className="text-body-md text-secondary mt-1">
                    Confide Technology (Head Office)<br />
                    Attention: Somchai S. (Manager)<br />
                    Phone: +66 2 123 4567
                  </p>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-left my-8 border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#e2e8f0] text-label-sm text-secondary uppercase">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-right">Qty</th>
                    <th className="py-2 text-right">Unit Price (THB)</th>
                    <th className="py-2 text-right">Total Amount (THB)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  <tr className="text-body-md text-on-surface">
                    <td className="py-3">
                      <div className="font-semibold">Enterprise Cloud Server Rental - Premium Node</div>
                      <div className="text-label-sm text-secondary">Billing Period: July 2026 - Dec 2026 (6 Months)</div>
                    </td>
                    <td className="py-3 text-right">6.0</td>
                    <td className="py-3 text-right">15,000.00</td>
                    <td className="py-3 text-right">90,000.00</td>
                  </tr>
                  <tr className="text-body-md text-on-surface">
                    <td className="py-3">
                      <div className="font-semibold">Dedicated IP Block (/29 subnet)</div>
                      <div className="text-label-sm text-secondary">SSL Cert &amp; DNS support included</div>
                    </td>
                    <td className="py-3 text-right">1.0</td>
                    <td className="py-3 text-right">4,500.00</td>
                    <td className="py-3 text-right">4,500.00</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals Section */}
              <div className="flex justify-end my-6">
                <div className="w-full md:w-64 space-y-1.5 border-t border-[#e2e8f0] pt-4">
                  <div className="flex justify-between text-body-md text-secondary">
                    <span>Subtotal:</span>
                    <span>94,500.00 THB</span>
                  </div>
                  <div className="flex justify-between text-body-md text-secondary">
                    <span>VAT (7%):</span>
                    <span>6,615.00 THB</span>
                  </div>
                  <div className="flex justify-between text-body-lg font-bold text-on-surface border-t border-dashed border-[#e2e8f0] pt-1.5">
                    <span>Total Net:</span>
                    <span>101,115.00 THB</span>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-8 border-t border-[#e2e8f0] pt-4">
                <p className="text-label-sm text-secondary uppercase font-bold">Terms &amp; Instructions</p>
                <p className="text-label-sm text-secondary mt-1 leading-normal">
                  1. Please send invoice to acct@confide.co.th referring to this PO number.<br />
                  2. All deliveries must match specifications listed in the SLA agreement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info & Action Column (Right) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Action Card */}
          <div className="data-card bg-white rounded-xl p-5 space-y-4">
            <h3 className="text-headline-md text-on-surface">Approval Decision</h3>
            <p className="text-body-md text-secondary">Review comments, input your notes, and log your response.</p>

            {isApproved === null ? (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Review Comments</label>
                  <textarea
                    rows={3}
                    placeholder="Enter approval note or rejection reason..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleAction("approve")}
                    className="w-full bg-success text-white hover:bg-success/90 rounded-lg font-bold text-body-md flex items-center justify-center gap-2 py-2.5 h-auto"
                  >
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Approve Document
                  </button>
                  <button
                    onClick={() => handleAction("reject")}
                    className="w-full bg-white text-error border border-error hover:bg-error-container/20 rounded-lg font-bold text-body-md flex items-center justify-center gap-2 py-2.5 h-auto transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                    Reject &amp; Send Back
                  </button>
                </div>
              </div>
            ) : (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${isApproved ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                <span className="material-symbols-outlined text-[28px]">
                  {isApproved ? "check_circle" : "cancel"}
                </span>
                <div>
                  <h4 className="font-bold text-body-md">{isApproved ? "Approved" : "Rejected"}</h4>
                  <p className="text-label-sm mt-0.5">Your decision has been logged.</p>
                </div>
              </div>
            )}
          </div>

          {/* Routing Path */}
          <div className="data-card bg-white rounded-xl p-5 space-y-4">
            <h3 className="text-headline-md text-on-surface">Approval Workflow</h3>
            <p className="text-label-sm text-secondary uppercase tracking-wider">Workflow: Purchase Order Node</p>

            <div className="relative pl-6 border-l border-[#e2e8f0] space-y-5 ml-2">
              {/* Step 1 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 bg-success text-white rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold">
                  ✓
                </span>
                <div>
                  <h4 className="text-body-md font-bold text-on-surface">Step 1: Department Manager</h4>
                  <p className="text-label-sm text-secondary">Somchai S. • Approved</p>
                  <p className="text-label-sm text-secondary italic mt-0.5">"Specs and budget verified."</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <span className="absolute -left-[31px] top-0.5 bg-success text-white rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold">
                  ✓
                </span>
                <div>
                  <h4 className="text-body-md font-bold text-on-surface">Step 2: Procurement Check</h4>
                  <p className="text-label-sm text-secondary">Patsara K. • Approved</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <span className={`absolute -left-[31px] top-0.5 rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold ${
                  isApproved === null
                    ? "bg-primary text-white animate-pulse"
                    : isApproved
                    ? "bg-success text-white"
                    : "bg-error text-white"
                }`}>
                  {isApproved === null ? "3" : isApproved ? "✓" : "✗"}
                </span>
                <div>
                  <h4 className="text-body-md font-bold text-on-surface">Step 3: Director Sign-off</h4>
                  <p className="text-label-sm text-secondary">
                    {isApproved === null ? "Awaiting your decision" : isApproved ? "You Approved" : "You Rejected"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Feed */}
          <div className="data-card bg-white rounded-xl p-5 space-y-4">
            <h3 className="text-headline-md text-on-surface">Activity &amp; Comments</h3>

            <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {commentHistory.map((c, i) => (
                <div key={i} className="flex gap-3 text-body-md">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-label-sm shrink-0">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-semibold text-on-surface">{c.author}</span>
                      <span className="text-label-sm text-secondary">{c.date}</span>
                    </div>
                    <p className="text-secondary mt-1 leading-relaxed text-body-md">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
