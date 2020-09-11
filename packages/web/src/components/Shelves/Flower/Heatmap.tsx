import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import { FlowerAction } from 'store/shelf/interfaces';

type Props = {
  actions?: FlowerAction[],
}

const shiftDate = (date: Date, numDays: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
};

export const Heatmap = ({ actions = [] }: Props) => {
  const today = new Date();

  const actionsByDate = actions.reduce(
    (acc, action) => {
      const day = Math.floor(action.timestamp / (60 * 60 * 24));
      const dayMillis = day * 24 * 60 * 60 * 1000;
      return {
        ...acc,
        [dayMillis]: acc[dayMillis] ? acc[dayMillis] + 1 : 1,
      };
    },
    {},
  );

  const values = Object.entries(actionsByDate).map(([millis, count]) =>
    ({ date: new Date(Number(millis)), count }));

  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={shiftDate(today, -180)}
        endDate={today}
        values={values}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          if (value.count < 4) {
            return `color-croton-${value.count}`;
          }
          return 'color-croton-4';
        }}
        showMonthLabels
        showWeekdayLabels
        showOutOfRangeDays={false}
        tooltipDataAttrs={value => ({
          'data-tip': value?.date && value?.count
            ? `${value.count} actions on ${value.date.toISOString().slice(0, 10)}`
            : '',
        })}
      />
      <ReactTooltip />
    </div>
  );
};
