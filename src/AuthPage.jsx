import { useState } from 'react'

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('users') || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const reset = (newMode) => {
    setMode(newMode);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const name = username.trim();
    const users = getUsers();
    if (!name) return setError('Username is required.');
    if (!password) return setError('Password is required.');
    if (users[name] === undefined) return setError('No account found. Check your username or create an account.');
    if (users[name] !== password) return setError('Incorrect password.');
    onLogin(name);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = username.trim();
    if (!name) return setError('Username is required.');
    if (name.length < 3) return setError('Username must be at least 3 characters.');
    if (!password) return setError('Password is required.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    const users = getUsers();
    if (users[name] !== undefined) return setError('That username is already taken.');
    users[name] = password;
    saveUsers(users);
    onLogin(name);
  };

  const isSignUp = mode === 'signup';

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', color: 'var(--color-text)' }}
      className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.2em' }}
            className="text-xs uppercase mb-4">Finance Tracker</p>
          <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontWeight: 300 }}
            className="text-5xl italic">
            {isSignUp ? 'Create account' : 'Welcome back'}
          </h1>
        </div>

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
            }}
            className="w-full px-5 py-5 text-lg rounded-xl outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-muted)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-body)',
            }}
            className="w-full px-5 py-5 text-lg rounded-xl outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-muted)]"
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body)',
              }}
              className="w-full px-5 py-5 text-lg rounded-xl outline-none focus:border-[var(--color-accent)] transition-colors placeholder:text-[var(--color-muted)]"
            />
          )}
          {error && (
            <p style={{ color: 'var(--color-expense)', fontFamily: 'var(--font-body)' }} className="text-sm">{error}</p>
          )}
          <button
            type="submit"
            style={{
              background: 'var(--color-accent)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.15em',
            }}
            className="w-full py-6 text-xl uppercase font-medium tracking-widest text-white rounded-xl hover:opacity-90 transition-opacity mt-8"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }} className="text-center text-base mt-8">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => reset(isSignUp ? 'signin' : 'signup')}
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)' }}
            className="text-base underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage
