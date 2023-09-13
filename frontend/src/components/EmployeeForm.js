import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';  // Import useAuthContext hook

const EmployeeForm = () => {
  const { user } = useAuthContext();  // Get user object using useAuthContext hook
  const [name, setName] = useState('');
  const [NIC, setNIC] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {  // Check if user is authenticated
      setError('You must be logged in');
      return;
    }

    const employee = {
      name,
      NIC,
      birthdate,
      phone,
      email,
      jobTitle,
      address
    };

    const response = await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`  // Include user's token in request headers
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setName('');
      setNIC('');
      setBirthdate('');
      setPhone('');
      setEmail('');
      setJobTitle('');
      setAddress('');
      console.log('New employee added:', json);
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Employee</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />

      <label>NIC:</label>
      <input 
        type="text" 
        onChange={(e) => setNIC(e.target.value)} 
        value={NIC} 
      />

      <label>Birthdate:</label>
      <input 
        type="date" 
        onChange={(e) => setBirthdate(e.target.value)} 
        value={birthdate}
      />

      <label>Phone:</label>
      <input 
        type="text" 
        onChange={(e) => setPhone(e.target.value)} 
        value={phone}
      />

      <label>Email:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
      />

      <label>Job Title:</label>
      <input 
        type="text" 
        onChange={(e) => setJobTitle(e.target.value)} 
        value={jobTitle}
      />

      <label>Address:</label>
      <input 
        type="text" 
        onChange={(e) => setAddress(e.target.value)} 
        value={address}
      />

      <button>Add Employee</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EmployeeForm;
