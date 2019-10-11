import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
    info: null
  };

  componentDidCatch(error, info) {
    this.setState({
      error: true,
      info
    });
    console.log(error);
    console.log(info);
  }

  render() {
    const { error, info } = this.state;
    const { children } = this.props;
    return error ? (
      <div>This is a page when something happened. ${info.toString()}</div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
