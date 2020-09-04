import React, { useState, FormEvent } from 'react';

import { Form, SubmitButton, ErrorAlert, AlertPlaceholder } from 'elements';

import { Shelf } from 'store/shelf';

import './styles.scss';

type Props = {
  shelves: Shelf[];
  onSubmit: (shelfId: number) => void;
  error: string | null;
};

export const MoveFlowerForm = ({ shelves, onSubmit, error }: Props) => {
  const [selectedShelf, setSelectedShelf] = useState<Shelf>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('selectedShelf', selectedShelf);
    if (selectedShelf) {
      onSubmit(selectedShelf.id);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error ? <ErrorAlert>{error}</ErrorAlert> : <AlertPlaceholder />}
      <Form.Group>
        <Form.Label>Choose a new shelf for your flower</Form.Label>
        <Form.Control
          as="select"
          data-testid="signInForm__email"
          value={selectedShelf && selectedShelf.name}
          onSelect={e => {
            console.log('select evant', e);
          }}
        >
          {shelves.map(shelf => (
            <option
              key={`${shelf.name}-${shelf.description}`}
              value={shelf.id}
              onSelect={() => {
                console.log('shelf', shelf);
                setSelectedShelf(shelf);
              }}
            >
              {shelf.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <SubmitButton data-testid="sumbmitMoveFlowerFormButton">
        <span>Move Flower</span>
      </SubmitButton>
    </Form>
  );
};
