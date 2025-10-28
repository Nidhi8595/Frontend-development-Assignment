// src/components/NoteCard.jsx
import React, { useState } from 'react';
import API from '../utils/api';

export default function NoteCard({ note, onDelete, onUpdated }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: note.title, body: note.body, tags: (note.tags || []).join(', ') });
  const [loading, setLoading] = useState(false);

  const save = async () => {
    setLoading(true);
    try {
      await API.put(`/notes/${note._id}`, { title: form.title, body: form.body, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) });
      setEditing(false);
      onUpdated();
    } catch (err) {
      alert('Update failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      {!editing ? (
        <>
          <div className="flex justify-between">
            <h4 className="font-semibold">{note.title}</h4>
            <div className="space-x-2">
              <button onClick={() => setEditing(true)} className="text-blue-600">Edit</button>
              <button onClick={onDelete} className="text-red-600">Delete</button>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{note.body}</p>
          <div className="mt-2 text-sm text-gray-500">{(note.tags || []).map((t,i) => <span className="mr-2" key={i}>#{t}</span>)}</div>
          <div className="mt-2 text-xs text-gray-400">Created: {new Date(note.createdAt).toLocaleString()}</div>
        </>
      ) : (
        <div className="space-y-2">
          <input className="w-full p-2 border rounded" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea className="w-full p-2 border rounded" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
          <input className="w-full p-2 border rounded" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          <div className="flex space-x-2">
            <button onClick={save} disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded">{loading ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
