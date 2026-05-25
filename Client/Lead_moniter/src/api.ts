// Centralized API helper with JWT auto-attach

const API_BASE = import.meta.env.VITE_API_URL || 'https://smart-leads-manager-u5mc.onrender.com'

// Get stored token
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// Store token
export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

// Remove token (logout)
export const removeToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// Store user data
export const setUser = (user: object) => {
  localStorage.setItem('user', JSON.stringify(user))
}

// Get stored user data
export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken()
}

// Build headers with auth token
const authHeaders = (): HeadersInit => {
  const token = getToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

// ========== API Methods ==========

export const apiGet = async (endpoint: string) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'GET',
    headers: authHeaders(),
  })
  return response
}

export const apiPost = async (endpoint: string, body: object) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })
  return response
}

export const apiPut = async (endpoint: string, body: object) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body),
  })
  return response
}

export const apiDelete = async (endpoint: string) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  return response
}
