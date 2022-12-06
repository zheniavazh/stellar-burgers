import { useState } from 'react';

export type TUseFormValues = {
  [key: string]: string;
};

export const useForm = (inputValues: TUseFormValues) => {
  const [values, setValues] = useState(inputValues);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, setValues, handlerChange };
};
