'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      // Set a simple cookie
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      router.push('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleLogin}
        className="w-full max-w-md bg-card border border-border p-8 rounded-xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-input rounded-lg p-3 text-foreground focus:ring-2 focus:ring-ring outline-none transition-all"
            placeholder="Enter admin password"
          />
        </div>

        {error && <p className="text-destructive text-sm text-center">{error}</p>}

        <button 
          type="submit"
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Login
        </button>
      </motion.form>
    </div>
  );
}
