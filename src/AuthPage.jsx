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
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Finance Tracker</h1>
        <p className="auth-subtitle">Sign in to continue</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(""); }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
        <p className="auth-hint">Use <strong>admin</strong> / <strong>password123</strong></p>
      </div>
    </div>
  );
}

export default AuthPage
