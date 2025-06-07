"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import TeamDashboard from "./components/TeamDashboard"
import ManagerDashboard from "./components/ManagerDashboard"
import AdminDashboard from "./components/AdminDashboard"
import Task from "./components/team/Task/Task"
import Notice from "./components/team/Notice/Notice"
import Calendar from "./components/team/Calendar/Calendar"
import Alert from "./components/team/Alert/Alert"
import TeamMembers from "./components/team/TeamMembers"
import BDDashboard from "./components/BDDashboard"

import { useState, useEffect } from "react"

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role")
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to the appropriate dashboard based on role
    if (role === "admin") return <Navigate to="/admin" replace />
    if (role === "manager") return <Navigate to="/manager" replace />
    if (role === "bd") return <Navigate to="/bd" replace />
    if (role === "team") return <Navigate to="/team" replace />

    // If role is invalid, redirect to login
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bd"
          element={
            <ProtectedRoute allowedRoles={["bd"]}>
              <BDDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute allowedRoles={["team"]}>
              <TeamDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/task"
          element={
            <ProtectedRoute allowedRoles={["team", "manager", "admin"]}>
              <Task />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/notice"
          element={
            <ProtectedRoute allowedRoles={["team", "manager", "admin"]}>
              <Notice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/calendar"
          element={
            <ProtectedRoute allowedRoles={["team", "manager", "admin"]}>
              <Calendar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team/alert"
          element={
            <ProtectedRoute allowedRoles={["team", "manager", "admin"]}>
              <Alert />
            </ProtectedRoute>
          }
        />

        {/* Add the TeamMembers route */}
        <Route
          path="/team/members"
          element={
            <ProtectedRoute allowedRoles={["team", "manager", "admin"]}>
              <TeamMembers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={`/${localStorage.getItem("role") || "team"}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
