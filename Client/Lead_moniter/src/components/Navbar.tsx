import { Link, useNavigate } from 'react-router-dom'
import { removeToken, getUser } from '../api'
import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const user = getUser()

  const [menuOpen, setMenuOpen] =
    useState(false)

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white px-4 sm:px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold">
          Lead Monitor
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          
          <Link
            to="/home"
            className="hover:text-gray-200 transition hover:bg-blue-700 px-4 py-2 rounded-2xl"
          >
            Home
          </Link>

          {user && (
            <span className="text-blue-100 text-sm">
              Hi, {user.name}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-xl text-sm transition-all duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-blue-700 p-4 rounded-2xl">
          
          <Link
            to="/home"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:bg-blue-800 px-4 py-2 rounded-xl transition"
          >
            Home
          </Link>

          {user && (
            <span className="text-blue-100 text-sm px-4">
              Hi, {user.name}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-xl text-sm transition-all duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}