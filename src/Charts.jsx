import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'

const INCOME_COLOR = '#7caa8a'
const EXPENSE_COLOR = '#c97a7a'
const MUTED = '#8a7f73'
const SURFACE = '#1e1b18'

const fmt = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div style={{ background: SURFACE, border: '1px solid #2e2a25', fontFamily: 'var(--font-body)', padding: '8px 14px' }}>
      <p style={{ color: MUTED, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{name}</p>
      <p style={{ color: payload[0].payload.fill, fontSize: 16, fontFamily: 'var(--font-display)', fontWeight: 300 }}>{fmt(value)}</p>
    </div>
  )
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: SURFACE, border: '1px solid #2e2a25', fontFamily: 'var(--font-body)', padding: '8px 14px' }}>
      <p style={{ color: MUTED, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill, fontSize: 15, fontFamily: 'var(--font-display)', fontWeight: 300 }}>{fmt(p.value)}</p>
      ))}
    </div>
  )
}

function Charts({ transactions }) {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  const donutData = [
    { name: 'Income', value: totalIncome, fill: INCOME_COLOR },
    { name: 'Expenses', value: totalExpenses, fill: EXPENSE_COLOR },
  ].filter(d => d.value > 0)

  const categoryMap = {}
  transactions.forEach(t => {
    if (!categoryMap[t.category]) categoryMap[t.category] = { income: 0, expense: 0 }
    categoryMap[t.category][t.type] += t.amount
  })
  const barData = Object.entries(categoryMap)
    .map(([category, vals]) => ({ category, ...vals }))
    .sort((a, b) => (b.income + b.expense) - (a.income + a.expense))

  return (
    <div style={{ border: '1px solid var(--color-border)' }}>
      <div style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }} className="px-6 py-4">
        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)', letterSpacing: '0.15em' }}
          className="text-xs uppercase">Overview</p>
      </div>

      <div style={{ background: 'var(--color-surface-raised)' }} className="grid grid-cols-2 divide-x divide-[var(--color-border)]">

        {/* Donut */}
        <div className="px-6 py-8">
          <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)', fontWeight: 300 }}
            className="text-sm italic mb-6">Income vs Expenses</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" strokeWidth={0}>
                {donutData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {donutData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: d.fill }} />
                <span style={{ fontFamily: 'var(--font-body)', color: MUTED, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar */}
        <div className="px-6 py-8">
          <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-muted)', fontWeight: 300 }}
            className="text-sm italic mb-6">By Category</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={10} barGap={3}>
              <CartesianGrid vertical={false} stroke="#2e2a25" />
              <XAxis dataKey="category" tick={{ fill: MUTED, fontSize: 10, fontFamily: 'var(--font-body)', textTransform: 'uppercase' }}
                axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => '$' + v} tick={{ fill: MUTED, fontSize: 10, fontFamily: 'var(--font-body)' }}
                axisLine={false} tickLine={false} width={48} />
              <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="income" fill={INCOME_COLOR} radius={[2, 2, 0, 0]} />
              <Bar dataKey="expense" fill={EXPENSE_COLOR} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {[['Income', INCOME_COLOR], ['Expense', EXPENSE_COLOR]].map(([label, color]) => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
                <span style={{ fontFamily: 'var(--font-body)', color: MUTED, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Charts
