import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import {
  ComposedChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { withTheme } from '@material-ui/core/styles';

function EventBarChart(props) {
  const { theme, counts } = props;
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={[...counts]} layout="vertical" >
        <YAxis dataKey="name" type="category"/>
        <XAxis type="number"/>
        <Tooltip/>
        <Bar dataKey="events" fill="#8884d8"/>        
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default withTheme()(EventBarChart);