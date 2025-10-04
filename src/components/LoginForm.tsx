import React, { useState } from 'react'
import FormInput from './FormInput'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now just log the values — replace with real auth later
    // eslint-disable-next-line no-console
    console.log('login', { email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FormInput
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FormInput
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="mt-4 w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 focus:outline-none"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
