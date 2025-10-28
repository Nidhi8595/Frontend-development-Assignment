// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Scalable Notes App</h1>
        <nav>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
      <main>
        <p className="mb-4">
            Welcome to the Scalable Notes App! Create an account to start managing your notes efficiently.
        </p>
        <Link to="/register" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Get started →</Link>
      </main>
    </div>
  );
}
