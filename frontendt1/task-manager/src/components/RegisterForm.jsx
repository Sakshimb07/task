"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("team")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      })
      alert("Registration successful! Please log in.") // Optional: Provide user feedback
      navigate("/login") // Redirect to the login page

      // REMOVE OR COMMENT OUT THIS ENTIRE BLOCK BELOW:
      /*
      const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })

      const { token, role: returnedRole } = loginRes.data
      localStorage.setItem("token", token)
      localStorage.setItem("role", returnedRole)

      if (returnedRole === "admin") navigate("/admin")
      else if (returnedRole === "manager") navigate("/manager")
      else if (returnedRole === "bd") navigate("/bd")
      else navigate("/team")
      */
      // END OF BLOCK TO REMOVE/COMMENT OUT

    } catch (err) {
      console.error("Registration error:", err)

      if (err.response) {
        if (err.response.status === 409) {
          setError("Email already in use")
        } else if (err.response.data?.message) {
          setError(err.response.data.message)
        } else {
          setError(`Registration failed: ${err.response.status}`)
        }
      } else if (err.request) {
        setError("No response from server. Please check your connection.")
      } else {
        setError(`Error: ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left Visual Section */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(to bottom right, #319795, #4FD1C5)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" }}>
          JOIN US
        </h1>
        <div
          style={{
            width: "16rem",
            height: "16rem",
            backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3135/3135715.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      {/* Right Form Section */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f3f4f6",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "1.875rem", fontWeight: "600", color: "#2d3748", marginBottom: "1.5rem", textAlign: "center" }}>
          Create Account
        </h2>
        {error && <p style={{ color: "#e53e3e", textAlign: "center", marginBottom: "1rem" }}>{error}</p>}

        <form onSubmit={handleRegister} style={{ width: "100%", maxWidth: "28rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #d1d5db",
              outline: "none",
              fontSize: "1rem",
            }}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="team">Team</option>
            <option value="bd">BD</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#38b2ac",
              color: "white",
              fontWeight: "600",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#319795")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#38b2ac")}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "#718096", marginTop: "0.5rem" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "#319795", cursor: "pointer", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm