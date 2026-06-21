import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export const typeAnimation = (sentense) => {
  return (
    <TypeAnimation
      sequence={[sentense, 2000, "", 800]}
      speed={55}
      repeat={Infinity}
      cursor={true}
    />
  );
};

const CHARS = "ABCDEFGHIJKLMNWXYyz0123456789@#$%&";

export const useScramble = (text, duration = 1800) => {
  const [display, setDisplay] = useState(text);
  const frame = useRef(null);

  useEffect(() => {
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealCount = Math.floor(progress * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [text, duration]);

  return display;
};
