"use client"

import { useState } from "react"

export default function FleetBookingPage() {
  const [vehicle, setVehicle] = useState("Toyota Camry (ชง-5678)")
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("1 Day")
  const [purpose, setPurpose] = useState("Client meeting at Pathum Thani")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [bookings, setBookings] = useState([
    {
      id: "FB-042",
      vehicle: "Toyota Camry (ชง-5678)",
      date: "2026-06-15",
      duration: "1 Day",
      purpose: "Client meeting at Pathum Thani",
      status: "Approved",
      requester: "Somchai S. (Sales)",
    },
    {
      id: "FB-045",
      vehicle: "Toyota Commuter (มค-9012)",
      date: "2026-06-18 to 2026-06-19",
      duration: "2 Days",
      purpose: "Team building outing delivery",
      status: "Pending",
      requester: "Kanda P. (HR)",
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return

    setIsSubmitting(true)
    setTimeout(() => {
      const newBooking = {
        id: `FB-0${Math.floor(46 + Math.random() * 20)}`,
        vehicle,
        date,
        duration,
        purpose,
        status: "Pending",
        requester: "Current User (You)",
      }

      setBookings([newBooking, ...bookings])
      setDate("")
      setIsSubmitting(false)
      alert("Fleet booking request submitted successfully!")
    }, 800)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div>
        <p className="text-label-sm text-tertiary uppercase tracking-widest">HR &amp; Facility • Fleet</p>
        <h1 className="text-headline-xl text-on-surface mt-1">Advance Vehicle Booking</h1>
        <p className="text-body-md text-secondary mt-1">
          Reserve company vehicles for corporate tasks, client meetings, or logistics distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface">Book a Vehicle</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Select Vehicle</label>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="Toyota Camry (ชง-5678)">Toyota Camry (Sedan - Executive)</option>
                  <option value="Honda City (รน-4321)">Honda City (Sedan - Sales)</option>
                  <option value="Toyota Hilux Revo (กข-1234)">Toyota Hilux Revo (Pickup Truck)</option>
                  <option value="Toyota Commuter (มค-9012)">Toyota Commuter (Passenger Van)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Start Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-label-sm text-secondary uppercase tracking-wider">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="Half Day (AM)">Half Day (AM)</option>
                    <option value="Half Day (PM)">Half Day (PM)</option>
                    <option value="1 Day">1 Day</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days">3 Days or more</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-label-sm text-secondary uppercase tracking-wider">Purpose / Destination</label>
                <textarea
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Detail the destination and corporate purpose..."
                  className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg text-body-md bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-bold text-body-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? "hourglass_empty" : "event_available"}
                </span>
                {isSubmitting ? "Requesting..." : "Reserve Vehicle"}
              </button>
            </form>
          </div>
        </div>

        {/* Bookings List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="data-card bg-white rounded-xl overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 border-b border-[#e2e8f0]">
              <h3 className="text-headline-md text-on-surface font-bold">Upcoming Fleet Bookings</h3>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-[#e2e8f0]">
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Book ID</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Vehicle</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Booking Date</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Purpose</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-label-sm text-secondary uppercase tracking-wider px-6 py-3">Driver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {bookings.map((b, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4 text-mono-data text-secondary">{b.id}</td>
                      <td className="px-6 py-4 text-body-md text-on-surface font-semibold">{b.vehicle}</td>
                      <td className="px-6 py-4 text-body-md text-secondary">
                        <div>{b.date}</div>
                        <div className="text-[10px] text-secondary font-semibold font-mono-data mt-0.5">{b.duration}</div>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary max-w-xs truncate" title={b.purpose}>
                        {b.purpose}
                      </td>
                      <td className="px-6 py-4">
                        <span className={b.status === "Approved" ? "chip-success" : "chip-warning"}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-md text-secondary">{b.requester}</td>
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
