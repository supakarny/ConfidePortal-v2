import { getApprovalFlows } from "@/modules/approval/actions"
import { getRoles } from "@/modules/role/actions"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Approval Flows | Confide Portal",
}

export default async function ApprovalFlowsPage() {
  const flows = await getApprovalFlows()
  const roles = await getRoles()

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-label-sm text-tertiary uppercase tracking-widest">Admin Console</p>
          <h1 className="text-headline-xl text-on-surface mt-1">Approval Flows</h1>
          <p className="text-body-md text-secondary mt-1">Design and manage multi-step routing for internal requests.</p>
        </div>
        <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-body-md hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Create Flow
        </button>
      </div>

      {/* Flow Cards */}
      <div className="space-y-4">
        {flows.length === 0 ? (
          <div className="data-card bg-white rounded-xl p-16 text-center hover:transform-none">
            <span className="material-symbols-outlined text-[48px] text-outline mb-4">device_hub</span>
            <h3 className="text-headline-md text-on-surface">No Workflows Configured</h3>
            <p className="text-body-lg text-secondary mt-2">Create your first approval flow to start routing requests.</p>
          </div>
        ) : (
          flows.map((flow: any) => (
            <div key={flow.id} className="data-card bg-white rounded-xl overflow-hidden hover:transform-none">
              {/* Flow Header */}
              <div className="px-6 py-5 border-b border-[#e2e8f0] flex items-center justify-between bg-surface-container-lowest">
                <div>
                  <h3 className="text-headline-md text-on-surface">{flow.name}</h3>
                  {flow.description && <p className="text-body-md text-secondary mt-1">{flow.description}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="chip-neutral">
                    {flow._count.requests} requests
                  </span>
                  <Button variant="outline" className="text-body-md h-9 border-[#e2e8f0] text-secondary hover:text-primary hover:border-primary">
                    Edit Flow
                  </Button>
                </div>
              </div>

              {/* Routing Sequence */}
              <div className="p-6 bg-white">
                <p className="text-label-sm text-secondary uppercase tracking-wider mb-4">Routing Sequence</p>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {/* Start: Requester */}
                  <div className="flex items-center justify-center h-10 px-4 bg-surface-container-low border border-[#e2e8f0] rounded-lg text-body-md font-semibold text-secondary flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px] mr-2">person</span>
                    Requester
                  </div>

                  {flow.steps.length === 0 ? (
                    <>
                      <span className="material-symbols-outlined text-outline text-[20px] flex-shrink-0">arrow_forward</span>
                      <div className="flex items-center justify-center h-10 px-4 border border-dashed border-outline-variant rounded-lg text-body-md text-secondary bg-white flex-shrink-0">
                        No steps defined
                      </div>
                    </>
                  ) : (
                    flow.steps.map((step: any) => {
                      const roleName = roles.find(r => r.id === step.approverRoleId)?.name || "Specific User"
                      return (
                        <div key={step.id} className="flex items-center gap-3 flex-shrink-0">
                          <span className="material-symbols-outlined text-outline text-[20px]">arrow_forward</span>
                          <div className="flex items-center justify-center h-10 px-4 bg-primary-container/10 border border-primary/20 rounded-lg text-body-md font-semibold text-primary">
                            <span className="opacity-50 mr-2 text-label-sm">{step.stepOrder}.</span>
                            {roleName}
                          </div>
                        </div>
                      )
                    })
                  )}

                  {/* End: Done */}
                  <span className="material-symbols-outlined text-outline text-[20px] flex-shrink-0">arrow_forward</span>
                  <div className="flex items-center justify-center h-10 px-4 bg-success-bg border border-success/20 rounded-lg text-body-md font-semibold text-success-text flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px] mr-2">check_circle</span>
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
