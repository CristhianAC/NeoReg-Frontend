import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Error: Can't get workers from Database</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
