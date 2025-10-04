import React, { useState } from 'react'
import FormInput from './FormInput'

const SignUpForm: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [touched, setTouched] = useState(false)

  const passwordsMatch = password === confirmPassword

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!passwordsMatch) return
    // eslint-disable-next-line no-console
    console.log('signup', { name, email, password })
  }

  const isDisabled = !name || !email || !password || !confirmPassword || !passwordsMatch

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FormInput
        label="Full name"
        id="name"
        name="name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <FormInput
        label="Confirm password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {touched && !passwordsMatch && (
        <p className="text-sm text-red-600 mb-2">Passwords do not match</p>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={`mt-4 w-full py-2 rounded-md font-medium focus:outline-none ${isDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}
      >
        Create account
      </button>
    </form>
  )
}

export default SignUpForm
