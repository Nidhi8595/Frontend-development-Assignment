// src/components/NoteEditor.jsx
import React, { useState, useEffect } from 'react';

export default function NoteEditor({ initial = null, onSave, onClose }) {
  const [form, setForm] = useState({ title: '', body: '', tags: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || '',
        body: initial.body || '',
        tags: (initial.tags || []).join(', ')
      });
    }
  }, [initial]);

  const submit = async (e) => {
    e?.preventDefault();
    if (!form.title.trim()) return alert('Title required');
    setLoading(true);
    try {
      const payload = {
        title: form.title.trim(),
        body: form.body,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      await onSave(payload);
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl p-5 rounded shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">{initial ? 'Edit Note' : 'Create Note'}</h3>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <input
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Title"
            autoFocus
          />
          <textarea
            value={form.body}
            onChange={e => setForm({...form, body: e.target.value})}
            className="w-full p-2 border rounded h-28"
            placeholder="Note body (optional)"
          />
          <input
            value={form.tags}
            onChange={e => setForm({...form, tags: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Tags (comma separated) e.g. study, todo"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-1 bg-blue-600 text-white rounded">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
