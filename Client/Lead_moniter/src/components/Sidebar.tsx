import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">
      
      <h2 className="text-2xl font-bold mb-8">
        CRM Panel
      </h2>

      <nav className="flex flex-col gap-4">
        
        <Link
          to="/home"
          className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
        >
          Dashboard
        </Link>

        <Link
          to="/leads"
          className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
        >
          Leads
        </Link>

        <Link
          to= '/Newlead'
          className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
        >
          New Leads
        </Link>

        <Link
          to="/settings"
          className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg transition"
        >
          Settings
        </Link>
      </nav>
    </aside>
  )
}