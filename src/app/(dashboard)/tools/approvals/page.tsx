import { getPendingApprovalsForUser } from "@/modules/approval/actions"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Inbox, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Approval Inbox | Confide Portal",
}

export default async function ApprovalsInboxPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const pendingRequests = await getPendingApprovalsForUser(session.user.id, session.user.roleId)

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-hairline pb-8">
        <div>
          <h1 className="font-ibm text-heading-1 font-bold text-ink tracking-tight">Approvals Inbox</h1>
          <p className="font-sarabun text-ink-muted text-lg mt-1">Review and process requests awaiting your approval.</p>
        </div>
      </div>

      <div className="space-y-4">
        {pendingRequests.length === 0 ? (
          <div className="bg-canvas-soft rounded-xl p-16 text-center border border-hairline">
            <Inbox className="w-12 h-12 mx-auto text-ink-faint mb-4" />
            <h3 className="font-ibm text-heading-3 font-bold text-ink">Inbox Zero!</h3>
            <p className="font-sarabun text-ink-secondary mt-2 text-lg">You have no pending requests to review.</p>
          </div>
        ) : (
          pendingRequests.map((req: any) => {
            const payloadString = JSON.stringify(req.payload)
            // Just extracting basic info from payload if it exists, otherwise dump JSON
            
            return (
              <div key={req.id} className="bg-surface rounded-xl border border-hairline shadow-soft overflow-hidden flex flex-col sm:flex-row">
                <div className="p-6 flex-1 border-b sm:border-b-0 sm:border-r border-hairline">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-ibm font-bold uppercase tracking-wider text-primary bg-[#e3f2fd] px-2 py-0.5 rounded-sm">
                        {req.flow.name}
                      </span>
                      <h3 className="font-ibm font-bold text-lg text-ink mt-2">Request #{req.id.slice(-6)}</h3>
                      <p className="font-sarabun text-sm text-ink-secondary mt-1">
                        Submitted by <span className="font-medium text-ink">{req.requester.name}</span> on {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-canvas-soft rounded-md border border-hairline">
                    <p className="font-sarabun text-xs font-semibold text-ink-faint uppercase tracking-wider mb-2">Request Details (Payload)</p>
                    <pre className="text-xs font-mono text-ink-secondary whitespace-pre-wrap">{payloadString}</pre>
                  </div>
                </div>
                
                <div className="p-6 sm:w-64 bg-canvas-soft flex flex-col justify-center gap-3">
                  <p className="font-sarabun text-sm text-ink-secondary text-center mb-2">
                    Step {req.currentStepOrder} of {Math.max(...req.flow.steps.map((s: any) => s.stepOrder))}
                  </p>
                  {/* These would ideally be Client Components wrapping server actions */}
                  <form className="w-full">
                    <Button type="button" className="w-full bg-[#1aae39] hover:bg-[#158f2f] text-white rounded-full font-sarabun font-medium shadow-soft">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </form>
                  <form className="w-full">
                    <Button type="button" variant="outline" className="w-full rounded-full font-sarabun text-[#dd5b00] border-[#dd5b00] hover:bg-[#fff2f2]">
                      <XCircle className="w-4 h-4 mr-2" />
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
