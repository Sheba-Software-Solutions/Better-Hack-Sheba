import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import FormInput from './FormInput'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      // eslint-disable-next-line no-alert
      alert(result.error || 'Login failed');
    }
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
        placeholder="password"
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
