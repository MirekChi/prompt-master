const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/promptmaster';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/templates', require('./routes/templates'));

// Health Check
app.get('/', (req, res) => {
    res.send('Prompt Master API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});