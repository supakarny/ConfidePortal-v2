"use client"

import { useState } from "react"

export default function KnowledgeHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [
    {
      id: "hr",
      title: "HR & Company Policies",
      icon: "policy",
      desc: "Employee handbook, leave policies, onboarding guidelines, and office rules.",
      count: 24,
      articles: [
        "Annual Leave & Holiday Policies",
        "Employee Welfare & Medical Claims",
        "Work from Home Guidelines 2026",
      ]
    },
    {
      id: "it",
      title: "IT & Cybersecurity",
      icon: "security",
      desc: "VPN setup, password policies, software provisioning, and security guidelines.",
      count: 15,
      articles: [
        "Setting up Company VPN & MFA",
        "IT Security Checklist for Remote Work",
        "Requesting New Software Licenses",
      ]
    },
    {
      id: "tech",
      title: "Product & Technical Specs",
      icon: "code",
      desc: "Development environment setup, code style guides, and product design tokens.",
      count: 42,
      articles: [
        "Confide Portal Architecture Overview",
        "Stitch Design System Tokens Guide",
        "Database Deployment & Migrations",
      ]
    },
    {
      id: "sales",
      title: "Sales & Client Playbooks",
      icon: "trending_up",
      desc: "Client proposal templates, sales scripts, commission structures, and pricing calculators.",
      count: 18,
      articles: [
        "Standard Quotation Templates",
        "Handling Customer Objections Playbook",
        "Q3 Product Pricing Tiers",
      ]
    },
  ]

  const trendingArticles = [
    { title: "How to claim travel allowances?", category: "HR & Finance", views: 420 },
    { title: "Configuring multi-factor authentication (MFA)", category: "IT Security", views: 352 },
    { title: "Confide Portal Design System specifications", category: "Technical Docs", views: 289 },
  ]

  const recentUpdates = [
    { title: "Remote Work Reimbursement Update", author: "Kanda P. (HR)", date: "2 hours ago" },
    { title: "Database cluster scaling strategy", author: "Anan S. (IT)", date: "Yesterday" },
    { title: "Mega Corp presentation slides", author: "Somsak D. (Sales)", date: "3 days ago" },
  ]

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.articles.some((art) => art.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory ? cat.id === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-primary text-white p-8 rounded-2xl technical-grid">
        <div className="relative z-10 max-w-2xl">
          <p className="text-label-sm text-primary-fixed uppercase tracking-widest font-bold">Confide Library</p>
          <h1 className="text-headline-xl mt-2 font-extrabold">Skill &amp; Knowledge Hub</h1>
          <p className="text-body-md text-surface-container-lowest mt-1">
            Access internal guides, training manuals, company policies, and technical documentations.
          </p>
          {/* Search Box inside header */}
          <div className="relative mt-6 max-w-lg">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[22px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search guides, docs, coding styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white text-on-surface rounded-xl border border-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-primary-container text-body-md"
            />
          </div>
        </div>
        {/* Background Accent Element */}
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <span className="material-symbols-outlined text-[300px]">auto_stories</span>
        </div>
      </div>

      {/* Category Pills Selector */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-1.5 rounded-full font-bold text-body-md border transition-all ${
            selectedCategory === null
              ? "bg-primary text-white border-primary"
              : "bg-white text-secondary border-[#e2e8f0] hover:bg-surface-container-low"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full font-bold text-body-md border transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? "bg-primary text-white border-primary"
                : "bg-white text-secondary border-[#e2e8f0] hover:bg-surface-container-low"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
            {cat.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.length === 0 ? (
          <div className="col-span-2 data-card bg-white p-12 text-center rounded-xl">
            <span className="material-symbols-outlined text-[48px] text-secondary">search_off</span>
            <h3 className="text-headline-md text-on-surface mt-2">No documents found</h3>
            <p className="text-body-md text-secondary mt-1">Try searching for different keywords or categories.</p>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-[#e2e8f0] flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-xl">
                    <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-headline-md text-on-surface font-bold leading-snug">{cat.title}</h3>
                    <p className="text-body-md text-secondary mt-1 leading-relaxed">{cat.desc}</p>
                  </div>
                </div>
                <span className="chip-neutral shrink-0">{cat.count} files</span>
              </div>

              {/* Sub-articles list */}
              <div className="p-6 flex-1 bg-surface-container-lowest">
                <p className="text-label-sm text-secondary uppercase tracking-wider mb-3">Popular Articles</p>
                <ul className="space-y-3">
                  {cat.articles.map((art, idx) => (
                    <li key={idx} className="flex items-center justify-between text-body-md text-on-surface font-medium hover:text-primary cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary group-hover:text-primary text-[18px]">
                          description
                        </span>
                        <span>{art}</span>
                      </div>
                      <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">
                        arrow_forward
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Trending & Recent Updates Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trending Articles */}
        <div className="data-card bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e2e8f0]">
            <span className="material-symbols-outlined text-warning">local_fire_department</span>
            <h3 className="text-headline-md text-on-surface">Trending Articles</h3>
          </div>

          <div className="space-y-4">
            {trendingArticles.map((art, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#e2e8f0] last:border-0 hover:bg-surface-container-low px-2 rounded-lg cursor-pointer">
                <div>
                  <h4 className="text-body-md font-bold text-on-surface">{art.title}</h4>
                  <span className="text-label-sm text-secondary">{art.category}</span>
                </div>
                <span className="text-label-sm text-secondary font-mono-data bg-surface-container-low px-2 py-1 rounded">
                  {art.views} views
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="data-card bg-white rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#e2e8f0]">
            <span className="material-symbols-outlined text-primary">update</span>
            <h3 className="text-headline-md text-on-surface">Recently Updated</h3>
          </div>

          <div className="space-y-4">
            {recentUpdates.map((upd, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#e2e8f0] last:border-0 hover:bg-surface-container-low px-2 rounded-lg cursor-pointer">
                <div>
                  <h4 className="text-body-md font-bold text-on-surface">{upd.title}</h4>
                  <span className="text-label-sm text-secondary">Edited by {upd.author}</span>
                </div>
                <span className="text-label-sm text-secondary font-mono-data bg-surface-container-low px-2 py-1 rounded">
                  {upd.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
