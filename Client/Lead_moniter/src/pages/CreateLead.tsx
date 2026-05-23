import { useState } from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Input from '../components/Input'
import Button from '../components/Button'

export default function CreateLead() {
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    status: 'New',
    source: 'Website',
    paid: undefined
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setLeadData({
      ...leadData,
      [name]:
        name === "paid"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/NewLead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(leadData),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        // Reset form
        setLeadData({
          name: "",
          email: "",
          status: "New",
          source: "Website",
          paid: undefined
        });
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);

      alert("Server Error");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 ">

      {/* Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 ">

          {/* Page Heading */}
          <div className='flex justify-center items-center flex-col'>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Lead
              </h1>

              <p className="text-gray-500 mt-2">
                Add a new customer lead
              </p>
            </div>
            {/* Form Card */}
            <div className="bg-white p-8 rounded-2xl shadow-md w-full sm:w-[80%] md:w-[60%]">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Name */}
                <Input
                  label="Customer Name"
                  type="text"
                  name="name"
                  value={leadData.name}
                  placeholder="Enter customer name"
                  onChange={handleChange}
                />

                {/* Email */}
                <Input
                  label="Customer Email"
                  type="email"
                  name="email"
                  value={leadData.email}
                  placeholder="Enter customer email"
                  onChange={handleChange}
                />

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Status
                  </label>

                  <select
                    name="status"
                    value={leadData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Source
                  </label>

                  <select
                    name="source"
                    value={leadData.source}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <Input
                    label="Amount Paid"
                    type="number"
                    name="paid"
                    value={leadData.paid}
                    placeholder="Enter amount"
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  text="Create Lead"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </main >
      </div >
    </div >
  )
}