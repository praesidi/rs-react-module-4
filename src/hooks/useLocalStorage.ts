import { useCallback, useEffect, useState } from "react";

type LocalStorageSetValue = string;
type LocalStorageReturnValue = LocalStorageSetValue | null;

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void;
    removeItem: () => void;
  },
];

export const useLocalStorage: UseLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const localStorageItem = localStorage.getItem(key);

    if (localStorageItem !== null) {
      setValue(JSON.parse(localStorageItem));
    }
  }, [key]);

  const setItem = useCallback(
    (value: LocalStorageSetValue) => {
      localStorage.setItem(key, JSON.stringify(value));
      setValue(value);
    },
    [key],
  );

  const removeItem = useCallback(() => {
    localStorage.removeItem(key);
    setValue(null);
  }, [key]);

  return [
    value,
    {
      setItem,
      removeItem,
    },
  ];
};
