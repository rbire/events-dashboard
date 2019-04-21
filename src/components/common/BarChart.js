import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import { withTheme } from '@material-ui/core/styles';

function EventBarChart(props) {
  const { theme, counts } = props;
  let data = Object.keys(counts).map((key) => {
    return {
      name: key,
      events: counts[key]
    }
  });

  return (
    <ResponsiveContainer width="99%" height={225}>
      <BarChart data={data}>
        <XAxis dataKey="name"/>
        <Tooltip/>
        <Bar dataKey="events" fill="#8884d8"/>        
      </BarChart>
    </ResponsiveContainer>
  );
}

export default withTheme()(EventBarChart);