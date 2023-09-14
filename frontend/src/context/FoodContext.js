import { createContext, useReducer } from 'react';

export const FoodContext = createContext();

export const foodReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FOODS':
      return {
        foods: action.payload
      }
    case 'CREATE_FOOD':
      return {
        foods: [action.payload, ...state.foods]
      }
    case 'DELETE_FOOD':
      return {
        foods: state.foods.filter((f) => f._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const FoodContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foodReducer, {
    foods: null
  });

  return (
    <FoodContext.Provider value={{...state, dispatch}}>
      { children }
    </FoodContext.Provider>
  )
}
