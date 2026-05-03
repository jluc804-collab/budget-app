import React from 'react';

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

  function BudgetScreen({ budgets, setBudgets }) {
    const handleBudget = (category, value) => {
      setBudgets(prev => ({ ...prev, [category]: parseFloat(value) || 0 }));
    };

    const total = CATEGORIES.reduce((sum, cat) => sum + (budgets[cat] || 0), 0);

    return (
      <div>
        <h2>Set Monthly Budget</h2>
        <p>Enter your monthly budget for each category.</p>
        <table style={{ borderCollapse: 'collapse', width: '50%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Category</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Monthly Budget ($)</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map(cat => (
              <tr key={cat}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cat}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <input
                    type="number"
                    min="0"
                    value={budgets[cat] || ''}
                    onChange={e => handleBudget(cat, e.target.value)}
                    placeholder="0.00"
                    style={{ width: '100px' }}
                  />
                </td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Total</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  export default BudgetScreen;