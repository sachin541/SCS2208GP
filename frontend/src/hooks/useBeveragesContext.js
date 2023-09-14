import { BeverageContext } from '../context/BeverageContext';
import { useContext } from 'react';

export const useBeveragesContext = () => {
  const context = useContext(BeverageContext);

  if (!context) {
    throw Error('useBeveragesContext must be used inside a BeverageContextProvider');
  }

  return context;
}
