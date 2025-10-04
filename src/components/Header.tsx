import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-200 py-4 px-6 flex items-center justify-between relative">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l2 4 4 .5-3 3 .8 4L12 12 6.2 13.5 7 9 4 6.5 8 6z" />
          </svg>
        </div>
        <span className="font-semibold text-lg">Sheba Cred</span>
      </div>

      <nav className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
        <Link to="/" className="text-sm font-medium">Home</Link>
        <Link to="/about" className="text-sm font-medium">About</Link>
        <Link to="/documentation" className="text-sm font-medium">Documentation</Link>
        <Link to="/contact" className="text-sm font-medium">Contact</Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/signin" className="px-4 py-2 bg-black text-white rounded-md font-medium">Sign in</Link>
        <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-md font-medium">Sign up</Link>
      </div>
    </header>
  )
}

export default Header
