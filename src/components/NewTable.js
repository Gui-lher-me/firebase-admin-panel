import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { checkEmptyFields } from '../util/validators';

const initialState = { column: '', value: '' };

export const NewTable = () => {
  const { addTable } = useContext(AppContext);
  const [table, setTable] = useState('');
  const [formValues, setFormValues] = useState([initialState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (table.length === 0 || checkEmptyFields(formValues)) {
      toast.warning('Please fill in all the required fields*.');
      return;
    }
    addTable(formValues, table);
    setFormValues([{ column: '', value: '' }]);
    setTable('');
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFormValues = [...formValues];
    newFormValues[index][name] = value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues((previousValues) => [
      ...previousValues,
      { column: '', value: '' },
    ]);
  };

  const removeFormFields = (index) => {
    const newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Add New Table</p>
      <label>Table*: </label>
      <input
        placeholder='Enter the table name'
        type='text'
        value={table}
        onChange={(event) => setTable(event.target.value)}
      />
      <p>Add Columns</p>
      {formValues.map((item, index) => (
        <div key={index}>
          <label>Column*: </label>
          <input
            placeholder='Enter the column name'
            type='text'
            name='column'
            value={item.column}
            onChange={(event) => handleChange(index, event)}
          />
          <label>Value*: </label>
          <input
            placeholder='Enter a value'
            type='text'
            name='value'
            value={item.value}
            onChange={(event) => handleChange(index, event)}
          />
          {index > 0 && (
            <button
              style={{ cursor: 'pointer', fontFamily: 'inherit' }}
              type='button'
              onClick={removeFormFields.bind(null, index)}
            >
              Remove Column
            </button>
          )}
        </div>
      ))}
      <button
        style={{ cursor: 'pointer', fontFamily: 'inherit' }}
        type='button'
        onClick={addFormFields}
      >
        Add Column
      </button>
      <button
        style={{ cursor: 'pointer', fontFamily: 'inherit' }}
        type='submit'
      >
        Create Table
      </button>
    </form>
  );
};
