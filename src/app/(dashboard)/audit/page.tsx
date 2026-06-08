import { getAuditLogs } from "@/modules/audit/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Activity, ShieldAlert, UserPlus, LogIn, Database } from "lucide-react"

export const metadata = {
  title: "Audit Logs | Confide Portal",
}

function getActionIcon(action: string) {
  switch (action) {
    case 'LOGIN': return <LogIn className="w-4 h-4 text-ink-muted" />
    case 'EMPLOYEE_CREATED': return <UserPlus className="w-4 h-4 text-[#2a9d99]" />
    case 'ROLE_ASSIGNED': return <ShieldAlert className="w-4 h-4 text-[#dd5b00]" />
    default: return <Activity className="w-4 h-4 text-ink-faint" />
  }
}

export default async function AuditPage() {
  const logs = await getAuditLogs(50)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-hairline pb-8">
        <div>
          <h1 className="font-ibm text-heading-1 font-bold text-ink tracking-tight">System Audit Log</h1>
          <p className="font-sarabun text-ink-muted text-lg mt-1">Immutable record of all system events and user actions.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-soft border border-hairline overflow-hidden">
        <Table>
          <TableHeader className="bg-canvas-soft border-b border-hairline">
            <TableRow className="hover:bg-transparent border-0">
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Timestamp</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Action</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Actor</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Resource</TableHead>
              <TableHead className="font-sarabun font-semibold text-[12px] uppercase tracking-wider text-ink-muted h-10">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-ink-muted font-sarabun border-0">
                  No audit logs found.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id} className="border-b border-hairline last:border-0 hover:bg-[#fcfcfc] transition-colors">
                  <TableCell className="font-sarabun text-sm text-ink-secondary whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(log.action)}
                      <span className="font-sarabun font-medium text-ink">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.user ? (
                      <div>
                        <p className="font-sarabun font-medium text-ink">{log.user.name}</p>
                        <p className="font-sarabun text-sm text-ink-faint">{log.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-ink-faint font-sarabun italic">SYSTEM</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] bg-canvas-soft text-ink-secondary text-xs font-sarabun font-medium border border-hairline">
                      <Database className="w-3 h-3 mr-1 opacity-70" />
                      {log.resource}
                    </span>
                    {log.resourceId && (
                      <p className="text-[11px] text-ink-faint font-mono mt-1">{log.resourceId}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <pre className="text-[11px] text-ink-secondary font-mono bg-canvas-soft p-3 rounded-md border border-hairline max-w-xs overflow-x-auto whitespace-pre-wrap">
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
