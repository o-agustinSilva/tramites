import React, { createContext, useState, useContext } from 'react';

const TramiteContext = createContext();

export const TramiteProvider = ({ children }) => {
  const [tramiteData, setTramiteData] = useState({
    user: [],
    documentation: [],
    family_data: [],
  });

  return (
    <TramiteContext.Provider value={{ tramiteData, setTramiteData }}>
      {children}
    </TramiteContext.Provider>
  );
};

export const useTramite = () => useContext(TramiteContext);
