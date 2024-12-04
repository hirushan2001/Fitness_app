import React, { createContext, useContext, useState } from "react";

const ClickCountContext = createContext();

export const useClickCount = () => useContext(ClickCountContext);

export const ClickCountProvider = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);

  const incrementClickCount = () => setClickCount((prev) => prev + 1);

  return (
    <ClickCountContext.Provider value={{ clickCount, incrementClickCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};
