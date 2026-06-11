"use client"

import { useState } from "react"

export default function QRScannerPage() {
  const [scanHistory, setScanHistory] = useState([
    {
      time: "10:14:22",
      code: "CONF-AST-2026-9041",
      type: "QR Code",
      result: "Office Monitor (Dell 27\")",
      status: "Verified",
    },
    {
      time: "10:12:05",
      code: "079357318722",
      type: "EAN-13 Barcode",
      result: "Standard Wireless Mouse",
      status: "Verified",
    },
    {
      time: "09:45:11",
      code: "CONF-EMP-2940",
      type: "QR Code",
      result: "Employee Attendance: Kitti P.",
      status: "Checked In",
    },
  ])

  const [flashlight, setFlashlight] = useState(false)
  const [activeCamera, setActiveCamera] = useState("Rear Camera (Wide)")
  const [scanning, setScanning] = useState(true)

  const handleSimulateScan = () => {
    setScanning(true)
    const scanItems = [
      {
        code: "CONF-AST-2026-8842",
        type: "QR Code",
        result: "MacBook Pro M3 (IT-049)",
        status: "Verified",
      },
      {
        code: "8850127003418",
        type: "EAN-13 Barcode",
        result: "Paper Pack A4 (Double A)",
        status: "Verified",
      },
      {
        code: "CONF-MEET-102",
        type: "QR Code",
        result: "Room 102 Check-In (Booking Approved)",
        status: "Checked In",
      },
      {
        code: "UNKNOWN-CODE-999",
        type: "Barcode",
        result: "Unknown asset tag structure",
        status: "Invalid",
      },
    ]

    setTimeout(() => {
      const randomItem = scanItems[Math.floor(Math.random() * scanItems.length)]
      const now = new Date()
      const timeString = now.toTimeString().split(" ")[0]

      const newScan = {
        time: timeString,
        ...randomItem,
      }

      setScanHistory([newScan, ...scanHistory])
      alert(`Scanned: ${randomItem.result}\nCode: ${randomItem.code}`)
    }, 1000)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">Tools</p>
        <h1 className="text-headline-xl text-on-surface mt-1">QR &amp; Barcode Scanner</h1>
        <p className="text-body-md text-secondary mt-1">
          Scan company assets, employee badges, and meeting room check-ins using your device camera.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scanner Viewport (Left) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                <h3 className="text-headline-md text-on-surface">Camera Viewport</h3>
              </div>
              <span className="text-label-sm text-secondary font-mono-data bg-surface-container-low px-2 py-0.5 rounded">
                {activeCamera}
              </span>
            </div>

            {/* Simulated camera feed */}
            <div className="relative bg-black h-80 flex items-center justify-center overflow-hidden">
              {/* Laser Line Scanning Effect */}
              {scanning && (
                <div className="absolute left-0 w-full h-1 bg-primary-container shadow-[0_0_10px_#2ba8a2] animate-bounce z-10" style={{ top: "10%", animationDuration: "3s" }} />
              )}

              {/* Aiming Bracket HUD */}
              <div className="absolute border-2 border-dashed border-white/40 w-52 h-52 rounded-2xl flex items-center justify-center">
                <div className="w-44 h-44 border border-white/20 rounded-xl flex items-center justify-center bg-white/5">
                  <span className="material-symbols-outlined text-[48px] text-white/30 animate-pulse">
                    qr_code_2
                  </span>
                </div>
              </div>

              {/* Bottom camera HUD overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                <button
                  onClick={() => setFlashlight(!flashlight)}
                  className={`p-2.5 rounded-full flex items-center justify-center transition-colors ${
                    flashlight ? "bg-warning text-white" : "bg-black/60 text-white hover:bg-black/80"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {flashlight ? "flashlight_on" : "flashlight_off"}
                  </span>
                </button>

                <button
                  onClick={handleSimulateScan}
                  className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-full font-bold text-body-md shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                  Trigger Scan
                </button>

                <button
                  onClick={() =>
                    setActiveCamera((prev) =>
                      prev.includes("Rear") ? "Front Camera (Selfie)" : "Rear Camera (Wide)"
                    )
                  }
                  className="p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[20px]">switch_camera</span>
                </button>
              </div>
            </div>

            {/* Instruction Footer */}
            <div className="p-4 bg-surface-container-low text-center text-body-md text-secondary border-t border-[#e2e8f0]">
              Align the QR code or barcode inside the dashed square area to scan automatically.
            </div>
          </div>
        </div>

        {/* Scan History (Right) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full min-h-[460px]">
            <div className="px-6 py-5 border-b border-[#e2e8f0] flex justify-between items-center">
              <div>
                <h3 className="text-headline-md text-on-surface">Recent Scan History</h3>
                <p className="text-body-md text-secondary mt-1">Real-time scan logs from this session.</p>
              </div>
              <button className="text-primary hover:text-primary-container font-semibold text-body-md flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export CSV
              </button>
            </div>

            {/* History Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Scan Time</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Format / Code</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Scanned Record</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {scanHistory.map((scan, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{scan.time}</td>
                      <td className="px-6 py-4">
                        <div className="text-label-sm text-secondary uppercase tracking-wider">{scan.type}</div>
                        <div className="text-mono-data text-on-surface font-semibold mt-0.5">{scan.code}</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-medium">{scan.result}</td>
                      <td className="px-6 py-4">
                        <span className={
                          scan.status === "Verified"
                            ? "chip-success"
                            : scan.status === "Checked In"
                            ? "chip-info"
                            : "chip-error"
                        }>
                          {scan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
