import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4 z-100">
        <h2 className="text-xl font-bold"></h2>

        <button onClick={() => setOpen(!open)}>
          <Menu size={25} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 min-h-screen bg-gray-900 text-white p-5
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-8">
          CRM Panel
        </h2>

        <nav className="flex flex-col gap-4">
          <Link
            to="/home"
            className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/leads"
            className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
            onClick={() => setOpen(false)}
          >
            Leads
          </Link>

          <Link
            to="/User"
            className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
            onClick={() => setOpen(false)}
          >
            Users
          </Link>

          <Link
            to="/Profile"
            className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}