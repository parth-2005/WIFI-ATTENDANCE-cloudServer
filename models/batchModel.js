/*

Batch
_id: ObjectId
batchCode: String
courses: [ObjectId<Course>]

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    batchCode: {
        type: String,
        required: true
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('Batch', batchSchema);