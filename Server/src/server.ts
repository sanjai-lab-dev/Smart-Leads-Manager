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



// CORS Middleware
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}))


app.use(express.json())

// Database Connection
connectDB()


app.use((req, res, next) => {
  console.log('REQUEST:', req.method, req.url)
  next()
})
app.get('/', (req, res) => {
  res.send('API Running')
})
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

app.use((err: any, req: any, res: any, next: any) => {
  console.error('GLOBAL ERROR:', err)

  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message,
  })
})