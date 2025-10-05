import React, { useEffect, useState } from 'react'
import { api } from '../services/mockApi'
import { Check, X, Clock } from 'lucide-react'

export default function VerificationQueue() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    dateIssued: '',
    title: '',
    serialNumber: '',
  })

  const load = async () => {
    setLoading(true)
    const data = await api.listDocuments(filter)
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  const verify = async (id) => {
    await api.verifyDocument(id)
    load()
  }

  const reject = async (id) => {
    await api.rejectDocument(id)
    load()
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.title || !form.serialNumber) return
    setCreating(true)
    try {
      await api.addDocument(form)
      setForm({ fullName: '', dateIssued: '', title: '', serialNumber: '' })
      setFilter('pending')
      await load()
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Verification Queue</h1>
          <p className="text-gray-500">Review and verify uploaded documents</p>
        </div>
        <div className="flex gap-2">
          <select className="input-field w-40" value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="btn-secondary" onClick={load}>Refresh</button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Create Document</h2>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full name</label>
            <input className="input-field mt-1" value={form.fullName} onChange={e=>setForm(f=>({...f, fullName: e.target.value}))} placeholder="e.g. Abebe Bekele" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Date issued</label>
            <input type="date" className="input-field mt-1" value={form.dateIssued} onChange={e=>setForm(f=>({...f, dateIssued: e.target.value}))} />
          </div>
          <div>
            <label className="text-sm text-gray-600">Title of certificate</label>
            <input className="input-field mt-1" value={form.title} onChange={e=>setForm(f=>({...f, title: e.target.value}))} placeholder="e.g. Transcript" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Serial number</label>
            <input className="input-field mt-1" value={form.serialNumber} onChange={e=>setForm(f=>({...f, serialNumber: e.target.value}))} placeholder="e.g. AAU-2025-0001" />
          </div>
          <div className="md:col-span-2">
            <button className="btn-primary" type="submit" disabled={creating}>
              {creating ? 'Creating…' : 'Create Pending Document'}
            </button>
          </div>
        </form>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">ID</th>
              <th>Type</th>
              <th>Owner</th>
              <th>Institution</th>
              <th>Uploaded</th>
              <th>Title</th>
              <th>Serial</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="py-4 text-center" colSpan={9}>Loading...</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td className="py-4 text-center" colSpan={9}>No items</td></tr>
            )}
            {!loading && items.map((d) => (
              <tr key={d.id} className="border-b last:border-0">
                <td className="py-3 font-medium">{d.id}</td>
                <td>{d.type}</td>
                <td>{d.owner}</td>
                <td>{d.institution}</td>
                <td>{new Date(d.uploadedAt).toLocaleString()}</td>
                <td>{d.title || '-'}</td>
                <td>{d.serialNumber || '-'}</td>
                <td>
                  {d.status === 'pending' && <span className="badge badge-warning"><Clock size={12} className="mr-1"/> Pending</span>}
                  {d.status === 'verified' && <span className="badge badge-success">Verified</span>}
                  {d.status === 'rejected' && <span className="badge badge-danger">Rejected</span>}
                </td>
                <td className="text-right">
                  {d.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <button className="btn-secondary" onClick={() => reject(d.id)}>
                        <X size={14} />
                      </button>
                      <button className="btn-primary" onClick={() => verify(d.id)}>
                        <Check size={14} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
