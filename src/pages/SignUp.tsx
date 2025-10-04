import React from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-black flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l2 4 4 .5-3 3 .8 4L12 12 6.2 13.5 7 9 4 6.5 8 6z" />
            </svg>
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

        <p className="text-center text-xs text-gray-600">© {new Date().getFullYear()} Sheba — All rights reserved</p>
      </div>
    </div>
  )
}

export default SignUpPage
