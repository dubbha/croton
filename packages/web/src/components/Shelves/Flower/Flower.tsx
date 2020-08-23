import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { LeafIcon } from 'elements';
import { EditFlower } from '../EditFlower';
import { Confirm } from 'components';
import { SHELF_GET_FLOWER, SHELF_DELETE_FLOWER } from 'store/shelf';
import { getFlower } from 'store/shelf/selectors';
import './styles.scss';

export const Flower = () => {
  const { params: { id } } = useRouteMatch();
  const flowerId = Number(id);

  const dispatch = useDispatch();
  const flower = useSelector(getFlower);

  useEffect(() => {
    if (!flower || flower.id !== flowerId) {
      dispatch({ type: SHELF_GET_FLOWER, payload: { id: flowerId } });
    }
  }, [dispatch, flower, flowerId]);

  const handleClose = () => dispatch({ type: SHELF_GET_FLOWER, payload: { id: flowerId } });;

  const deleteFlower = () => dispatch({
    type: SHELF_DELETE_FLOWER,
    payload: { id: flowerId, shelfId: flower?.shelfId },
  })

  return (
    <div className="container flower">
      <h1 className="flower-header">
        <LeafIcon />
        <span className="icon-prefix">{flower?.name}</span>
      </h1>
      <div className="shelf-actions">
        <EditFlower
          id={id}
          initialValues={flower || {}}
          onClose={handleClose}
        />
        <Confirm text="Delete Flower" onConfirm={deleteFlower} />
      </div>
    </div>
  );
};
