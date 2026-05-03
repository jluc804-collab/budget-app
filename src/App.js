  import React, { useState } from 'react';
  import CSVImport from './Components/CSVImport';
  import CategoryMap from './Components/CategoryMap';
  import BudgetScreen from './Components/BudgetScreen';
  import './App.css';

  function App() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState({});
    const [budgets, setBudgets] = useState({});
    const [view, setView] = useState('import');

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Budget App</h1>
        <nav style={{ marginBottom: '20px' }}>
          <button onClick={() => setView('import')} style={{ marginRight: '10px' }}>Import</button>
          <button onClick={() => setView('categories')} style={{ marginRight: '10px' }}>Categories</button>
          <button onClick={() => setView('budget')} style={{ marginRight: '10px' }}>Budget</button>
        </nav>
        {view === 'import' && <CSVImport setTransactions={setTransactions} transactions={transactions} />}
        {view === 'categories' && <CategoryMap transactions={transactions} categories={categories} setCategories={setCategories} />}
        {view === 'budget' && <BudgetScreen budgets={budgets} setBudgets={setBudgets} />}
      </div>
    );
  }

  export default App;