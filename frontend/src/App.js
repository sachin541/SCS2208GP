import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components

import Login from './pages/Login';
import Signup from './pages/Signup';
import BeveragePage from './pages/BeveragePage';  // Import the BeveragePage
import EmployeePage from './pages/EmployeePage';  // Import the EmployeePage
import RecipesPage from './pages/RecipesPage';    // Import the RecipesPage
import FoodPage from './pages/FoodPage';          // Import the FoodPage
import OrderPage from './pages/OrderPage';        // <-- Import the OrderPage
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
           
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/beverages" 
              element={user ? <BeveragePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={user ? <FoodPage /> : <Navigate to="/login" />} 
            />  
            <Route 
              path="/employees" 
              element={user ? <EmployeePage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/recipes" 
              element={user ? <RecipesPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/orders" 
              element={user ? <OrderPage /> : <Navigate to="/login" />} 
            /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;



