const mongoose = require("mongoose");

const EmployeeDetailSchema = mongoose.Schema({
    employee_id: { type: Number, required: true },
    first_name: { type: String },
    user_name: { type: String },
    password: { type: String },
    phone: { type: String },
    last_name: { type: String },
    email: { type: String },
    confirm_password: { type: String },
    joining_date: { type: String },
    designation: { type: String },
    designation_weight: { type: Number },
    assigned_to: { type: String },
    profile_picture: { type: String },
    leaves_available: { type: Number },
    employee_status:{type:String},
    employee_bank: { type:String},
    employee_account_number: { type: String },
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },
    global_search:{type:String},


});
module.exports = mongoose.model('EmployeeDetail', EmployeeDetailSchema, 'employee_details');
