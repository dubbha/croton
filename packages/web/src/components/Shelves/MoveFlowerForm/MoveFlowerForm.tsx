import React, { useState, FormEvent, useEffect } from 'react';

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
  onSubmit: (shelfId: number | undefined) => void;
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
  const [selectedShelfId, setSelectedShelfId] = useState<Shelf['id']>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(selectedShelfId);
  };

  useEffect(() => {
    setSelectedShelfId(shelves[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="moveFlowerForm">
      {error && <ErrorAlert>{error}</ErrorAlert>}
      {info && <InfoAlert>{info}</InfoAlert>}
      {!info && !error && <AlertPlaceholder />}
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
