const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.sendStatus(401); 
    }

    
    try {
        const user = jwt.verify(token, 'abc');
        req.user = user; 
        next(); 
    } catch (error) {
        return res.sendStatus(403); 
    }
}

router.get('/users', authenticateToken, async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get('/profile', authenticateToken, async (req, res) => {
    res.send(req.user);
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(400).send("User not found");
        return;
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
        const token = jwt.sign({ _id: user._id, email: user.email, username: user.username }, "abc");
        res.send({ status: "SUCCESS", token: token });
    } else {
        res.status(400).send("Login credentials invalid");
    }
});

router.post('/users', async (req, res) => {
    const originalUser = req.body;
    const modifiedUser = { ...originalUser, password: await bcrypt.hash(originalUser.password, 10) };
    const user = new User(modifiedUser);
    const createdUser = await user.save();
    res.status(201).send(createdUser);
});

router.put('/users/:id', authenticateToken, async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
        res.status(404).send('User not found');
        return;
    }
    res.send(updatedUser);
});

router.delete('/users/:id', authenticateToken, async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        res.status(404).send('User not found');
        return;
    }
    res.send('User deleted successfully');
});

module.exports = router;
