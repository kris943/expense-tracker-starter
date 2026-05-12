const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const cards = [
    { label: "Income", value: fmt(totalIncome), color: 'var(--color-income)' },
    { label: "Expenses", value: fmt(totalExpenses), color: 'var(--color-expense)' },
    { label: "Balance", value: fmt(balance), color: balance >= 0 ? 'var(--color-income)' : 'var(--color-expense)' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ border: '1px solid var(--color-border)', background: 'var(--color-border)' }}>
      {cards.map(({ label, value, color }) => (
        <div key={label} style={{ background: 'var(--color-surface)' }} className="px-5 py-6 sm:px-6 sm:py-8">
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.15em' }}
            className="text-xs uppercase mb-2 sm:mb-3">{label}</p>
          <p style={{ fontFamily: 'var(--font-display)', color, fontWeight: 300 }}
            className="text-3xl sm:text-4xl">${value}</p>
        </div>
      ))}
    </div>
  );
}

export default Summary
