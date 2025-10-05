import React, { useEffect, useRef, useState } from 'react'
import { Menu, LogOut, Bell } from 'lucide-react'

export default function Header({ onToggleSidebar, onLogout }) {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: '3 documents pending review', time: 'Just now', unread: true },
    { id: 'n2', title: 'Credential VC-1001 issued', time: '10m ago', unread: true },
    { id: 'n3', title: 'User Verifier Bot added', time: '1h ago', unread: false },
  ])

  const unreadCount = notifications.filter(n=>n.unread).length
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const onDocClick = (e) => {
      if (!open) return
      const p = panelRef.current
      const b = buttonRef.current
      if (p && !p.contains(e.target) && b && !b.contains(e.target)) {
        setOpen(false)
      }
    }
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  const markAllRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, unread: false })))
  }

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b bg-white">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary-600" />
          <span className="font-semibold hidden sm:block">ETH Pass Admin</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative" ref={buttonRef}>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 relative"
            title="Notifications"
            onClick={() => setOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={open}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 bg-gray-800 text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {open && (
            <div
              ref={panelRef}
              className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
              role="menu"
            >
              <div className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button className="text-xs text-gray-600 hover:text-gray-900" onClick={markAllRead}>Mark all read</button>
                </div>
              </div>
              <ul className="max-h-80 overflow-auto">
                {notifications.length === 0 && (
                  <li className="px-4 py-6 text-sm text-gray-500 text-center">No notifications</li>
                )}
                {notifications.map(n => (
                  <li key={n.id} className={`px-4 py-3 text-sm ${n.unread ? 'bg-gray-50' : 'bg-white'} border-b last:border-0`}>
                    <div className="flex items-start gap-3">
                      <span className={`mt-1 h-2 w-2 rounded-full ${n.unread ? 'bg-gray-800' : 'bg-gray-300'}`} />
                      <div>
                        <div className="text-gray-900">{n.title}</div>
                        <div className="text-xs text-gray-500">{n.time}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 border-t bg-gray-50">
                <button className="w-full text-center text-sm text-gray-700 hover:text-gray-900">View all</button>
              </div>
            </div>
          )}
        </div>
        <button onClick={onLogout} className="btn-secondary flex items-center gap-2">
          <LogOut size={16} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  )
}
