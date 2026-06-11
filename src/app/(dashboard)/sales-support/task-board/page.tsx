"use client"

import { useState } from "react"

export default function TaskBoardPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Configure Staging DB", column: "todo", priority: "High" },
    { id: 2, title: "API Integration Draft", column: "progress", priority: "Medium" },
    { id: 3, title: "Test Firewall Ports", column: "review", priority: "Low" },
    { id: 4, title: "Sign NDA document", column: "done", priority: "High" },
  ])

  const moveTask = (id: number, nextCol: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, column: nextCol } : t))
  }

  const renderColumn = (colName: string, title: string) => {
    const colTasks = tasks.filter(t => t.column === colName)

    return (
      <div className="bg-surface-container-low border border-[#e2e8f0] rounded-xl p-4 flex-1 min-w-[250px] flex flex-col gap-3">
        <div className="flex justify-between items-center pb-2 border-b border-[#e2e8f0]">
          <h3 className="text-body-md font-bold text-on-surface uppercase tracking-wider">{title}</h3>
          <span className="chip-neutral py-0.5">{colTasks.length}</span>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto min-h-[300px]">
          {colTasks.map((t) => (
            <div key={t.id} className="data-card bg-white p-4 rounded-lg flex flex-col justify-between gap-3 shadow-none hover:transform-none select-none">
              <div>
                <span className={t.priority === "High" ? "chip-error" : t.priority === "Medium" ? "chip-warning" : "chip-neutral"}>
                  {t.priority}
                </span>
                <h4 className="text-body-md font-bold text-on-surface mt-2">{t.title}</h4>
              </div>
              <div className="flex justify-end gap-1.5 border-t border-[#e2e8f0] pt-2 mt-1">
                {colName !== "todo" && (
                  <button
                    onClick={() => {
                      const prevs = ["todo", "progress", "review", "done"]
                      const idx = prevs.indexOf(colName)
                      moveTask(t.id, prevs[idx - 1])
                    }}
                    className="p-1 hover:bg-surface-container-high rounded text-secondary"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  </button>
                )}
                {colName !== "done" && (
                  <button
                    onClick={() => {
                      const nexts = ["todo", "progress", "review", "done"]
                      const idx = nexts.indexOf(colName)
                      moveTask(t.id, nexts[idx + 1])
                    }}
                    className="p-1 hover:bg-surface-container-high rounded text-secondary"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Sales Support • Workspace</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Task Board</h1>
        <p className="text-body-md text-secondary mt-1">
          Interactive Kanban workspace tracking sales support queue items and dispatcher assignments.
        </p>
      </div>

      {/* Kanban Board Layout */}
      <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {renderColumn("todo", "To Do")}
        {renderColumn("progress", "In Progress")}
        {renderColumn("review", "Testing / Review")}
        {renderColumn("done", "Completed")}
      </div>
    </div>
  )
}
