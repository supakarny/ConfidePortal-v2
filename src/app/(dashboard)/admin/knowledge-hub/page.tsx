"use client"

import { useState } from "react"

export default function KnowledgeHubManagementPage() {
  const [articles] = useState([
    { id: "KB-081", title: "Annual Leave & Holiday Policies", category: "HR & Company Policy", author: "Kanda P.", views: 124, status: "Published" },
    { id: "KB-049", title: "Setting up Company VPN & MFA", category: "IT & Cybersecurity", author: "Anan S.", views: 352, status: "Published" },
    { id: "KB-090", title: "Sales onboarding pitch guidelines", category: "Sales Playbooks", author: "Somchai S.", views: 18, status: "Draft" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console • Library</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Knowledge Hub Management</h1>
          <p className="text-body-md text-secondary mt-1">
            Publish, edit, and categorize library manuals, code guidelines, or HR handbooks.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Write Article
        </button>
      </div>

      {/* Main Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Library Articles Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">KB ID</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Article Title</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Category</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Author</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Views</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {articles.map((art, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 text-secondary">{art.id}</td>
                  <td className="px-6 py-4 font-sans font-bold text-on-surface">{art.title}</td>
                  <td className="px-6 py-4 font-sans text-secondary">{art.category}</td>
                  <td className="px-6 py-4 font-sans text-on-surface">{art.author}</td>
                  <td className="px-6 py-4 text-secondary">{art.views}</td>
                  <td className="px-6 py-4 font-sans">
                    <span className={art.status === "Published" ? "chip-success" : "chip-neutral"}>
                      {art.status}
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
