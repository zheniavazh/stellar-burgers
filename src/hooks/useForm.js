import { useState } from 'react';

export const useForm = (inputValues) => {
  const [values, setValues] = useState(inputValues);

  const handlerChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, setValues, handlerChange };
};
