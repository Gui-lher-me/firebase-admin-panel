export const toggleReducer = (state = 'green', action) => {
  switch (action.type) {
    case 'RED':
      return 'red';
    case 'YELLOW':
      return 'yellow';
    default:
      return state;
  }
};
