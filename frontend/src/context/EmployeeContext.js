import { createContext, useReducer } from 'react';

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return {
        employees: action.payload
      }
    case 'CREATE_EMPLOYEE':
      return {
        employees: [action.payload, ...state.employees]
      }
    case 'DELETE_EMPLOYEE':
      return {
        employees: state.employees.filter((e) => e._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const EmployeeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeeReducer, {
    employees: null
  });

  return (
    <EmployeeContext.Provider value={{...state, dispatch}}>
      { children }
    </EmployeeContext.Provider>
  )
}
