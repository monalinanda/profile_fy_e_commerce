import { useState, useEffect } from "react";

const useSearch = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  //Debounce funtionality for Search in ProductList page
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useSearch;
