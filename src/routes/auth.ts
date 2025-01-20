import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'

const router = Router()

// POST /auth/signup
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body

    // 1) Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    // 2) Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // 3) Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })
    await newUser.save()

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// POST /auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // 1) Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    // 2) Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' })
      return
    }

    // 3) Generate JWT
    // ideally store secret in .env, e.g. process.env.JWT_SECRET
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    )

    // 4) Return token
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

export default router