'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPhone } from '@/lib/supabase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signInWithPhone(phone, password);

    setLoading(false);

    if (error) {
      setError('Incorrect phone number or password.');
      return;
    }

    router.push('/receipts');
    router.refresh();
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🏬</div>
          <p className="login-title">Gadisa Shop</p>
          <p className="login-subtitle">Sign in to view payments</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="field-label">Phone number</label>
          <input
            type="tel"
            placeholder="09xx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <label className="field-label" style={{ marginTop: 12 }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="login-note">
          🔒 Accounts are created by the shop owner only
        </div>
      </div>
    </div>
  );
}
