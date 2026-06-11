"use client"

import { useState } from "react"

export default function HelpCenterPage() {
  const [faqs, setFaqs] = useState([
    {
      q: "How do I request a Work-from-Home allowance?",
      a: "Go to Finance -> Claims -> General Claim. Create a claim with the category 'Miscellaneous' or 'Hardware', input the amount, upload the receipt, and select your manager as the approver.",
      open: false,
    },
    {
      q: "Why can't I access the Admin Console module?",
      a: "The Admin Console is strictly restricted to system administrators. If you require access, please contact the HR Administrator to update your module permissions matrix.",
      open: false,
    },
    {
      q: "What should I do if my GPS check-in fails?",
      a: "Ensure that location services are enabled for your browser. If you are using a mobile device, verify that you are within the allowed geographic radius of the client site.",
      open: false,
    },
  ])

  const toggleFaq = (index: number) => {
    setFaqs(faqs.map((faq, i) => i === index ? { ...faq, open: !faq.open } : faq))
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Support</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Help &amp; FAQ Center</h1>
        <p className="text-body-md text-secondary mt-1">
          Find answers to frequently asked questions about the Confide Portal or file a support ticket.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* FAQs */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl p-6 space-y-4">
            <h3 className="text-headline-md text-on-surface font-bold">Frequently Asked Questions</h3>

            <div className="divide-y divide-[#e2e8f0]">
              {faqs.map((faq, i) => (
                <div key={i} className="py-4 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex justify-between items-center text-left text-body-lg font-bold text-on-surface hover:text-primary transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-secondary transition-transform duration-200" style={{ transform: faq.open ? "rotate(180deg)" : "" }}>
                      expand_more
                    </span>
                  </button>
                  {faq.open && (
                    <p className="text-body-md text-secondary mt-2 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support Ticket */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl p-6 space-y-6">
            <h3 className="text-headline-md text-on-surface font-bold">Contact IT Support</h3>
            <p className="text-body-md text-secondary">Can't find what you need? File a support ticket with our IT team.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Ticket filed. IT Support will respond within 4 hours."); }} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Broken links on Fleet booking page"
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Message</label>
                <textarea
                  rows={4}
                  placeholder="Explain your problem in detail..."
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                File Support Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
