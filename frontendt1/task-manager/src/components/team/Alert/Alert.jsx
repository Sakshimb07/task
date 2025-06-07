"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"

const Alert = () => {
  const location = useLocation()

  // State for alerts list
  const [alerts, setAlerts] = useState([])

  // Loading and error states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form and form visibility state
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    phone: "",
    date: "",
    time: "",
    message: "",
    duration: "",
    notificationType: "",
  })

  const isEditing = formData.id !== null

  // Backend base URL - change if needed
  const BASE_URL = "http://localhost:5000/api/alert"

  // Fetch alerts from backend on mount
  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.get(BASE_URL)
      setAlerts(res.data) // Assuming backend returns array of alerts
    } catch (err) {
      setError("Failed to load alerts")
      console.error(err)
    }
    setLoading(false)
  }

  // Show form for adding alert
  const handleAddAlert = () => {
    setFormData({
      id: null,
      name: "",
      phone: "",
      date: "",
      time: "",
      message: "",
      duration: "",
      notificationType: "",
    })
    setShowForm(true)
  }

  // Submit add or update form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Basic validation could be added here if needed

    try {
      if (isEditing) {
        // Update alert via PUT
        await axios.put(`${BASE_URL}/${formData.id}`, formData)
      } else {
        // Add new alert via POST
        await axios.post(BASE_URL, formData)
      }
      // Refresh list after add/update
      await fetchAlerts()
      setShowForm(false)
    } catch (err) {
      setError("Failed to save alert")
      console.error(err)
    }
  }

  // Populate form to update alert
  const handleUpdate = (id) => {
    const alertToEdit = alerts.find((alert) => alert.id === id)
    if (alertToEdit) {
      setFormData(alertToEdit)
      setShowForm(true)
    }
  }

  // Delete alert
  const handleDelete = async (id) => {
    setError("")
    try {
      await axios.delete(`${BASE_URL}/${id}`)
      setAlerts(alerts.filter((alert) => alert.id !== id))
    } catch (err) {
      setError("Failed to delete alert")
      console.error(err)
    }
  }

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const navLinks = [
    { path: "/team", label: "Dashboard" },
    { path: "/team/task", label: "Tasks" },
    { path: "/team/notice", label: "Notice Board" },
    { path: "/team/calendar", label: "Calendar" },
    { path: "#", label: "Time Sheet" },
    { path: "/team/alert", label: "Alerts" },
    { path: "#", label: "Setting" },
  ]

  return (
    <div className="flex min-h-screen text-[#374151] text-base font-inter bg-gray-100" style={{ display: "flex", minHeight: "100vh", color: "#374151", fontSize: "16px", fontFamily: "Inter, sans-serif", backgroundColor: "#f3f4f6" }}>
      {/* Sidebar */}
      <aside className="w-[230px] bg-white p-5 sticky top-0 h-screen overflow-y-auto" style={{ width: "230px", backgroundColor: "#fff", padding: "20px", position: "sticky", top: "0", height: "100vh", overflowY: "auto" }}>
        <h2 className="text-2xl font-bold text-blue-600 mb-10 text-center">⚡ Taskflow</h2>
        <nav className="flex flex-col space-y-6 text-[19px] text-[#3c3e40] font-medium text-left leading-[2.5]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block w-48 px-3 py-2 rounded-md text-sm font-medium no-underline ${
                location.pathname === link.path
                  ? "bg-blue-100 text-gray-800"
                  : "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="p-8 flex-1" style={{ padding: "40px", flex: "1" }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Alerts Management</h1>
            <button
              onClick={handleAddAlert}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              style={{ backgroundColor: "#1a73e8", color: "#fff", padding: "12px 16px", borderRadius: "8px", fontWeight: "500", transition: "background-color 0.3s ease" }}
            >
              Add External Alerts
            </button>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {loading ? (
            <p>Loading alerts...</p>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", border: "1px solid #e5e7eb", overflow: "hidden", display: "flex", flexDirection: "column", padding: "20px", marginTop: "20px", gap: "24px" }}>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Message</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Duration</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Notification Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4 text-gray-500">
                        No alerts found.
                      </td>
                    </tr>
                  ) : (
                    alerts.map((alert) => (
                      <tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">{alert.name}</td>
                        <td className="px-4 py-3">{alert.phone}</td>
                        <td className="px-4 py-3">{alert.date}</td>
                        <td className="px-4 py-3">{alert.time}</td>
                        <td className="px-4 py-3">{alert.message}</td>
                        <td className="px-4 py-3">{alert.duration}</td>
                        <td className="px-4 py-3">{alert.notificationType}</td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdate(alert.id)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition"
                              style={{ backgroundColor: "#1a73e8", color: "#fff", padding: "8px 12px", borderRadius: "4px", fontWeight: "500", transition: "background-color 0.3s ease" }}
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDelete(alert.id)}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition"
                              style={{ backgroundColor: "#ff3b3f", color: "#fff", padding: "8px 12px", borderRadius: "4px", fontWeight: "500", transition: "background-color 0.3s ease" }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Overlay Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl w-96 max-w-[90%] shadow-2xl"   style={{ backgroundColor: "#fff", padding: "1px", borderRadius: "16px", width: "1000px", maxWidth: "90%", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", height: "auto"}}>
              <h2 className="text-xl font-semibold mb-6 text-center text-gray-800" style={{ fontSize: "20px", fontWeight: "600", marginBottom: "24px", textAlign: "center", color: "#374151" }}>
                {isEditing ? "Update Alert" : "Add Alert"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4" style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "20px" }}>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", width: "100%", boxSizing: "border-box", fontSize: "16px", color: "#374151" }}
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", width: "100%", boxSizing: "border-box", fontSize: "16px", color: "#374151" }}
                />
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Date"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", width: "100%", boxSizing: "border-box", fontSize: "16px", color: "#374151" }}
                />
                <input
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="Time"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", width: "100%", boxSizing: "border-box", fontSize: "16px", color: "#374151" }}
                />
                <input
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", width: "100%", boxSizing: "border-box", fontSize: "16px", color: "#374151" }}
                />
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", width: "100%", boxSizing: "border-box", fontSize: "16px", color: "#374151" }}
                />
                <input
                  name="notificationType"
                  value={formData.notificationType}
                  onChange={handleChange}
                  placeholder="Notification Type"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  style={{ padding: "12px", border: "1px solid #D1D5DB", borderRadius: "8px", width: "100%", boxSizing: "border-box", fontSize: "16px", color: "#374151" }}
                />
                <div className="flex justify-between pt-4 gap-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    style={{ padding: "12px", borderRadius: "8px", fontSize: "16px", fontWeight: "500", transition: "background-color 0.3s ease" }}
                  >
                    {isEditing ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition"
                    style={{ padding: "12px", borderRadius: "8px", fontSize: "16px", fontWeight: "500", transition: "background-color 0.3s ease" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Alert
