import 'less/base';
import 'less/u';
import 'less/dashboard';
import React from 'react';
import { hot } from 'react-hot-loader';

import Dashboard from 'components/Dashboard';
import position from 'utils/position';
import interval from 'utils/interval';

import WeatherWidget from 'widgets/weather';

const App = () => {
  return (
    <Dashboard cols={10} rowHeight={200}>
      <WeatherWidget interval={interval.hourly} key="weather" {...position({ x: 0, y: 0, height: 1, width: 2 })} />
    </Dashboard>
  );
};

export default hot(module)(App);
