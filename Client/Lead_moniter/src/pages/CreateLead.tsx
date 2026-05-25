import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import Sidebar from '../components/Sidebar'
import Input from '../components/Input'
import Button from '../components/Button'
import { apiPost } from '../api'

export default function CreateLead() {

  const navigate = useNavigate()

  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    status: 'New',
    source: 'Website',
    paid: undefined as number | undefined,
    date: '',
    time: ''
  })

  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target

    setLeadData({
      ...leadData,
      [name]:
        name === "paid"
          ? Number(value)
          : value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()
    setError('')

    try {

      const response = await apiPost('/leads', leadData)

      const data = await response.json()

      if (response.ok) {

        alert("Lead Created Successfully")

        // Reset form
        setLeadData({
          name: "",
          email: "",
          status: "New",
          source: "Website",
          paid: undefined,
          date: '',
          time: ''
        })

        navigate('/Leads')

      } else {

        setError(data.message || 'Failed to create lead')
      }

    } catch (error) {

      console.error(error)

      setError("Server connection failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

  
      <div className="flex  ">

        {/* Sidebar */}
        <div className="fixed left-0 md:w-64 bg-white shadow-lg z-40">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="md:ml-64 flex-1 p-8">

          <div className='flex justify-center items-center flex-col'>

            {/* Heading */}
            <div className="mb-8">

              <h1 className="text-3xl font-bold text-gray-800">
                Create Lead
              </h1>

              <p className="text-gray-500 mt-2">
                Add a new customer lead
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center w-full sm:w-[80%] md:w-[60%]">
                {error}
              </div>
            )}

            {/* Form */}
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

                {/* Paid Amount */}
                <Input
                  label="Amount Paid"
                  type="number"
                  name="paid"
                  value={leadData.paid || ""}
                  placeholder="Enter amount"
                  onChange={handleChange}
                />

                {/* Date */}
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  value={leadData.date}
                  onChange={handleChange}
                />

                {/* Time */}
                <Input
                  label="Time"
                  type="time"
                  name="time"
                  value={leadData.time}
                  onChange={handleChange}
                />

                {/* Submit Button */}
                <Button
                  text="Create Lead"
                  type="submit"
                />

              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}