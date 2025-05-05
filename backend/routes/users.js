const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// create
router.post('/add', (req, res) => {
    // assigns values from body into name, email, password variables
    const { name, email, password } = req.body;

    // create new user
    const newUser = new User({
        name,
        email,
        password,
    });

    // saves user to database
    newUser.save()
        .then(newUser => res.json(newUser))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// read
router.get('/', (req, res) => {
    // gets all items from database
    User.find()
        .then(data => res.json(data))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// update
router.put('/update/:id', (req, res) => {
    const { name, email, password } = req.body;

    User.findByIdAndUpdate(req.params.id, { name, email, password })
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// delete
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;