import { getAuditLogs } from "@/modules/audit/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const metadata = {
  title: "Audit Logs | Confide Portal",
}

function getActionIcon(action: string) {
  switch (action) {
    case 'LOGIN': return 'login'
    case 'EMPLOYEE_CREATED': return 'person_add'
    case 'ROLE_ASSIGNED': return 'shield'
    default: return 'activity'
  }
}

export default async function AuditPage() {
  const logs = await getAuditLogs(50)

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">System</p>
          <h1 className="text-headline-xl text-on-surface mt-1">System Audit Log</h1>
          <p className="text-body-md text-secondary mt-1">Immutable record of all system events and user actions.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-[#e2e8f0] p-2 rounded-lg text-secondary hover:bg-surface-container-low transition-all">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
          <button className="bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg font-bold text-body-md hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export
          </button>
        </div>
      </div>

      {/* Audit Table */}
      <div className="data-card bg-white rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-lowest border-b border-[#e2e8f0] hover:bg-transparent">
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Timestamp</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Action</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Actor</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Resource</TableHead>
              <TableHead className="text-label-sm text-secondary uppercase tracking-wider h-12 px-6">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-secondary text-body-md border-0">
                  No audit logs found.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id} className="border-b border-[#e2e8f0] last:border-0 hover:bg-surface-container-low transition-colors">
                  <TableCell className="px-6 text-mono-data text-secondary whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">{getActionIcon(log.action)}</span>
                      <span className="text-body-md text-on-surface font-semibold">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
                    {log.user ? (
                      <div>
                        <p className="text-body-md text-on-surface font-semibold">{log.user.name}</p>
                        <p className="text-label-sm text-secondary">{log.user.email}</p>
                      </div>
                    ) : (
                      <span className="chip-neutral">SYSTEM</span>
                    )}
                  </TableCell>
                  <TableCell className="px-6">
                    <span className="chip-info">
                      <span className="material-symbols-outlined text-[14px]">database</span>
                      {log.resource}
                    </span>
                    {log.resourceId && (
                      <p className="text-mono-data text-secondary mt-1 text-[11px]">{log.resourceId}</p>
                    )}
                  </TableCell>
                  <TableCell className="px-6">
                    <pre className="text-[11px] text-secondary font-mono bg-surface-container-low p-3 rounded-lg border border-[#e2e8f0] max-w-xs overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
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
