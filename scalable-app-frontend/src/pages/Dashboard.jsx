import { useEffect, useState } from 'react';
import API from '../utils/api';
import { clearToken } from '../utils/auth';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/profile/me')
      .then((res) => setProfile(res.data))
      .catch(() => alert('Error fetching profile'));
  }, []);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Welcome, {profile?.name || 'Loading...'}
        </h2>
        <button
          onClick={() => {
            clearToken();
            window.location.href = '/login';
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Your Notes</h3>
        {/* Notes CRUD component will go here */}
      </div>
    </div>
  );
}
