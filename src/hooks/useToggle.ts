import { useCallback, useEffect, useRef, useState } from "react";

type ReturnValue = [number | string | boolean, (val?: string) => void];

export const useToggle = (
  value?: Array<string | number> | boolean,
): ReturnValue => {
  const [currentValue, setCurrentValue] = useState<string | number | boolean>(
    false,
  );
  const arrayIndex = useRef(0);

  useEffect(() => {
    if (Array.isArray(value)) {
      setCurrentValue(value[arrayIndex.current]);
    } else {
      setCurrentValue(false);
    }
  }, [value]);

  const toggle = useCallback(
    (toggleValue?: string) => {
      if (Array.isArray(value)) {
        // toggle to selected value if exist else continue iterating
        if (toggleValue) {
          const indexOfToggleValue = value.indexOf(toggleValue);

          if (indexOfToggleValue !== -1) {
            arrayIndex.current = indexOfToggleValue;
          }

          setCurrentValue(value[arrayIndex.current]);
        }

        // iterating through initial array
        if (!toggleValue) {
          if (arrayIndex.current >= value.length - 1) {
            arrayIndex.current = 0;
          } else {
            arrayIndex.current += 1;
          }

          setCurrentValue(value[arrayIndex.current]);
        }
      } else {
        // changing value if hook parameter is not an array
        setCurrentValue(!currentValue);
      }
    },
    [value, currentValue],
  );

  return [currentValue, toggle];
};
