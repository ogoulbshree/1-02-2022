const mongoose = require("mongoose");

const CustomerDetailSchema = mongoose.Schema({
    customer_id: { type: String, required: true },
    salutation: { type: String},
    first_name :{ type: String},
    last_name: { type: String},
    phone: { type: String},
    email : { type: String},
    home_phone:{ type: String},
    account_name:{ type: String},
    title:{ type: String},
    department:{ type: String},
    Fax:{ type: String},
    DOB:{ type: String},
    source:{ type: String},
    mailing_address:{ type: String},
    other_address:{ type: String},
    mailing_city:{ type: String},
    mailing_state:{ type: String},
    mailing_Postal_code:{ type: String},
    mailing_country:{ type: String},
    description:{ type: String},
    uploadfiles:{type: String},
    files_name:{type: String}




});
module.exports = mongoose.model('CustomerDetail', CustomerDetailSchema, 'customer_details');
