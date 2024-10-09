/*

AttendanceSession
_id: ObjectId
adminId: ObjectId<Admin>
dateTime: DateTimestamp

*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSessionSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    }
});