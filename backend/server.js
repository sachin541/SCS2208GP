require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const beverageRoutes = require('./routes/beverages');  
const foodRoutes = require('./routes/foods');  
const employeeRoutes = require('./routes/employees');  
const recipeRoutes = require('./routes/recipes');
const orderRoutes = require('./routes/orders');
// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes

app.use('/api/user', userRoutes);
app.use('/api/beverages', beverageRoutes);  
app.use('/api/foods', foodRoutes);  
app.use('/api/employees', employeeRoutes);  
app.use('/api/recipes', recipeRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
