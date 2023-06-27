export const resetFormFields = (values, resetField) => {
  Object.keys(values).forEach((key) => {
    resetField(key);
  });
};

export const setFormValues = (values, setValue) => {
  Object.entries(values).forEach(([key, value]) => {
    setValue(key, value ?? "");
  });
};
