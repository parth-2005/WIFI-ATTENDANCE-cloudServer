/*

Admin
_id: ObjectId
user: ObjectId<User>
name: String

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);