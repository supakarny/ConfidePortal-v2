"use client"

import { useState } from "react"
import { Heart, Activity, Coffee, Shield, Plane, ArrowRight, Download, CheckCircle2, ChevronRight, FileText } from "lucide-react"

export default function WelfareBenefitsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const benefits = [
    {
      id: "health",
      icon: <Activity className="text-red-500" size={24} />,
      bg: "bg-red-50",
      title: "Health Insurance",
      desc: "Premium coverage including dental and vision for you and your dependents.",
      coverage: "100% Premium Covered"
    },
    {
      id: "wellness",
      icon: <Heart className="text-pink-500" size={24} />,
      bg: "bg-pink-50",
      title: "Wellness Allowance",
      desc: "Monthly stipend for gym memberships, fitness classes, or wellness apps.",
      coverage: "THB 2,000 / Month"
    },
    {
      id: "pto",
      icon: <Plane className="text-blue-500" size={24} />,
      bg: "bg-blue-50",
      title: "Paid Time Off",
      desc: "Generous vacation policy, plus sick days and personal time.",
      coverage: "20 Days / Year"
    },
    {
      id: "provident",
      icon: <Shield className="text-green-500" size={24} />,
      bg: "bg-green-50",
      title: "Provident Fund",
      desc: "Company matching contribution to help you save for retirement.",
      coverage: "Up to 10% Match"
    },
    {
      id: "food",
      icon: <Coffee className="text-orange-500" size={24} />,
      bg: "bg-orange-50",
      title: "Food & Beverage",
      desc: "Free catered lunches twice a week and fully stocked office snacks.",
      coverage: "In-Office Benefit"
    }
  ]

  const recentClaims = [
    { id: "CLM-9012", date: "Jun 10, 2026", type: "Dental Care", amount: "THB 3,500", status: "Approved" },
    { id: "CLM-9011", date: "May 22, 2026", type: "Wellness Allowance", amount: "THB 2,000", status: "Paid" },
    { id: "CLM-9010", date: "Apr 15, 2026", type: "Outpatient (OPD)", amount: "THB 1,200", status: "Paid" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welfare & Benefits (Test)</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your company perks, insurance, and claims</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm">
          Submit New Claim
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-1">
            <div className="flex space-x-1">
              {[
                { id: "overview", label: "My Benefits" },
                { id: "claims", label: "Claims History" },
                { id: "policies", label: "Policy Documents" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${benefit.bg}`}>
                      {benefit.icon}
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {benefit.coverage}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{benefit.desc}</p>
                  <button className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "claims" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <h2 className="font-semibold text-gray-900">Recent Claims</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="divide-y divide-gray-100">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <FileText size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{claim.type}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{claim.id} • {claim.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-medium text-gray-900">{claim.amount}</div>
                        <div className="flex items-center justify-end gap-1 text-xs text-green-600 mt-0.5">
                          <CheckCircle2 size={12} /> {claim.status}
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-md">
            <h3 className="font-medium text-blue-100 mb-1">Health Insurance Balance</h3>
            <div className="text-3xl font-bold mb-4">THB 45,000<span className="text-lg text-blue-200 font-normal">/yr</span></div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-100">Used</span>
                <span className="font-medium">THB 5,000</span>
              </div>
              <div className="w-full bg-blue-900/50 rounded-full h-2">
                <div className="bg-white rounded-full h-2 w-[11%]"></div>
              </div>
              <div className="flex justify-between text-xs text-blue-200 mt-1">
                <span>11% Utilized</span>
                <span>Resets Jan 1</span>
              </div>
            </div>
          </div>

          {/* Useful Documents */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Useful Documents</h3>
            <div className="space-y-3">
              {[
                { title: "Employee Benefits Guide 2026", size: "2.4 MB" },
                { title: "Health Insurance Claim Form", size: "850 KB" },
                { title: "Provident Fund Factsheet", size: "1.2 MB" }
              ].map((doc, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group cursor-pointer">
                  <div className="p-2 bg-gray-50 group-hover:bg-white rounded text-gray-400 group-hover:text-blue-600 transition-colors">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-700">{doc.title}</div>
                    <div className="text-xs text-gray-500">{doc.size} • PDF</div>
                  </div>
                  <Download size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart size={24} />
            </div>
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
            <p className="text-sm text-gray-500 mt-1 mb-4">Contact HR Operations for questions regarding your benefits.</p>
            <button className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Contact HR Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
