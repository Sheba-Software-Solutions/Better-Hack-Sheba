import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-200 py-4 px-4 md:px-6 flex items-center justify-between relative">
      <Link to="/" className="flex items-center">
        <Logo variant="dark" size="md" />
      </Link>

      {/* Desktop nav */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-8">
        <Link to="/" className="text-sm font-medium">Home</Link>
        <Link to="/about" className="text-sm font-medium">About</Link>
        <Link to="/documentation" className="text-sm font-medium">Documentation</Link>
        <Link to="/contact" className="text-sm font-medium">Contact</Link>
      </nav>

      {/* Right actions / mobile menu button */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3">
          <Link to="/signin" className="px-4 py-2 bg-black text-white rounded-md font-medium">Sign in</Link>
          <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-md font-medium">Sign up</Link>
        </div>
        <details className="md:hidden relative">
          <summary className="list-none flex items-center justify-center h-10 w-10 rounded-md border border-gray-300 cursor-pointer select-none" aria-label="Open menu">
            <span className="sr-only">Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </summary>
          <div className="absolute right-0 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-lg p-2 z-50">
            <nav className="flex flex-col gap-1">
              <Link to="/" className="px-3 py-2 rounded hover:bg-gray-100">Home</Link>
              <Link to="/about" className="px-3 py-2 rounded hover:bg-gray-100">About</Link>
              <Link to="/documentation" className="px-3 py-2 rounded hover:bg-gray-100">Documentation</Link>
              <Link to="/contact" className="px-3 py-2 rounded hover:bg-gray-100">Contact</Link>
              <hr className="my-2" />
              <Link to="/signin" className="px-3 py-2 rounded bg-black text-white text-center">Sign in</Link>
              <Link to="/signup" className="px-3 py-2 rounded border text-center">Sign up</Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}

export default Header
