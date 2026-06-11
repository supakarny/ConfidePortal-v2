"use client"

import { useState } from "react"

export default function ProfileEditorPage() {
  const [activeTab, setActiveTab] = useState<"personal" | "contact" | "emergency" | "bank">("personal")
  const [isSaving, setIsSaving] = useState(false)

  // Profile States
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Kitti",
    lastName: "Pornprasert",
    dob: "1994-08-14",
    gender: "Male",
    nationalId: "1-1002-00341-22-1",
    maritalStatus: "Single",
  })

  const [contactInfo, setContactInfo] = useState({
    mobile: "+66 89 123 4567",
    emailCorp: "kitti@confide.co.th",
    emailPersonal: "kitti.dev@gmail.com",
    address: "45/2 Ratchadaphisek Rd, Huai Khwang, Bangkok 10310",
  })

  const [emergencyInfo, setEmergencyInfo] = useState({
    contactName: "Somporn Pornprasert",
    relationship: "Father",
    phone: "+66 81 999 8888",
  })

  const [bankInfo, setBankInfo] = useState({
    bankName: "Kasikornbank (KBANK)",
    accountNumber: "026-8-12345-6",
    accountName: "Kitti Pornprasert",
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    setTimeout(() => {
      setIsSaving(false)
      alert("Profile data saved successfully! Pending HR review & confirmation.")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • General</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Profile Editor</h1>
        <p className="text-body-md text-secondary mt-1">
          Review and update your personal employee credentials and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Avatar & Core Info */}
        <div className="lg:col-span-4 space-y-4">
          <div className="data-card bg-white rounded-xl p-6 flex flex-col items-center text-center">
            {/* Avatar Upload Container */}
            <div className="relative group cursor-pointer">
              <div className="w-28 h-28 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-[36px] shadow-md border-4 border-surface-container-low group-hover:opacity-80 transition-opacity">
                KP
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                <span className="text-[10px] uppercase font-bold mt-1">Upload</span>
              </div>
            </div>

            <h3 className="text-headline-md text-on-surface font-extrabold mt-4">{personalInfo.firstName} {personalInfo.lastName}</h3>
            <p className="text-body-md text-secondary mt-0.5">Senior Backend Developer</p>
            <span className="chip-info mt-2">Product Sector</span>

            {/* Read-only details */}
            <div className="w-full mt-6 space-y-2 border-t border-[#e2e8f0] pt-4 text-left text-body-md">
              <div className="flex justify-between">
                <span className="text-secondary">Employee ID:</span>
                <span className="font-semibold text-on-surface font-mono-data">CONF-EMP-2940</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Join Date:</span>
                <span className="font-semibold text-on-surface">01 Feb 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Employment Type:</span>
                <span className="font-semibold text-on-surface">Full-Time Permanent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form Editor Tabs */}
        <div className="lg:col-span-8 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
            {/* Form Tabs Nav */}
            <div className="flex border-b border-[#e2e8f0] bg-surface-container-low overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setActiveTab("personal")}
                className={`px-5 py-3.5 font-bold text-body-md border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "personal"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-secondary hover:text-on-surface"
                }`}
              >
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-5 py-3.5 font-bold text-body-md border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "contact"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-secondary hover:text-on-surface"
                }`}
              >
                Contact Details
              </button>
              <button
                onClick={() => setActiveTab("emergency")}
                className={`px-5 py-3.5 font-bold text-body-md border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "emergency"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-secondary hover:text-on-surface"
                }`}
              >
                Emergency Contact
              </button>
              <button
                onClick={() => setActiveTab("bank")}
                className={`px-5 py-3.5 font-bold text-body-md border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === "bank"
                    ? "border-primary text-primary bg-white"
                    : "border-transparent text-secondary hover:text-on-surface"
                }`}
              >
                Payroll Bank Account
              </button>
            </div>

            {/* Tab Forms */}
            <form onSubmit={handleSave} className="p-6 space-y-6">
              {activeTab === "personal" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">First Name</label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Date of Birth</label>
                    <input
                      type="date"
                      value={personalInfo.dob}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Gender</label>
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">National ID Number</label>
                    <input
                      type="text"
                      value={personalInfo.nationalId}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, nationalId: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                    />
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-label-sm text-secondary uppercase tracking-wider">Mobile Number</label>
                      <input
                        type="text"
                        value={contactInfo.mobile}
                        onChange={(e) => setContactInfo({ ...contactInfo, mobile: e.target.value })}
                        className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-label-sm text-secondary uppercase tracking-wider">Corporate Email</label>
                      <input
                        type="email"
                        value={contactInfo.emailCorp}
                        className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-low text-secondary focus:outline-none cursor-not-allowed"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Personal Email</label>
                    <input
                      type="email"
                      value={contactInfo.emailPersonal}
                      onChange={(e) => setContactInfo({ ...contactInfo, emailPersonal: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Current Residential Address</label>
                    <textarea
                      rows={3}
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              )}

              {activeTab === "emergency" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Emergency Contact Name</label>
                    <input
                      type="text"
                      value={emergencyInfo.contactName}
                      onChange={(e) => setEmergencyInfo({ ...emergencyInfo, contactName: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Relationship</label>
                    <input
                      type="text"
                      value={emergencyInfo.relationship}
                      onChange={(e) => setEmergencyInfo({ ...emergencyInfo, relationship: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Emergency Phone Number</label>
                    <input
                      type="text"
                      value={emergencyInfo.phone}
                      onChange={(e) => setEmergencyInfo({ ...emergencyInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === "bank" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Bank Name</label>
                    <select
                      value={bankInfo.bankName}
                      onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="Kasikornbank (KBANK)">Kasikornbank (KBANK)</option>
                      <option value="Siam Commercial Bank (SCB)">Siam Commercial Bank (SCB)</option>
                      <option value="Bangkok Bank (BBL)">Bangkok Bank (BBL)</option>
                      <option value="Krungthai Bank (KTB)">Krungthai Bank (KTB)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Account Holder Name</label>
                    <input
                      type="text"
                      value={bankInfo.accountName}
                      onChange={(e) => setBankInfo({ ...bankInfo, accountName: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-label-sm text-secondary uppercase tracking-wider">Account Number</label>
                    <input
                      type="text"
                      value={bankInfo.accountNumber}
                      onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono-data"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isSaving ? "hourglass_empty" : "save"}
                  </span>
                  {isSaving ? "Saving..." : "Save Profile Details"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
