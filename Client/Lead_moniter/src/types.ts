// Shared types used across the client application

export interface Lead {
  _id: string
  name: string
  email: string
  status: string
  source: string
  paid: number
  date: string
  time: string
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
}
