import { Link, useNavigate } from 'react-router-dom'
import { removeToken, getUser } from '../api'
import { LogOut } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Lead Monitor
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            to="/home"
            className="hover:text-gray-200 transition hover:bg-blue-900 px-4 py-2 rounded-2xl"
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
      </div>
    </nav>
  )
}