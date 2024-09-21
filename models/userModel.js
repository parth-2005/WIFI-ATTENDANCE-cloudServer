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
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['admin', 'faculty', 'student'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);