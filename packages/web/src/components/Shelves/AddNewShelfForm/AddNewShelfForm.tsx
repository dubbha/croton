import React, { useState, FormEvent, useEffect } from 'react';
import { Form, SubmitButton } from 'elements';
import useCustomForm from 'hooks/useCustomForm';
import './styles.scss';

type Props = {
  onSubmit: (name: string, location: string, description: string) => void;
};

interface FormFields {
  name?: string;
  location?: string;
  description?: string;
}

export const AddNewShelfForm = ({ onSubmit }: Props) => {
  const initialValues = {
    name: '',
    location: '',
    description: '',
  };

  const nameErrorMessage = (name: string): string | null => {
    if (name.length < 3 || name.length > 256) {
      return 'Name is required and has to be in range of 3-256 symbols.';
    }
    return null;
  };

  const locationErrorMessage = (location: string): string | null => {
    if (location.length < 3 || location.length > 256) {
      return 'Location is required and has to be in range of 3-256 symbols.';
    }
    return null;
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  }: {
    values: FormFields;
    errors: FormFields;
    touched: FormFields;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  } = useCustomForm({
    initialValues,
    errorsRules: {
      name: nameErrorMessage,
      location: locationErrorMessage,
    },
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      !!values.name && !!values.location && !!values.description
      && !errors.name && !errors.location && !errors.description
    );
  }, [errors, values]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (values.name && values.description && values.location) {
      onSubmit(values.name, values.location, values.description);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Shelf Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Shelf Name"
          value={values.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="addNewShelfForm__name"
        />
        {touched.name && errors.name && (
          <Form.Text className="form-error-message">{errors.name}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formLocation">
        <Form.Label>Shelf Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={values.location}
          name="location"
          onBlur={handleBlur}
          onChange={handleChange}
          data-testid="addNewShelfForm__location"
        />
        {touched.location && errors.location && (
          <Form.Text className="form-error-message">
            {errors.location}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={values.description}
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          data-testid="addNewShelfForm__description"
        />
        {touched.description && errors.description && (
          <Form.Text className="form-error-message">
            {errors.description}
          </Form.Text>
        )}
      </Form.Group>

      <SubmitButton disabled={!isValid}>
        <div className="spinner-container" />
        <span>Create</span>
      </SubmitButton>
    </Form>
  );
};
