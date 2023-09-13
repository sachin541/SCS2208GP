import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEmployeesContext } from '../hooks/useEmployeesContext';  // Import the Employee Context Hook

const EmployeeDetails = ({ employee }) => {
  const { user } = useAuthContext();
  const { dispatch } = useEmployeesContext();  // Extract dispatch from the Employee Context

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/employees/' + employee._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_EMPLOYEE', payload: json});
    }
  };

  return (
    <div className="employee-details">
      <h4>{employee.name}</h4>
      <p>NIC: {employee.NIC}</p>
      <p>Birthdate: {employee.birthdate}</p>
      <p>Phone: {employee.phone}</p>
      <p>Email: {employee.email}</p>
      <p>Job Title: {employee.jobTitle}</p>
      <p>Address: {employee.address}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
}

export default EmployeeDetails;
