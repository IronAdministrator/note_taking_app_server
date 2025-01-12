// src/routes/notes.ts
import { Router } from 'express'
import Note from '../models/Note'

const router = Router()

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// CREATE a new note
router.post('/', async (req, res) => {
  try {
    const { title, text } = req.body
    const note = new Note({ title, text })
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// UPDATE a note
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, text } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, text },
      { new: true }
    )
    res.json(updatedNote)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await Note.findByIdAndDelete(id)
    res.json({ message: 'Note deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router