import { useEffect, useState } from "react";

export default function useDebounce<T>(value:T, delay=500):T{
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);

  return debounceValue;
}
