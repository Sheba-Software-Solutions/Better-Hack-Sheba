import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import Logo from '../components/Logo'

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo variant="dark" size="lg" />
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-black">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your credentials to access your dashboard</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <LoginForm />
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-black font-medium underline">Sign up</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-600">© {new Date().getFullYear()} Sheba Cred — All rights reserved</p>
      </div>
    </div>
  )
}

export default LoginPage
