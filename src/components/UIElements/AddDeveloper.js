export const AddDeveloper = ({
  addDeveloperSubmitHandler,
  developer,
  setDeveloper,
}) => (
  <form onSubmit={addDeveloperSubmitHandler}>
    <fieldset>
      <legend>add developer</legend>
      <input
        value={developer}
        type='text'
        onChange={(e) => setDeveloper(e.target.value)}
      />
      <button type='submit'>add</button>
    </fieldset>
  </form>
);
