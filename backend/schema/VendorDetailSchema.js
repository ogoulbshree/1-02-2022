const mongoose = require("mongoose");

const VendorDetailSchema = mongoose.Schema({
    vendor_id: { type: String, required: true },
    customer_name: { type: String},
    email: { type: String},
    phone: { type: String},
    first_name: { type: String},
    last_name: { type: String},
    address: { type: String},
    created_by:{type:String},
    created_time:{type:Number}, 
   updated_by:{type:String},
    modified_time:{type:Number}, 
   
});
module.exports = mongoose.model('VendorDetails', VendorDetailSchema, 'vendor_details');
