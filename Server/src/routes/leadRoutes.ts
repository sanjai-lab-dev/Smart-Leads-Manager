import express from 'express'

import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from '../controllers/leadController'
import authMiddleware from '../middleware/auth'

const router = express.Router()

// All lead routes are protected
router.use(authMiddleware)

// POST /api/leads
router.post('/', createLead)

// GET /api/leads
router.get('/', getAllLeads)

// GET /api/leads/:id
router.get('/:id', getLeadById)

// PUT /api/leads/:id
router.put('/:id', updateLead)

// DELETE /api/leads/:id
router.delete('/:id', deleteLead)

export default router
