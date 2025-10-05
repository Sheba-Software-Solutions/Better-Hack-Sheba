import React, { useEffect, useState } from 'react'
import { api } from '../services/mockApi'
import { ShieldCheck, FileWarning, BadgeCheck } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const [stats, setStats] = useState({ pending: 0, verified: 0, rejected: 0, credentials: 0 })
  const [activity, setActivity] = useState([])

  useEffect(() => {
    const load = async () => {
      const s = await api.stats()
      setStats(s)
      // mock activity data
      const now = Date.now()
      const data = Array.from({ length: 7 }).map((_, i) => ({
        day: new Date(now - (6 - i) * 24 * 3600_000).toLocaleDateString('en-GB', { month: 'short', day: '2-digit' }),
        verifications: Math.floor(Math.random() * 10) + (i * 2),
      }))
      setActivity(data)
    }
    load()
  }, [])

  const cards = [
    { label: 'Pending', value: stats.pending, icon: FileWarning, color: 'bg-gray-100 text-gray-700', badge: 'badge-warning' },
    { label: 'Verified', value: stats.verified, icon: ShieldCheck, color: 'bg-gray-100 text-gray-700', badge: 'badge-success' },
    { label: 'Rejected', value: stats.rejected, icon: BadgeCheck, color: 'bg-gray-200 text-gray-900', badge: 'badge-danger' },
    { label: 'Credentials', value: stats.credentials, icon: BadgeCheck, color: 'bg-gray-100 text-gray-700', badge: 'badge-info' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of verification and credential activities</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{c.label}</p>
                <p className="text-2xl font-semibold mt-1">{c.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${c.color}`}>
                <c.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Weekly Verifications</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="verifications" stroke="#374151" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
