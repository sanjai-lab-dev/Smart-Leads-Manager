import express from 'express'

import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from '../controllers/userController'
import authMiddleware from '../middleware/auth'

const router = express.Router()

// All user routes are protected
router.use(authMiddleware)

// GET /api/users
router.get('/', getAllUsers)

// DELETE /api/users/:id
router.delete('/:id', deleteUser)

// PUT /api/users/:id/role
router.put('/:id/role', updateUserRole)

export default router
