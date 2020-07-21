import { useState, useEffect, useRef } from 'react';

const useCustomForm = ({ initialValues, errorsRules }) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const formRendered = useRef(true);

  useEffect(() => {
    if (formRendered.current) {
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
    formRendered.current = false;
  }, [initialValues]);
  
  const handleErrors = (fieldName, value) => {
    const rule = errorsRules[fieldName];
    if (!rule) {
      return;
    }
    const errorMessage = rule(value);
    if (errorMessage) {
      setErrors({ ...errors, [fieldName]: errorMessage });
    } else {
      delete errors[fieldName];
      setErrors({ ...errors });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    const { target } = event;
    const { name, value } = target;
    event.persist();
    setValues({ ...values, [name]: value });
    handleErrors(name, value);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) : void  => {
    const { target } = event;
    const { name, value } = target;
    setTouched({ ...touched, [name]: true });
    handleErrors(name, value);
  };


  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  };
};

export default useCustomForm;
