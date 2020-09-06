import React, { useState, FormEvent } from 'react';

import { Shelf } from 'store/shelf';

import {
  Form,
  SubmitButton,
  ErrorAlert,
  AlertPlaceholder,
  InfoAlert,
} from 'elements';

import './styles.scss';

type Props = {
  shelves: Shelf[];
  onSubmit: (shelfId: number) => void;
  error: string | null;
  info: string | null;
  flowerName: string | null;
};

export const MoveFlowerForm = ({
  shelves,
  onSubmit,
  error,
  info,
  flowerName,
}: Props) => {
  const [selectedShelfId, setSelectedShelfId] = useState<Shelf['id']>(
    shelves[0].id,
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(selectedShelfId);
  };

  return (
    <Form onSubmit={handleSubmit} className="moveFlowerForm">
      {error ? <ErrorAlert>{error}</ErrorAlert> : <AlertPlaceholder />}
      {info ? <InfoAlert>{info}</InfoAlert> : <AlertPlaceholder />}
      <Form.Group>
        <Form.Label>Choose a new shelf for {flowerName}</Form.Label>
        <Form.Control
          as="select"
          data-testid="moveFlowerForm__selectShelf"
          onChange={(e) => {
            setSelectedShelfId(Number(e.target.value));
          }}
          custom
        >
          {shelves.map((shelf) => (
            <option key={`${shelf.name}-${shelf.description}`} value={shelf.id}>
              {shelf.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <SubmitButton>
        <span>Move Flower</span>
      </SubmitButton>
    </Form>
  );
};
