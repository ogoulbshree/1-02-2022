
const mongoose = require("mongoose");

const CampaigntypeDetailSchema = mongoose.Schema({
    campaign_type_id: { type: String, required: true },
    campaign_type_name: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('CampaigntypeDetail', CampaigntypeDetailSchema, 'campaigntype_details');






