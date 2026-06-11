"use client"

import { useState } from "react"

export default function MyProfileSettingsPage() {
  const [lang, setLang] = useState("English")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword || !newPassword) return

    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setCurrentPassword("")
      setNewPassword("")
      alert("Password updated successfully.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Settings</p>
        <h1 className="text-headline-xl text-on-surface mt-1">My Profile Settings</h1>
        <p className="text-body-md text-secondary mt-1">
          Customize your default system preferences, notification triggers, and security credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* System Preferences Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl p-6 space-y-6">
            <h3 className="text-headline-md text-on-surface font-bold">Preferences</h3>

            <div className="space-y-4">
              {/* Language */}
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Default System Language</label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="English">English</option>
                  <option value="Thai">Thai (ภาษาไทย)</option>
                </select>
              </div>

              {/* Notification preferences */}
              <div className="space-y-3">
                <label className="text-label-sm text-secondary uppercase tracking-wider block">Notification Trigger Traces</label>
                <label className="flex items-center gap-3 text-body-md text-on-surface select-none">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary" />
                  <span>Receive Email on incoming approvals</span>
                </label>
                <label className="flex items-center gap-3 text-body-md text-on-surface select-none">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primary focus:ring-primary" />
                  <span>Receive system notification popups</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => alert("Preferences saved successfully.")}
              className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">save</span>
              Save Preferences
            </button>
          </div>
        </div>

        {/* Security Password reset */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl p-6 space-y-6">
            <h3 className="text-headline-md text-on-surface font-bold">Change Local Password</h3>

            <form onSubmit={handleSaveSecurity} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSaving ? "hourglass_empty" : "lock_open"}
                </span>
                {isSaving ? "Updating..." : "Update Credentials"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
