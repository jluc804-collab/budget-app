import React, { useState } from 'react';
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  const CATEGORIES = [
    'Utilities',
    'Groceries',
    'Internet Bill',
    'Phone Bill',
    'Childcare Expenses',
    'Restaurants',
    'Mortgage',
    'Condo Fees',
    'Greener Home Loan',
    'House Insurance',
    'Transportation',
    'Home Improvement',
  ];

  function getMonthLabel(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  function Dashboard({ transactions, categories, budgets }) {
    const months = [...new Set(transactions.map(t => getMonthLabel(t.date)))];
    const [selectedMonth, setSelectedMonth] = useState('All');

    const filteredTransactions = selectedMonth === 'All'
      ? transactions
      : transactions.filter(t => getMonthLabel(t.date) === selectedMonth);

    const actualSpend = CATEGORIES.reduce((acc, cat) => {
      const total = filteredTransactions
        .filter(t => categories[t.id] === cat && t.debit > 0)
        .reduce((sum, t) => sum + t.debit, 0);
      return { ...acc, [cat]: total };
    }, {});

    const chartData = CATEGORIES.map(cat => ({
      name: cat.length > 12 ? cat.substring(0, 12) + '...' : cat,
      fullName: cat,
      Budget: budgets[cat] || 0,
      Actual: actualSpend[cat] || 0,
    }));

    const totalBudget = CATEGORIES.reduce((sum, cat) => sum + (budgets[cat] || 0), 0);
    const totalSpend = CATEGORIES.reduce((sum, cat) => sum + (actualSpend[cat] || 0), 0);

    return (
      <div>
        <h2>Budget vs Actual</h2>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>Filter by Month:</label>
          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            <option value="All">All Months</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <h3>Spending Chart</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip
              formatter={(value) => `$${value.toFixed(2)}`}
              labelFormatter={(label, payload) => payload && payload[0] ? payload[0].payload.fullName : label}
            />
            <Legend verticalAlign="top" />
            <Bar dataKey="Budget" fill="#4a90d9" />
            <Bar dataKey="Actual" fill="#e07b54" />
          </BarChart>
        </ResponsiveContainer>

        <h3 style={{ marginTop: '30px' }}>Summary Table</h3>
        <table style={{ borderCollapse: 'collapse', width: '70%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Category</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Budget</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Actual</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Difference</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map(cat => {
              const budget = budgets[cat] || 0;
              const actual = actualSpend[cat] || 0;
              const diff = budget - actual;
              const over = diff < 0;
              return (
                <tr key={cat} style={{ backgroundColor: over && actual > 0 ? '#ffe6e6' : 'white' }}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cat}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${budget.toFixed(2)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${actual.toFixed(2)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right', color: over ? 'red' : 'green' }}>
                    {over ? `-$${Math.abs(diff).toFixed(2)}` : `+$${diff.toFixed(2)}`}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {budget === 0 ? '⚠️ No budget set' : over ? '🔴 Over budget' : '🟢 On track'}
                  </td>
                </tr>
              );
            })}
            <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Total</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${totalBudget.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${totalSpend.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right', color: totalBudget - totalSpend < 0 ? 'red' : 'green' }}>
                {totalBudget - totalSpend < 0 ? `-$${Math.abs(totalBudget - totalSpend).toFixed(2)}` : `+$${(totalBudget - totalSpend).toFixed(2)}`}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  export default Dashboard;