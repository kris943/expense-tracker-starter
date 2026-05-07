import { useState } from 'react'
import { CATEGORIES } from './constants'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = transactions.filter(t =>
    (filterType === "all" || t.type === filterType) &&
    (filterCategory === "all" || t.category === filterCategory)
  );

  const selectStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-muted)',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div style={{ border: '1px solid var(--color-border)' }}>
      <div style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
        className="px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.15em' }}
          className="text-xs uppercase">Transactions</p>
        <div className="flex gap-2">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
            style={selectStyle}
            className="px-3 py-1.5 text-xs outline-none focus:border-[var(--color-accent)] transition-colors">
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
            style={selectStyle}
            className="px-3 py-1.5 text-xs capitalize outline-none focus:border-[var(--color-accent)] transition-colors">
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="capitalize">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: 'var(--color-surface-raised)', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
          className="py-14 text-center text-xs uppercase tracking-widest">
          No transactions found
        </div>
      ) : (
        <table className="w-full" style={{ background: 'var(--color-surface-raised)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              {['Date', 'Description', 'Category', 'Amount', ''].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.15em', borderBottom: '1px solid var(--color-border)' }}
                  className={`px-6 py-3 text-xs uppercase font-normal ${h === 'Amount' || h === '' ? 'text-right' : 'text-left'}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id}
                style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                className="hover:bg-[var(--color-surface)] transition-colors">
                <td style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
                  className="px-6 py-4 text-xs">{t.date}</td>
                <td style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontWeight: 300 }}
                  className="px-6 py-4 text-lg italic">{t.description}</td>
                <td style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.1em' }}
                  className="px-6 py-4 text-xs uppercase">{t.category}</td>
                <td style={{ fontFamily: 'var(--font-display)', color: t.type === 'income' ? 'var(--color-income)' : 'var(--color-expense)', fontWeight: 300 }}
                  className="px-6 py-4 text-xl text-right">
                  {t.type === "income" ? "+" : "−"}${t.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setPendingDelete(t)}
                    style={{ color: 'var(--color-muted)' }}
                    className="hover:text-[var(--color-expense)] transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {pendingDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            className="w-full max-w-sm mx-4 p-8 rounded-2xl text-center">
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.15em' }}
              className="text-xs uppercase mb-4">Confirm Delete</p>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontWeight: 300 }}
              className="text-3xl italic mb-2">"{pendingDelete.description}"</h3>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
              className="text-sm mb-8">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setPendingDelete(null)}
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.15em',
                }}
                className="flex-1 py-2.5 text-xs uppercase rounded-xl hover:border-[var(--color-muted)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { onDelete(pendingDelete.id); setPendingDelete(null); }}
                style={{
                  background: 'var(--color-expense)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.15em',
                }}
                className="flex-1 py-2.5 text-xs uppercase font-medium text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList
