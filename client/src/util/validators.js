export const checkEmptyFields = (fields) => {
  let areEmpty = false;
  fields.forEach((field) => {
    if (field.column.length === 0 || field.value.length === 0) {
      areEmpty = true;
    }
  });
  return areEmpty;
};
