import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  IndianRupee,
  CircleDollarSign,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  paid: number;
}

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/leads"
      );

      const data = await response.json();

      setLeads(data.data || []);
    } catch (error) {
      console.log("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) =>
      lead.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, leads]);

  // Stats
  const totalRevenue = leads.reduce(
    (acc, item) => acc + item.paid,
    0
  );console.log(totalRevenue)

  const totalLeads = leads.length;

  const completedLeads = leads.filter(
    (lead) => lead.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Leads Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Manage and track all your leads
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-[350px]">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {/* Total Leads */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Leads
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {totalLeads}
                  </h2>
                </div>

                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Users className="text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Total Revenue
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    ₹{totalRevenue}
                  </h2>
                </div>

                <div className="bg-green-100 p-3 rounded-xl">
                  <IndianRupee className="text-green-600" />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">
                    Completed Leads
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {completedLeads}
                  </h2>
                </div>

                <div className="bg-purple-100 p-3 rounded-xl">
                  <CircleDollarSign className="text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Leads List */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                All Leads
              </h2>

              <span className="text-sm text-gray-500">
                {filteredLeads.length} Results
              </span>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-700">
                  No Leads Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try searching with another keyword
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-indigo-300 cursor-pointer transition-all duration-300 bg-linear-to-r from-white to-gray-50"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {lead.name}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          {lead.email}
                        </p>
                      </div>

                      {/* Right */}
                      <div className="flex flex-wrap gap-3">
                        {/* Status */}
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium
                          ${
                            lead.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : lead.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {lead.status}
                        </span>

                        {/* Paid */}
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
                          ₹{lead.paid}
                        </span>

                        {/* Source */}
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                          {lead.source}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}