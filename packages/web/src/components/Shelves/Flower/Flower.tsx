import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { rrulestr } from 'rrule';
import classNames from 'classnames';
import {
  SHELF_GET_FLOWER,
  SHELF_DELETE_FLOWER,
  SHELF_ACTION,
  SHELF_DELETE_FLOWER_IMAGES,
} from 'store/shelf';
import { useMediaWidth } from 'hooks';
import { getFlower, getShelf } from 'store/shelf/selectors';
import {
  LeafIcon,
  ListGroup,
  HandHoldingHeartIcon,
  FireAltIcon,
  ButtonWithLoader,
} from 'elements';
import { Confirm, Gallery } from 'components';
import { Actions } from 'constants/actions';
import { EditFlower } from '../EditFlower';
import { AddImage } from './AddImage';
import { Heatmap } from './Heatmap';
import { Stats } from './Stats';
import { Log } from './Log';
import { MoveFlower } from '../MoveFlower';
import './styles.scss';

export const Flower = () => {
  const width = useMediaWidth();
  const tableSize = ['xs', 'sm'].includes(width) ? 'sm' : '';

  const { params: { id } } = useRouteMatch();
  const flowerId = Number(id);

  const dispatch = useDispatch();
  const flower = useSelector(getFlower);
  const { isLoading, info, error } = useSelector(getShelf);

  const [actionMarked, setActionMarked] = useState<Actions | null>();
  const markActionPerformed = (action: Actions | null) => {
    setActionMarked(action);
    dispatch({
      type: SHELF_ACTION,
      payload: { action, flowerId, shelfId: flower?.shelfId },
    });
  };

  const handleNotificationTimeout = () => {
    setActionMarked(null);
    dispatch({ type: SHELF_GET_FLOWER, payload: { id: flowerId } });
  };

  const handleClose = useCallback(() => {
    setActionMarked(null);
    dispatch({ type: SHELF_GET_FLOWER, payload: { id: flowerId } });
  }, [flowerId, dispatch]);

  useEffect(() => {
    if (!flower || flower.id !== flowerId) {
      handleClose();
    }
  }, [flower, flowerId, handleClose]);

  const deleteFlower = () => dispatch({
    type: SHELF_DELETE_FLOWER,
    payload: { id: flowerId, shelfId: flower?.shelfId },
  });

  const deleteFlowerImage = (index: number) => dispatch({
    type: SHELF_DELETE_FLOWER_IMAGES,
    payload: { flowerId, imageIds: [flower?.images[index].id] },
  });

  const humanReadableRrules = flower?.rrules
    ? Object.entries(flower.rrules).reduce(
      (acc, [action, rrule]) => rrule ? { ...acc, [action]: rrulestr(rrule).toText() } : acc,
      {},
    )
    : {};

  /* eslint-disable no-nested-ternary */
  const missedActions = flower?.rrules && flower?.lastActions
    ? Object.entries(flower.rrules).reduce(
      (acc, [action, rrule]) => ({
        ...acc,
        [action]: rrule
          ? flower.lastActions[action]?.timestamp
            ? Boolean(
              rrulestr(rrule).between(
                new Date(flower.lastActions[action].timestamp * 1000),
                new Date(Date.now()),
              ).length,
            )
            : Boolean(rrulestr(rrule).before(new Date(Date.now())))
          : false,
      }),
      {},
    )
    : {};

  return (
    <div className="container flower">
      <h1 className="flower-header">
        <LeafIcon />
        <span className="icon-prefix">{flower?.name}</span>
      </h1>
      <p>{flower?.description}</p>
      <div className="flower-menu">
        <EditFlower
          id={flowerId}
          initialValues={flower || {}}
          onClose={handleClose}
        />
        <Confirm text="Delete Flower" onConfirm={deleteFlower} />
        <MoveFlower flowerId={flowerId} flowerName={flower?.name} shelfId={flower?.shelfId} />
        <AddImage id={flowerId} />
      </div>
      {!!flower?.images?.length && (
        <Gallery
          images={flower.images.map(({ image }) => image)}
          onDelete={deleteFlowerImage}
        />
      )}
      <ListGroup className="flower-actions">
        {Object.values(Actions).map(action => (
          <ListGroup.Item key={action}>
            <span>
              <span
                className={
                  classNames(
                    'flower-action-name',
                    { 'flower-action-name-missed': missedActions[action] },
                  )
                }
              >
                <span className="flower-action-icon-container">
                  {missedActions[action] ? <FireAltIcon /> : <HandHoldingHeartIcon />}
                </span>
                <span className="icon-prefix">{action}</span>
              </span>
              {humanReadableRrules[action] && `: ${humanReadableRrules[action]}`}
            </span>
            <ButtonWithLoader
              clickable={!actionMarked}
              isLoading={isLoading && actionMarked === action}
              isSuccess={!!info && actionMarked === action}
              isFailure={!!error && actionMarked === action}
              onClick={() => markActionPerformed(action)}
              onNotificationTimeout={handleNotificationTimeout}
            >
              {width === 'xs' ? 'Done' : 'Mark Performed'}
            </ButtonWithLoader>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Heatmap actions={flower?.actions} />
      <Stats actions={flower?.actions} rrules={flower?.rrules} tableSize={tableSize} />
      <Log actions={flower?.actions} tableSize={tableSize} />
    </div>
  );
};
