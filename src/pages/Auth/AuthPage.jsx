import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./AuthPage.css";

function AuthPage() {
  const { isAuthenticated, authLoading, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initialMode = location.state?.mode === "signin" ? "signin" : "signup";
  const [mode, setMode] = useState(initialMode); // "signup" | "signin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const nextMode = location.state?.mode === "signin" ? "signin" : "signup";
    setMode(nextMode);
    setError("");
    setMessage("");
    setPassword("");
    setPasswordConfirm("");
  }, [location.state?.mode]);

  if (isAuthenticated && !authLoading) {
    const from = location.state?.from ?? "/";
    navigate(from, { replace: true });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (mode === "signup" && password !== passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setError("");
    setMessage("");
    try {
      if (mode === "signup") {
        await signUp({ email: email.trim(), password });
        setPassword("");
        setPasswordConfirm("");
        setMessage("Check your email for a confirmation link to finish creating your account.");
      } else {
        await signIn({ email: email.trim(), password });
        const from = location.state?.from ?? "/";
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "signup" ? "signin" : "signup"));
    setError("");
    setMessage("");
    setPassword("");
    setPasswordConfirm("");
  };

  return (
    <div className="page auth-page">
      <h1>{mode === "signup" ? "Create your account" : "Sign in"}</h1>
      <p className="auth-page__lead">
        Create a free account to save your orders and unlock{" "}
        <strong>10% off your first purchase when logged in.</strong>
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-form__field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="auth-form__field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            required
            minLength={6}
          />
        </label>

        {mode === "signup" && (
          <label className="auth-form__field">
            <span>Confirm password</span>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete="new-password"
              required
              minLength={6}
            />
          </label>
        )}

        {error && (
          <p className="auth-form__error" role="alert">
            {error}
          </p>
        )}

        {message && <p className="auth-form__message">{message}</p>}

        <button type="submit" className="btn btn--primary auth-form__submit" disabled={submitting}>
          {submitting
            ? mode === "signup"
              ? "Creating account..."
              : "Signing in..."
            : mode === "signup"
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      <p className="auth-page__switch">
        {mode === "signup" ? "Already have an account?" : "New to E‑shop?"}{" "}
        <button type="button" className="auth-page__switch-btn" onClick={toggleMode}>
          {mode === "signup" ? "Sign in" : "Create account"}
        </button>
      </p>

      <p className="auth-page__back">
        <Link to="/" className="auth-page__back-link">
          ← Back to shopping
        </Link>
      </p>
    </div>
  );
}

export default AuthPage;

