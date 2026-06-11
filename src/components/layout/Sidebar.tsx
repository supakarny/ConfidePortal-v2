"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

/* ═══════════════════════════════════════════════════════════
   Navigation Structure — from Navigation.md
   ═══════════════════════════════════════════════════════════ */
interface NavItem {
  label: string
  href?: string
  icon: string
  children?: NavItem[]
}

const navigation: { section: string; items: NavItem[] }[] = [
  {
    section: "",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "space_dashboard" },
    ],
  },
  {
    section: "Tools",
    items: [
      { label: "Approval & Sign (Test)", href: "/tools/approval-sign", icon: "approval" },
      { label: "Request Approval (Test)", href: "/tools/request-approval", icon: "pending_actions" },
      { label: "E-Document Approval (Test)", href: "/tools/e-document-approval", icon: "description" },
      { label: "Messenger (Test)", href: "/tools/messenger", icon: "chat" },
      { label: "Knowledge Hub (Test)", href: "/tools/knowledge-hub", icon: "school" },
      { label: "QR & Barcode (Test)", href: "/tools/qr-scanner", icon: "qr_code_scanner" },
    ],
  },
  {
    section: "HR & Facility",
    items: [
      {
        label: "General", icon: "groups", children: [
          { label: "Announcement (Test)", href: "/hr/announcement", icon: "campaign" },
          { label: "Company Calendar (Test)", href: "/hr/calendar", icon: "calendar_month" },
          { label: "Employee Contact (Test)", href: "/hr/contacts", icon: "contacts" },
          { label: "Organization Chart (Test)", href: "/hr/org-chart", icon: "account_tree" },
          { label: "Profile Editor (Test)", href: "/hr/profile-editor", icon: "edit_note" },
        ]
      },
      {
        label: "Attendance", icon: "schedule", children: [
          { label: "Leave Requests (Test)", href: "/hr/leave-requests", icon: "event_busy" },
          { label: "Late Arrival (Test)", href: "/hr/late-arrival", icon: "alarm" },
          { label: "Overtime (Test)", href: "/hr/overtime", icon: "more_time" },
          { label: "Attendance Record (Test)", href: "/hr/attendance-record", icon: "fact_check" },
          { label: "Management (Test)", href: "/hr/attendance-management", icon: "admin_panel_settings" },
        ]
      },
      {
        label: "Fleet", icon: "directions_car", children: [
          { label: "Overall Status (Test)", href: "/hr/fleet/status", icon: "analytics" },
          { label: "Advance Booking (Test)", href: "/hr/fleet/booking", icon: "event_available" },
          { label: "Accident Report (Test)", href: "/hr/fleet/accident-report", icon: "car_crash" },
          { label: "Maintenance (Test)", href: "/hr/fleet/maintenance", icon: "build" },
          { label: "Vehicle Mgmt. (Test)", href: "/hr/fleet/vehicles", icon: "garage" },
        ]
      },
      {
        label: "Facility", icon: "apartment", children: [
          { label: "Facility Status (Test)", href: "/hr/facility/status", icon: "domain" },
          { label: "Maintenance (Test)", href: "/hr/facility/maintenance", icon: "handyman" },
          { label: "Assets Mgmt. (Test)", href: "/hr/facility/assets", icon: "inventory" },
        ]
      },
      {
        label: "Appraisals", icon: "grade", children: [
          { label: "Report (Test)", href: "/hr/appraisals/report", icon: "assessment" },
          { label: "Calendar (Test)", href: "/hr/appraisals/calendar", icon: "date_range" },
          { label: "Templates (Test)", href: "/hr/appraisals/templates", icon: "content_paste" },
          { label: "Report Mgmt. (Test)", href: "/hr/appraisals/report-management", icon: "summarize" },
        ]
      },
      {
        label: "Survey", icon: "poll", children: [
          { label: "Dashboard (Test)", href: "/hr/survey/dashboard", icon: "bar_chart" },
          { label: "Management (Test)", href: "/hr/survey/management", icon: "edit_document" },
        ]
      },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Payroll Report (Test)", href: "/finance/payroll", icon: "account_balance" },
      {
        label: "Claim", icon: "receipt_long", children: [
          { label: "General Claim (Test)", href: "/finance/claims/general", icon: "request_quote" },
          { label: "Travel Expense (Test)", href: "/finance/claims/travel", icon: "flight" },
        ]
      },
      { label: "Expense Approval (Test)", href: "/finance/expense-approval", icon: "price_check" },
      {
        label: "Claim Mgmt.", icon: "settings", children: [
          { label: "Sales Claim (Test)", href: "/finance/claim-management/sales", icon: "point_of_sale" },
          { label: "General Claim (Test)", href: "/finance/claim-management/general", icon: "receipt" },
        ]
      },
    ],
  },
  {
    section: "Sales & Marketing",
    items: [
      {
        label: "Sales Activity", icon: "trending_up", children: [
          { label: "Daily Check In (Test)", href: "/sales/daily-checkin", icon: "location_on" },
          { label: "Reports (Test)", href: "/sales/reports", icon: "leaderboard" },
        ]
      },
      {
        label: "Claim", icon: "receipt_long", children: [
          { label: "Travel Expense (Test)", href: "/sales/claims/travel", icon: "flight" },
          { label: "Petty Cash (Test)", href: "/sales/claims/petty-cash", icon: "payments" },
        ]
      },
      { label: "Quotation (Test)", href: "/sales/quotation", icon: "request_page" },
      { label: "Project Tracking (Test)", href: "/sales/project-tracking", icon: "timeline" },
    ],
  },
  {
    section: "Sales Support",
    items: [
      { label: "Work Order (Test)", href: "/sales-support/work-order", icon: "assignment" },
      { label: "Task Board (Test)", href: "/sales-support/task-board", icon: "view_kanban" },
      { label: "Test Reports (Test)", href: "/sales-support/test-reports", icon: "science" },
      { label: "Workload Calendar (Test)", href: "/sales-support/workload-calendar", icon: "calendar_view_month" },
    ],
  },
  {
    section: "Service",
    items: [
      {
        label: "Office Sector", icon: "business", children: [
          { label: "Field Service Req. (Test)", href: "/service/office/field-service", icon: "engineering" },
          { label: "Service Project (Test)", href: "/service/office/projects", icon: "folder_special" },
          { label: "Assignment (Test)", href: "/service/office/assignments", icon: "assignment_ind" },
          { label: "Manhour Tracking (Test)", href: "/service/office/manhour", icon: "hourglass_top" },
          { label: "Workload Calendar (Test)", href: "/service/office/workload", icon: "calendar_view_month" },
          { label: "Reports (Test)", href: "/service/office/reports", icon: "summarize" },
        ]
      },
      {
        label: "Field Sector", icon: "construction", children: [
          { label: "Check in/out (Test)", href: "/service/field/checkin", icon: "pin_drop" },
        ]
      },
    ],
  },
  {
    section: "Admin Console",
    items: [
      {
        label: "User Accounts", icon: "manage_accounts", children: [
          { label: "Employee Directory", href: "/employees", icon: "badge" },
          { label: "Module Permissions (Test)", href: "/admin/permissions", icon: "vpn_key" },
        ]
      },
      { label: "Departments & Roles", href: "/roles", icon: "corporate_fare" },
      { label: "Approval Flows", href: "/tools/approval-flows", icon: "device_hub" },
      { label: "Field Management (Test)", href: "/admin/fields", icon: "tune" },
      { label: "Knowledge Hub Mgmt. (Test)", href: "/admin/knowledge-hub", icon: "library_books" },
      { label: "Content Management (Test)", href: "/admin/content", icon: "edit_note" },
      { label: "Admin Roles (Test)", href: "/admin/admin-roles", icon: "shield_person" },
      {
        label: "Audit Log", icon: "history", children: [
          { label: "Module Settings (Test)", href: "/admin/audit/module", icon: "settings_applications" },
          { label: "User & Security (Test)", href: "/admin/audit/security", icon: "security" },
          { label: "Admin Events (Test)", href: "/admin/audit/admin", icon: "admin_panel_settings" },
        ]
      },
    ],
  },
  {
    section: "Settings",
    items: [
      { label: "My Profile (Test)", href: "/settings/profile", icon: "person" },
      { label: "System Settings (Test)", href: "/settings/system", icon: "settings" },
    ],
  },
  {
    section: "",
    items: [
      { label: "Help (Test)", href: "/help", icon: "help" },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════ */

function NavLink({
  item,
  depth = 0,
  isCollapsed,
  onUncollapse
}: {
  item: NavItem;
  depth?: number;
  isCollapsed?: boolean;
  onUncollapse?: () => void;
}) {
  const pathname = usePathname()
  const isActive = item.href ? pathname === item.href : false
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  // Auto-expand if a child is active
  const childIsActive = hasChildren && item.children!.some(
    c => c.href === pathname || c.children?.some(gc => gc.href === pathname)
  )

  useEffect(() => {
    if (isCollapsed) {
      setOpen(false);
    } else if (childIsActive) {
      setOpen(true);
    }
  }, [isCollapsed, childIsActive]);

  const isExpanded = open || (childIsActive && !isCollapsed)

  const handleGroupClick = () => {
    if (isCollapsed && onUncollapse) {
      onUncollapse();
      setOpen(true);
    } else {
      setOpen(!isExpanded);
    }
  }

  if (hasChildren) {
    return (
      <div className="relative group/navitem">
        <button
          onClick={handleGroupClick}
          className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors text-body-md
            ${!isCollapsed && depth > 0 ? "pl-9" : ""}
            ${isCollapsed ? "justify-center" : "gap-2.5"}
            ${childIsActive
              ? "text-primary font-semibold bg-surface-container-low"
              : "text-secondary hover:text-on-surface hover:bg-surface-container-low"
            }`}
          title={isCollapsed ? item.label : undefined}
        >
          <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>

          {!isCollapsed && (
            <>
              <span className="flex-1 whitespace-normal break-words leading-tight py-0.5">{item.label}</span>
              <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                expand_more
              </span>
            </>
          )}
        </button>
        {isExpanded && !isCollapsed && (
          <div className="mt-0.5 space-y-0.5">
            {item.children!.map((child) => (
              <NavLink
                key={child.label}
                item={child}
                depth={depth + 1}
                isCollapsed={isCollapsed}
                onUncollapse={onUncollapse}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!item.href) return null

  return (
    <Link
      href={item.href}
      title={isCollapsed ? item.label : undefined}
      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-150 text-body-md
        ${!isCollapsed && depth > 0 ? "pl-9" : ""}
        ${isCollapsed ? "justify-center" : "gap-2.5"}
        ${isActive
          ? "bg-primary-container text-on-primary-container font-semibold"
          : "text-secondary hover:text-on-surface hover:bg-surface-container-low"
        }`}
    >
      <span className="material-symbols-outlined text-[20px] shrink-0">{item.icon}</span>
      {!isCollapsed && (
        <span className="flex-1 whitespace-normal break-words leading-tight py-0.5">{item.label}</span>
      )}
    </Link>
  )
}

export default function Sidebar({
  isCollapsed = false,
  onToggle
}: {
  isCollapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <aside
      className={`bg-white border-r border-[#e2e8f0] flex flex-col fixed h-full z-50 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-[80px]' : 'w-[260px]'
        }`}
    >
      {/* Brand Header */}
      <div className={`flex items-center border-b border-[#e2e8f0] transition-all duration-300 ${isCollapsed ? 'p-5 justify-center' : 'px-4 py-5 justify-between'}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="bg-primary-container p-2 rounded-lg shrink-0">
            <span className="material-symbols-outlined text-white text-[22px]">bolt</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <h1 className="text-headline-md font-bold text-primary leading-tight whitespace-nowrap">Confide</h1>
              <p className="text-[10px] text-secondary uppercase tracking-wider whitespace-nowrap">Internal Hub</p>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggle}
          className={`text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-lg transition-colors ${isCollapsed ? 'absolute -right-10' : ''}`}
          style={isCollapsed ? { display: 'none' } : {}}
        >
          <span className="material-symbols-outlined text-[20px]">
            menu_open
          </span>
        </button>
      </div>

      {isCollapsed && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              menu
            </span>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar py-3 space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
        {navigation.map((group, groupIdx) => (
          <div key={groupIdx} className={group.section ? "mt-4 first:mt-0" : ""}>
            {group.section && !isCollapsed && (
              <p className="px-3 py-1.5 text-label-sm text-secondary uppercase tracking-wider">
                {group.section}
              </p>
            )}
            {group.section && isCollapsed && (
              <div className="w-8 h-px bg-gray-200 mx-auto my-3" />
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.label + (item.href || "")}
                  item={item}
                  isCollapsed={isCollapsed}
                  onUncollapse={onToggle}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className={`p-3 border-t border-[#e2e8f0] ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title={isCollapsed ? "Log out" : undefined}
          className={`flex items-center text-body-md text-secondary hover:text-error hover:bg-error-container/30 rounded-lg transition-colors
            ${isCollapsed ? "justify-center p-2" : "w-full gap-2.5 px-3 py-2"}
          `}
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  )
}
