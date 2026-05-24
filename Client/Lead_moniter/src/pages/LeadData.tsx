import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { apiGet, apiPut } from "../api";

export default function LeadDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
    paid: 0,
    date: "",
    time: ""
  });

  const [loading, setLoading] = useState(true);

  // Fetch Lead Data
  const fetchLead = async () => {

    try {

      const response = await apiGet(`/leads/${id}`);

      const data = await response.json();

      if (response.ok) {
        // Handle _id removal mapping to state 
        const { _id, __v, ...rest } = data.data;
        setLead(rest);
      } else {
        alert(data.message || "Failed to fetch lead");
      }

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  // Update Lead
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      const response = await apiPut(`/leads/${id}`, lead);

      const data = await response.json();

      if (response.ok) {
        alert("Lead Updated Successfully");
        navigate("/leads");
      } else {
        alert(data.message || "Failed to update lead");
      }

    } catch (error) {

      console.log(error);

      alert("Server connection failed");
    }
  };

  if (loading) {
    return (
      <h1 className="p-10 text-2xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="fixed top-0 w-full z-50 shadow-md">
        <Navbar />
      </div>

      <div className="flex pt-16 w-full">
        {/* Sidebar */}
        <div className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-10">

          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Edit Lead
          </h1>

          <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div className="flex flex-col">

                <label className="font-semibold mb-1 text-gray-700">
                  Name
                </label>

                <input
                  type="text"
                  value={lead.name}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      name: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">

                <label className="font-semibold mb-1 text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={lead.email}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      email: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Status */}
              <div className="flex flex-col">

                <label className="font-semibold mb-1 text-gray-700">
                  Status
                </label>

                <select
                  value={lead.status}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      status: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

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
              </div>

              {/* Source */}
              <div className="flex flex-col">

                <label className="font-semibold mb-1 text-gray-700">
                  Source
                </label>

                <select
                  value={lead.source}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      source: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                  <option value="Website">
                    Website
                  </option>

                  <option value="Referral">
                    Referral
                  </option>

                  <option value="Instagram">
                    Instagram
                  </option>

                  <option value="Facebook">
                    Facebook
                  </option>

                  <option value="LinkedIn">
                    LinkedIn
                  </option>

                </select>
              </div>

              {/* Paid */}
              <div className="flex flex-col">

                <label className="font-semibold mb-1 text-gray-700">
                  Paid
                </label>

                <input
                  type="number"
                  value={lead.paid}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      paid: Number(e.target.value),
                    })
                  }
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col">

                <label className="font-semibold mb-1 text-gray-700">
                  Date
                </label>

                <input
                  type="date"
                  value={lead.date}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      date: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Time */}
              <div className="flex flex-col">

                <label className="font-semibold mb-1 text-gray-700">
                  Time
                </label>

                <input
                  type="time"
                  value={lead.time}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      time: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 mt-4"
              >
                Update Lead
              </button>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
}