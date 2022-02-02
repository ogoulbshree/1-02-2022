const mongoose = require("mongoose");

const NoticetabDetailsSchema = mongoose.Schema({
    notice_tab_id: { type: Number, required: true },
    active: {type:String},
    notice_type: {type:String},
    description:{type:String},
    notice_date:{type:String},
    attatchment:{type:String},
    notice_by:{ type:String},
    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },

});
module.exports = mongoose.model('NoticetabDetail', NoticetabDetailsSchema, 'noticetab_detail');





