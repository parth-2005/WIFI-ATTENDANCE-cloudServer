/*

Teachers
_id: ObjectId
user: ObjectId<User>
name: String

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Teacher', teacherSchema);