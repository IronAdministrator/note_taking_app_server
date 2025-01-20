import { Router, Request, Response } from 'express'
import Note from '../models/Note'
import { requireAuth } from '../middleware/auth'
const router = Router()

// GET all notes
router.get('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.userId
    const notes = await Note.find({ userId }).sort({ updatedAt: -1 })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// CREATE a new note
router.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, text } = req.body
    const userId = (req as any).user.userId
    const note = new Note({ title, text, userId })
    const savedNote = await note.save()
    res.json(savedNote)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// UPDATE a note
router.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
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
router.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    await Note.findByIdAndDelete(id)
    res.json({ message: 'Note deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router