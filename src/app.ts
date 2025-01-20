// src/app.ts
import express from 'express'
import cors from 'cors'
import notesRoutes from './routes/notes'
import authRoutes from './routes/auth'
const app = express()

app.use(cors())
app.use(express.json())

// Add a root route handler
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    endpoints: {
      notes: {
        GET: '/api/notes',
        POST: '/api/notes',
        PUT: '/api/notes/:id',
        DELETE: '/api/notes/:id'
      }
    }
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

export default app