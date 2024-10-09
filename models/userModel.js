/*

Users
_id: ObjectId
email: String
password: String
role: enum ['admin', 'faculty', 'student']

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },
    verified:{
        type: Boolean,
        default: false,
        required: true
    },
    verificationToken:{
        type: String,
        required: true
    },
    resetToken:{
        type: String
    },
});

module.exports = mongoose.model('User', userSchema);