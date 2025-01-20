// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
  email: string
  // add more fields if you embed them in the token
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.status(401).json({ message: 'No auth token' })
      return
    }
    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET || 'secret'

    const decoded = jwt.verify(token, secret) as JwtPayload
    // Attach user info to request object so routes can access
    (req as any).user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' })
  }
}