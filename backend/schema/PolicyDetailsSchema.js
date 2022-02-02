
const mongoose = require("mongoose");

const PolicyDetailsSchema = mongoose.Schema({
    policy_id: { type: Number, required: true },
    policy_name: {type:String},
    files: {type:String},
    description:{type:String},
    file_path:{type:[]},
  file_name:{type:String},
  size:{type:Number},

    created_by: { type: String },
    created_time: { type: Number },
    updated_by: { type: String },
    modified_time: { type: Number },

});
module.exports = mongoose.model('PolicyDetail', PolicyDetailsSchema, 'policy_detail');





