import { EmployeeContext } from '../context/EmployeeContext';
import { useContext } from 'react';

export const useEmployeesContext = () => {
  const context = useContext(EmployeeContext);

  if (!context) {
    throw Error('useEmployeeContext must be used inside an EmployeeContextProvider');
  }

  return context;
};
