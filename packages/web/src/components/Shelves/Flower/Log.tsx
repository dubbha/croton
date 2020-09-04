import React from 'react';
import { FlowerAction } from 'store/shelf/interfaces';
import { Table } from 'elements';

type Props = {
  actions?: FlowerAction[];
};

export const Log = ({
  actions = [],
}: Props) => (
  <div className="log-container">
    <h4>Actions Log</h4>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Action</th>
          <th>Performer</th>
        </tr>
      </thead>
      <tbody>
        {[...actions].reverse().map(({ timestamp, action, firstName, lastName }) => (
          <tr key={timestamp}>
            <td>{new Date(timestamp * 1000).toUTCString()}</td>
            <td className="action-name">{action}</td>
            <td>{firstName} {lastName}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
