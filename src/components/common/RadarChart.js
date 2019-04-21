import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { withTheme } from '@material-ui/core/styles';

function EventRadarChart(props) {
  const { counts } = props;
  let data = Object.keys(counts).map((key) => {
    return {
      name: key,
      events: counts[key]
    }
  });
  	return (
      <RadarChart outerRadius={200} width={500} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name="Counts" dataKey="events" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    );
  }

export default withTheme()(EventRadarChart);