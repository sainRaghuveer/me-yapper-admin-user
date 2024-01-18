const mongoose = require('mongoose');


// User Schema
const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    profile: {
        name: { type: String, default: "" },
        photo: { type: String, default: 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg' },
        approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {
    UserModel
};
