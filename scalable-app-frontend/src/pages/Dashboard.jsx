// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { clearToken } from '../utils/auth';
import NotesList from '../components/NotesList';

// Animation library
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/profile/me')
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(err);
        alert('Error fetching profile');
      });
  }, []);

  const handleLogout = () => {
    clearToken();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <motion.header
        className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <div>
          <motion.h1
            className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome, <span className="font-semibold text-purple-700">{profile?.name || '...'}</span>
          </motion.p>
        </div>
        <motion.button
          onClick={handleLogout}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-blue-500 hover:to-purple-600 text-white px-6 py-2 rounded-full shadow-lg font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          whileHover={{ scale: 1.08, boxShadow: '0 8px 24px rgba(80, 0, 200, 0.15)' }}
          whileTap={{ scale: 0.97 }}
        >
          Logout
        </motion.button>
      </motion.header>

      <main className="max-w-5xl mx-auto px-4 pb-10">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <NotesList />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
