import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';  // Import useAuthContext hook

const FoodForm = () => {
  const { user } = useAuthContext();  // Get user object using useAuthContext hook
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {  // Check if user is authenticated
      setError('You must be logged in');
      return;
    }

    const food = { name, price, description };

    const response = await fetch('/api/foods', {
      method: 'POST',
      body: JSON.stringify(food),
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
      setPrice('');
      setDescription('');
      console.log('New food added:', json);
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Food</h3>

      <label>Food Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />

      <label>Price ($):</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price}
      />

      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description} 
      />

      <button>Add Food</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FoodForm;
