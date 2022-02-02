const mongoose = require("mongoose");

const LoginDetailsSchema = mongoose.Schema({
    login_id: { type: String},
    email: { type: String},
    marketing_user_id: { type: String},
    action:{ type: String},
    Date:{type:Date}
   /*  fromDate:{type: String},
  toDate:{type:String} */
  });
module.exports = mongoose.model('UserLogin', LoginDetailsSchema, 'login_details');
