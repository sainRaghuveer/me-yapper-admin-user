const express = require('express');
const { login, createUser, getUsers, manageUser, updateUserImage, adminSignup, getUser } = require('../controllers/user.controller');
const userRouter = express.Router();


// Route for user login
userRouter.post('/login', login);

// Route for admin signup
userRouter.post('/signup', adminSignup);

// Route for admin creates a new user
userRouter.post('/createUser', createUser);

// Route for admin manage the user
userRouter.patch('/manage', manageUser);

// Route for user to manage image
userRouter.post('/user/update', updateUserImage);

// Route for admin fetches users
userRouter.post('/getUsers', getUsers);

//Route for single user details
userRouter.get('/singleUser/:id', getUser);

module.exports = {
    userRouter
};
