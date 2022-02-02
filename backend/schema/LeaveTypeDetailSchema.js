const mongoose = require("mongoose");

const LeaveTypeDetailSchema = mongoose.Schema({
    leavetype_id: { type: String, required: true },
    leavetype_name: { type: String },
    leavetype_days: { type: Number },
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },


});
module.exports = mongoose.model('LeaveTypeDetail', LeaveTypeDetailSchema, 'leavetype_details');
