import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";

class TinyButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AwesomeButton
        className="tiny-button"
      >
        {this.props.name}
      </AwesomeButton>
    );
  }
}

export default TinyButton;
