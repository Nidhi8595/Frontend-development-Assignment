import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful!');
      nav('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error during registration');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl"
    >
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        Create Account
      </motion.h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full border pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full border pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full border pl-10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg"
        >
          Register
        </motion.button>
      </form>
    </motion.div>
  );
}