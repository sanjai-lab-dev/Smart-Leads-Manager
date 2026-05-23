import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Lead Monitor
        </h1>

        {/* Navigation */}
        <div className="flex gap-6">
          <Link
            to="/home"
            className="hover:text-gray-200 transition"
          >
            Home
          </Link>

        </div>
      </div>
    </nav>
  )
}