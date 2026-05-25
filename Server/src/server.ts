// server.ts

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/db'

// Route imports
import authRoutes from './routes/authRoutes'
import leadRoutes from './routes/leadRoutes'
import userRoutes from './routes/userRoutes'

const app = express()

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://smart-leads-manager-u3md.vercel.app'
  ],
  credentials: true,
}))

app.options('*', cors())

app.use(express.json())

// Database Connection
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/users', userRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' })
})

// Start Server
const PORT = Number(process.env.PORT) || 10000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;