import React from 'react';
  import Papa from 'papaparse';

  function CSVImport({ setTransactions, transactions }) {
    const handleFile = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      Papa.parse(file, {
        complete: (results) => {
          const parsed = results.data
            .filter(row => row.length >= 4 && row[0])
            .map((row, index) => ({
              id: index,
              date: row[0].trim(),
              description: row[1].trim(),
              debit: parseFloat(row[2]) || 0,
              credit: parseFloat(row[3]) || 0,
              balance: parseFloat(row[4]) || 0,
            }));
          setTransactions(parsed);
        }
      });
    };

    return (
      <div>
        <h2>Import Bank CSV</h2>
        <input type="file" accept=".csv" onChange={handleFile} />
        {transactions.length > 0 && (
          <div>
            <p>{transactions.length} transactions loaded</p>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Debit</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Credit</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.date}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.description}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.debit > 0 ? `$${t.debit.toFixed(2)}` : ''}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{t.credit > 0 ? `$${t.credit.toFixed(2)}` : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  export default CSVImport;