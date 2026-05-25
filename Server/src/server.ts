import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import connectDB from './config/db'

// Route imports
import authRoutes from './routes/authRoutes'
import leadRoutes from './routes/leadRoutes'
import userRoutes from './routes/userRoutes'

const app = express()



// Manual CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )

  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )

  res.header(
    'Access-Control-Allow-Credentials',
    'true'
  )

  console.log(req.method, req.url)

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }

  next()
})


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