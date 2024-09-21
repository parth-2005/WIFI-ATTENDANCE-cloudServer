/*

Course
_id: ObjectId
courseCode: String
courseName: String
teacher: ObjectId<Teacher>

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseCode: {
        type: String,
        required: [true, 'Course code is required']
    },
    courseName: {
        type: String,
        required: [true, 'Course name is required']
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
});

const Course = mongoose.model('Course', courseSchema);