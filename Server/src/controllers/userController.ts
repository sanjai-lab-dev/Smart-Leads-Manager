import { Request, Response } from 'express'

import User from '../models/User'

// ================= GET ALL USERS =================
export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    // Exclude password from response
    const users = await User.find().select('-password')

    if (users.length === 0) {
      return res.status(404).json({
        message: 'No users found',
      })
    }

    res.status(200).json({
      data: users,
    })
  } catch (error) {
    console.log('Get Users Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= DELETE USER =================
export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.status(200).json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.log('Delete User Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= UPDATE USER ROLE =================
export const updateUserRole = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params
    const { role } = req.body

    if (!role || !['Sales User', 'Admin'].includes(role)) {
      return res.status(400).json({
        message: 'Invalid role. Must be "Sales User" or "Admin".',
      })
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password')

    if (!updatedUser) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.status(200).json({
      message: 'User role updated successfully',
      data: updatedUser,
    })
  } catch (error) {
    console.log('Update Role Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}
