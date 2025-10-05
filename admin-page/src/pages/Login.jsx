import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    // Simple mock auth
    if (email === 'admin@ethpass.et' && password === 'admin123') {
      onLogin()
    } else {
      setError('Invalid credentials. Try admin@ethpass.et / admin123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white p-6">
      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary-600 mx-auto" />
          <h1 className="text-2xl font-bold mt-3">ETH Pass Admin</h1>
          <p className="text-gray-500">Sign in to manage verifications</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          {error && <div className="badge badge-danger w-full justify-center py-2">{error}</div>}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input className="input-field mt-1" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@ethpass.et" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input className="input-field mt-1" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn-primary w-full" type="submit">Sign In</button>
        </form>
      </div>
    </div>
  )
}
