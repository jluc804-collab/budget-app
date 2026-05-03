 import React from 'react';

  const CATEGORIES = [
    'Uncategorized',
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
    'Income',
  ];

  function CategoryMap({ transactions, categories, setCategories }) {
    const handleCategory = (id, category) => {
      setCategories(prev => ({ ...prev, [id]: category }));
    };

    const spendingTransactions = transactions.filter(t => t.debit > 0);
    const incomeTransactions = transactions.filter(t => t.credit > 0);

    return (
      <div>
        <h2>Assign Categories</h2>
        <p>Assign a category to each transaction below.</p>

        <h3>Spending Transactions</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {spendingTransactions.map(t => (
              <tr key={t.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${t.debit.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <select
                    value={categories[t.id] || 'Uncategorized'}
                    onChange={e => handleCategory(t.id, e.target.value)}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ marginTop: '20px' }}>Income Transactions</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {incomeTransactions.map(t => (
              <tr key={t.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${t.credit.toFixed(2)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <select
                    value={categories[t.id] || 'Income'}
                    onChange={e => handleCategory(t.id, e.target.value)}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default CategoryMap;