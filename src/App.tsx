import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/Login'
import SignUpPage from './pages/SignUp'
import Contact from './pages/Contact'
import Sidebar from './components/Sidebar'
import UploadDocument from './pages/dashboard/UploadDocument'
import MyIds from './pages/dashboard/MyIds'
import MyCertificates from './pages/dashboard/MyCertificates'
import Settings from './pages/dashboard/Settings'
import Profile from './pages/dashboard/Profile'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={<UploadDocument />} />
            <Route path="ids" element={<MyIds />} />
            <Route path="certificates" element={<MyCertificates />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App