const mongoose = require("mongoose");

const LeadsourceDetailSchema = mongoose.Schema({
    lead_source_id: { type: String, required: true },
   lead_source_name: { type: String},
   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('LeadsourceDetail', LeadsourceDetailSchema, 'Leadsource_details');
