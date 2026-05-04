 import React, { useState } from 'react';
  import Papa from 'papaparse';

  function CSVImport({ onImport, transactions, setTransactions }) {
    const [importSummary, setImportSummary] = useState(null);

      const handleFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    let allParsed = [];
    let filesProcessed = 0;

    files.forEach(file => {
      Papa.parse(file, {
        complete: (results) => {
          const parsed = results.data
            .filter(row => row.length >= 4 && row[0])
            .map((row) => ({
              id: `${row[0].trim()}_${row[1].trim()}_${parseFloat(row[2]) || parseFloat(row[3]) || 0}`,
              date: row[0].trim(),
              description: row[1].trim(),
              debit: parseFloat(row[2]) || 0,
              credit: parseFloat(row[3]) || 0,
              balance: parseFloat(row[4]) || 0,
            }));

          allParsed = [...allParsed, ...parsed];
          filesProcessed++;

          if (filesProcessed === files.length) {
            const result = onImport(allParsed);
            setImportSummary(result);
            e.target.value = '';
          }
        }
      });
    });
  };

    const handleClear = () => {
      if (window.confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
        setTransactions([]);
        setImportSummary(null);
      }
    };

    return (
      <div>
        <h2>Import Bank CSV</h2>
        <p>Import your bank CSV each month — duplicates are skipped and rules are applied automatically.</p>
        <input type="file" accept=".csv" multiple onChange={handleFile} />

        {importSummary && (
          <p style={{ color: 'green', marginTop: '10px' }}>
            ✅ {importSummary.added} new transactions added.
            {importSummary.skipped > 0 && ` ${importSummary.skipped} duplicates skipped.`}
          </p>
        )}

        {transactions.length > 0 && (
          <div>
            <p style={{ marginTop: '15px' }}>
              <strong>{transactions.length} total transactions stored.</strong>
              <button
                onClick={handleClear}
                style={{ marginLeft: '15px', color: 'red', cursor: 'pointer' }}
              >
                Clear All Data
              </button>
            </p>
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