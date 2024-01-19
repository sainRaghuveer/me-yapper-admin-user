const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../models/user.model');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.SECRET_KEY, { expiresIn: "24h" }
    );
};

const adminSignup = async (req, res) => {
    try {
      const { userId, password, role } = req.body;
  
      if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden. Only admin can create admin accounts.' });
      }

      const existingUser = await UserModel.find({ userId });
      if (existingUser[0]) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newAdmin = new UserModel({
        userId,
        password: hashedPassword,
        role
      });
  
      const admin = await newAdmin.save();
  
      res.status(201).json({ message: 'Admin account created successfully', admin:admin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

const login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const user = await UserModel.findOne({ userId });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        console.log(user)

        res.json({ token: token, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const createUser = async (req, res) => {
    try {
        const { userId, password, role } = req.body;

        if (role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden. Only admin can create users.' });
        }

        const existingUser = await UserModel.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new UserModel({
            userId,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'User account is created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUsers = async (req, res) => {
    try {
        const requestingUserRole = req.user.role;
        const userIds = req.body.userIds;
    
        if (requestingUserRole !== 'admin') {
          return res.status(403).json({ message: 'Forbidden. Only admin can get users.' });
        }
    
        const users = await UserModel.find({ userId: { $in: userIds } });
    
        res.status(200).json({ users });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};


const manageUser = async (req, res) => {
    try {
        const { userId, action } = req.body;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden. Only admin can manage users.' });
        }

        const user = await UserModel.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        switch (action) {
            case 'approve':
                user.profile.approvalStatus = 'approved';
                break;
            case 'reject':
                user.profile.approvalStatus = 'rejected';
                break;
            default:
                return res.status(400).json({ message: 'Invalid action' });
        }
        // console.log(user)
        await user.save();

        res.json({ message: `User ${user.userId} ${action === 'approve' ? 'approved' : 'rejected'} successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const updateUserImage = async (req, res) => {
    try {
        const { userId,name, imageData } = req.body;

        // Find the user based on the provided userId
        const user = await UserModel.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile.name = name;
        user.profile.photo = imageData;
        console.log(`User ${user.userId} has updated their profile image. Awaiting admin approval.`);

        await user.save();

        res.json({ message: 'Profile image updated successfully. Awaiting admin approval.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const getUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



module.exports = {
    login, adminSignup, createUser, getUsers, manageUser, updateUserImage, getUser
}