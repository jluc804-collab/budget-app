import React, { useState, useEffect } from 'react';
  import CSVImport from './Components/CSVImport';
  import CategoryMap from './Components/CategoryMap';
  import BudgetScreen from './Components/BudgetScreen';
  import Dashboard from './Components/Dashboard';
  import Rules from './Components/Rules';
  import './App.css';

  function App() {
    const [transactions, setTransactions] = useState(() => {
      const saved = localStorage.getItem('transactions');
      return saved ? JSON.parse(saved) : [];
    });
    const [categories, setCategories] = useState(() => {
      const saved = localStorage.getItem('categories');
      return saved ? JSON.parse(saved) : {};
    });
    const [budgets, setBudgets] = useState(() => {
      const saved = localStorage.getItem('budgets');
      return saved ? JSON.parse(saved) : {};
    });
    const [rules, setRules] = useState(() => {
      const saved = localStorage.getItem('rules');
      return saved ? JSON.parse(saved) : [];
    });
    const [view, setView] = useState('import');

    useEffect(() => { localStorage.setItem('transactions', JSON.stringify(transactions)); }, [transactions]);
    useEffect(() => { localStorage.setItem('categories', JSON.stringify(categories)); }, [categories]);
    useEffect(() => { localStorage.setItem('budgets', JSON.stringify(budgets)); }, [budgets]);
    useEffect(() => { localStorage.setItem('rules', JSON.stringify(rules)); }, [rules]);

    const handleImport = (newTransactions) => {
      const existingIds = new Set(transactions.map(t => t.id));
      const toAdd = newTransactions.filter(t => !existingIds.has(t.id));

      const autoCategories = {};
      toAdd.forEach(t => {
        for (const rule of rules) {
          if (t.description.toLowerCase().includes(rule.keyword.toLowerCase())) {
            autoCategories[t.id] = rule.category;
            break;
          }
        }
        if (!autoCategories[t.id] && t.credit > 0) {
          autoCategories[t.id] = 'Income';
        }
      });

      setTransactions(prev => [...prev, ...toAdd]);
      setCategories(prev => ({ ...prev, ...autoCategories }));
      return { added: toAdd.length, skipped: newTransactions.length - toAdd.length };
    };

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Budget App</h1>
        <nav style={{ marginBottom: '20px' }}>
          <button onClick={() => setView('import')} style={{ marginRight: '10px' }}>Import</button>
          <button onClick={() => setView('rules')} style={{ marginRight: '10px' }}>Rules</button>
          <button onClick={() => setView('categories')} style={{ marginRight: '10px' }}>Categories</button>
          <button onClick={() => setView('budget')} style={{ marginRight: '10px' }}>Budget</button>
          <button onClick={() => setView('dashboard')} style={{ marginRight: '10px' }}>Dashboard</button>
        </nav>
        {view === 'import' && <CSVImport onImport={handleImport} transactions={transactions} setTransactions={setTransactions} />}
        {view === 'rules' && <Rules rules={rules} setRules={setRules} />}
        {view === 'categories' && <CategoryMap transactions={transactions} categories={categories} setCategories={setCategories} />}
        {view === 'budget' && <BudgetScreen budgets={budgets} setBudgets={setBudgets} />}
        {view === 'dashboard' && <Dashboard transactions={transactions} categories={categories} budgets={budgets} />}
      </div>
    );
  }

  export default App;