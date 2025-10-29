// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6"
    >
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-16 p-4">
          <motion.h1 
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Scalable Notes App
          </motion.h1>
          <nav className="space-x-6">
            <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Login</Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-300">Register</Link>
          </nav>
        </header>

        <motion.main 
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-8 text-gray-800"
          >
            Organize Your Thoughts
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Welcome to the next generation of note-taking. Simple, powerful, and beautifully designed for your ideas.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get started <FiArrowRight />
            </Link>
          </motion.div>
        </motion.main>
      </div>
    </motion.div>
  );
}
