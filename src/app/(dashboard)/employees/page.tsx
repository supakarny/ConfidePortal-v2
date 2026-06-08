import { getEmployees } from "@/modules/employee/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"

export const metadata = {
  title: "Employee Directory | Confide Portal",
}

export default async function EmployeesPage() {
  const employees = await getEmployees()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-hairline pb-8">
        <div>
          <h1 className="font-ibm text-heading-1 font-bold text-ink tracking-tight">Employee Directory</h1>
          <p className="font-sarabun text-ink-muted text-lg mt-1">Manage personnel, departments, and roles.</p>
        </div>
        <Button className="bg-primary text-on-primary hover:bg-primary-active rounded-full px-5 py-2 font-sarabun font-medium h-auto shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="bg-surface rounded-xl shadow-soft border border-hairline overflow-hidden">
        <Table>
          <TableHeader className="bg-canvas-soft border-b border-hairline">
            <TableRow className="hover:bg-transparent border-0">
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Code</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Name</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Contact</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Department</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Role</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Status</TableHead>
              <TableHead className="text-right h-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-ink-muted font-sarabun border-0">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => (
                <TableRow key={emp.id} className="border-b border-hairline last:border-0 hover:bg-[#fcfcfc] transition-colors">
                  <TableCell className="font-ibm font-medium text-ink-muted">{emp.employeeCode}</TableCell>
                  <TableCell>
                    <p className="font-sarabun font-medium text-ink">{emp.firstName} {emp.lastName}</p>
                    {emp.user && <p className="font-sarabun text-sm text-ink-faint">{emp.user.email}</p>}
                  </TableCell>
                  <TableCell className="font-sarabun text-ink-secondary">{emp.phone || '-'}</TableCell>
                  <TableCell>
                    <p className="font-sarabun text-ink">{emp.department?.name || '-'}</p>
                    <p className="font-sarabun text-sm text-ink-faint">{emp.position?.name || '-'}</p>
                  </TableCell>
                  <TableCell>
                    {emp.user?.role ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] text-xs font-sarabun font-medium bg-[#f3f3f3] text-ink border border-[#e0e0e0]">
                        {emp.user.role.name}
                      </span>
                    ) : (
                      <span className="text-xs text-ink-faint italic font-sarabun">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-xs font-sarabun font-medium border ${
                      emp.status === 'ACTIVE' 
                        ? 'bg-[#e8f5e9] text-[#1aae39] border-[#c8e6c9]' 
                        : 'bg-[#f3f3f3] text-ink-muted border-[#e0e0e0]'
                    }`}>
                      {emp.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-ink-muted hover:text-ink hover:bg-canvas-soft h-8 w-8 rounded-md">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
