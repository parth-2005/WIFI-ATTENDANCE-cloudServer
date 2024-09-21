/*

Class
_id: ObjectId
room: String

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema({
    room: {
        type: String,
        unique: true,
        required: true
    }
});

const Class = mongoose.model('Class', classSchema);