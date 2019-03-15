import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

class Link extends PureComponent {
  static propTypes = {
    page: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      className: STATUS.NORMAL
    }
  }

  onMouseEnter = () => {
    this.setState({
      className: STATUS.HOVERED
    })
  };

  onMouseLeave = () => {
    this.setState({
      className: STATUS.NORMAL
    })
  };

  render() {
    const {className} = this.state;
    const { page, children } = this.props;
    return (
        <a
            className={className}
            href={page || '#'}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
        >
          {children}
        </a>
    );
  }
}

export default Link;
