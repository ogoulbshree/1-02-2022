const mongoose = require("mongoose");

const LeaveDetailSchema = mongoose.Schema({
    leave_id: { type: Number, required: true },
    leave_type: { type: String },
    leave_from:{ type: String },
    leave_to:{ type: String },
    leave_status:{ type: String},
    leave_days:{ type: String },
    leave_reason:{ type: String },
    leave_mail: { type: String },
    leave_assigned_to:{ type: String },
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },

});
module.exports = mongoose.model('LeaveDetail', LeaveDetailSchema, 'leave_details');
