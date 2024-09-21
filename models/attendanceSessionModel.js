/*

AttendanceSession
_id: ObjectId
course: ObjectId<Course>
batch: ObjectId<Batch>
class: ObjectId<Class>
teacher: ObjectId<Teacher>
date: DateTimestamp

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSessionSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    batch: {
        type: Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const AttendanceSession = mongoose.model('AttendanceSession', attendanceSessionSchema);