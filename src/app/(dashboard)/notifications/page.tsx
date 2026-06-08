import { getUserNotifications } from "@/modules/notification/actions"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Bell, Info, AlertTriangle, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Notifications | Confide Portal",
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'SYSTEM': return <Info className="w-5 h-5 text-primary" />
    case 'ALERT': return <AlertTriangle className="w-5 h-5 text-[#dd5b00]" />
    case 'SUCCESS': return <CheckCircle2 className="w-5 h-5 text-[#1aae39]" />
    default: return <Bell className="w-5 h-5 text-ink-muted" />
  }
}

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const notifications = await getUserNotifications(session.user.id)

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div className="flex items-center justify-between border-b border-hairline pb-8">
        <div>
          <h1 className="font-ibm text-heading-1 font-bold text-ink tracking-tight">Notifications</h1>
          <p className="font-sarabun text-ink-muted text-lg mt-1">Your recent alerts and system messages.</p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-canvas-soft rounded-xl p-16 text-center border border-hairline">
            <Bell className="w-12 h-12 mx-auto text-ink-faint mb-4" />
            <h3 className="font-ibm text-heading-3 font-bold text-ink">You're all caught up!</h3>
            <p className="font-sarabun text-ink-secondary mt-2 text-lg">No new notifications at this time.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`flex items-start gap-4 p-5 rounded-xl border transition-all ${
                notif.isRead 
                  ? 'bg-canvas-soft border-hairline shadow-none opacity-70' 
                  : 'bg-surface border-primary/20 shadow-soft'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h4 className={`font-ibm text-lg ${notif.isRead ? 'text-ink-secondary' : 'text-ink font-bold'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-sm font-sarabun text-ink-faint whitespace-nowrap">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`font-sarabun mt-1 text-base ${notif.isRead ? 'text-ink-muted' : 'text-ink-secondary'}`}>
                  {notif.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
