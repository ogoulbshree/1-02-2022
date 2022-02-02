const mongoose = require("mongoose");

const TravelDetailSchema = mongoose.Schema({
   travel_id: { type: String, required: true },
   travel_info:{type:String},
   employee_name:{ type : String },
   travel_date:{type:String},
   return_date:{type:String},
   ticket_info:{type:String},
   created_by:{type:String},
   created_time:{type:Number}, 
   updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('TravelDetail', TravelDetailSchema, 'travel_details');
