import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Tables = () => {
  const { tables, isLoading, error, getRows } = useContext(AppContext);
  const styles = { border: '1px solid #000000' };
  if (isLoading && !error && tables.length === 0) {
    return <p>Loading...</p>;
  }
  if (!isLoading && error && tables.length === 0) {
    return <p>{error}</p>;
  }
  if (!isLoading && !error && tables.length === 0) {
    return <p>No tables found!</p>;
  }
  if (!isLoading && !error && tables.length > 0) {
    return (
      <table>
        <thead>
          <tr>
            <th style={styles}>database name</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, id) => {
            return (
              <tr key={id}>
                <td
                  onClick={getRows.bind(null, table)}
                  style={{ ...styles, cursor: 'pointer' }}
                >
                  {table}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
