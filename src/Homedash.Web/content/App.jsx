import '~/styles/base.less';
import '~/styles/dashboard.less';
import React from 'react';

import Dashboard from '~/components/Dashboard';
import position from '~/utils/position';

import WeatherWidget from '~/widgets/weather';

const App = () => {
  return (
    <Dashboard cols={10} rowHeight={200}>
      <WeatherWidget title="Været" key="weather" {...position({x: 0, y: 0, height: 2, width: 2})} />
    </Dashboard>
  );
};

export default App;
