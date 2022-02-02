const mongoose = require("mongoose");

const UserDetailsSchema = mongoose.Schema({
    user_id: { type: Number, required: true },
    
    employee_id: { type: Number },
    username: { type: String},
    password: { type: String},
    email: { type: String},
    phone: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    usertype: {type: String},
    dob:{type:String},
    country:{type:String},
    company:{type:String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
    organziation_id:{ type: String,},
    emailArray:{ type: Array,default:[]},
    currency:{type:String},
    expiration_date:{type:Date}
});
module.exports = mongoose.model('UserDetails', UserDetailsSchema, 'user_details');
