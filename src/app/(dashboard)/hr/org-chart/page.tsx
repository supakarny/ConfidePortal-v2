"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronRight, User, Users, ZoomIn, ZoomOut, Maximize, FileText } from "lucide-react"

export default function OrgChartPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    root: true,
    exec: true,
    tech: true,
  })

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Simplified Org Chart Data
  const orgData = {
    id: "root",
    name: "Board of Directors",
    title: "Confide Technology Co., Ltd.",
    children: [
      {
        id: "exec",
        name: "Arunee S.",
        title: "Chief Executive Officer (CEO)",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        children: [
          {
            id: "tech",
            name: "Supakarn Y.",
            title: "Chief Technology Officer (CTO)",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
            children: [
              {
                id: "eng",
                name: "Engineering Team",
                title: "Software & Hardware",
                count: 42
              },
              {
                id: "it",
                name: "IT Infrastructure",
                title: "Networks & Security",
                count: 15
              }
            ]
          },
          {
            id: "ops",
            name: "Piyapat K.",
            title: "Chief Operating Officer (COO)",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024f",
            children: [
              {
                id: "hr",
                name: "Human Resources",
                title: "Talent & Culture",
                count: 12
              },
              {
                id: "fac",
                name: "Facilities Management",
                title: "Operations",
                count: 28
              }
            ]
          }
        ]
      }
    ]
  }

  const renderNode = (node: any, level = 0) => {
    const isExpanded = expandedNodes[node.id]
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Card */}
        <div 
          className={`relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm w-64 transition-all duration-200 hover:shadow-md hover:border-blue-300 z-10
            ${level === 0 ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200 shadow-md' : ''}`}
        >
          <div className="flex items-center gap-3">
            {node.avatar ? (
              <img src={node.avatar} alt={node.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white shadow-sm">
                {node.count ? <Users size={20} /> : <User size={20} />}
              </div>
            )}
            <div>
              <div className="font-semibold text-gray-900 text-sm leading-tight">{node.name}</div>
              <div className="text-xs text-gray-500 mt-1">{node.title}</div>
              {node.count && (
                <div className="text-xs text-blue-600 font-medium mt-1 bg-blue-50 inline-block px-2 py-0.5 rounded-full">
                  {node.count} Members
                </div>
              )}
            </div>
          </div>
          
          {hasChildren && (
            <button 
              onClick={() => toggleNode(node.id)}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-sm text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors z-20"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>

        {/* Children Tree */}
        {hasChildren && isExpanded && (
          <div className="relative mt-6 pt-6 flex justify-center gap-8 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-6 before:bg-gray-300 after:content-[''] after:absolute after:top-6 after:left-[calc(50%-var(--line-width))] after:w-[calc(var(--line-width)*2)] after:h-px after:bg-gray-300">
            {/* The CSS var approach for dynamic line width is complex in pure Tailwind static, we'll use a visual trick or simplified tree */}
            {/* Using a simpler visual approach for the connecting lines */}
            
            <div className="flex gap-6 relative" style={{"--line-width": "50%"} as React.CSSProperties}>
              {/* Horizontal Line connecting children */}
              {node.children.length > 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] h-px bg-gray-300"></div>
              )}
              
              {node.children.map((child: any) => (
                <div key={child.id} className="relative pt-6 flex flex-col items-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-gray-300"></div>
                  {renderNode(child, level + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Organization Chart (Test)</h1>
          <p className="text-gray-500 text-sm mt-1">Explore company structure and team hierarchies</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search people, teams..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors shadow-sm">
            <FileText size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden min-h-[600px] flex flex-col relative">
        {/* Controls Overlay */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200 z-50">
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors" title="Zoom In">
            <ZoomIn size={18} />
          </button>
          <div className="w-full h-px bg-gray-100"></div>
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors" title="Zoom Out">
            <ZoomOut size={18} />
          </button>
          <div className="w-full h-px bg-gray-100"></div>
          <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors" title="Fit to Screen">
            <Maximize size={18} />
          </button>
        </div>

        {/* Chart Canvas */}
        <div className="flex-1 overflow-auto p-12 flex justify-center items-start">
          <div className="min-w-max">
            {renderNode(orgData)}
          </div>
        </div>
      </div>
    </div>
  )
}
