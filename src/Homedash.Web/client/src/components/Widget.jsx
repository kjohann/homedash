import 'less/widget';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Widget = (WrappedComponent) => {
  return class extends React.Component {
    static displayName = `WidgetHOC(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    static propTypes = {
      className: PropTypes.string,
      style: PropTypes.object,
      title: PropTypes.string,
      interval: PropTypes.number
    }

    constructor(props) {
      super(props);
      this.poller = null;
      this.state = { interval: props.interval || 60000, error: false };
    }

    componentDidMount() {
      this.fetchData();
      this.poller = setInterval(this.fetchData, this.state.interval);
    }

    componentWillUnmount() {
      clearInterval(this.poller);
      this.poller = null;
    }

    getInstance() {
      if (!WrappedComponent.prototype.isReactComponent) {
        return this;
      }
      const ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    }

    getRef = (ref) => {
      this.instanceRef = ref;
    }

    setData = (data) => {
      this.setState({ data });
    }

    fetchData = () => {
      const instance = this.getInstance();

      if (typeof instance.props.fetchData === 'function') {
        instance.props.fetchData(this.setData);
        return;
      }

      if (typeof instance.fetchData === 'function') {
        instance.fetchData(this.setData);
        return;
      }

      throw new Error('WrappedComponent lacks a fetchData() function for fetching data');
    }

    componentDidCatch(error, info) {
      this.setState({ error: true });
      console.log(error, info); // eslint-disable-line no-console
    }

    render() {
      const {
        title,
        className,
        style,
        ...rest
      } = this.props;

      if (WrappedComponent.prototype.isReactComponent) {
        rest.ref = this.getRef;
      } else {
        rest.wrappedRef = this.getRef;
      }

      const widgetClass = classnames({
        Widget: true
      }, className);

      return (
        <div
          className={widgetClass}
          style={style}>
          {title ? <div className="Widget-title">{title}</div> : null}
          <WrappedComponent data={this.state.data} empty={this.state.data === undefined} error={this.state.error} {...rest} />
        </div>
      );
    }
  };
};

export default Widget;
