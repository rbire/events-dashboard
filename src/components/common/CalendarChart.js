import React  from 'react';
import Chart from 'react-google-charts';

const today = new Date();
function EventCalendarChart(props) {
  const { theme, counts } = props;
  
  var data = [];
  data.push([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Counts' }]);
  for(var i=0;i<counts.length;i++){
      data.push([ new Date(counts[i].name), counts[i].events]);    
  }
  return (
    <Chart
      width={1000}
      height={350}
      chartType="Calendar"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        title: 'Events',
      }}
      rootProps={{ 'data-testid': '1' }}
    />    
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

export default EventCalendarChart;