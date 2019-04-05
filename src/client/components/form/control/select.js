/**
 * Parvez M Robin
 * parvezmrobin@gmail.com
 * Date: Apr 04, 2019
 */

import React, {Component} from "react";


class SelectControl extends Component {

  render() {
    const props = {...this.props};
    let className = "form-control ";
    if (props.isValid === true) {
      className += "is-valid";
    } else if (props.isValid === false) {
      className += "is-invalid";
    }
    delete props.isValid;

    const options = this.props.options.map(option => <option key={option} value={option}>{option}</option>);
    return (
      <select className={className} {...props}>{options}</select>
    );
  }

}

export default SelectControl;
