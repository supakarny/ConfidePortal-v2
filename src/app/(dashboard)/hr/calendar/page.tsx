"use client"

import { useState } from "react"

export default function CompanyCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("June 2026")
  const [selectedDay, setSelectedDay] = useState<number | null>(12)

  // Mock Calendar events mapped to June 2026 dates
  const events: { [key: number]: any[] } = {
    3: [
      { id: 1, title: "Queen's Birthday (Holiday)", type: "holiday", color: "bg-error text-white" }
    ],
    9: [
      { id: 2, title: "IT Maintenance Downtime", type: "system", color: "bg-warning-bg text-warning-text border border-warning" }
    ],
    12: [
      { id: 3, title: "Submit Monthly Claim Logs", type: "task", color: "bg-[#e5eeff] text-[#1e40af] border border-[#2563eb]" },
      { id: 4, title: "Product Dev Sync (10:00)", type: "meeting", color: "bg-primary-container/20 text-on-primary-container border border-primary-container" }
    ],
    19: [
      { id: 5, title: "Confide Q2 Townhall (14:00)", type: "event", color: "bg-success-bg text-success-text border border-success" }
    ],
    25: [
      { id: 6, title: "Leave: Somchai S. (Vacation)", type: "leave", color: "bg-surface-variant text-on-surface-variant" }
    ],
  }

  // Visual layout helper for June 2026 (Starts on Monday, has 30 days)
  // Shift padding by 1 day (June 1 is Monday, Sunday is 0)
  const paddingDays = 1
  const daysInMonth = 30
  const totalSlots = 35 // 5 weeks

  const renderCalendarDays = () => {
    const slots = []

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - paddingDays + 1
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth

      const dayEvents = isCurrentMonth ? events[dayNumber] || [] : []
      const isSelected = isCurrentMonth && selectedDay === dayNumber

      slots.push(
        <div
          key={i}
          onClick={() => isCurrentMonth && setSelectedDay(dayNumber)}
          className={`min-h-[90px] border border-[#e2e8f0] p-2 bg-white flex flex-col justify-between transition-colors ${
            isCurrentMonth
              ? "cursor-pointer hover:bg-surface-container-low"
              : "bg-surface-container-low/50 text-secondary"
          } ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
        >
          <div className="flex justify-between items-center">
            <span className={`text-label-sm font-bold ${
              isSelected
                ? "bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center"
                : isCurrentMonth
                ? "text-on-surface"
                : "text-secondary/50"
            }`}>
              {isCurrentMonth ? dayNumber : ""}
            </span>
          </div>

          <div className="mt-1 space-y-1 overflow-hidden flex-1 flex flex-col justify-end">
            {dayEvents.slice(0, 2).map((ev) => (
              <div
                key={ev.id}
                className={`text-[10px] px-1.5 py-0.5 rounded truncate font-medium ${ev.color}`}
                title={ev.title}
              >
                {ev.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-[9px] text-secondary text-right pr-1 font-semibold">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      )
    }

    return slots
  }

  const activeEvents = selectedDay ? events[selectedDay] || [] : []

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • General</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Company Calendar</h1>
          <p className="text-body-md text-secondary mt-1">
            Track public holidays, internal corporate events, scheduled maintenance, and team leaves.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid Box (Left) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
            {/* Calendar Header Control */}
            <div className="px-6 py-4 border-b border-[#e2e8f0] flex justify-between items-center">
              <h3 className="text-headline-md text-on-surface font-bold">{currentMonth}</h3>
              <div className="flex gap-1">
                <button className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="px-3 border border-[#e2e8f0] rounded-lg text-body-md font-semibold hover:bg-surface-container-low transition-colors">
                  Today
                </button>
                <button className="p-2 border border-[#e2e8f0] rounded-lg hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Days of week labels */}
            <div className="grid grid-cols-7 bg-surface-container-low border-b border-[#e2e8f0] text-center text-label-sm text-secondary uppercase tracking-wider py-2 font-bold">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Grid slots */}
            <div className="grid grid-cols-7 bg-[#f1f5f9]">
              {renderCalendarDays()}
            </div>
          </div>
        </div>

        {/* Selected Day Event Panel (Right) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="data-card bg-white rounded-xl p-5 flex flex-col min-h-[400px]">
            <div className="pb-3 border-b border-[#e2e8f0]">
              <span className="text-label-sm text-secondary uppercase tracking-widest font-bold">Selected Day</span>
              <h3 className="text-headline-md text-on-surface font-extrabold mt-0.5">
                June {selectedDay}, 2026
              </h3>
            </div>

            <div className="flex-1 mt-4 space-y-3">
              {activeEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-secondary">
                  <span className="material-symbols-outlined text-[36px] text-outline mb-2">event_busy</span>
                  <p className="text-body-md font-semibold">No Scheduled Events</p>
                  <p className="text-label-sm mt-0.5">Nothing is currently scheduled on this day.</p>
                </div>
              ) : (
                activeEvents.map((ev) => (
                  <div key={ev.id} className="p-3.5 border border-[#e2e8f0] rounded-xl flex gap-3 items-start hover:bg-surface-container-low/50 transition-colors">
                    <span className="material-symbols-outlined text-primary text-[22px]">event_note</span>
                    <div>
                      <h4 className="text-body-md font-bold text-on-surface leading-snug">{ev.title}</h4>
                      <p className="text-label-sm text-secondary mt-1 capitalize">Type: {ev.type}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Legend guide */}
            <div className="border-t border-[#e2e8f0] pt-4 mt-6 space-y-2">
              <p className="text-label-sm text-secondary uppercase tracking-wider font-bold">Calendar Legend</p>
              <div className="grid grid-cols-2 gap-2 text-label-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-error" />
                  <span>Public Holidays</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-success" />
                  <span>Corporate Events</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-warning" />
                  <span>IT Maintenance</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#94a3b8]" />
                  <span>Leave &amp; Absences</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
