import { useState } from 'react'
import { CATEGORIES } from './constants'

const inputStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(134,187,134,0.25)',
  color: '#86bb86',
  fontFamily: 'var(--font-body)',
};

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(CATEGORIES[0]);
  };

  return (
    <div style={{ border: '1px solid rgba(134,187,134,0.3)', background: 'linear-gradient(135deg, #1a2e1a 0%, #162516 100%)' }}
      className="rounded-xl overflow-hidden">
      <div style={{ borderBottom: '1px solid rgba(134,187,134,0.2)' }} className="px-6 py-4">
        <p style={{ fontFamily: 'var(--font-body)', color: '#86bb86', letterSpacing: '0.15em' }}
          className="text-xs uppercase">Add Transaction</p>
      </div>
      <div className="px-6 py-5">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
            className="col-span-2 w-full sm:w-44 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#5a7a5a] rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
            className="w-full sm:w-28 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#5a7a5a] rounded"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle}
            className="w-full sm:w-32 px-4 py-2.5 text-sm outline-none transition-colors rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
            className="w-full sm:w-32 px-4 py-2.5 text-sm outline-none transition-colors capitalize rounded"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="capitalize">{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              background: '#3d7a3d',
              fontFamily: 'var(--font-body)',
              fontVariant: 'small-caps',
              letterSpacing: '0.08em',
              border: '1px solid #5a9a5a',
            }}
            className="col-span-2 sm:col-auto w-full sm:w-auto px-6 py-[9px] text-base font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap rounded"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm
