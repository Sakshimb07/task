"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await axios.post("https://backendt1-1.onrender.com/api/auth/login", {
        email,
        password,
      })

      const { token, role } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("role", role)

      if (role === "admin") navigate("/admin")
      else if (role === "manager") navigate("/manager")
      else if (role === "bd") navigate("/bd")
      else navigate("/team")
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("User not found")
        } else if (err.response.status === 401) {
          setError("Invalid credentials")
        } else if (err.response.data?.message) {
          setError(err.response.data.message)
        } else {
          setError(`Login failed: ${err.response.status}`)
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
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0e8fc",
      padding: "20px",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "white",
        borderRadius: "24px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        overflow: "hidden"
      }}>
        {/* Left Side */}
        <div style={{
          width: "100%",
          maxWidth: "600px",
          padding: "40px"
        }}>
          <h2 style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#2d2d2d",
            marginBottom: "24px"
          }}>
            Log in
          </h2>

          {error && (
            <div style={{
              backgroundColor: "#fee2e2",
              border: "1px solid #fca5a5",
              color: "#b91c1c",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "16px"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <input
              type="email"
              placeholder="Email or Phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                outline: "none",
                fontSize: "16px"
              }}
            />

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "16px",
                  width: "100%"
                }}
              />
              <div
                style={{
                  textAlign: "right",
                  marginTop: "4px",
                  fontSize: "14px",
                  color: "#7c3aed",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                Forgot password?
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#facc15",
                color: "white",
                fontWeight: "bold",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <div style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
              Not a member?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{ color: "#7c3aed", cursor: "pointer", textDecoration: "underline" }}
              >
                Sign up
              </span>
            </div>

            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "10px",
                fontSize: "14px",
                backgroundColor: "white",
                cursor: "pointer"
              }}
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              Log in with Google
            </button>
          </form>
        </div>

        <div style={{
          width: "50%",
          backgroundColor: "#ede9fe",
          alignItems: "center",
          justifyContent: "center",
          display: "flex"
        }}>
          <img
            src="/logintask.jpg"
            alt="Login Illustration"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>


      </div>
    </div>
  )
}

export default LoginForm
