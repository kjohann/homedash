import 'less/icon.less';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const getSvg = (icon) => {
  return { __html: require(`icons/${icon}.svg`) }; // eslint-disable-line import/no-dynamic-require, global-require
};

const Icon = (props) => {
  const { icon, className } = props;
  const iconClass = classnames({
    Icon: true
  }, className);
  return (
    <i
      className={iconClass}
      dangerouslySetInnerHTML={getSvg(icon)} // eslint-disable-line react/no-danger
    />
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Icon;
