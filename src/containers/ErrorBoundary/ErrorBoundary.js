import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      //   sendErrorToServer({ error, errorInfo });
    } else {
      console.error(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const fallback = this.props.fallback ? (
        React.cloneElement(this.props.fallback, {
          resetErrorBoundary: this.resetError,
          error: this.state.error,
        })
      ) : (
        <div style={{ color: "red", textAlign: "center" }}>
          <h1>Something went wrong!</h1>
          <button onClick={this.resetError}>Try again</button>
        </div>
      );

      return fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
