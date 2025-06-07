/**
 * Utility functions for authentication
 */

// Check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem("token")
    return !!token // Returns true if token exists, false otherwise
  }
  
  // Get the current user's role
  export const getUserRole = () => {
    return localStorage.getItem("role")
  }
  
  // Clear authentication data (for logout)
  export const clearAuth = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
  }
  
  // Set authentication data
  export const setAuth = (token, role) => {
    localStorage.setItem("token", token)
    localStorage.setItem("role", role)
  }
  
  // Check if token is valid (this is a simple check, in a real app you'd verify with the server)
  export const isTokenValid = () => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")
  
    // Both token and role must exist
    return !!token && !!role
  }
  
  // Redirect to appropriate dashboard based on role
  export const redirectToDashboard = (navigate) => {
    const role = localStorage.getItem("role")
  
    if (role === "admin") navigate("/admin", { replace: true })
    else if (role === "manager") navigate("/manager", { replace: true })
    else if (role === "team") navigate("/team", { replace: true })
    else navigate("/login", { replace: true })
  }
  