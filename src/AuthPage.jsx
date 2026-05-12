import { useState } from 'react'

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "password123";

function AuthPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      onLogin(username);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', color: 'var(--color-text)' }}
      className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.2em' }}
            className="text-xs uppercase mb-4">Finance Tracker</p>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontWeight: 300 }}
            className="text-5xl italic">Welcome back</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
            }}
            className="w-full px-4 py-4 text-base rounded-lg outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-muted)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
            }}
            className="w-full px-4 py-4 text-base rounded-lg outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-muted)]"
          />
          {error && (
            <p style={{ color: 'var(--color-expense)', fontFamily: 'var(--font-body)' }} className="text-xs">{error}</p>
          )}
          <button
            type="submit"
            style={{
              background: 'var(--color-accent)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.15em',
            }}
            className="w-full py-4 text-sm uppercase font-medium tracking-widest text-white rounded-lg hover:opacity-90 transition-opacity mt-2"
          >
            Sign In
          </button>
        </form>

        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }} className="text-center text-xs mt-8">
          Demo: <span style={{ color: 'var(--color-text)' }}>admin</span> / <span style={{ color: 'var(--color-text)' }}>password123</span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage
