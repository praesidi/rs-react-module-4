import { useState } from "react";
import { useWindowEvent } from "./useWindowEvent";

type Scroll = {
  x?: number;
  y: number;
};

type ReturnValue = [scroll: Scroll, scrollTo: (args: Scroll) => void];

export const useWindowScroll = (): ReturnValue => {
  const [scroll, setScroll] = useState<Scroll>({
    x: window.scrollX,
    y: window.scrollY,
  });

  const handleScrollTo = (newValue: Scroll) => {
    window.scrollTo(newValue.x ?? 0, newValue.y ?? 0);
  };

  const handleUpdateScroll = () => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  useWindowEvent("scroll", handleUpdateScroll);

  return [scroll, handleScrollTo];
};
