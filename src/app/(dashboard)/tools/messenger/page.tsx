"use client"

import { useState, useRef, useEffect } from "react"

export default function MessengerPage() {
  const [inputText, setInputText] = useState("")
  const [activeChat, setActiveChat] = useState<any>({
    id: "c-it",
    name: "#it-support",
    type: "channel",
    description: "Internal tech support and status notifications",
  })

  const [channels, setChannels] = useState([
    { id: "c-general", name: "#general", unread: false },
    { id: "c-it", name: "#it-support", unread: true },
    { id: "c-sales", name: "#sales-marketing", unread: false },
  ])

  const [dms, setDms] = useState([
    { id: "dm-supakarn", name: "Supakarn S. (Product)", status: "online", avatar: "S", unread: false },
    { id: "dm-somchai", name: "Somchai S. (Manager)", status: "away", avatar: "M", unread: false },
    { id: "dm-patsara", name: "Patsara K. (Finance)", status: "offline", avatar: "P", unread: false },
  ])

  const [messages, setMessages] = useState<any>({
    "c-general": [
      { sender: "System", text: "Welcome to #general channel! Let's work together.", time: "09:00", isSystem: true },
    ],
    "c-it": [
      { sender: "Kitti P.", avatar: "K", text: "Hi team, is the server maintenance still on for tonight?", time: "15:20" },
      { sender: "Anan S. (IT Support)", avatar: "A", text: "Yes, maintenance starts at 22:00. Expected downtime is 15 minutes.", time: "15:24" },
    ],
    "c-sales": [
      { sender: "Somsak D.", avatar: "S", text: "Hey! Just closed the Deal with Mega Corp! 🎉", time: "11:45" },
    ],
    "dm-supakarn": [
      { sender: "Supakarn S.", avatar: "S", text: "Hi, let me know when the UI mockup draft for Confide Portal is ready.", time: "14:10" },
    ],
    "dm-somchai": [
      { sender: "Somchai S.", avatar: "M", text: "Please submit your monthly expense claims by Friday.", time: "10:05" },
    ],
    "dm-patsara": [
      { sender: "Patsara K.", avatar: "P", text: "Sent the budget details to your email.", time: "Yesterday" },
    ],
  })

  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChat])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMessage = {
      sender: "You",
      avatar: "Y",
      text: inputText,
      time,
    }

    const chatMessages = messages[activeChat.id] || []
    setMessages({
      ...messages,
      [activeChat.id]: [...chatMessages, newMessage],
    })

    setInputText("")

    // Simulated auto response
    setTimeout(() => {
      let replyText = "Received! This is a simulated automated response from Confide AI."
      if (activeChat.id === "c-it") {
        replyText = "Sure, I have updated the ticket status. Let me know if you need anything else."
      } else if (activeChat.type === "dm") {
        replyText = `Thanks for the message! I'm currently reviewing this and will get back to you shortly.`
      }

      const replyMessage = {
        sender: activeChat.type === "dm" ? activeChat.name.split(" ")[0] : "System Bot",
        avatar: activeChat.type === "dm" ? activeChat.avatar : "B",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev: any) => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), replyMessage],
      }))
    }, 1200)
  }

  const selectChat = (chat: any, type: "channel" | "dm") => {
    setActiveChat({
      ...chat,
      type,
    })
    // clear unread
    if (type === "channel") {
      setChannels(channels.map(c => c.id === chat.id ? { ...c, unread: false } : c))
    } else {
      setDms(dms.map(d => d.id === chat.id ? { ...d, unread: false } : d))
    }
  }

  const currentMessages = messages[activeChat.id] || []

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-130px)] flex flex-col">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Tools</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Messenger</h1>
      </div>

      <div className="flex-1 data-card bg-white rounded-xl overflow-hidden flex divide-x divide-[#e2e8f0]">
        {/* Chat Sidebar (Left) */}
        <div className="w-64 bg-surface-container-low flex flex-col shrink-0">
          <div className="p-4 border-b border-[#e2e8f0]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-secondary text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-8 pr-3 py-1.5 border border-[#e2e8f0] rounded-lg text-body-md bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-4">
            {/* Channels Section */}
            <div>
              <p className="px-2 text-label-sm text-secondary uppercase tracking-wider mb-1.5 flex justify-between items-center">
                <span>Channels</span>
                <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">add</span>
              </p>
              <div className="space-y-0.5">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => selectChat(channel, "channel")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-body-md transition-colors ${
                      activeChat.id === channel.id
                        ? "bg-primary text-white font-semibold"
                        : "text-secondary hover:text-on-surface hover:bg-white"
                    }`}
                  >
                    <span>{channel.name}</span>
                    {channel.unread && <span className="w-2 h-2 rounded-full bg-error" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Messages Section */}
            <div>
              <p className="px-2 text-label-sm text-secondary uppercase tracking-wider mb-1.5 flex justify-between items-center">
                <span>Direct Messages</span>
                <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-on-surface">search</span>
              </p>
              <div className="space-y-0.5">
                {dms.map((dm) => (
                  <button
                    key={dm.id}
                    onClick={() => selectChat(dm, "dm")}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left text-body-md transition-colors ${
                      activeChat.id === dm.id
                        ? "bg-primary text-white font-semibold"
                        : "text-secondary hover:text-on-surface hover:bg-white"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center font-bold text-label-sm">
                        {dm.avatar}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        dm.status === "online" ? "bg-success" : dm.status === "away" ? "bg-warning" : "bg-[#94a3b8]"
                      }`} />
                    </div>
                    <span className="truncate flex-1">{dm.name.split(" ")[0] + " " + dm.name.split(" ")[1]}</span>
                    {dm.unread && <span className="w-2 h-2 rounded-full bg-error" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Main Window (Right) */}
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-[#e2e8f0] flex justify-between items-center">
            <div>
              <h3 className="text-headline-md text-on-surface leading-tight">
                {activeChat.name}
              </h3>
              <p className="text-label-sm text-secondary mt-0.5">
                {activeChat.type === "channel" ? activeChat.description : "Secure Employee Chat"}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-[20px]">phone</span>
              </button>
              <button className="p-2 text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-[20px]">videocam</span>
              </button>
              <button className="p-2 text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-surface-container-lowest">
            {currentMessages.map((msg: any, index: number) => {
              if (msg.isSystem) {
                return (
                  <div key={index} className="flex justify-center">
                    <span className="text-label-sm text-secondary bg-surface-container-low px-3 py-1 rounded-full border border-[#e2e8f0]">
                      {msg.text}
                    </span>
                  </div>
                )
              }

              const isMe = msg.sender === "You"

              return (
                <div key={index} className={`flex gap-3 max-w-lg ${isMe ? "ml-auto flex-row-reverse" : ""}`}>
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-label-sm shrink-0">
                      {msg.avatar}
                    </div>
                  )}
                  <div>
                    <div className={`flex items-baseline gap-2 mb-1 ${isMe ? "justify-end" : ""}`}>
                      <span className="font-semibold text-body-md text-on-surface">{msg.sender}</span>
                      <span className="text-label-sm text-secondary">{msg.time}</span>
                    </div>
                    <div className={`p-3 rounded-xl border text-body-md leading-relaxed ${
                      isMe
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-on-surface border-[#e2e8f0]"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#e2e8f0] bg-white flex gap-2.5 items-center">
            <button
              type="button"
              className="p-2 text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-lg shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">attach_file</span>
            </button>
            <button
              type="button"
              className="p-2 text-secondary hover:text-on-surface hover:bg-surface-container-low rounded-lg shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">mood</span>
            </button>
            <input
              type="text"
              placeholder={`Message ${activeChat.name}`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2 border border-[#e2e8f0] rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
