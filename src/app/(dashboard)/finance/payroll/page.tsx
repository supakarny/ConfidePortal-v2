"use client"

import { useState } from "react"

export default function PayrollReportPage() {
  const [payslips] = useState([
    { period: "May 2026", base: "65,000.00", allowance: "3,500.00", tax: "4,200.00", sso: "750.00", net: "63,550.00", status: "Paid" },
    { period: "April 2026", base: "65,000.00", allowance: "2,000.00", tax: "4,050.00", sso: "750.00", net: "62,200.00", status: "Paid" },
    { period: "March 2026", base: "65,000.00", allowance: "1,500.00", tax: "4,000.00", sso: "750.00", net: "61,750.00", status: "Paid" },
  ])

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Finance</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Payroll Report</h1>
          <p className="text-body-md text-secondary mt-1">
            Access your monthly salary summaries, deductions, and download official payslips.
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[20px]">download</span>
          Download Latest Payslip (PDF)
        </button>
      </div>

      {/* Salary Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-primary">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Base Salary</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-on-surface">65,000.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-success">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Allowances (Avg)</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-success-text font-bold">2,333.33</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-error">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Deductions (Tax + SSO)</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-error font-bold">4,950.00</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
        <div className="data-card bg-white p-5 rounded-xl border-l-4 border-l-info">
          <p className="text-label-sm text-secondary uppercase tracking-wider font-semibold">Avg Net Payout</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-headline-xl text-primary font-bold">62,383.33</span>
            <span className="text-body-md text-secondary font-mono-data">THB</span>
          </div>
        </div>
      </div>

      {/* Payslips Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-[#e2e8f0]">
          <h3 className="text-headline-md text-on-surface font-bold">Payslip History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Pay Period</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Base Salary</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Allowances</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Tax Deduction</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">SSO Deduction</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Net Salary</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] font-mono-data">
              {payslips.map((slip, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors text-body-md text-on-surface">
                  <td className="px-6 py-4 font-sans font-bold">{slip.period}</td>
                  <td className="px-6 py-4">{slip.base} THB</td>
                  <td className="px-6 py-4 text-success-text">{slip.allowance} THB</td>
                  <td className="px-6 py-4 text-error">{slip.tax} THB</td>
                  <td className="px-6 py-4 text-error">{slip.sso} THB</td>
                  <td className="px-6 py-4 font-bold text-primary">{slip.net} THB</td>
                  <td className="px-6 py-4 font-sans">
                    <span className="chip-success">{slip.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-sans">
                    <button className="text-primary hover:text-primary-container font-semibold text-body-md inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
