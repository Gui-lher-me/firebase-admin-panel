import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { checkEmptyFields } from '../util/util';
import { toast } from 'react-toastify';
import { Form, Button, Container } from 'react-bootstrap';

export const NewTable = () => {
  const { addTable } = useContext(AppContext);
  const [table, setTable] = useState('');
  const [formValues, setFormValues] = useState([{ field: '', value: '' }]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (table.length === 0 || checkEmptyFields(formValues)) {
      toast.warning('Please fill in all the required fields.');
      return;
    }
    addTable(formValues, table);
    setFormValues([{ field: '', value: '' }]);
    setTable('');
  };

  const handleChange = (index, event) => {
    const newFormValues = [...formValues];
    newFormValues[index][event.target.name] = event.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { field: '', value: '' }]);
  };

  const removeFormFields = (index) => {
    const newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues);
  };

  return (
    <Container style={{ backgroundColor: 'lightgreen', width: '400px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <div>
            <Form.Label>Table: </Form.Label>
            <Form.Control
              placeholder='Enter table name'
              type='text'
              value={table}
              onChange={(event) => setTable(event.target.value)}
            />
          </div>
        </Form.Group>
        {formValues.map((element, index) => (
          <Form.Group key={index}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div>
                <Form.Label>Field: </Form.Label>
                <Form.Control
                  placeholder='Enter field name'
                  type='text'
                  name='field'
                  value={element.field || ''}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
              <div>
                <Form.Label>Value: </Form.Label>
                <Form.Control
                  placeholder='Enter value'
                  type='text'
                  name='value'
                  value={element.value || ''}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            </div>
            {index ? (
              <Button
                style={{ cursor: 'pointer' }}
                type='button'
                onClick={removeFormFields.bind(null, index)}
              >
                Remove Field
              </Button>
            ) : null}
          </Form.Group>
        ))}
        <Form.Group className='mt-1'>
          <Button
            className='me-1'
            style={{ cursor: 'pointer' }}
            type='button'
            onClick={addFormFields}
          >
            Add Field
          </Button>
          <Button style={{ cursor: 'pointer' }} type='submit'>
            Create Table
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
