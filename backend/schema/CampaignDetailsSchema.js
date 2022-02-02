const mongoose = require("mongoose");

const CampaignDetailsSchema = mongoose.Schema({
    campaign_id: { type: Number },
    campaign_owner: { type: String},
    campaign_name: { type: String},
    files:{type:String},
    active: { type: String},
    type: { type: String},
    status: { type: String},
    start_date: { type: String},
    end_date: { type: String},
    expected_revenue_in_campaign: { type: String},
    budgeted_cost_in_campaign: { type: String},
    actual_cost_in_campaign: { type: String},
    expected_response_percent: { type: String},
    description_info: { type: String},
    object_type:{type: Number},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
    global_search:{type:String,default:"campaign"},

});
module.exports = mongoose.model('CampaignDetail', CampaignDetailsSchema, 'campaign_details');
