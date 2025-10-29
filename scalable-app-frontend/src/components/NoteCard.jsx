// src/components/NoteCard.jsx
import React from 'react';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div
      className="relative group p-5 bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
      style={{ minWidth: 260, maxWidth: 400, margin: 'auto' }}
    >
      {/* Animated background blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-xl text-blue-900 mb-1 animate-fade-in-down">{note.title}</h4>
          <p className="text-base text-gray-700 mt-1 animate-fade-in">{note.body}</p>
        </div>
        <div className="flex flex-col items-end gap-2 ml-3">
          <button
            onClick={onEdit}
            className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 font-medium text-xs shadow-sm hover:bg-blue-200 transition-all duration-200 animate-fade-in"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 rounded-lg bg-red-100 text-red-600 font-medium text-xs shadow-sm hover:bg-red-200 transition-all duration-200 animate-fade-in"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 animate-fade-in-up">
        {(note.tags || []).map((t, i) => (
          <span
            key={i}
            className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm hover:bg-blue-300 transition"
          >
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-3 text-xs text-gray-500 animate-fade-in-up">
        {new Date(note.createdAt).toLocaleString()}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in { animation: fade-in 0.6s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in-down { animation: fade-in-down 0.7s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
