import { useState, useEffect, useCallback } from 'react';

/**
 * Custom React hook `useLocalStorage` to instantly persist and restore state
 * in the browser's LocalStorage API with zero server communication.
 * Supports dynamic `key` switching (e.g., isolating data by year or habit ID).
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        return JSON.parse(raw) as T;
      }
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
    }
    return initialValue;
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Hydrate or reload state whenever the storage key changes (e.g., switching years)
  useEffect(() => {
    setStoredValue(readValue());
    setIsHydrated(true);
  }, [key, readValue]);

  // Listen to cross-tab storage changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(readValue());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, readValue]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const nextValue = value instanceof Function ? value(prev) : value;
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          }
          return nextValue;
        });
      } catch (err) {
        console.warn(`Error writing localStorage key "${key}":`, err);
      }
    },
    [key]
  );

  return [storedValue, setValue, isHydrated];
}
