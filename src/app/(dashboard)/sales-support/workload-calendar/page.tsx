"use client"

import { useState } from "react"

export default function WorkloadCalendarPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(12)

  // Workload data (1-5 represent capacity levels)
  const capacity: { [key: number]: { level: "low" | "medium" | "high"; color: string; engineers: string[] } } = {
    1: { level: "low", color: "bg-success/15 border-success text-success-text", engineers: ["Anan S."] },
    2: { level: "low", color: "bg-success/15 border-success text-success-text", engineers: ["Anan S."] },
    3: { level: "low", color: "bg-success/15 border-success text-success-text", engineers: ["Anan S."] },
    4: { level: "medium", color: "bg-warning/15 border-warning text-warning-text", engineers: ["Anan S.", "Kitti P."] },
    5: { level: "medium", color: "bg-warning/15 border-warning text-warning-text", engineers: ["Anan S.", "Wichai O."] },
    8: { level: "medium", color: "bg-warning/15 border-warning text-warning-text", engineers: ["Anan S."] },
    9: { level: "high", color: "bg-error/15 border-error text-error", engineers: ["Anan S.", "Wichai O.", "Kitti P.", "Somsak D."] },
    10: { level: "high", color: "bg-error/15 border-error text-error", engineers: ["Anan S.", "Wichai O.", "Kitti P."] },
    11: { level: "medium", color: "bg-warning/15 border-warning text-warning-text", engineers: ["Anan S.", "Kitti P."] },
    12: { level: "high", color: "bg-error/15 border-error text-error", engineers: ["Anan S.", "Wichai O.", "Kitti P.", "Somsak D."] },
    15: { level: "low", color: "bg-success/15 border-success text-success-text", engineers: ["Anan S."] },
  }

  const daysInMonth = 30
  const paddingDays = 1

  const renderSlots = () => {
    const slots = []
    for (let i = 0; i < 35; i++) {
      const day = i - paddingDays + 1
      const isCurrentMonth = day > 0 && day <= daysInMonth
      const dayCap = isCurrentMonth ? capacity[day] || { level: "low", color: "bg-success/15 border-success text-success-text", engineers: [] } : null
      const isSelected = selectedDay === day

      slots.push(
        <div
          key={i}
          onClick={() => isCurrentMonth && setSelectedDay(day)}
          className={`min-h-[80px] p-2 border border-[#e2e8f0] bg-white flex flex-col justify-between cursor-pointer transition-colors ${
            isCurrentMonth ? "hover:bg-surface-container-low" : "bg-surface-container-low/50 text-secondary/35 pointer-events-none"
          } ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
        >
          <span className="text-label-sm font-bold text-on-surface">{isCurrentMonth ? day : ""}</span>
          {dayCap && dayCap.engineers.length > 0 && (
            <div className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold ${dayCap.color}`}>
              {dayCap.level.toUpperCase()} ({dayCap.engineers.length} Eng)
            </div>
          )}
        </div>
      )
    }
    return slots
  }

  const activeDayCap = selectedDay ? capacity[selectedDay] : null

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales Support • Capacity</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Workload Capacity Calendar</h1>
        <p className="text-body-md text-secondary mt-1">
          Review support engineers' deployment schedules, dispatcher workloads, and load indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap Grid */}
        <div className="lg:col-span-8 data-card bg-white rounded-xl overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#e2e8f0] flex justify-between items-center bg-white">
            <h3 className="text-headline-md text-on-surface font-bold">June 2026</h3>
          </div>

          <div className="grid grid-cols-7 bg-surface-container-low border-b border-[#e2e8f0] text-center text-label-sm text-secondary uppercase py-2 font-bold">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 bg-[#f1f5f9]">
            {renderSlots()}
          </div>
        </div>

        {/* Selected Day Info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="data-card bg-white rounded-xl p-5 flex flex-col min-h-[350px]">
            <div className="pb-3 border-b border-[#e2e8f0]">
              <span className="text-label-sm text-secondary uppercase tracking-widest font-bold">Capacity Load Detail</span>
              <h3 className="text-headline-md text-on-surface font-extrabold mt-0.5">June {selectedDay}, 2026</h3>
            </div>

            <div className="flex-1 mt-4 space-y-4">
              {activeDayCap && activeDayCap.engineers.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-body-md text-secondary">Load status:</span>
                    <span className={`chip-${activeDayCap.level === "high" ? "error" : activeDayCap.level === "medium" ? "warning" : "success"}`}>
                      {activeDayCap.level.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-label-sm text-secondary uppercase tracking-wider mb-2 font-bold">Assigned Support Engineers</p>
                    <ul className="space-y-2">
                      {activeDayCap.engineers.map((eng, i) => (
                        <li key={i} className="flex items-center gap-2 text-body-md text-on-surface">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {eng}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-secondary">
                  <span className="material-symbols-outlined text-[36px] text-outline mb-2">calendar_today</span>
                  <p className="text-body-md font-semibold">Idle / Low Load</p>
                  <p className="text-label-sm mt-0.5">No critical engineering deployment scheduled.</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="border-t border-[#e2e8f0] pt-4 mt-6 space-y-2 text-label-sm text-secondary">
              <p className="uppercase tracking-wider font-bold">Load Indicators</p>
              <div className="grid grid-cols-3 gap-2">
                <span className="chip-success justify-center">Low</span>
                <span className="chip-warning justify-center">Medium</span>
                <span className="chip-error justify-center">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
