import React from 'react';
import { rrulestr } from 'rrule';
import { FlowerAction, FlowerRrules } from 'store/shelf/interfaces';
import { Actions } from 'constants/actions';
import { Table } from 'elements';

type Props = {
  actions?: FlowerAction[];
  rrules?: FlowerRrules;
};

const actionNames = Object.values(Actions);

const fillByAction = (fillValue: any) =>
  Object.values(Actions).reduce((acc, key) => ({ ...acc, [key]: fillValue }), {});

const defaultRrules = fillByAction('') as FlowerRrules;

export const Stats = ({
  actions = [],
  rrules = defaultRrules,
}: Props) => {
  const actionTimestamps = actions.reduce(
    (acc, { action, timestamp }) => ({ ...acc, [action]: [...acc[action], timestamp] }),
    fillByAction([]),
  ) as { [key in Actions]: number[] };

  const stats = {
    currentTimesMissedByAction: fillByAction(0),
    totalActionsByAction: fillByAction(0),
    lateActionsByAction: fillByAction(0),
    timesMissedByAction: fillByAction(0),
    maxTimesMissedByAction: fillByAction(0),
    avgTimesMissedByAction: fillByAction(0),
    totalOverdueHoursByAction: fillByAction(0),
    maxOverdueHoursByAction: fillByAction(0),
    avgOverdueHoursByAction: fillByAction(0),
  };

  Object.entries(actionTimestamps).forEach(([action, timestamps]) => {
    stats.totalActionsByAction[action] += timestamps.length;
    if (rrules[action]) {
      const rule = rrulestr(rrules[action]);
      timestamps.forEach((timestamp, idx) => {
        const actionDate = new Date(timestamp * 1000);
        if (idx === 0) {
          let previous = rule.before(actionDate);
          let count = -1;
          let overdueHours = 0;
          while (previous) {
            count += 1;
            overdueHours = (actionDate.valueOf() - previous.valueOf()) / (1000 * 60 * 60);
            previous = rule.before(previous);
          }
          if (count > 0) {
            stats.lateActionsByAction[action] += 1;
            stats.timesMissedByAction[action] += count;
            if (count > stats.maxTimesMissedByAction[action]) {
              stats.maxTimesMissedByAction[action] = count;
            }
            stats.totalOverdueHoursByAction[action] += overdueHours;
            if (overdueHours > stats.maxOverdueHoursByAction[action]) {
              stats.maxOverdueHoursByAction[action] = overdueHours;
            }
          }
        } else {
          const missedRecurrences = rule.between(
            new Date(timestamps[idx - 1] * 1000),
            actionDate,
          );
          const count = missedRecurrences.length - 1;
          if (count > 0) {
            const overdueHours = (actionDate.valueOf() - missedRecurrences[0].valueOf())
              / (1000 * 60 * 60);

            stats.lateActionsByAction[action] += 1;
            stats.timesMissedByAction[action] += count;
            if (count > stats.maxTimesMissedByAction[action]) {
              stats.maxTimesMissedByAction[action] = count;
            }
            stats.totalOverdueHoursByAction[action] += overdueHours;
            if (overdueHours > stats.maxOverdueHoursByAction[action]) {
              stats.maxOverdueHoursByAction[action] = overdueHours;
            }
          }
          if (idx === timestamps.length - 1) { // last one, count the current state
            const currentMissedRecurrences = rule.between(
              actionDate,
              new Date(Date.now()),
            );
            const currentCount = currentMissedRecurrences.length - 1;
            if (currentCount > 0) {
              stats.currentTimesMissedByAction[action] = currentCount;
            }
          }
        }
      });

      stats.avgTimesMissedByAction[action] = stats.totalActionsByAction[action]
        ? stats.timesMissedByAction[action] / stats.totalActionsByAction[action]
        : 0;

      stats.avgOverdueHoursByAction[action] = stats.totalActionsByAction[action]
        ? stats.totalOverdueHoursByAction[action] / stats.totalActionsByAction[action]
        : 0;
    }
  });

  return (
    <div className="stats-container">
      <h4>Statistics</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Metric</th>
            {actionNames.map(action => <th key={action}>{action}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current Times Missed</td>
            {actionNames.map(action => (
              <td key={action}>{stats.currentTimesMissedByAction[action]}</td>
            ))}
          </tr>
          <tr>
            <td>Total Actions Performed</td>
            {actionNames.map(action => (
              <td key={action}>{stats.totalActionsByAction[action]}</td>
            ))}
          </tr>
          <tr>
            <td>Late Actions</td>
            {actionNames.map(action => (
              <td key={action}>
                {stats.lateActionsByAction[action]}
              </td>
            ))}
          </tr>
          <tr>
            <td>Late Actions Percentage</td>
            {actionNames.map(action => (
              <td key={action}>
                {stats.totalActionsByAction[action]
                  ? ((stats.lateActionsByAction[action]
                    / stats.totalActionsByAction[action]) * 100).toFixed(2)
                  : 0}
                %
              </td>
            ))}
          </tr>
          <tr>
            <td>Total Times Missed</td>
            {actionNames.map(action => (
              <td key={action}>{stats.timesMissedByAction[action]}</td>
            ))}
          </tr>
          <tr>
            <td>Max Times Missed</td>
            {actionNames.map(action => (
              <td key={action}>{stats.maxTimesMissedByAction[action]}</td>
            ))}
          </tr>
          <tr>
            <td>Average Times Missed</td>
            {actionNames.map(action => (
              <td key={action}>{stats.avgTimesMissedByAction[action].toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Total Overdue Hours</td>
            {actionNames.map(action => (
              <td key={action}>{stats.totalOverdueHoursByAction[action].toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Max Overdue Hours</td>
            {actionNames.map(action => (
              <td key={action}>{stats.maxOverdueHoursByAction[action].toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Average Overdue Hours</td>
            {actionNames.map(action => (
              <td key={action}>{stats.avgOverdueHoursByAction[action].toFixed(2)}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
