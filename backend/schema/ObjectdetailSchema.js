const mongoose = require("mongoose");

const ObjectdetailSchema = mongoose.Schema({
    object_id: { type: Number },
    salutation: { type: String},
    first_name :{ type: String},
    last_name: { type: String},
    phone: { type: String},
    email : { type: String},
    home_phone:{ type: String},
    account_name:{ type: String},
    title:{ type: String},
    department:{ type: String},
    fax:{ type: String},
    dob:{ type: String},
    source:{ type: String},
    mailing_address:{ type: String},
    other_address:{ type: String},
    mailing_city:{ type: String},
    mailing_state:{ type: String},
    mailing_Postal_code:{ type: String},
    mailing_country:{ type: String},
    description:{ type: String},
    object_type:{type: Number},
    type_of_contacts:{type: String},
    files:{type:String},
    company_name:{type:String},
    linked_in_url:{type:String},
    opportunity_percentage :{type:Number},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
    title: String,
    lastmodyfied: String,
    size: String,
    type: String,
    file: String,
    global_search:{type:String,default:"customer"},
    
});
    

module.exports = mongoose.model('ObjectDetail', ObjectdetailSchema, 'object_details');
