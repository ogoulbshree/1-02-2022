const mongoose = require("mongoose");

const CampaignstatusDetailSchema = mongoose.Schema({
    campaign_status_id: { type: String, required: true },
    campaign_status: { type: String},

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
 
    
});
module.exports = mongoose.model('CampaignstatusDetail', CampaignstatusDetailSchema, 'Campaignstatus_details');



