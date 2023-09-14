import { useAuthContext } from '../hooks/useAuthContext';
import { useBeveragesContext } from '../hooks/useBeveragesContext';  // Import the Beverage Context Hook

const BeverageDetails = ({ beverage }) => {
  const { user } = useAuthContext();
  const { dispatch } = useBeveragesContext();  // Extract dispatch from the Beverage Context

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/beverages/' + beverage._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_BEVERAGE', payload: json});
    }
  };

  return (
    <div className="beverage-details">
      <h4>{beverage.name}</h4>
      <p>Price ($): {beverage.price}</p>
      <p>Size (ml): {beverage.sizeMl}</p>
      <p>Description: {beverage.description}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default BeverageDetails;
