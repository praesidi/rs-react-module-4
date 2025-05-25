import { useState } from "react";
import { useWindowEvent } from "./useWindowEvent";

interface ScreenSize {
  height: number;
  width: number;
}

export const useViewportSize = () => {
  const [size, setSize] = useState<ScreenSize>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleWindowResize = () => {
    setSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useWindowEvent("resize", handleWindowResize);

  return {
    height: size?.height,
    width: size?.width,
  };
};
