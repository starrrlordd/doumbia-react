import { createContext, useEffect, useState } from "react";

export const WindowSizeContext = createContext();

export const WindowSizeProvider = ({ children }) => {
  const [isMobileSize, setIsMobileSize] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowSizeContext.Provider value={{ isMobileSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};
