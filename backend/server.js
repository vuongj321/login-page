require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect to database
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// check connection
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

// any request starting with /users will be passed to users.js
const userRouter = require('./routes/users');
app.use('/users', userRouter);

// listen on PORT and exceute callback function once server starts
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})