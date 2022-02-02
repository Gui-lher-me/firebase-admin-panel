import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const FieldList = () => {
  const { fields } = useContext(AppContext);
  //   return (
  //     <ul>
  //       {fields?.map((field, id) => (
  //         <li key={id}>{JSON.stringify(field)}</li>
  //       ))}
  //     </ul>
  //   );
  return <></>;
};
