import { getEmployees } from "@/modules/employee/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata = {
  title: "Employee Directory | Confide Portal",
}

export default async function EmployeesPage() {
  const employees = await getEmployees()

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Employee Directory</h1>
          <p className="text-body-md text-secondary mt-1">Manage personnel, departments, and roles.</p>
        </div>
        <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-body-md hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Add Employee
        </button>
      </div>

      {/* Data Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-lowest border-b border-[#e2e8f0] hover:bg-transparent">
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Code</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Name</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Contact</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Department</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Role</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Status</TableHead>
              <TableHead className="text-right h-12 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-secondary text-body-md border-0">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => (
                <TableRow key={emp.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-surface-container-low transition-colors">
                  <TableCell className="px-6 text-mono-data text-secondary">{emp.employeeCode}</TableCell>
                  <TableCell className="px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-label-sm">
                        {emp.firstName?.[0]}{emp.lastName?.[0]}
                      </div>
                      <div>
                        <p className="text-body-md text-on-surface font-semibold">{emp.firstName} {emp.lastName}</p>
                        {emp.user && <p className="text-label-sm text-secondary">{emp.user.email}</p>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 text-body-md text-secondary">{emp.phone || '-'}</TableCell>
                  <TableCell className="px-6">
                    <p className="text-body-md text-on-surface">{emp.department?.name || '-'}</p>
                    <p className="text-label-sm text-secondary">{emp.position?.name || '-'}</p>
                  </TableCell>
                  <TableCell className="px-6">
                    {emp.user?.role ? (
                      <span className="chip-info">{emp.user.role.name}</span>
                    ) : (
                      <span className="text-label-sm text-secondary italic">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="px-6">
                    <span className={emp.status === 'ACTIVE' ? 'chip-success' : 'chip-neutral'}>
                      <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}></span>
                      {emp.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <button className="p-2 text-secondary hover:text-primary hover:bg-surface-container-low rounded-lg transition-all">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
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
