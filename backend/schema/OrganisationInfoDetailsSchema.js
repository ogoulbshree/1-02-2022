const mongoose = require("mongoose");

const OrganisationInfoDetailSchema = mongoose.Schema({
   orginfo_id: { type: String, required: true },
   orginfo_name:{ type : String },
   orginfo_address:{type:String},
   orginfo_mobile:{type:String},
   created_by:{type:String},
   created_time:{type:Number}, 
   updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('OrganisationInfoDetail', OrganisationInfoDetailSchema, 'organisation_info_details');
