import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Cafe Connect</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span></span>
              <Link to="/">Foods</Link>  {/* <-- New Link to the FoodPage */}

              <Link to="/beverages">Beverages</Link>  {/* Link to the BeveragePage */}
              
              <Link to="/orders">Orders</Link>  {/* Link to the RecipesPage */}
            
              <Link to="/employees">Employees</Link>  {/* Link to the EmployeePage */}

              <Link to="/recipes">Recipes</Link>  {/* Link to the RecipesPage */}
              
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar;



