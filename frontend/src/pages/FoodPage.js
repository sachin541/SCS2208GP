import { useEffect } from 'react';
import { useFoodsContext } from "../hooks/useFoodsContext";  // Import the Food Context Hook
import { useAuthContext } from "../hooks/useAuthContext";

// components
import FoodDetails from '../components/FoodDetails';  // Import the Food Details component
import FoodForm from '../components/FoodForm';  // Import the Food Form component

const FoodPage = () => {
  const { foods, dispatch } = useFoodsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch('/api/foods', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_FOODS', payload: json});
      }
    }

    if (user) {
      fetchFoods();
    }
  }, [dispatch, user]);

  return (
    <div className="food-page">
      <div className="foods">
        {foods && foods.map((food) => (
          <FoodDetails key={food._id} food={food} />
        ))}
      </div>
      <FoodForm />
    </div>
  )
}

export default FoodPage;
