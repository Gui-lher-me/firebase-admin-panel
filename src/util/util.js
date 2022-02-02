export const checkEmptyFields = (fields) => {
  let result = false;
  fields.forEach((field) => {
    if (field.field.length === 0 || field.value.length === 0) {
      result = true;
    }
  });
  return result;
};
