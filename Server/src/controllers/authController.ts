import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import { registerSchema, loginSchema } from '../validation/schemas'
import { AuthRequest } from '../middleware/auth'

// Generate JWT Token
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback_secret'
  return jwt.sign({ userId }, secret, { expiresIn: '7d' })
}

// ================= REGISTER =================
export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate input
    const parsed = registerSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: parsed.error.format(),
      })
    }

    const { name, email, password, role } = parsed.data

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email',
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    // Generate token
    const token = generateToken(user._id.toString())

    res.status(201).json({
      message: 'User registered successfully',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.log('Register Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= LOGIN =================
export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate input
    const parsed = loginSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Validation Error',
        errors: parsed.error.format(),
      })
    }

    const { email, password } = parsed.data

    // Find user
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    // Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    // Generate token
    const token = generateToken(user._id.toString())

    res.status(200).json({
      message: 'Login Successful',
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.log('Login Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}

// ================= GET PROFILE =================
export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = await User.findById(req.userId).select('-password')

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.status(200).json({
      data: user,
    })
  } catch (error) {
    console.log('Profile Error:', error)
    res.status(500).json({
      message: 'Server Error',
    })
  }
}