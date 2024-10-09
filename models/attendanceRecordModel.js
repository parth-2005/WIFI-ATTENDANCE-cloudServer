/*

AttendanceRecord
_id: ObjectId
session: ObjectId<AttendanceSession>
employee: ObjectId<Employee>
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
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    }
});

module.exports = mongoose.model('AttendanceRecord', attendanceRecordSchema);