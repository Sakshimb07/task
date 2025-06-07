"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { clearAuth } from "../utils/authUtils"

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Clear authentication data
    clearAuth()

    // Redirect to login page
    navigate("/login")
  }, [navigate])

  return (
    <div className="logout-page">
      <p>Logging out...</p>
    </div>
  )
}

export default Logout
