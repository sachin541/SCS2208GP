import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthContextProvider } from './context/AuthContext';
import { BeverageContextProvider } from './context/BeverageContext';
import { EmployeeContextProvider } from './context/EmployeeContext';
import { RecipesContextProvider } from './context/RecipesContext';
import { FoodContextProvider } from './context/FoodContext';  // <-- Import the FoodContextProvider
import { OrdersContextProvider } from './context/OrdersContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      
        <BeverageContextProvider>
          <EmployeeContextProvider>
            <RecipesContextProvider>
              <OrdersContextProvider>
              <FoodContextProvider>  {/* <-- Add the FoodContextProvider */}
                <App />
              </FoodContextProvider>  {/* <-- Close the FoodContextProvider */}
              </OrdersContextProvider>
            </RecipesContextProvider>
          </EmployeeContextProvider>
        </BeverageContextProvider>
      
    </AuthContextProvider>
  </React.StrictMode>
);



