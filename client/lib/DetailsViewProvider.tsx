import { createContext, useContext, useState } from 'react';

const DetailsViewContext = createContext(null);

export const useDetailsView = () => useContext(DetailsViewContext);

export const DetailsViewProvider = ({ children }) => {
  const [view, setView] = useState(null);
  const [id, setId] = useState(null);

  const open = (view, id) => {
    setView(view);
    setId(id);
  };

  const close = () => {
    setView(null);
    setId(null);
  };

  return (
    <DetailsViewContext.Provider value={{ view, id, open, close }}>
      {children}
    </DetailsViewContext.Provider>
  );
};
