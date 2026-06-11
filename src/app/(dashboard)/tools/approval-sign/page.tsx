"use client"

import { useState } from "react"

export default function ApprovalSignPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null)
  const [isSigning, setIsSigning] = useState(false)
  const [signatureText, setSignatureText] = useState("")
  const [drawMode, setDrawMode] = useState(false)

  // Mock Data
  const pendingDocs = [
    {
      id: "DOC-2026-004",
      title: "Employment Agreement - Somsak Dev",
      type: "Contract",
      initiator: "HR Department (Kanda P.)",
      date: "2026-06-11",
      urgency: "High",
      pages: 12,
    },
    {
      id: "DOC-2026-009",
      title: "Vendor NDA - CyberTech Solutions",
      type: "NDA / Legal",
      initiator: "Procurement (Anan S.)",
      date: "2026-06-10",
      urgency: "Medium",
      pages: 5,
    },
    {
      id: "DOC-2026-012",
      title: "Project Scope Sign-off - Confide Portal v2",
      type: "Project Spec",
      initiator: "Product Owner (Supakarn S.)",
      date: "2026-06-08",
      urgency: "Medium",
      pages: 28,
    },
  ]

  const completedDocs = [
    {
      id: "DOC-2026-001",
      title: "Office Lease Extension 2026",
      type: "Lease",
      initiator: "Admin Team",
      signedDate: "2026-06-05",
      status: "Signed",
    },
    {
      id: "DOC-2026-002",
      title: "Q2 Marketing Budget Proposal",
      type: "Financial",
      initiator: "Marketing (Pornpen M.)",
      signedDate: "2026-06-03",
      status: "Signed",
    },
  ]

  const filteredPending = pendingDocs.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSign = (doc: any) => {
    setSelectedDoc(doc)
    setIsSigning(true)
    setSignatureText("")
  }

  const confirmSign = () => {
    // Simulated sign operation
    alert(`Successfully signed "${selectedDoc?.title}" with digital signature!`)
    setIsSigning(false)
    setSelectedDoc(null)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Tools</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Approval & Sign</h1>
          <p className="text-body-md text-secondary mt-1">
            Digitally sign and approve legal, corporate, and operational documents.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">upload_file</span>
            Upload Document
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider">Awaiting Signature</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">3</span>
            <span className="text-body-md text-secondary">documents pending</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider">Signed This Month</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">14</span>
            <span className="text-body-md text-secondary">documents completed</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-info">
          <p className="text-label-sm text-secondary uppercase tracking-wider">Average Turnaround</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">1.2</span>
            <span className="text-body-md text-secondary">days response time</span>
          </div>
        </div>
      </div>

      {/* Filter and Tab Section */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center px-6 py-4 border-b border-[#e2e8f0] gap-4">
          <div className="flex border-b sm:border-b-0 border-[#e2e8f0] sm:gap-2">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2.5 font-bold text-body-md border-b-2 transition-colors ${
                activeTab === "pending"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-on-surface"
              }`}
            >
              Pending Signature ({pendingDocs.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2.5 font-bold text-body-md border-b-2 transition-colors ${
                activeTab === "completed"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-on-surface"
              }`}
            >
              Signed History
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Document List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Document ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Document Title</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Type</th>
                {activeTab === "pending" ? (
                  <>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Initiated By</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Received Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Urgency</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
                  </>
                ) : (
                  <>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Initiated By</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Signed Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === "pending" ? (
                filteredPending.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-secondary text-body-md">
                      No pending documents to sign.
                    </td>
                  </tr>
                ) : (
                  filteredPending.map((doc) => (
                    <tr key={doc.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-on-surface">{doc.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-on-surface">{doc.title}</div>
                        <div className="text-label-sm text-secondary mt-0.5">{doc.pages} pages</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">{doc.type}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface">{doc.initiator}</td>
                      <td className="px-6 py-4 text-body-md text-secondary">{doc.date}</td>
                      <td className="px-6 py-4">
                        <span className={doc.urgency === "High" ? "chip-error" : "chip-warning"}>
                          {doc.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleSign(doc)}
                            className="bg-primary text-white px-3 py-1.5 rounded-lg text-body-md font-semibold hover:bg-primary-container transition-colors flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            Sign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                completedDocs.map((doc) => (
                  <tr key={doc.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 text-mono-data text-on-surface">{doc.id}</td>
                    <td className="px-6 py-4 font-semibold text-on-surface">{doc.title}</td>
                    <td className="px-6 py-4 text-body-md text-secondary">{doc.type}</td>
                    <td className="px-6 py-4 text-body-md text-on-surface">{doc.initiator}</td>
                    <td className="px-6 py-4 text-body-md text-secondary">{doc.signedDate}</td>
                    <td className="px-6 py-4">
                      <span className="chip-success">
                        <span className="material-symbols-outlined text-[12px]">check</span>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-primary-container font-semibold text-body-md flex items-center gap-1.5 ml-auto">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signature Modal */}
      {isSigning && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl elevated-card max-w-lg w-full overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center">
              <div>
                <h3 className="text-headline-md text-on-surface">Sign Document</h3>
                <p className="text-body-md text-secondary mt-0.5">{selectedDoc.title}</p>
              </div>
              <button
                onClick={() => setIsSigning(false)}
                className="text-secondary hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 flex-1">
              {/* PDF Preview box */}
              <div className="bg-surface-container-low border border-[#e2e8f0] rounded-lg p-4 h-32 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-label-sm text-secondary uppercase tracking-widest">Metadata</span>
                    <h4 className="text-body-md font-semibold text-on-surface mt-1">{selectedDoc.id}</h4>
                  </div>
                  <span className="chip-neutral">128-bit Encryption</span>
                </div>
                <div className="text-body-md text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Digitally encrypted by Confide Secure-Sign
                </div>
              </div>

              {/* Signature method tabs */}
              <div className="border border-[#e2e8f0] rounded-lg overflow-hidden">
                <div className="flex border-b border-[#e2e8f0] bg-surface-container-low">
                  <button
                    onClick={() => setDrawMode(false)}
                    className={`flex-1 py-2 font-bold text-body-md text-center transition-colors ${
                      !drawMode ? "bg-white border-b-2 border-primary text-primary" : "text-secondary"
                    }`}
                  >
                    Type Signature
                  </button>
                  <button
                    onClick={() => setDrawMode(true)}
                    className={`flex-1 py-2 font-bold text-body-md text-center transition-colors ${
                      drawMode ? "bg-white border-b-2 border-primary text-primary" : "text-secondary"
                    }`}
                  >
                    Draw Signature
                  </button>
                </div>

                <div className="p-4 bg-white h-28 flex items-center justify-center">
                  {!drawMode ? (
                    <input
                      type="text"
                      placeholder="Type your full name to generate sign"
                      value={signatureText}
                      onChange={(e) => setSignatureText(e.target.value)}
                      className="w-full border-b-2 border-dashed border-[#e2e8f0] focus:border-primary py-2 text-center text-headline-md font-serif italic text-primary outline-none"
                    />
                  ) : (
                    <div className="w-full h-full border border-dashed border-[#e2e8f0] rounded flex items-center justify-center bg-surface-container-low text-secondary text-body-md cursor-crosshair">
                      <span className="material-symbols-outlined text-[20px] mr-2">draw</span>
                      Draw your signature here
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <input type="checkbox" id="terms" className="mt-1" defaultChecked />
                <label htmlFor="terms" className="text-label-sm text-secondary leading-normal">
                  I agree that this is a legally binding digital signature and I consent to the electronic record terms of Confide Technology Co., Ltd.
                </label>
              </div>
            </div>

            <div className="px-6 py-4 bg-surface-container-low border-t border-[#e2e8f0] flex justify-end gap-3">
              <button
                onClick={() => setIsSigning(false)}
                className="bg-white border border-[#e2e8f0] px-4 py-2 rounded-lg font-semibold text-body-md text-on-surface hover:bg-surface-container-low transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSign}
                className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Sign and Finalize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
