import '~/styles/dashboard.less';
import React from 'react';
import PropTypes from 'prop-types';
import GridLayout, { WidthProvider } from 'react-grid-layout';

const Grid = WidthProvider(GridLayout);

const Dashboard = ({ cols, rowHeight, children }) => {
  return (
    <Grid className="Dashboard" cols={cols} rowHeight={rowHeight} autoSize>
      {children}
    </Grid>
  );
};

Dashboard.propTypes = {
  cols: PropTypes.number,
  rowHeight: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Dashboard;
