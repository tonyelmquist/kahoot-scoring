import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";

class LetterButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AwesomeButton
        className="letter-button"
        action={() => {
          this.props.incrementTally(this.props.item.name);
        }}
      >
        {this.props.item.name}
      </AwesomeButton>
    );
  }
}

export default LetterButton;
