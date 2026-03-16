function NotFound() {
  return (
    <div className="page">
      <h1>Page not found</h1>
      <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
}

export default NotFound;
