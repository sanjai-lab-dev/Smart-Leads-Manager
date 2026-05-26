import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { apiGet, apiDelete, apiPut } from "../api";
import type { User as UserType } from "../types";

import {
  Users,
  Mail,
  ShieldCheck,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserRound,
} from "lucide-react";

export default function User() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const fetchUsers = async () => {
    try {
      const response = await apiGet("/users");
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.data || []);
      }
    } catch (error) {
      console.log("Error in Fetching User", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await apiDelete(`/users/${id}`);
      if (response.ok) {
        alert("User deleted successfully");
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete user");
      }
    } catch (error) {
      console.log("Error deleting user:", error);
      alert("Server connection failed");
    }
  };

  const handleRoleToggle = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'Sales User' ? 'Admin' : 'Sales User';
    
    if (!window.confirm(`Change this user's role to ${newRole}?`)) return;

    try {
      const response = await apiPut(`/users/${id}/role`, { role: newRole });
      if (response.ok) {
        alert("Role updated successfully");
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update role");
      }
    } catch (error) {
      console.log("Error updating role:", error);
      alert("Server connection failed");
    }
  };

  // Pagination Logic
  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = users.slice(firstUserIndex, lastUserIndex);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        {/* Sidebar */}
        <div className="fixed shadow-lg z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="md:ml-64 flex-1 p-4 sm:p-6 lg:p-8 pt-20 md:pt-10">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Users className="text-blue-600" />
                Users Management
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Manage all users and roles
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-white px-5 py-3 rounded-2xl shadow-xs border border-gray-200 flex items-center gap-3 w-fit">
              <UserRound className="text-indigo-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
                <h2 className="font-bold text-base sm:text-lg text-gray-800">
                  {users.length}
                </h2>
              </div>
            </div>
          </div>

          {/* Table Header - Only visible on Desktop (Large Screens) */}
          <div className="hidden lg:grid grid-cols-5 bg-linear-to-r from-blue-500 to-indigo-700 text-white p-4 rounded-2xl font-semibold shadow-md mb-4">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p className="text-center">Toggle Role</p>
            <p className="text-center">Delete</p>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-48">
               <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : users.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow">
              <p className="text-gray-500">No users found.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View (lg and up) */}
              <div className="hidden lg:block space-y-4">
                {currentUsers.map((item) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-5 items-center bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
                  >
                    {/* Name */}
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <UserRound className="text-blue-600" />
                      </div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={18} />
                      <p className="truncate pr-2" title={item.email}>{item.email}</p>
                    </div>

                    {/* Role */}
                    <div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${
                        item.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                      }`}>
                        <ShieldCheck size={16} />
                        {item.role}
                      </span>
                    </div>

                    {/* Edit Role Toggle */}
                    <div className="flex justify-center">
                      <button 
                        onClick={() => handleRoleToggle(item._id, item.role)}
                        className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <Pencil size={16} />
                        Toggle
                      </button>
                    </div>

                    {/* Delete */}
                    <div className="flex justify-center">
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile and Tablet Card View (< lg screens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
                {currentUsers.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header inside Card */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-3 rounded-full shrink-0">
                          <UserRound className="text-blue-600" size={24} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-bold text-lg text-gray-800 truncate" title={item.name}>
                            {item.name}
                          </p>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full text-xs font-semibold ${
                            item.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                          }`}>
                            <ShieldCheck size={14} />
                            {item.role}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-3 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2.5">
                          <Mail size={16} className="text-gray-400 shrink-0" />
                          <p className="truncate break-all" title={item.email}>{item.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 justify-end w-full">
                      <button 
                        onClick={() => handleRoleToggle(item._id, item.role)}
                        className="bg-yellow-50 text-yellow-800 hover:bg-yellow-100 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer flex-1 justify-center sm:flex-none"
                      >
                        <Pencil size={15} />
                        Toggle Role
                      </button>

                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-50 text-red-700 hover:bg-red-100 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer flex-1 justify-center sm:flex-none"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {!loading && users.length > 0 && (
            <div className="flex justify-center items-center gap-3 mt-10 pb-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`px-4 py-2 rounded-xl font-medium shadow-sm transition-all flex items-center gap-2 ${
                  currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <ChevronLeft size={18} /> Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                    currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-50 border border-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`px-4 py-2 rounded-xl font-medium shadow-sm transition-all flex items-center gap-2 ${
                  currentPage === totalPages || totalPages === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}