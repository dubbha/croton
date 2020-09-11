import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { LeafIcon, MapMarkerIcon } from 'elements';
import { Container, Confirm } from 'components';
import { getShelf } from 'store/shelf/selectors';
import { SHELF_GET_SHELVES, SHELF_DELETE_SHELF } from 'store/shelf';
import { FlowerList } from '../FlowerList';
import { EditShelf } from '../EditShelf';
import { UserManagement } from '../UserManagement';

import './styles.scss';

export const Shelf = () => {
  const { params: { id } } = useRouteMatch();
  const shelfId = Number(id);

  const dispatch = useDispatch();
  const { shelves } = useSelector(getShelf);

  useEffect(() => {
    if (!shelves.length) {
      dispatch({ type: SHELF_GET_SHELVES });
    }
  }, [dispatch, shelves.length]);

  const refreshShelves = () => dispatch({ type: SHELF_GET_SHELVES });
  const deleteShelf = () => dispatch({ type: SHELF_DELETE_SHELF, payload: { id: shelfId } });

  const shelf = shelves.find(s => s.id === shelfId);

  return (
    <Container inner>
      <div className="shelf">
        <h1 className="shelf-header">
          <LeafIcon />
          <span className="icon-prefix">{shelf?.name}</span>
        </h1>
        <h5 className="shelf-location text-muted">
          <MapMarkerIcon />
          <span className="icon-prefix">{shelf?.location}</span>
        </h5>
        <p className="shelf-description">{shelf?.description}</p>
        <div className="shelf-actions">
          <EditShelf
            id={shelfId}
            initialValues={shelf}
            onClose={refreshShelves}
          />
          <Confirm text="Delete Shelf" onConfirm={deleteShelf} />
          <UserManagement shelfId={shelfId} />
        </div>
        <FlowerList shelfId={shelfId} />
      </div>
    </Container>
  );
};
