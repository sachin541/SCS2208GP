import { useEffect } from 'react';
import { useOrdersContext } from "../hooks/useOrdersContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import OrderDetails from '../components/OrderDetails';
import OrderForm from '../components/OrderForm';

const OrderPage = () => {
  const { orders, dispatch } = useOrdersContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('/api/orders', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_ORDERS', payload: json});
      }
    }

    if (user) {
      fetchOrders();
    }
  }, [dispatch, user]);

  return (
    <div className="order-page">
      <div className="orders">
        {orders && orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
      <OrderForm />
    </div>
  )
}

export default OrderPage;
