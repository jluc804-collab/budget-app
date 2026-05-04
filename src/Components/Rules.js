import React, { useState } from 'react';

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

  function Rules({ rules, setRules }) {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('Groceries');

    const handleAdd = () => {
      if (!keyword.trim()) return;
      setRules(prev => [...prev, { keyword: keyword.trim(), category }]);
      setKeyword('');
    };

    const handleDelete = (index) => {
      setRules(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div>
        <h2>Auto-Categorization Rules</h2>
        <p>Add rules here once. When you import a CSV, transactions will be categorized automatically.</p>

        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', display: 'inline-block' }}>
          <h3 style={{ marginTop: 0 }}>Add New Rule</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>If description contains:</label>
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="e.g. WALMART"
              style={{ marginRight: '10px', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }}>Assign category:</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '5px' }}>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <button onClick={handleAdd} style={{ padding: '5px 15px', backgroundColor: '#4a90d9', color: 'white', border: 'none', cursor: 'pointer' }}>
            Add Rule
          </button>
        </div>

        {rules.length > 0 ? (
          <table style={{ borderCollapse: 'collapse', width: '50%' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>If description contains</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Assign category</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}></th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rule.keyword}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rule.category}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => handleDelete(index)} style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#888' }}>No rules yet. Add your first rule above.</p>
        )}
      </div>
    );
  }

  export default Rules;