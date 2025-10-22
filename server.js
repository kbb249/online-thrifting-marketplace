// server.js

// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const studentRoutes = require('./server/src/routes/student.routes');
// const mongoose = require('mongoose')

const app = express();
const PORT = process.env.PORT || 3000;


// ------ Middleares -------
// Enable CORS
// const sors = require('cors');
//app.use(cors());


// Middleware to parse JSON requests
app.use(express.json());

//Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true}));

// serve files from client directory
app.use(express.static(path.join(__dirname, 'client/public')));


// ---- Routes ----
// Import API routes here:
app.use('/', studentRoutes);

// Test Route
app.get('/api/status', (req, res) => {
	res.json({ status: 'Server operational', port: PORT });
});


// Database Connection
/*
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('MongaDB connected successfully'));
	.catch(err => console.error('MongoDB connection error:', err));
*/

// Start the Server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
	console.log(`Open your browser to the client: https://localhost:${PORT}/index.html`);
})