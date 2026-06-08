import { getRoles, getUsersWithRoles } from "@/modules/role/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Shield, Plus } from "lucide-react"

export const metadata = {
  title: "Roles & Permissions | Confide Portal",
}

export default async function RolesPage() {
  const roles = await getRoles()
  const users = await getUsersWithRoles()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-hairline pb-8">
        <div>
          <h1 className="font-ibm text-heading-1 font-bold text-ink tracking-tight">Roles & Permissions</h1>
          <p className="font-sarabun text-ink-muted text-lg mt-1">Manage granular access control and assign roles to users.</p>
        </div>
        <Button className="bg-surface text-ink border border-hairline hover:bg-canvas-soft rounded-md px-4 py-2 font-sarabun font-medium h-auto shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="bg-surface p-6 rounded-xl border border-hairline shadow-soft cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-canvas-soft rounded-md">
                    <Shield className="w-5 h-5 text-ink-muted group-hover:text-ink transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-ibm font-bold text-lg text-ink tracking-tight">{role.name}</h3>
                    <p className="font-sarabun text-sm text-ink-faint">{role._count.users} users assigned</p>
                  </div>
                </div>
              </div>
              {role.description && (
                <p className="mt-4 font-sarabun text-sm text-ink-secondary leading-relaxed">{role.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* User-Role Mapping Table */}
        <div className="lg:col-span-2 bg-surface rounded-xl shadow-soft border border-hairline overflow-hidden flex flex-col">
          <div className="p-6 border-b border-hairline bg-canvas-soft">
            <h3 className="font-ibm font-bold text-lg text-ink tracking-tight">User Role Assignments</h3>
            <p className="font-sarabun text-sm text-ink-secondary mt-1">Select users to change their system access level.</p>
          </div>
          
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="bg-surface">
                <TableRow className="border-b border-hairline hover:bg-transparent">
                  <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">User</TableHead>
                  <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Department</TableHead>
                  <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Assigned Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12 text-ink-muted font-sarabun border-0">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} className="border-b border-hairline last:border-0 hover:bg-[#fcfcfc] transition-colors">
                      <TableCell>
                        <p className="font-sarabun font-medium text-ink">{user.name}</p>
                        <p className="font-sarabun text-sm text-ink-faint">{user.email}</p>
                      </TableCell>
                      <TableCell className="font-sarabun text-ink-secondary">
                        {user.employee?.department?.name || '-'}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-xs font-sarabun font-medium border ${
                          user.role?.name === 'ADMIN'
                            ? 'bg-[#e3f2fd] text-primary border-[#bbdefb]'
                            : 'bg-[#f3f3f3] text-ink border-[#e0e0e0]'
                        }`}>
                          {user.role?.name || 'Unassigned'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
