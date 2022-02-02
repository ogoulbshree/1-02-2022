const mongoose = require("mongoose");

const ContactDetailsSchema = mongoose.Schema({
    contact_id: { type: String, required: true },
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
   
    
   /*  time : { type : Date, default: Date.now }

 */


created_at: {type: Date, default: Date.now},
updated_at: {type: Date, default: Date.now}





});
ContactDetailsSchema.pre('save', function(next){
    now = new Date();
    
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('ContactDetail', ContactDetailsSchema, 'contact_details');
