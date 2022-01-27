import { useState } from 'react';
import { useFetch } from './components/hooks/useFetch';
import { AddDeveloper } from './components/UIElements/AddDeveloper';
import { DevelopersList } from './components/UIElements/DevelopersList';

const url = 'https://frontly-acb60-default-rtdb.firebaseio.com/developers.json';

export const App = () => {
  const { data: developers, isLoading } = useFetch(url);
  const [developer, setDeveloper] = useState('');

  const addDeveloperSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ name: developer }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('Dev created successfully');
    } catch (e) {
      console.log(e);
    }
    setDeveloper('');
  };

  return (
    <>
      <AddDeveloper
        setDeveloper={setDeveloper}
        addDeveloperSubmitHandler={addDeveloperSubmitHandler}
        developer={developer}
      />
      {isLoading && developers.length === 0 && <p>Loading...</p>}
      {!isLoading && developers.length === 0 && <p>No developers found!</p>}
      {!isLoading && developers.length > 0 && (
        <DevelopersList developers={developers} />
      )}
    </>
  );
};
