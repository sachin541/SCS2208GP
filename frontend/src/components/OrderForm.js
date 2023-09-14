import { useState } from "react";
import { useOrdersContext } from "../hooks/useOrdersContext";
import { useAuthContext } from '../hooks/useAuthContext';

const OrderForm = () => {
  const { dispatch } = useOrdersContext();
  const { user } = useAuthContext();

  const [ordernumber, setOrderNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const order = { ordernumber, customerName, items, price };

    const response = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setOrderNumber('');
      setCustomerName('');
      setItems('');
      setPrice('');
      setError(null);
      setEmptyFields([]);
      dispatch({type: 'CREATE_ORDER', payload: json});
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Order</h3>

      <label>Order Number:</label>
      <input 
        type="text"
        onChange={(e) => setOrderNumber(e.target.value)}
        value={ordernumber}
        className={emptyFields.includes('ordernumber') ? 'error' : ''}
      />

      <label>Customer Name:</label>
      <input 
        type="text"
        onChange={(e) => setCustomerName(e.target.value)}
        value={customerName}
        className={emptyFields.includes('customerName') ? 'error' : ''}
      />

      <label>Items:</label>
      <textarea 
        rows="4"
        onChange={(e) => setItems(e.target.value)}
        value={items}
        className={emptyFields.includes('items') ? 'error' : ''}
      ></textarea>

      <label>Price:</label>
      <input 
        type="number"
        step="0.01"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className={emptyFields.includes('price') ? 'error' : ''}
      />

      <button>Add Order</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default OrderForm;
