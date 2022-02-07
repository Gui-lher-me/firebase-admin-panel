import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const TableContent = () => {
  const { rows, deleteRow } = useContext(AppContext);
  const styles = { border: '1px solid #000000' };
  if (rows && rows.length > 0) {
    const headers = rows[0].keys;
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, id) => (
              <th style={styles} key={id}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((doc) => {
            return (
              <tr key={doc.id}>
                {doc.values.map((value, id) => {
                  return (
                    <td
                      onClick={deleteRow.bind(null, doc.id, doc.table)}
                      style={{ ...styles, cursor: 'pointer' }}
                      key={id}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  return <p>Click on a table name to see its content.</p>;
};
