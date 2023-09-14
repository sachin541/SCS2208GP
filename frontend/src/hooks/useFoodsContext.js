import { FoodContext } from '../context/FoodContext';
import { useContext } from 'react';

export const useFoodsContext = () => {
  const context = useContext(FoodContext);

  if (!context) {
    throw Error('useFoodsContext must be used inside a FoodContextProvider');
  }

  return context;
}
