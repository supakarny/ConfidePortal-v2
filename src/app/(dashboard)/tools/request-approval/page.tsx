"use client"

import { useState } from "react"

export default function RequestApprovalPage() {
  const [title, setTitle] = useState("")
  const [flowType, setFlowType] = useState("pr")
  const [urgency, setUrgency] = useState("Medium")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock Request History
  const [requests, setRequests] = useState([
    {
      id: "REQ-9941",
      title: "MacBook Pro M3 for Design Team",
      type: "Purchase Request",
      date: "2026-06-11",
      status: "Pending",
      step: "Department Head Approval",
      urgency: "High",
    },
    {
      id: "REQ-9938",
      title: "Travel Budget for Tech Conf Bangkok",
      type: "Travel & Expense",
      date: "2026-06-09",
      status: "Approved",
      step: "Completed",
      urgency: "Medium",
    },
    {
      id: "REQ-9932",
      title: "New Office Chair Request",
      type: "Asset Request",
      date: "2026-06-05",
      status: "Rejected",
      step: "Admin Review",
      urgency: "Low",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      const typeLabel =
        flowType === "pr"
          ? "Purchase Request"
          : flowType === "travel"
          ? "Travel & Expense"
          : flowType === "leave"
          ? "Leave Request"
          : "General Approval"

      const newReq = {
        id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
        title,
        type: typeLabel,
        date: new Date().toISOString().split("T")[0],
        status: "Pending",
        step: "Direct Manager Review",
        urgency,
      }

      setRequests([newReq, ...requests])
      setTitle("")
      setDescription("")
      setIsSubmitting(false)
      alert("Approval request submitted successfully!")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Tools</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Request Approval</h1>
        <p className="text-body-md text-secondary mt-1">
          Initiate new requests and track their progress through approval workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">New Request Form</h3>
              <p className="text-body-md text-secondary mt-1">Fill out the details to submit for routing.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Request Type */}
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Approval Workflow</label>
                  <select
                    value={flowType}
                    onChange={(e) => setFlowType(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="pr">Purchase Request (PR &gt; 5,000 THB)</option>
                    <option value="travel">Travel Expense &amp; Allowance</option>
                    <option value="leave">Leave &amp; Day-Off Request</option>
                    <option value="asset">IT Asset Provisioning</option>
                    <option value="general">General Operational Document</option>
                  </select>
                </div>

                {/* Urgency */}
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Urgency Level</label>
                  <div className="flex gap-2">
                    {["Low", "Medium", "High"].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setUrgency(level)}
                        className={`flex-1 py-2 rounded-lg font-semibold text-body-md border transition-all ${
                          urgency === level
                            ? level === "High"
                              ? "bg-error-container text-on-error-container border-error"
                              : level === "Medium"
                              ? "bg-warning/10 text-warning-text border-warning"
                              : "bg-primary-container/10 text-primary border-primary"
                            : "bg-white text-secondary border-[#e2e8f0] hover:bg-surface-container-low"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Request Title</label>
                <input
                  type="text"
                  placeholder="e.g. Purchase of Figma Professional Seats for 3 designers"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Reason / Description</label>
                <textarea
                  rows={4}
                  placeholder="Provide detailed justification or item list here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Document upload dropzone mock */}
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Attachments</label>
                <div className="border border-dashed border-[#e2e8f0] rounded-lg p-6 flex flex-col items-center justify-center bg-surface-container-low cursor-pointer hover:bg-surface-container-low/80 transition-colors">
                  <span className="material-symbols-outlined text-[32px] text-secondary mb-2">cloud_upload</span>
                  <p className="text-body-md font-semibold text-on-surface">Click or drag files to upload</p>
                  <p className="text-label-sm text-secondary mt-1">PDF, PNG, JPG, or DOCX (Max 10MB)</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="reset"
                  onClick={() => {
                    setTitle("")
                    setDescription("")
                  }}
                  className="bg-white border border-[#e2e8f0] px-5 py-2.5 rounded-lg font-semibold text-body-md text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isSubmitting ? "hourglass_empty" : "send"}
                  </span>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* History Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Recent Submissions</h3>
              <p className="text-body-md text-secondary mt-1">Track the status of your sent requests.</p>
            </div>

            <div className="p-6 divide-y divide-[#e2e8f0] max-h-[580px] overflow-y-auto custom-scrollbar">
              {requests.map((req) => (
                <div key={req.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-mono-data text-secondary">{req.id}</span>
                      <h4 className="text-body-md font-bold text-on-surface mt-0.5">{req.title}</h4>
                      <p className="text-label-sm text-secondary mt-0.5">{req.type} • {req.date}</p>
                    </div>
                    <span
                      className={
                        req.status === "Approved"
                          ? "chip-success"
                          : req.status === "Rejected"
                          ? "chip-error"
                          : "chip-warning"
                      }
                    >
                      {req.status}
                    </span>
                  </div>

                  {req.status === "Pending" && (
                    <div className="bg-surface-container-low border border-[#e2e8f0] rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px] animate-spin">
                          sync
                        </span>
                        <div className="flex-1 text-label-sm text-secondary">
                          Current Step: <span className="font-semibold text-on-surface">{req.step}</span>
                        </div>
                      </div>
                      {/* Visual progress bar */}
                      <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "66%" }} />
                      </div>
                    </div>
                  )}

                  {req.status === "Approved" && (
                    <div className="text-label-sm text-success flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Approved &amp; finalized
                    </div>
                  )}

                  {req.status === "Rejected" && (
                    <div className="text-label-sm text-error flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      Rejected on {req.date} at step {req.step}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
