import { Component } from "react";

/**
 * Catches any JS error thrown during render/lifecycle of child components
 * and shows a friendly fallback instead of a blank page.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <div className="error-boundary__inner">
            <h1 className="error-boundary__title">Something went wrong</h1>
            <p className="error-boundary__message">
              An unexpected error occurred. We&apos;re sorry for the
              inconvenience.
            </p>
            {this.state.error && (
              <pre className="error-boundary__detail">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              className="btn btn--primary"
              onClick={this.handleReset}
            >
              Back to home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
