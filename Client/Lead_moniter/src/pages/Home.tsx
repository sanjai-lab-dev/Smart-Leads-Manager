import { useEffect, useState } from "react";
import {
  Users,
  BadgeCheck,
  CircleDollarSign,
  UserRound,
  Share2,
  TrendingUp,
  Activity,
  Clock3,
} from "lucide-react";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { apiGet } from "../api";
import type { Lead } from "../types";

export default function Dashboard() {

  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

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

  // Analytics
  const totalRevenue = leads.reduce(
    (acc, item) => acc + item.paid,
    0
  );

  const closedLeads = leads.filter(
    (item) => item.status === "Closed"
  ).length;

  const qualifiedLeads = leads.filter(
    (item) => item.status === "Qualified"
  ).length;

  const contactedLeads = leads.filter(
    (item) => item.status === "Contacted"
  ).length;

  const newLeads = leads.filter(
    (item) => item.status === "New"
  ).length;

  // Status Chart Data
  const statusData = [
    {
      name: "New",
      value: newLeads,
    },
    {
      name: "Contacted",
      value: contactedLeads,
    },
    {
      name: "Qualified",
      value: qualifiedLeads,
    },
    {
      name: "Closed",
      value: closedLeads,
    },
  ];

  // Source Chart Data
  const sourceData = [
    {
      name: "LinkedIn",
      leads: leads.filter(
        (item) => item.source === "LinkedIn"
      ).length,
    },

    {
      name: "Instagram",
      leads: leads.filter(
        (item) => item.source === "Instagram"
      ).length,
    },

    {
      name: "Facebook",
      leads: leads.filter(
        (item) => item.source === "Facebook"
      ).length,
    },

    {
      name: "Referral",
      leads: leads.filter(
        (item) => item.source === "Referral"
      ).length,
    },

    {
      name: "Website",
      leads: leads.filter(
        (item) => item.source === "Website"
      ).length,
    },
  ];

  const COLORS = [
    "#6366F1",
    "#F59E0B",
    "#10B981",
    "#EF4444",
    "indigo"
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 shadow-md">
        <Navbar />
      </div>

      <div className="flex pt-16">

        {/* Sidebar */}
        <div className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                CRM Analytics Dashboard
              </h1>

              <p className="text-gray-500 mt-2">
                Track lead performance and revenue growth
              </p>
            </div>

            <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
              <TrendingUp />
              <span className="font-semibold">
                Growth Insights
              </span>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex justify-center items-center h-[70vh]">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>

              {/* Top Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

                {/* Total Leads */}
                <div className="bg-linear-to-br from-indigo-500 to-indigo-800 p-6 rounded-3xl text-white shadow-xl  transform duration-300 ease-in-out hover:-translate-y-2">

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
                <div className="bg-linear-to-br from-orange-400 to-orange-600 p-6 rounded-3xl text-white shadow-xl transform duration-300 ease-in-out hover:-translate-y-2">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-orange-100">
                        Revenue
                      </p>

                      <h1 className="text-4xl font-bold mt-4">
                        ₹{totalRevenue}
                      </h1>
                    </div>

                    <div className="bg-white/20 p-4 rounded-2xl">
                      <CircleDollarSign size={34} />
                    </div>
                  </div>
                </div>

                {/* Qualified */}
                <div className="bg-linear-to-br from-blue-500 to-blue-700 p-6 rounded-3xl text-white shadow-xl transform duration-300 ease-in-out hover:-translate-y-2">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-blue-100">
                        Qualified
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
                <div className="bg-linear-to-br from-green-500 to-green-700 p-6 rounded-3xl text-white shadow-xl transform duration-300 ease-in-out hover:-translate-y-2">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-green-100">
                        Closed Deals
                      </p>

                      <h1 className="text-5xl font-bold mt-4">
                        {closedLeads}
                      </h1>
                    </div>

                    <div className="bg-white/20 p-4 rounded-2xl">
                      <UserRound size={34} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-3xl shadow-lg">

                  <div className="flex items-center gap-3 mb-6">

                    <Activity className="text-indigo-600" />

                    <h2 className="text-2xl font-bold text-gray-800">
                      Lead Status Overview
                    </h2>
                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >
                    <BarChart data={statusData}>

                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis dataKey="name" />

                      <YAxis />

                      <Tooltip />

                      <Bar
                        dataKey="value"
                        radius={[10, 10, 0, 0]}
                      >
                        {statusData.map(
                          (_, index) => (
                            <Cell
                              key={index}
                              fill={COLORS[index]}
                            />
                          )
                        )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-3xl shadow-lg">

                  <div className="flex items-center gap-3 mb-6">

                    <Share2 className="text-pink-600" />

                    <h2 className="text-2xl font-bold text-gray-800">
                      Lead Sources
                    </h2>
                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >

                    <PieChart>

                      <Pie
                        data={sourceData}
                        dataKey="leads"
                        nameKey="name"
                        outerRadius={110}
                        label
                      >

                        {sourceData.map(
                          (_, index) => (
                            <Cell
                              key={index}
                              fill={
                                COLORS[
                                  index %
                                    COLORS.length
                                ]
                              }
                            />
                          )
                        )}
                      </Pie>

                      <Tooltip />

                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Revenue Area Chart */}
              <div className="bg-white p-6 rounded-3xl shadow-lg mb-10">

                <div className="flex items-center gap-3 mb-6">

                  <TrendingUp className="text-green-600" />

                  <h2 className="text-2xl font-bold text-gray-800">
                    Revenue Analytics
                  </h2>
                </div>

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <AreaChart data={leads}>

                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="5%"
                          stopColor="#6366F1"
                          stopOpacity={0.8}
                        />

                        <stop
                          offset="95%"
                          stopColor="#6366F1"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="paid"
                      stroke="#6366F1"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Leads */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">

                <div className="flex items-center gap-3 mb-8">

                  <Clock3 className="text-orange-500" />

                  <h2 className="text-2xl font-bold text-gray-800">
                    Recent Leads
                  </h2>
                </div>

                <div className="space-y-5">

                  {leads.slice(0, 6).map((lead) => (

                    <div
                      key={lead._id}
                      className="flex justify-between items-center p-5 bg-gray-50 hover:bg-indigo-50 rounded-2xl transition-all duration-300"
                    >

                      <div>

                        <h1 className="font-bold text-lg text-gray-800">
                          {lead.name}
                        </h1>

                        <p className="text-gray-500">
                          {lead.email}
                        </p>

                        <p className="text-sm text-gray-400 mt-1">
                          {lead.date} • {lead.time}
                        </p>
                      </div>

                      <div className="flex gap-3 flex-wrap">

                        <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                          {lead.source}
                        </span>

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                          ₹{lead.paid}
                        </span>

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold
                          ${
                            lead.status === "Closed"
                              ? "bg-green-100 text-green-700"
                              : lead.status ===
                                "Qualified"
                              ? "bg-blue-100 text-blue-700"
                              : lead.status ===
                                "Contacted"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}