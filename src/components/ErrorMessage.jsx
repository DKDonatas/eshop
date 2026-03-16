/**
 * Reusable error display. Use on any page that can fail to load data.
 */
function ErrorMessage({ message }) {
  return <p className="error-message">{message}</p>;
}

export default ErrorMessage;
