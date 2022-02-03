import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const ShowTables = () => {
  const { rows, error, isLoading } = useContext(AppContext);
  return (
    <>
      <hr />
      {isLoading && !error && rows.length === 0 && <p>Loading...</p>}
      {!isLoading && error && rows.length === 0 && <p>{error}</p>}
      {!isLoading && !error && rows.length === 0 && <p>No data found!</p>}
      {!isLoading && !error && rows.length > 0 && (
        <table>
          <thead>
            <tr>
              {/* I need to make these table headers dynamically */}
              <th style={{ border: '1px solid #000000' }}>id</th>
              <th style={{ border: '1px solid #000000' }}>name</th>
              <th style={{ border: '1px solid #000000' }}>age</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={{ border: '1px solid #000000' }}>{row.id}</td>
                <td style={{ border: '1px solid #000000' }}>{row.name}</td>
                <td style={{ border: '1px solid #000000' }}>{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
