import { useAuthContext } from '../hooks/useAuthContext';
import { useFoodsContext } from '../hooks/useFoodsContext';  // Import the Food Context Hook

const FoodDetails = ({ food }) => {
  const { user } = useAuthContext();
  const { dispatch } = useFoodsContext();  // Extract dispatch from the Food Context

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/foods/' + food._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_FOOD', payload: json});
    }
  };

  return (
    <div className="food-details">
      <h4>{food.name}</h4>
      <p>Price ($): {food.price}</p>
      <p>Description: {food.description}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default FoodDetails;
