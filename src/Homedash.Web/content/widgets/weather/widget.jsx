import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import fetchWrapper from '~/utils/fetchWrapper';
import HOC from '~/components/Widget';

class WeatherWidget extends React.Component {
  fetchData = (callback) => {
    fetchWrapper('/api/values/1')
      .then(data => callback(data));
  }

  render() {
    const { empty, error, data } = this.props;
    if (empty || error) return null;

    return format(data.sunRise, 'H:m, dddd');
  }
}