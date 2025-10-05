import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShieldCheck, BadgeCheck, Users, Settings } from 'lucide-react'

const NavItem = ({ to, icon: Icon, label, collapsed }) => {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      className={`flex ${collapsed ? 'justify-center' : 'justify-start'} items-center ${collapsed ? 'gap-0' : 'gap-3'} px-4 py-2 rounded-xl transition-colors ${
        active ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
      } ${collapsed ? 'mx-1' : ''}`}
    >
      <Icon size={18} />
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  )
}

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col border-r border-gray-200 bg-white transition-all duration-200 ease-in-out`}>
      <div className={`h-16 flex items-center ${isOpen ? 'gap-2 px-4 justify-start' : 'justify-center px-2'} border-b`}>
        <div className="w-8 h-8 rounded-xl bg-gray-900" />
        {isOpen && (
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">ETH Pass</span>
            <span className="text-xs text-gray-500">Admin</span>
          </div>
        )}
      </div>
      <nav className={`p-4 space-y-1 ${isOpen ? '' : 'px-2'}`}>
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" collapsed={!isOpen} />
        <NavItem to="/verification" icon={ShieldCheck} label="Verification" collapsed={!isOpen} />
        <NavItem to="/credentials" icon={BadgeCheck} label="Credentials" collapsed={!isOpen} />
        <NavItem to="/users" icon={Users} label="Users" collapsed={!isOpen} />
        <NavItem to="/settings" icon={Settings} label="Settings" collapsed={!isOpen} />
      </nav>
      <div className={`mt-auto ${isOpen ? 'p-4' : 'p-2'} text-xs text-gray-500 text-center`}>
        {isOpen ? `© ${new Date().getFullYear()} ETH Pass` : '©'}
      </div>
    </aside>
  )
}
