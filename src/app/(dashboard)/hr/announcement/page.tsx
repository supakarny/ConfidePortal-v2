"use client"

import { useState } from "react"

export default function AnnouncementPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const announcements = [
    {
      id: 1,
      title: "Confide Annual Townhall Meeting 2026",
      category: "Company Event",
      date: "2026-06-12",
      author: "Management Team",
      teaser: "Join us for our yearly townhall next Friday at 14:00. We will share our Q2 progress, future expansions, and run the annual employee awards ceremony.",
      important: true,
    },
    {
      id: 2,
      title: "Updated Health Insurance Policy & Wellness Allowance",
      category: "Policy Update",
      date: "2026-06-10",
      author: "Kanda P. (HR)",
      teaser: "Confide is increasing medical OPD allowance by 15% starting next month. Please review the updated handbook in the Knowledge Hub for details on claims and partners.",
      important: false,
    },
    {
      id: 3,
      title: "Scheduled Server Downtime: Confide Portal Upgrades",
      category: "IT Alert",
      date: "2026-06-09",
      author: "Anan S. (IT Infrastructure)",
      teaser: "The main databases will undergo structural schema optimization on Friday night from 22:00 to 22:15. Internal apps will be temporarily offline.",
      important: false,
    },
    {
      id: 4,
      title: "Bangkok Office: Air Conditioning System Maintenance",
      category: "Facility Notice",
      date: "2026-06-08",
      author: "Admin Department",
      teaser: "Routine cleaning of office AC systems will take place on Saturday. Employees are advised to work remotely if they plan to work over the weekend.",
      important: false,
    },
  ]

  const categories = ["All", "Company Event", "Policy Update", "IT Alert", "Facility Notice"]

  const filteredAnnouncements = announcements.filter(
    (ann) => selectedCategory === "All" || ann.category === selectedCategory
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • General</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Company Announcement</h1>
          <p className="text-body-md text-secondary mt-1">
            Stay up to date with the latest company news, policy updates, and operational notices.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Post Announcement
        </button>
      </div>

      {/* Categories Filter Bar */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#e2e8f0]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full font-bold text-body-md border transition-all ${
              selectedCategory === cat
                ? "bg-primary text-white border-primary"
                : "bg-white text-secondary border-[#e2e8f0] hover:bg-surface-container-low"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-4 max-w-4xl">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className={`data-card bg-white rounded-xl overflow-hidden p-6 border-l-4 transition-all hover:transform-none ${
              ann.important ? "border-l-error bg-error-container/5" : "border-l-primary"
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={
                      ann.category === "Policy Update"
                        ? "chip-info"
                        : ann.category === "IT Alert"
                        ? "chip-error"
                        : ann.category === "Company Event"
                        ? "chip-success"
                        : "chip-neutral"
                    }
                  >
                    {ann.category}
                  </span>
                  {ann.important && (
                    <span className="chip-error bg-error text-white border-none animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-headline-md text-on-surface font-bold mt-2 hover:text-primary cursor-pointer leading-snug">
                  {ann.title}
                </h3>
                <p className="text-label-sm text-secondary">
                  Published by <span className="font-semibold text-on-surface">{ann.author}</span> on {ann.date}
                </p>
              </div>
            </div>

            <p className="text-body-md text-secondary mt-4 leading-relaxed whitespace-pre-line">
              {ann.teaser}
            </p>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#e2e8f0]">
              <button className="text-primary hover:text-primary-container font-semibold text-body-md flex items-center gap-1">
                Read Full Article
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>

              <div className="flex items-center gap-4 text-secondary text-label-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  124 views
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">comment</span>
                  8 comments
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
