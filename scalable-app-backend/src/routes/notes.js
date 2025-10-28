// src/routes/notes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const Note = require('../models/Note');

// Create note
router.post(
  '/',
  auth,
  [ body('title').notEmpty().withMessage('Title required') ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { title, body: content, tags } = req.body;
      const note = await Note.create({
        owner: req.user.id,
        title,
        body: content || '',
        tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(',').map(t => t.trim()) : [])
      });
      res.json(note);
    } catch (err) { next(err); }
  }
);

// Read list with search & tag filter
router.get('/', auth, async (req, res, next) => {
  try {
    const { q, tag } = req.query;
    const filter = { owner: req.user.id };
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (tag) filter.tags = tag;
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) { next(err); }
});

// Get single note
router.get('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    res.json(note);
  } catch (err) { next(err); }
});

// Update note
router.put('/:id', auth, async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.title) updates.title = req.body.title;
    if (req.body.body !== undefined) updates.body = req.body.body;
    if (req.body.tags !== undefined) updates.tags = Array.isArray(req.body.tags) ? req.body.tags : String(req.body.tags).split(',').map(t => t.trim());

    const note = await Note.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, updates, { new: true });
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    res.json(note);
  } catch (err) { next(err); }
});

// Delete note
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    res.json({ msg: 'Note deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
