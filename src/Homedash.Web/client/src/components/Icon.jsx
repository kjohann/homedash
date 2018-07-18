// import '~/styles/icon.less';
// import sun from '~/images/icons/sun.svg';
import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';

// export const Icons = {
//   SUN: 'sun'
// };

// const getSvg = (icon) => {
//   switch (icon) {
//     case Icons.SUN:
//       return { __html: sun }; 
//     default: return null;
//   }
// }

const Icon = (props) => {
  const { icon, className } = props;
  // const iconClass = classnames({
  //   'Icon': true
  // }, className);
  return (
    <i
      className="Icon Icon--white"
      // dangerouslySetInnerHTML={getSvg(icon)}
    />
  );
}

export default Icon;