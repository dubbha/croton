import React, { useState, FormEvent, useEffect } from 'react';
import RRuleGenerator from 'react-rrule-generator';
import { Form, SubmitButton, InfoAlert, ErrorAlert, LoadingSpinner, Accordion, Card } from 'elements';
import { useCustomForm } from 'hooks';
import { Actions } from 'constants/actions';
import './styles.scss';

interface FormFields {
  name?: string;
  description?: string;
  rrules?: { [key in Actions]?: string };
}

type Props = {
  onSubmit: (name: string, description: string, rrules: { [key in Actions]?: string }) => void;
  isLoading?: boolean;
  info?: string | null;
  error?: string | null;
  initialValues?: FormFields;
};

export const FlowerForm = ({
  onSubmit,
  isLoading = false,
  info = null,
  error = null,
  initialValues = {
    name: '',
    description: '',
    rrules: {
      [Actions.WATERING]: '',
      [Actions.HYDRATION]: '',
      [Actions.FERTILIZING]: '',
    }
  },
}: Props) => {
  const nameErrorMessage = (name: string): string | null => {
    if (name.length < 3 || name.length > 256) {
      return 'Name is required and has to be in range of 3-256 symbols.';
    }
    return null;
  };

  const descriptionErrorMessage = (description: string): string | null => {
    if (description.length < 3 || description.length > 256) {
      return 'Description is required and has to be in range of 3-256 symbols.';
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
      description: descriptionErrorMessage,
    },
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      !!values.name && !!values.description
      && !errors.name && !errors.description
    );
  }, [errors, values]);

  const [rrules, setRrules] = useState(initialValues.rrules || {});

  const handleRruleChange = action => rrule => {
    console.log(`${action} RRule changed, now it's ${rrule}`);
    const dtstartNow = `${new Date(Date.now()).toISOString().replace(/[-:.]/g, '').slice(0,-4)}Z`;

    setRrules({
      ...rrules,
      [action]: `DTSTART:${dtstartNow}\n${rrule}`
    })

    console.log(rrules);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (values.name && values.description) {
      onSubmit(values.name, values.description, rrules);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="flower-form">
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
          <Form.Text className="form-error-message">{errors.description}</Form.Text>
        )}
      </Form.Group>

      <Form.Group>
        <Form.Label>Care schedules</Form.Label>
        <Accordion>
          {Object.entries(rrules).map(([action, rrule]) =>
              <Card key={action}>
                <Accordion.Toggle as={Card.Header} eventKey={action}>
                  {action}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={action}>
                  <div className="rrule-generator">
                    <RRuleGenerator
                      config={{
                        hideEnd: true,
                        repeat: ['Monthly', 'Weekly', 'Daily', 'Hourly'],
                      }}
                      value={rrule}
                      onChange={handleRruleChange(action)}
                    />
                  </div>
                </Accordion.Collapse>
              </Card>
          )}
        </Accordion>
      </Form.Group>

      {error && <ErrorAlert>{error}</ErrorAlert>}
      {info && <InfoAlert>{info}</InfoAlert>}
      {!info && !error && (
        <SubmitButton disabled={!isValid}>
          <div className="spinner-container">
            {isLoading && <LoadingSpinner />}
          </div>
          <span>Submit</span>
        </SubmitButton>
      )}
    </Form>
  );
};
