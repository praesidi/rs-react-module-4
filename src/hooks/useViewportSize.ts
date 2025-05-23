import { useState } from "react";
import { useWindowEvent } from "./useWindowEvent";

interface ScreenSize {
  height: number;
  width: number;
}

export const useViewportSize = () => {
  const [size, setSize] = useState<ScreenSize | null>(null);

  const handleWindowRezise = () => {
    setSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  };

  useWindowEvent("resize", handleWindowRezise);

  return {
    height: size?.height,
    width: size?.width,
  };
};
