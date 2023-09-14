import { useEffect } from 'react';
import { useBeveragesContext } from "../hooks/useBeveragesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import BeverageDetails from '../components/BeverageDetails';
import BeverageForm from '../components/BeverageForm';

const BeveragePage = () => {
  const { beverages, dispatch } = useBeveragesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBeverages = async () => {
      const response = await fetch('/api/beverages', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_BEVERAGES', payload: json});
      }
    }

    if (user) {
      fetchBeverages();
    }
  }, [dispatch, user]);

  return (
    <div className="beverage-page">
      <div className="beverages">
        {beverages && beverages.map((beverage) => (
          <BeverageDetails key={beverage._id} beverage={beverage} />
        ))}
      </div>
      <BeverageForm />
    </div>
  )
}

export default BeveragePage;

