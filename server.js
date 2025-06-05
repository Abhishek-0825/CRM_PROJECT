const express = require('express'); 
const app = express();

require('dotenv').config();  
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

// Connect to MySQL database
require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const transportRoutes = require('./routes/transportRoutes');


//mount api
app.use('/api', userRoutes);
app.use('/api', transportRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 


