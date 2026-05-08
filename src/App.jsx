import { useState, useEffect } from 'react'
import './App.css'
import AuthPage from './AuthPage.jsx'
import Summary from './Summary.jsx'
import Charts from './Charts.jsx'
import TransactionForm from './TransactionForm.jsx'
import TransactionList from './TransactionList.jsx'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('transactions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
      { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
      { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
      { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
      { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
      { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
      { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
      { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
    ];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleEdit = (updated) => {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  if (!currentUser) {
    return <AuthPage onLogin={setCurrentUser} />;
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', color: 'var(--color-text)', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--color-border)' }} className="sticky top-0 z-10"
        css={{ background: 'var(--color-canvas)' }}>
        <div style={{ background: 'var(--color-canvas)' }}
          className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.2em' }}
            className="text-xs uppercase">Finance Tracker</p>
          <div className="flex items-center gap-4">
            <span style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }} className="text-xs">
              {currentUser}
            </span>
            <button
              onClick={() => setCurrentUser(null)}
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.15em',
              }}
              className="px-4 py-1.5 text-xs uppercase hover:border-[var(--color-muted)] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, color: 'var(--color-text)' }}
            className="text-6xl italic mb-1">Dashboard</h1>
          <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', letterSpacing: '0.1em' }}
            className="text-xs uppercase">Your financial overview</p>
        </div>
        <Summary transactions={transactions} />
        <Charts transactions={transactions} />
        <TransactionForm onAdd={handleAdd} />
        <div className="mt-24 pt-8">
          <TransactionList transactions={transactions} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </main>
    </div>
  );
}

export default App
