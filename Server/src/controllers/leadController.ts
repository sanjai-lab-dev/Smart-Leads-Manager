import { Request, Response } from 'express'

import Lead from '../models/Lead'
import { createLeadSchema, updateLeadSchema } from '../validation/schemas'

// ================= CREATE LEAD =================
export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate input
    const parsed = createLeadSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: parsed.error.format(),
      })
    }

    const newLead = await Lead.create(parsed.data)

    res.status(201).json({
      message: 'Lead created successfully',
      data: newLead,
    })
  } catch (error) {
    console.log('Create Lead Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= GET ALL LEADS =================
export const getAllLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await Lead.find()

    res.status(200).json({
      message: 'Leads fetched',
      data: leads,
    })
  } catch (error) {
    console.log('Get Leads Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= GET SINGLE LEAD =================
export const getLeadById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params

    const lead = await Lead.findById(id)

    if (!lead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    res.status(200).json({
      data: lead,
    })
  } catch (error) {
    console.log('Get Lead Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= UPDATE LEAD =================
export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params

    // Validate input
    const parsed = updateLeadSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: parsed.error.format(),
      })
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      parsed.data,
      { new: true }
    )

    if (!updatedLead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    res.status(200).json({
      message: 'Lead updated successfully',
      data: updatedLead,
    })
  } catch (error) {
    console.log('Update Lead Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= DELETE LEAD =================
export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params

    const deletedLead = await Lead.findByIdAndDelete(id)

    if (!deletedLead) {
      return res.status(404).json({
        message: 'Lead not found',
      })
    }

    res.status(200).json({
      message: 'Lead deleted successfully',
    })
  } catch (error) {
    console.log('Delete Lead Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}
