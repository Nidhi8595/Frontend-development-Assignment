// src/models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: { type: String },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

noteSchema.index({ owner: 1, title: 1 }); // index to help queries

module.exports = mongoose.model('Note', noteSchema);
