const mongoose = require("mongoose");
const moment =require('moment')

const FaqDetailsSchema = mongoose.Schema({
    faq_id: { type: Number, required: true },
    questions:{type:String},
   answers:{type:String},
   status:{type:String},
   product_name:{type:String},
   first_name:{type:String},
   created_by_user:{type:String},
   

   created_by:{type:String},
   created_time:{type:Number}, 
  updated_by:{type:String},
   modified_time:{type:Number}, 
   global_search:{type:String,default:"faq"},
    // modified_by_time: {type: String, default: moment().format('DD/MM/YYYY') + ',' + moment().format('hh:mm:ss')},

    // created_time: {type: String, default:moment().format('DD/MM/YYYY') + ',' + moment().format('hh:mm:ss')},
   
  
});

// FaqDetailsSchema.pre('save',function(next){
// now = new moment().format('DD/MM/YYYY') + ',' + moment().format('hh:mm:ss')
// this.modified_by_time = now
// if(!this.created_time){
//     this.created_time =now
// }
// next();
// });

module.exports = mongoose.model('FaqDetail', FaqDetailsSchema, 'faq_details');
 