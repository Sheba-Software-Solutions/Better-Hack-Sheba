import React, { useEffect, useState } from 'react'
import { api } from '../services/mockApi'
import { QrCode, Ban } from 'lucide-react'

export default function Credentials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const data = await api.listCredentials()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const revoke = async (id) => {
    await api.revokeCredential(id)
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Issued Credentials</h1>
          <p className="text-gray-500">Manage verifiable credentials issued by ETH Pass</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3">ID</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Issuer</th>
              <th>Issued</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="py-4 text-center" colSpan={7}>Loading...</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td className="py-4 text-center" colSpan={7}>No credentials</td></tr>
            )}
            {!loading && items.map((c) => (
              <tr key={c.id} className="border-b last:border-0">
                <td className="py-3 font-medium">{c.id}</td>
                <td>{c.subject}</td>
                <td>{c.type}</td>
                <td>{c.issuer}</td>
                <td>{new Date(c.issuedAt).toLocaleString()}</td>
                <td>
                  {c.status === 'active' && <span className="badge badge-success">Active</span>}
                  {c.status === 'revoked' && <span className="badge badge-danger">Revoked</span>}
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <button className="btn-secondary" title="View QR">
                      <QrCode size={14} />
                    </button>
                    {c.status === 'active' && (
                      <button className="btn-danger" onClick={() => revoke(c.id)}>
                        <Ban size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
