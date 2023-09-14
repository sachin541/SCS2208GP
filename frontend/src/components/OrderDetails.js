import { useOrdersContext } from '../hooks/useOrdersContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const OrderDetails = ({ order }) => {
  const { dispatch } = useOrdersContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/orders/' + order._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_ORDER', payload: json});
    }
  }

  return (
    <div className="order-details">
      <h4>{order.ordernumber}</h4>
      <p><strong>Customer Name: </strong>{order.customerName}</p>
      <p><strong>Items: </strong>{order.items}</p>
      <p><strong>Price: </strong>${order.price}</p>
      <p>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default OrderDetails;
