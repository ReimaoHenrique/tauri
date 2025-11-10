import { useEffect, useState } from "react";
import { useJwt } from "../context/JwtManager";
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  company: { name: string };
}

export const UserProfile = () => {
  const { token, logout } = useJwt();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get('https://bff-mobile.vercel.app/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <p>Company: {user.company.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>No user data</p>
      )}
    </div>
  );
};
