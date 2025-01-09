const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// CREATE a Note (POST)
router.post('/', async (req, res) => {
  try {
    const { title, text } = req.body;
    const newNote = new Note({ title, text });
    await newNote.save();
    return res.status(201).json(newNote);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ All Notes (GET)
router.get('/', async (req, res) => {
  try {
    // Sort by updatedAt in descending order
    const notes = await Note.find().sort({ updatedAt: -1 });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// UPDATE a Note (PUT)
router.put('/:id', async (req, res) => {
  try {
    const { title, text } = req.body;
    // We want to set the new title & text,
    // also automatically update `updatedAt` by Mongoose,
    // and increment `updatedCount` by 1.
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        text,
        // Mongoose's updatedAt field will be auto-updated because of timestamps: true
        $inc: { updatedCount: 1 } // Increment the updatedCount by 1
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json(updatedNote);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE a Note (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedNote);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;