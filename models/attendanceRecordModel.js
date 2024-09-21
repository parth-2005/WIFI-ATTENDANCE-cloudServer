/*

AttendanceRecord
_id: ObjectId
session: ObjectId<AttendanceSession>
student: ObjectId<Student>
status: enum ['present', 'absent']

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceRecordSchema = new Schema({
    session: {
        type: Schema.Types.ObjectId,
        ref: 'AttendanceSession',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    }
});

const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceRecordSchema);