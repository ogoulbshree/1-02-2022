const mongoose = require("mongoose");

const ContactusDetailSchema = mongoose.Schema({
    contact_us_id: { type: String, required: true },
    name:{type:String},
      subject:{type:String},
        message:{type:String},
        email:{type:String}
});
module.exports = mongoose.model('ContactusDetail', ContactusDetailSchema, 'contactus_details');
