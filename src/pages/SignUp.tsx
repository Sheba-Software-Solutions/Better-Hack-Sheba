import React from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import Logo from '../components/Logo'

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo variant="dark" size="lg" />
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-black">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us — create your account in seconds</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
          <SignUpForm />
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account? <Link to="/signin" className="text-black font-medium underline">Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-600">© {new Date().getFullYear()} Sheba Cred — All rights reserved</p>
      </div>
    </div>
  )
}

export default SignUpPage
