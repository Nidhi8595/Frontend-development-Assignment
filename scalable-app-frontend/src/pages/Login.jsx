import { useState } from 'react';
import API from '../utils/api';
import { saveToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      saveToken(res.data.token);
      alert('Login successful!');
      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <button className="bg-green-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
