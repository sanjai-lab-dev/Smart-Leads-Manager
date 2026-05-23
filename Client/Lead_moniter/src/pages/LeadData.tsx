import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
    paid: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch Lead Data
  const fetchLead = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/leads/${id}`
      );

      const data = await response.json();

      setLead(data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `http://localhost:5000/DeleteLead/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Lead Deleted Successfully");

      navigate("/leads");

    } catch (error) {

      console.log(error);

      alert("Failed to Delete Lead");
    }
  };
  // Update Lead
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/EditLead",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            ...lead,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Lead Updated Successfully");

      navigate("/leads");

    } catch (error) {
      console.log(error);
      alert("Failed to Update Lead");
    }
  };

  if (loading) {
    return <h1 className="p-10 text-2xl">Loading...</h1>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">

        {/* Navbar */}
        <Navbar />

        <div className="p-10">
          <h1 className="text-3xl font-bold mb-6">
            Edit Lead
          </h1>

          <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
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
                  className="border p-3 rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
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
                  className="border p-3 rounded-lg"
                />
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
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
                  className="border p-3 rounded-lg"
                >
                  <option value="New">New</option>
                  <option value="Contacted">
                    Pending
                  </option>
                  <option value="Qualified">
                    Qualified
                  </option>
                  <option value="Closed">
                    Compltete
                  </option>
                </select>
              </div>

              {/* Source */}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">
                  Source
                </label>
                
                <select
                  value={lead.status}
                  onChange={(e) =>
                    setLead({
                      ...lead,
                      source: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                >
                  <option value="New">Website</option>
                  <option value="Referral">
                    Referral
                  </option>
                  <option value="Instagram">
                    Instagram
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
                <label className="font-semibold mb-1">
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
                  className="border p-3 rounded-lg"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-blue-200 rounded-2xl p-4  text-blue-900 transform duration-100 hover:translate-x-1.5 hover:bg-blue-100 ml-4 font-sans"
              >
                Update Lead
              </button>

              {/*Delete button */}
              <button
                type="button"
                onClick={handleDelete}
                 className="bg-red-200 rounded-2xl p-4  text-red-800 transform duration-100 hover:translate-x-1.5 hover:bg-red-100 ml-4"
              >
                Delete Lead
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}