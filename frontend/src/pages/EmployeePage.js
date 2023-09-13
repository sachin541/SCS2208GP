import { useEffect } from 'react';
import { useEmployeesContext } from "../hooks/useEmployeesContext";  // Assuming you have an equivalent hook for employees
import { useAuthContext } from "../hooks/useAuthContext";

// components
import EmployeeDetails from '../components/EmployeeDetails';  // Assuming you have this component
import EmployeeForm from '../components/EmployeeForm';  // Assuming you have this component

const EmployeePage = () => {
  const { employees, dispatch } = useEmployeesContext();  // Use the employees context
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees', {  // Fetching employees
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_EMPLOYEES', payload: json});  // Dispatching employees
      }
    }

    if (user) {
      fetchEmployees();
    }
  }, [dispatch, user]);

  return (
    <div className="employee-page">
      <div className="employees">  
        {employees && employees.map((employee) => (
          <EmployeeDetails key={employee._id} employee={employee} />  // Employee details component
        ))}
      </div>
      <EmployeeForm />  
    </div>
  )
}

export default EmployeePage;
