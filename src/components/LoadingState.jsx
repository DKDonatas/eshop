/**
 * Reusable loading UI. Use on any page that fetches data.
 */
function LoadingState({ message = "Loading…" }) {
  return <p className="loading-state">{message}</p>;
}

export default LoadingState;
