const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.SECRET_KEY, { expiresIn: "24h" }
    );
};

const login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.json({ token: token, user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const createUser = async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden. Only admin can create users.' });
        }

        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new User({
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

        const limit = requestingUserRole === 'admin' ? 2 : 1;
        const users = await User.find({ role: requestingUserRole }).limit(limit);

        res.json(users);
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

        const user = await User.findOne({ userId });

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

        await user.save();

        res.json({ message: `User ${user.userId} ${action === 'approve' ? 'approved' : 'rejected'} successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const updateUserImage = async (req, res) => {
    try {
        const { userId, imageData } = req.body;

        // Find the user based on the provided userId
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profile.photo = imageData;
        console.log(`User ${user.userId} has updated their profile image. Awaiting admin approval.`);

        await user.save();

        res.json({ message: 'Profile image updated successfully. Awaiting admin approval.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};



module.exports = {
    login, createUser, getUsers, manageUser, updateUserImage
}