const express = require('express');
const { login, createUser, getUsers, manageUser, updateUserImage, adminSignup } = require('../controllers/user.controller');
const userRouter = express.Router();


// Route for user login
userRouter.post('/login', login);

// Route for admin signup
userRouter.post('/signup', adminSignup);

// Route for admin creates a new user
userRouter.post('/createUser', createUser);

// Route for admin manage the user
userRouter.post('/manage', manageUser);

// Route for user to manage image
userRouter.post('/user/update', updateUserImage);

// Route for admin fetches users
userRouter.post('/getUsers', getUsers);

module.exports = {
    userRouter
};
