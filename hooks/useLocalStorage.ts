import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedVale, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("userLocalStorage read error:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedVale));
    } catch (error) {
      console.error("useLocalStorage write error:", error);
    }
  }, [key, storedVale]);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedVale) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error("useLocalStorage set error:", error);
    }
  };

  return [storedVale, setValue];
}
export default useLocalStorage;
