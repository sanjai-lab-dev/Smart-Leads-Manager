import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Edit,
  UserPlus,
  CircleUserRound,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  IndianRupee,
  Timer,
  CalendarDays,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import ExportCSV from "./ExportCSV";
import { apiGet, apiDelete } from "../api";
import type { Lead } from "../types";

export default function Leads() {

  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [search, setSearch] =
    useState<string>("");

  const [statusFilter, setStatusFilter] =
    useState<string>("All");

  const [sourceFilter, setSourceFilter] =
    useState<string>("All");

  const [currentPage, setCurrentPage] =
    useState<number>(1);

  const leadsPerPage = 8;

  const navigate = useNavigate();

  // Delete Lead
  const handleDelete = async (
    id: string
  ) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {

      const response = await apiDelete(`/leads/${id}`);

      if (response.ok) {
        alert("Lead Deleted Successfully");
        fetchLeads();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to Delete Lead");
      }

    } catch (error) {

      console.log(error);

      alert("Server connection failed");
    }
  };

  // Fetch Leads
  const fetchLeads = async () => {

    try {

      const response = await apiGet('/leads');

      const data = await response.json();

      setLeads(data.data || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filters
  const filteredLeads = useMemo(() => {

    return leads.filter((lead) => {

      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        lead.status === statusFilter;

      const matchesSource =
        sourceFilter === "All" ||
        lead.source === sourceFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource
      );
    });

  }, [
    search,
    leads,
    statusFilter,
    sourceFilter,
  ]);

  // Pagination
  const lastLeadIndex =
    currentPage * leadsPerPage;

  const firstLeadIndex =
    lastLeadIndex - leadsPerPage;

  const currentLeads =
    filteredLeads.slice(
      firstLeadIndex,
      lastLeadIndex
    );

  const totalPages = Math.ceil(
    filteredLeads.length / leadsPerPage
  );

  // Analytics
  const totalRevenue = leads.reduce(
    (acc, item) => acc + item.paid,
    0
  );

  const qualifiedLeads =
    leads.filter(
      (item) =>
        item.status === "Qualified"
    ).length;

  const closedLeads =
    leads.filter(
      (item) =>
        item.status === "Closed"
    ).length;

  return (
    <div className="h-screen bg-linear-to-br from-gray-100 to-indigo-50 overflow-hidden">



      <div className="flex  h-screen">

        {/* Sidebar */}
        <div className="fixed shadow-lg z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 pt-20 overflow-x-hidden w-screen xl:w-auto lg:ml-70">

          {/* Header */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">


            {/* Search & Filters */}
            <div className="z-30 w-[95%] sm:w-[90%] lg:w-auto bg-white/90 backdrop-blur-lg rounded-3xl p-4 sm:p-5 shadow-lg mb-8 flex flex-col xl:flex-row gap-4 border border-gray-100" >
              {/* Search */}
              <div className="relative flex-1 min-w-full lg:min-w-[250px]">

                <Search
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Search leads..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex flex-row w-full gap-2" >
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="grow border border-gray-200 rounded-xl px-4 py-3 inline "
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="New">
                    New
                  </option>

                  <option value="Contacted">
                    Contacted
                  </option>

                  <option value="Qualified">
                    Qualified
                  </option>

                  <option value="Closed">
                    Closed
                  </option>
                </select>

                {/* Source Filter */}
                <select
                  value={sourceFilter}
                  onChange={(e) =>
                    setSourceFilter(
                      e.target.value
                    )
                  }
                  className="grow lg:w-auto border border-gray-200 rounded-xl px-4 py-3"
                >
                  <option value="All">
                    All Sources
                  </option>

                  <option value="Website">
                    Website
                  </option>

                  <option value="Instagram">
                    Instagram
                  </option>

                  <option value="LinkedIn">
                    LinkedIn
                  </option>

                  <option value="Referral">
                    Referral
                  </option>

                  <option value="Facebook">
                    Facebook
                  </option>
                </select>
              </div>
            </div>
            {/*Expoet and Lead create buttons */}
            <div className="flex flex-row gap-5">

              <div >
                <ExportCSV />
              </div>

              <button
                onClick={() =>
                  navigate("/Newlead")
                }
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300 hover:scale-105"
              >
                <UserPlus size={22} />
                Create Lead
              </button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {/* Total Leads */}
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-indigo-100">
                    Total Leads
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {leads.length}
                  </h1>
                </div>

                <div className="bg-white/20 p-4 rounded-2xl">
                  <Users size={34} />
                </div>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-700 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-green-100">
                    Revenue
                  </p>

                  <h1 className="text-4xl font-bold mt-4">
                    ₹{totalRevenue}
                  </h1>
                </div>

                <div className="bg-white/20 p-4 rounded-2xl">
                  <IndianRupee size={34} />
                </div>
              </div>
            </div>

            {/* Qualified */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-700 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-blue-100">
                    Qualified Leads
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {qualifiedLeads}
                  </h1>
                </div>

                <div className="bg-white/20 p-4 rounded-2xl">
                  <BadgeCheck size={34} />
                </div>
              </div>
            </div>

            {/* Closed */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-700 rounded-3xl p-6 text-white shadow-xl hover:scale-[1.02] transition-all duration-300">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-pink-100">
                    Closed Deals
                  </p>

                  <h1 className="text-5xl font-bold mt-4">
                    {closedLeads}
                  </h1>
                </div>

                <div className="bg-white/20 p-4 rounded-2xl">
                  <TrendingUp size={34} />
                </div>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (

            <div className="flex justify-center items-center h-[60vh]">
              <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>

          ) : (

            <>
              {/* Leads */}
              <div className="space-y-5">

                {currentLeads.map((lead) => (

                  <div
                    key={lead._id}
                    className="backdrop-blur-lg bg-white/80 rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-white/30 hover:-translate-y-1"
                  >

                    <div className="flex justify-between items-center flex-wrap gap-6">

                      {/* Left */}
                      <div className="flex items-center gap-4">

                        <div className="bg-indigo-100 p-4 rounded-full">
                          <CircleUserRound className="text-indigo-600" />
                        </div>

                        <div>

                          <h2 className="font-bold text-xl text-gray-800">
                            {lead.name}
                          </h2>

                          <p className="text-gray-500 mt-1">
                            {lead.email}
                          </p>
                        </div>
                      </div>

                      {/* Middle */}
                      <div className="flex gap-3 flex-wrap">

                        {/* Status */}
                        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                          {lead.status}
                        </span>

                        {/* Source */}
                        <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                          {lead.source}
                        </span>

                        {/* Revenue */}
                        <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium flex items-center gap-1">
                          <IndianRupee size={14} />
                          {lead.paid}
                        </span>

                        {/* Date */}
                        <span className="px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium flex items-center gap-1">
                          <CalendarDays size={14} />
                          {lead.date}
                        </span>

                        {/* Time */}
                        <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium flex items-center gap-1">
                          <Timer size={14} />
                          {lead.time}
                        </span>

                        {/* Priority */}
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium
                          ${lead.paid > 50000
                              ? "bg-red-100 text-red-700"
                              : lead.paid > 10000
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                        >
                          {lead.paid > 50000
                            ? "High Value"
                            : lead.paid > 10000
                              ? "Medium"
                              : "Normal"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">

                        {/* Edit */}
                        <button
                          onClick={() =>
                            navigate(
                              `/leadData/${lead._id}`
                            )
                          }
                          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-5 py-3 rounded-2xl flex items-center gap-2 transition"
                        >
                          <Edit size={18} />
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(
                              lead._id
                            )
                          }
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-5 py-3 rounded-2xl flex items-center gap-2 transition"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {currentLeads.length === 0 && (

                <div className="bg-white rounded-3xl p-20 text-center shadow-lg">

                  <h1 className="text-3xl font-bold text-gray-700">
                    No Leads Found
                  </h1>

                  <p className="text-gray-500 mt-3">
                    Try changing filters or search
                  </p>
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-10 pb-10">

                {/* Prev */}
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 disabled:bg-gray-300"
                >
                  <ChevronLeft size={18} />
                  Prev
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map(
                  (_, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        setCurrentPage(
                          index + 1
                        )
                      }
                      className={`w-10 h-10 rounded-xl font-semibold
                      ${currentPage ===
                          index + 1
                          ? "bg-indigo-600 text-white"
                          : "bg-white border"
                        }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 disabled:bg-gray-300"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}