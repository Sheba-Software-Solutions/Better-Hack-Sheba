import React, { useEffect, useState } from 'react'
import { api } from '../services/mockApi'
import { Plus, Trash2 } from 'lucide-react'

export default function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'verifier' })

  const load = async () => {
    setLoading(true)
    const data = await api.listUsers()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const add = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    await api.addUser(form)
    setForm({ name: '', email: '', role: 'verifier' })
    load()
  }

  const remove = async (id) => {
    await api.removeUser(id)
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-gray-500">Manage admin and verifier accounts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3">ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td className="py-4 text-center" colSpan={5}>Loading...</td></tr>
              )}
              {!loading && items.length === 0 && (
                <tr><td className="py-4 text-center" colSpan={5}>No users</td></tr>
              )}
              {!loading && items.map((u) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="badge badge-info capitalize">{u.role}</span></td>
                  <td className="text-right">
                    <button className="btn-danger" onClick={() => remove(u.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Add User</h2>
          <form onSubmit={add} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input className="input-field mt-1" value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input type="email" className="input-field mt-1" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Role</label>
              <select className="input-field mt-1" value={form.role} onChange={e=>setForm(f=>({...f, role: e.target.value}))}>
                <option value="admin">Admin</option>
                <option value="verifier">Verifier</option>
              </select>
            </div>
            <button className="btn-primary w-full" type="submit">
              <span className="inline-flex items-center gap-2"><Plus size={16}/> Add User</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
