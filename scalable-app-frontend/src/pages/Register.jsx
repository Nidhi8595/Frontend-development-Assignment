import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

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
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
}
