import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Test extends PureComponent {
  static propTypes = {
    labelOn: PropTypes.string.isRequired,
    labelOff: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    }
  }

  onChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    })
  };

  render() {
    const {isChecked} = this.state;
    return (
        <label htmlFor="label">
          <input
              type="checkbox"
              checked={this.state.isChecked}
              onChange={this.onChange}
          />
          {isChecked ? this.props.labelOn : this.props.labelOff}
        </label>
    );
  }
}

export default Test;
