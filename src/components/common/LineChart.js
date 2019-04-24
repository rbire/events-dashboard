import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import { withTheme } from '@material-ui/core/styles';

function EventLineChart(props) {
  const { theme, counts } = props;
  return (
    <ResponsiveContainer width="99%" height={350}>
      <LineChart data={[...counts]}>
        <XAxis dataKey="name"/>
        <Tooltip/>
        <Line type="monotone" dataKey="events" stroke="#8884d8" activeDot={{r: 8}}/>        
      </LineChart>
    </ResponsiveContainer>
  );
}
export default withTheme()(EventLineChart);