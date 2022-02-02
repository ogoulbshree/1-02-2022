const mongoose = require("mongoose");

const MarketingUserDetailSchema = mongoose.Schema({
    marketing_user_id: { type: String, required: true },
    marketing_username: { type: String},
    password: { type: String},
    email: { type: String},
    phone: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    marketing_usertype: {type: String},
    dob:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
  
});
module.exports = mongoose.model('MarketingUserDetail', MarketingUserDetailSchema, 'marketingUser_Detail');