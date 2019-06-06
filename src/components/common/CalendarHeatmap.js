import React  from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import 'react-calendar-heatmap/dist/styles.css';

const today = new Date();
function EventCalendarHeatmap(props) {
  const { theme, counts } = props;
  const data = getRange(180).map(index => {
    var date = shiftDate(today, -index);
    var count = 0;
    var dk = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
    if(counts[dk]!=null){
      count = counts[dk];
    }
    return {
      date: date,
      count: count,
    };
  });
  return (
      <div>
      <CalendarHeatmap
        startDate={shiftDate(today, -180)}
        endDate={today}
        values={data}
        classForValue={value => {
          return `color${Math.ceil(value.count/10)}`;
        }}
        tooltipDataAttrs={value => {
          return {
            'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
              value.count
            }`,
          };
        }}
        weekdayLabels={['S','M','T','W','T','F','S']}
        showWeekdayLabels={true}
        onClick={value => alert(`Clicked on value with count: ${value.count}`)}
      />
      <ReactTooltip />
    </div>
  );
}
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i);
}

export default withStyles()(EventCalendarHeatmap);