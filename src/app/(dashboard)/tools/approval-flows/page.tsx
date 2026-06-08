import { getApprovalFlows } from "@/modules/approval/actions"
import { getRoles } from "@/modules/role/actions"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Workflow, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Approval Flows | Confide Portal",
}

export default async function ApprovalFlowsPage() {
  const flows = await getApprovalFlows()
  const roles = await getRoles()

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-hairline pb-8">
        <div>
          <h1 className="font-ibm text-heading-1 font-bold text-ink tracking-tight">Approval Flows</h1>
          <p className="font-sarabun text-ink-muted text-lg mt-1">Design and manage multi-step routing for internal requests.</p>
        </div>
        <Button className="bg-primary text-on-primary hover:bg-primary-active rounded-full px-5 py-2 font-sarabun font-medium h-auto shadow-soft">
          <Plus className="w-4 h-4 mr-2" />
          Create Flow
        </Button>
      </div>

      <div className="space-y-6">
        {flows.length === 0 ? (
          <div className="bg-canvas-soft rounded-xl p-16 text-center border border-hairline">
            <Workflow className="w-12 h-12 mx-auto text-ink-faint mb-4" />
            <h3 className="font-ibm text-heading-3 font-bold text-ink">No Workflows Configured</h3>
            <p className="font-sarabun text-ink-secondary mt-2 text-lg">Create your first approval flow to start routing requests.</p>
          </div>
        ) : (
          flows.map((flow: any) => (
            <div key={flow.id} className="bg-surface rounded-xl border border-hairline shadow-soft overflow-hidden">
              <div className="p-6 border-b border-hairline flex items-center justify-between bg-canvas-soft">
                <div>
                  <h3 className="font-ibm font-bold text-lg text-ink">{flow.name}</h3>
                  {flow.description && <p className="font-sarabun text-sm text-ink-secondary mt-1">{flow.description}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-sarabun text-ink-muted bg-[#e6e6e6] px-2 py-1 rounded-sm">
                    {flow._count.requests} requests
                  </span>
                  <Button variant="outline" size="sm" className="font-sarabun text-xs h-8 border-hairline">Edit Flow</Button>
                </div>
              </div>
              <div className="p-6 bg-surface">
                <p className="font-sarabun text-xs font-semibold text-ink-faint uppercase tracking-wider mb-4">Routing Sequence</p>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  <div className="flex items-center justify-center h-10 px-4 bg-[#f6f5f4] border border-hairline rounded-md font-sarabun text-sm font-medium text-ink-secondary flex-shrink-0">
                    Requester
                  </div>
                  {flow.steps.length === 0 ? (
                    <>
                      <ArrowRight className="w-4 h-4 text-ink-faint flex-shrink-0" />
                      <div className="flex items-center justify-center h-10 px-4 border border-dashed border-hairline rounded-md font-sarabun text-sm text-ink-faint bg-surface flex-shrink-0">
                        No steps defined
                      </div>
                    </>
                  ) : (
                    flow.steps.map((step: any, idx: number) => {
                      const roleName = roles.find(r => r.id === step.approverRoleId)?.name || "Specific User"
                      return (
                        <div key={step.id} className="flex items-center gap-3 flex-shrink-0">
                          <ArrowRight className="w-4 h-4 text-ink-faint" />
                          <div className="flex items-center justify-center h-10 px-4 bg-[#e3f2fd] border border-[#bbdefb] rounded-md font-sarabun text-sm font-medium text-primary">
                            <span className="opacity-50 mr-2 text-xs">{step.stepOrder}.</span>
                            {roleName}
                          </div>
                        </div>
                      )
                    })
                  )}
                  <ArrowRight className="w-4 h-4 text-ink-faint flex-shrink-0" />
                  <div className="flex items-center justify-center h-10 px-4 bg-[#e8f5e9] border border-[#c8e6c9] rounded-md font-sarabun text-sm font-medium text-[#1aae39] flex-shrink-0">
                    Done
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
