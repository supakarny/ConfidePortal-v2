import { getRoles, getUsersWithRoles } from "@/modules/role/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata = {
  title: "Roles & Permissions | Confide Portal",
}

export default async function RolesPage() {
  const roles = await getRoles()
  const users = await getUsersWithRoles()

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Roles & Permissions</h1>
          <p className="text-body-md text-secondary mt-1">Manage granular access control and assign roles.</p>
        </div>
        <button className="bg-white text-on-surface border border-[#e2e8f0] px-5 py-2.5 rounded-lg font-bold text-body-md hover:bg-surface-container-low transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-3">
          {roles.map((role) => (
            <div key={role.id} className="data-card bg-white p-5 rounded-xl cursor-pointer group border-l-4 border-l-primary">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-container/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-headline-md text-on-surface leading-tight">{role.name}</h3>
                  <p className="text-label-sm text-secondary mt-1">{role._count.users} users assigned</p>
                  {role.description && (
                    <p className="text-body-md text-secondary mt-2 leading-relaxed">{role.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User-Role Mapping Table */}
        <div className="lg:col-span-2 data-card bg-white rounded-xl overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[#e2e8f0]">
            <h3 className="text-headline-md text-on-surface">User Role Assignments</h3>
            <p className="text-body-md text-secondary mt-1">Select users to change their system access level.</p>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-container-lowest border-b border-[#e2e8f0] hover:bg-transparent">
                  <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">User</TableHead>
                  <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Department</TableHead>
                  <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Assigned Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12 text-secondary text-body-md border-0">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-surface-container-low transition-colors">
                      <TableCell className="px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-label-sm">
                            {user.name?.[0] || '?'}
                          </div>
                          <div>
                            <p className="text-body-md text-on-surface font-semibold">{user.name}</p>
                            <p className="text-label-sm text-secondary">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 text-body-md text-secondary">
                        {user.employee?.department?.name || '-'}
                      </TableCell>
                      <TableCell className="px-6">
                        <span className={`${
                          user.role?.name === 'ADMIN'
                            ? 'chip-info'
                            : 'chip-neutral'
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
