const mongoose = require("mongoose");

const HolidayDetailSchema = mongoose.Schema({
    holiday_id: { type: Number, required: true },
    holiday_name: { type: String },
    holiday_date: { type: String },
    holiday_day: { type: String },
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },
    global_search:{type: String}

});
module.exports = mongoose.model('HolidayDetail', HolidayDetailSchema, 'holiday_details');
