import React, { useState } from 'react'

export default function Settings() {
  const [settings, setSettings] = useState({
    orgName: 'ETH Pass',
    issuerDid: 'did:web:ethpass.et',
    notifyEmail: 'support@ethpass.et',
    requireManualReview: true,
  })

  const save = (e) => {
    e.preventDefault()
    // persist locally for demo
    localStorage.setItem('ethpass_admin_settings', JSON.stringify(settings))
    alert('Settings saved (local)')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Configure organization and verification preferences</p>
      </div>

      <form onSubmit={save} className="card space-y-4 max-w-2xl">
        <div>
          <label className="text-sm text-gray-600">Organization Name</label>
          <input className="input-field mt-1" value={settings.orgName} onChange={e=>setSettings(s=>({...s, orgName: e.target.value}))} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Issuer DID</label>
          <input className="input-field mt-1" value={settings.issuerDid} onChange={e=>setSettings(s=>({...s, issuerDid: e.target.value}))} />
        </div>
        <div>
          <label className="text-sm text-gray-600">Notification Email</label>
          <input type="email" className="input-field mt-1" value={settings.notifyEmail} onChange={e=>setSettings(s=>({...s, notifyEmail: e.target.value}))} />
        </div>
        <div className="flex items-center gap-2">
          <input id="manual" type="checkbox" checked={settings.requireManualReview} onChange={e=>setSettings(s=>({...s, requireManualReview: e.target.checked}))} />
          <label htmlFor="manual" className="text-sm text-gray-700">Require manual review before issuing credential</label>
        </div>
        <div className="pt-2">
          <button className="btn-primary" type="submit">Save Settings</button>
        </div>
      </form>
    </div>
  )
}
