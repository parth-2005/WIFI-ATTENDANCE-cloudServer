/*

Students
_id: ObjectId
user: ObjectId<User>
name: String
batch: ObjectId<Batch>

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    batch: {
        type: Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);