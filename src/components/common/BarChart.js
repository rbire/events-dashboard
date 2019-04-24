import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import {
  ComposedChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { withTheme } from '@material-ui/core/styles';

function EventBarChart(props) {
  const { theme, counts,layout,height } = props;
  const x = layout=='vertical'?<XAxis type="number"/>:<XAxis dataKey="name" type="category"/>
  const y = layout=='vertical'?<YAxis dataKey="name" type="category"/>:<XAxis type="number"/>
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={[...counts]} layout={layout} >
        {x}
        {y}        
        <Tooltip/>
        <Bar dataKey="events" fill="#8884d8"/>        
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default withTheme()(EventBarChart);