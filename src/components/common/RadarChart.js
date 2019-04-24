import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { withTheme } from '@material-ui/core/styles';

function EventRadarChart(props) {
  const { counts } = props;
  	return (
      <RadarChart outerRadius={125} width={350} height={350} data={[...counts]}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Counts" dataKey="events" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    );
  }

export default withTheme()(EventRadarChart);