import { useEffect, useRef, useState } from "react";

export const useHover = <T>() => {
  const ref = useRef<T>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    const element = ref.current as HTMLElement;

    if (element) {
      element.addEventListener("mouseenter", handleMouseOver);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return {
    ref,
    hovered,
  };
};
