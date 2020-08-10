import React, { useState, FormEvent, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
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

export const AddFlowerForm = ({ onSubmit }: Props) => {
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
    <div className="container new-flower">
      <h1>
        <FontAwesomeIcon icon={faBookmark} />
        <span className="icon-prefix">Add New Flower</span>
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Flower Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Flower Name"
            value={values.name}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <Form.Text className="form-error-message">{errors.name}</Form.Text>
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
    </div>
  );
};
