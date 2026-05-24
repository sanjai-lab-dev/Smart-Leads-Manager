import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Extend Express Request to include userId
export interface AuthRequest extends Request {
  userId?: string
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Access denied. No token provided.',
      })
    }

    const token = authHeader.split(' ')[1]

    const secret = process.env.JWT_SECRET || 'fallback_secret'

    const decoded = jwt.verify(token, secret) as { userId: string }

    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token.',
    })
  }
}

export default authMiddleware
