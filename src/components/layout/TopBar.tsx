"use client"

export default function TopBar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#e2e8f0] flex justify-between items-center h-16 px-6">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-[#e2e8f0] rounded-full text-body-md placeholder:text-secondary focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
            placeholder="Search anything..."
            type="text"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-secondary hover:bg-surface-container-low rounded-full transition-all relative">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="p-2 text-secondary hover:bg-surface-container-low rounded-full transition-all">
          <span className="material-symbols-outlined text-[22px]">help</span>
        </button>
        <div className="w-9 h-9 rounded-full border border-outline-variant overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ml-1 bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[20px]">person</span>
        </div>
      </div>
    </header>
  )
}
