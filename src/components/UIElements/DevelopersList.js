export const DevelopersList = ({ developers }) => (
  <ul>
    {developers.map((dev) => (
      <li key={dev.name}>{dev.name}</li>
    ))}
  </ul>
);
