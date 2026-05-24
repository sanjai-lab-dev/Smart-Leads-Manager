import express from 'express'

import { registerUser, loginUser, getProfile } from '../controllers/authController'
import authMiddleware from '../middleware/auth'

const router = express.Router()

// POST /api/auth/register
router.post('/register', registerUser)

// POST /api/auth/login
router.post('/login', loginUser)

// GET /api/auth/profile (protected)
router.get('/profile', authMiddleware, getProfile)

export default router