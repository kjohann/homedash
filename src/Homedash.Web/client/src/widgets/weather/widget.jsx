import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import fetchWrapper from 'utils/fetchWrapper';
import HOC from 'components/Widget';
import Icon from 'components/Icon';

const ForecastItem = ({
  from,
  to,
  symbolId,
  symbolDescription,
  precipitationInMillimeters,
  windSpeedInMetersPerSecond,
  temperaturesInCelcius }) => {
  const getTime = time => format(time, 'H:mm');

  const imageSrc = require(`images/weather/${symbolId}.png`); // eslint-disable-line global-require, import/no-dynamic-require
  return (
    <div className="Wheater-forecast-item">
      <div>
        <span className="">{getTime(from)} - {getTime(to)}: <img src={imageSrc} alt={symbolDescription} width="25px" />  {precipitationInMillimeters}mm</span>
        <span className="u--block">{temperaturesInCelcius} ℃ - {windSpeedInMetersPerSecond}m/s </span>
      </div>
    </div>
  );
};

ForecastItem.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  symbolId: PropTypes.string.isRequired,
  symbolDescription: PropTypes.string.isRequired,
  precipitationInMillimeters: PropTypes.string.isRequired,
  windSpeedInMetersPerSecond: PropTypes.string.isRequired,
  temperaturesInCelcius: PropTypes.string.isRequired
};

class WeatherWidget extends React.Component {
  getForecastItems = () => {
    return ((this.props.data || {}).forecastData || []).map((i) => {
      return <ForecastItem key={`ForecastItem-${i.from}`} {...i} />;
    });
  }

  fetchData = (callback) => {
    fetchWrapper('/api/weather')
      .then(data => callback(data));
  }

  render() {
    const { empty, error, data } = this.props;
    if (empty || error) return null;

    return (
      <div className="Weather">
        <div className="Weather-forecast">
          {this.getForecastItems()}
        </div>
        <div className="Weather-suninfo">
          <span className="u--block"><Icon icon="arrow up" className="Icon--white" /> {format(data.sunRise, 'H:mm')}</span>
          <span className="u--block"><Icon icon="arrow down" className="Icon--white" /> {format(data.sunDown, 'H:mm')}</span>
          <div className="u--bottom">
            <span className="u--block">© yr.no</span>
            <span className="u--block">({format(data.lastUpdated, 'H:mm')})</span>
          </div>
        </div>
      </div>
    );
  }
}

WeatherWidget.propTypes = {
  empty: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.shape({
    sunDown: PropTypes.string,
    sunRise: PropTypes.string,
    lastUpdated: PropTypes.string,
    forecastData: PropTypes.arrayOf(PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      symbolId: PropTypes.string.isRequired,
      symbolDescription: PropTypes.string.isRequired,
      precipitationInMillimeters: PropTypes.string.isRequired,
      windSpeedInMetersPerSecond: PropTypes.string.isRequired,
      temperaturesInCelcius: PropTypes.string.isRequired
    }))
  })
};

export default HOC(WeatherWidget);
