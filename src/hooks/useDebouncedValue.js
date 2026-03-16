import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that only updates after
 * `delay` ms of inactivity. Use this to avoid running expensive
 * operations (filtering, API calls) on every keystroke.
 */
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
