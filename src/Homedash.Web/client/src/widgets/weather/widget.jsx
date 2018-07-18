import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import fetchWrapper from 'utils/fetchWrapper';
import HOC from 'components/Widget';
import Icon from 'components/Icon';
import sun from 'images/icons/sun.svg';


class WeatherWidget extends React.Component {
  fetchData = (callback) => {
    fetchWrapper('/api/values/1')
      .then(data => callback(data));
  }

  render() {
    const { empty, error, data } = this.props;
    if (empty || error) return null;

    // return format(data.sunRise, 'H:m');

    return (
      <div className="Weather">
        <div className="Weather-sunRiseAndSet">
          {/* <Icon icon="sun" className="Icon--white u--flip" /> */}
          {/* <span>Sol opp: <br /> {format(data.sunRise, 'H:m')}</span> <br />
          <span>Sol ned: <br /> {format(data.sunDown, 'H:m')}</span> */}
        </div>
      </div>
    )
  }
}

export default HOC(WeatherWidget);