"use client"

import { useState } from "react"
import Link from "next/link"

export default function ContactsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDept, setSelectedDept] = useState("All")

  const contacts = [
    {
      name: "Supakarn Supasri",
      role: "Lead Product Manager",
      dept: "Product",
      email: "supakarn@confide.co.th",
      phone: "+66 89 123 4567",
      avatar: "S",
    },
    {
      name: "Somchai Siripong",
      role: "Sales Department Head",
      dept: "Sales & Marketing",
      email: "somchai@confide.co.th",
      phone: "+66 81 234 5678",
      avatar: "M",
    },
    {
      name: "Kanda Promdee",
      role: "HR Generalist",
      dept: "Human Resources",
      email: "kanda.p@confide.co.th",
      phone: "+66 82 345 6789",
      avatar: "K",
    },
    {
      name: "Anan Saetang",
      role: "Senior IT Support Analyst",
      dept: "Information Technology",
      email: "anan.s@confide.co.th",
      phone: "+66 83 456 7890",
      avatar: "A",
    },
    {
      name: "Pornpen Maneerat",
      role: "Finance & Accounts lead",
      dept: "Finance",
      email: "pornpen@confide.co.th",
      phone: "+66 84 567 8901",
      avatar: "P",
    },
    {
      name: "Somsak Dev",
      role: "Senior Backend Developer",
      dept: "Product",
      email: "somsak@confide.co.th",
      phone: "+66 85 678 9012",
      avatar: "D",
    },
  ]

  const departments = ["All", "Product", "Sales & Marketing", "Human Resources", "Information Technology", "Finance"]

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDept = selectedDept === "All" || c.dept === selectedDept

    return matchesSearch && matchesDept
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • General</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Employee Contacts</h1>
        <p className="text-body-md text-secondary mt-1">
          Search and browse contact details of employees across all department sectors.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="data-card bg-white rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name, role, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Dept filter selector */}
        <div className="flex items-center gap-2">
          <span className="text-label-sm text-secondary uppercase tracking-wider hidden md:inline">Sector:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.length === 0 ? (
          <div className="col-span-full data-card bg-white p-12 text-center rounded-xl">
            <span className="material-symbols-outlined text-[48px] text-secondary">person_off</span>
            <h3 className="text-headline-md text-on-surface mt-2">No contacts matched</h3>
            <p className="text-body-md text-secondary mt-1">Try broadening your search constraints.</p>
          </div>
        ) : (
          filteredContacts.map((contact, i) => (
            <div key={i} className="data-card bg-white rounded-xl overflow-hidden p-6 flex flex-col justify-between">
              <div>
                {/* Profile Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-headline-md shrink-0 shadow-sm">
                    {contact.avatar}
                  </div>
                  <div>
                    <h3 className="text-headline-md text-on-surface leading-tight font-extrabold">{contact.name}</h3>
                    <p className="text-body-md text-secondary mt-0.5">{contact.role}</p>
                    <span className="chip-neutral mt-2 inline-block">
                      {contact.dept}
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="mt-6 space-y-2.5 border-t border-[#e2e8f0] pt-4">
                  <div className="flex items-center gap-2.5 text-body-md text-secondary hover:text-on-surface transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-body-md text-secondary hover:text-on-surface transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">phone</span>
                    <span>{contact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="flex gap-2 mt-6 pt-4 border-t border-[#e2e8f0]">
                <Link
                  href="/tools/messenger"
                  className="flex-1 bg-surface-container-low text-on-surface font-semibold text-body-md py-2 px-3 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 border border-[#e2e8f0]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Chat
                </Link>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex-1 bg-primary text-white font-bold text-body-md py-2 px-3 rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
