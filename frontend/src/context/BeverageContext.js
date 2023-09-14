import { createContext, useReducer } from 'react';

export const BeverageContext = createContext();

export const beverageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BEVERAGES':
      return {
        beverages: action.payload
      }
    case 'CREATE_BEVERAGE':
      return {
        beverages: [action.payload, ...state.beverages]
      }
    case 'DELETE_BEVERAGE':
      return {
        beverages: state.beverages.filter((b) => b._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const BeverageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(beverageReducer, {
    beverages: null
  });

  return (
    <BeverageContext.Provider value={{...state, dispatch}}>
      { children }
    </BeverageContext.Provider>
  )
}
