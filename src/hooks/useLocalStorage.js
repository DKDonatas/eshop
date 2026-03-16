import { useCallback, useState } from "react";

/**
 * useState that's synced with localStorage.
 * Reading and writing are both safe against JSON parse errors.
 */
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // storage full or private-mode restricted — fail silently
        }
        return next;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    setStored(initialValue);
  }, [key, initialValue]);

  return [stored, setValue, removeValue];
}
