// src/components/NotesList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../utils/api';
import NoteEditor from './NoteEditor';
import NoteCard from './NoteCard';

// small debounce helper
function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [editingNote, setEditingNote] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // fetch notes
  const fetchNotes = useCallback(async (opts = {}) => {
    setLoading(true);
    try {
      const params = { q: opts.q ?? q, tag: opts.tag ?? tag };
      const res = await API.get('/notes', { params });
      setNotes(res.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [q, tag]);

  const debouncedFetch = useCallback(
    debounce((val) => fetchNotes({ q: val }), 300),
    [fetchNotes]
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  const onSearchChange = (e) => {
    const val = e.target.value;
    setQ(val);
    debouncedFetch(val);
  };

  const onTagChange = (e) => {
    const val = e.target.value;
    setTag(val);
    fetchNotes({ tag: val });
  };

  const handleCreate = async (payload) => {
    try {
      const res = await API.post('/notes', payload);
      setNotes((prev) => [res.data, ...prev]);
      setShowCreate(false);
    } catch (err) {
      console.error(err);
      alert('Create failed');
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      const res = await API.put(`/notes/${id}`, payload);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
      setEditingNote(null);
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this note?')) return;
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const totalPages = Math.max(1, Math.ceil(notes.length / perPage));
  const visibleNotes = notes.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.div
      className="p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Search + Filter */}
      <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            value={q}
            onChange={onSearchChange}
            placeholder="🔍 Search notes..."
            className="px-4 py-2 rounded-xl border border-gray-300 w-full sm:w-64 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition-all"
          />
          <input
            value={tag}
            onChange={onTagChange}
            placeholder="🏷️ Filter by tag"
            className="px-4 py-2 rounded-xl border border-gray-300 w-full sm:w-48 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition-all"
          />
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-5 py-2 rounded-xl font-medium shadow hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          + New Note
        </button>
      </section>

      {/* Notes Grid */}
      <section>
        {loading ? (
          <div className="text-center py-10 text-gray-500 animate-pulse">
            Loading notes...
          </div>
        ) : notes.length === 0 ? (
          <motion.div
            className="text-gray-600 text-center mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No notes found. ✨ Create your first one!
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence>
                {visibleNotes.map((note) => (
                  <motion.div
                    key={note._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                  >
                    <NoteCard
                      note={note}
                      onEdit={() => setEditingNote(note)}
                      onDelete={() => handleDelete(note._id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            {notes.length > perPage && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`px-4 py-2 rounded-xl border ${
                    page === 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  ⬅ Prev
                </button>
                <span className="text-gray-700 font-medium">
                  Page {page} / {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`px-4 py-2 rounded-xl border ${
                    page === totalPages
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Next ➡
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Animated Modals */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[500px]"
            >
              <NoteEditor
                onClose={() => setShowCreate(false)}
                onSave={handleCreate}
              />
            </motion.div>
          </motion.div>
        )}

        {editingNote && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[500px]"
            >
              <NoteEditor
                initial={editingNote}
                onClose={() => setEditingNote(null)}
                onSave={(payload) => handleUpdate(editingNote._id, payload)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
