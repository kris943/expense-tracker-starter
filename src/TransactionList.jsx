import { useState } from 'react'
import { CATEGORIES } from './constants'

const CATEGORY_COLORS = {
  food: 'bg-orange-50 text-orange-600',
  housing: 'bg-blue-50 text-blue-600',
  utilities: 'bg-yellow-50 text-yellow-600',
  transport: 'bg-cyan-50 text-cyan-600',
  entertainment: 'bg-purple-50 text-purple-600',
  salary: 'bg-emerald-50 text-emerald-600',
  other: 'bg-slate-100 text-slate-600',
};

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const filtered = transactions.filter(t =>
    (filterType === "all" || t.type === filterType) &&
    (filterCategory === "all" || t.category === filterCategory)
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base font-semibold text-slate-800">Transactions</h3>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white capitalize"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="capitalize">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-sm">No transactions found.</div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">Category</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wide">Amount</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(t => (
              <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3.5 text-sm text-slate-500">{t.date}</td>
                <td className="px-6 py-3.5 text-sm font-medium text-slate-700">{t.description}</td>
                <td className="px-6 py-3.5">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${CATEGORY_COLORS[t.category] || CATEGORY_COLORS.other}`}>
                    {t.category}
                  </span>
                </td>
                <td className={`px-6 py-3.5 text-sm font-semibold text-right ${t.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button
                    onClick={() => onDelete(t.id)}
                    className="text-slate-300 hover:text-rose-400 transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList
