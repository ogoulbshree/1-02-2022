const mongoose = require("mongoose");

//schema for notes
const CustomerNotesSchema = mongoose.Schema({
  object_id:{type: Number},
  campaign_id:{type: Number},
  object_type:{type: Number},
  policy_id:{type:Number},
  file_path:{type:[]},
  file_name:{type:String},
  size:{type:Number},
  title: {type: String},
});
module.exports = mongoose.model('CustomerNotes', CustomerNotesSchema, 'customer_notes');
