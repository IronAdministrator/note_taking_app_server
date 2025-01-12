// src/server.ts
import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import { connectDB } from './config/db'

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || ''

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})