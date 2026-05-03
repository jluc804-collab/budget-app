import React, { useState } from 'react';
  import CSVImport from './Components/CSVImport';
  import './App.css';

  function App() {
    const [transactions, setTransactions] = useState([]);
    const [view, setView] = useState('import');

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Budget App</h1>
        <nav style={{ marginBottom: '20px' }}>
          <button onClick={() => setView('import')} style={{ marginRight: '10px' }}>Import</button>
        </nav>
        {view === 'import' && <CSVImport setTransactions={setTransactions} transactions={transactions} />}
      </div>
    );
  }

  export default App;