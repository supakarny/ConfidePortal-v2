import { getPendingApprovalsForUser } from "@/modules/approval/actions"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Approval Inbox | Confide Portal",
}

export default async function ApprovalsInboxPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const pendingRequests = await getPendingApprovalsForUser(session.user.id, session.user.roleId)

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Tools</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Approvals Inbox</h1>
        <p className="text-body-md text-secondary mt-1">Review and process requests awaiting your approval.</p>
      </div>

      {/* Request List */}
      <div className="space-y-4">
        {pendingRequests.length === 0 ? (
          <div className="data-card bg-white rounded-xl p-16 text-center hover:transform-none">
            <span className="material-symbols-outlined text-[48px] text-outline mb-4">inbox</span>
            <h3 className="text-headline-md text-on-surface">Inbox Zero!</h3>
            <p className="text-body-lg text-secondary mt-2">You have no pending requests to review.</p>
          </div>
        ) : (
          pendingRequests.map((req: any) => {
            const payloadString = JSON.stringify(req.payload)

            return (
              <div key={req.id} className="data-card bg-white rounded-xl overflow-hidden flex flex-col sm:flex-row hover:transform-none">
                <div className="p-6 flex-1 border-b sm:border-b-0 sm:border-r border-[#e2e8f0]">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="chip-info">
                        {req.flow.name}
                      </span>
                      <h3 className="text-headline-md text-on-surface mt-3">Request #{req.id.slice(-6)}</h3>
                      <p className="text-body-md text-secondary mt-1">
                        Submitted by <span className="font-semibold text-on-surface">{req.requester.name}</span> on {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-surface-container-low rounded-lg border border-[#e2e8f0]">
                    <p className="text-label-sm text-secondary uppercase tracking-wider mb-2">Request Details</p>
                    <pre className="text-mono-data text-secondary whitespace-pre-wrap">{payloadString}</pre>
                  </div>
                </div>

                <div className="p-6 sm:w-64 bg-surface-container-lowest flex flex-col justify-center gap-3">
                  <p className="text-body-md text-secondary text-center mb-2">
                    Step {req.currentStepOrder} of {Math.max(...req.flow.steps.map((s: any) => s.stepOrder))}
                  </p>
                  <form className="w-full">
                    <Button type="button" className="w-full bg-success text-white hover:bg-success/90 rounded-lg font-bold text-body-md flex items-center justify-center gap-2 py-2.5 h-auto">
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      Approve
                    </Button>
                  </form>
                  <form className="w-full">
                    <Button type="button" variant="outline" className="w-full rounded-lg text-error border-error hover:bg-error-container font-bold text-body-md flex items-center justify-center gap-2 py-2.5 h-auto">
                      <span className="material-symbols-outlined text-[20px]">cancel</span>
                      Reject
                    </Button>
                  </form>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
