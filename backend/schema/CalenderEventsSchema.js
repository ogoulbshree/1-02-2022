const mongoose = require("mongoose");

const CalenderEventsSchema = mongoose.Schema({
    mailSent:{type:Boolean,default:false},
    title:{type:String},
    start:{type:String},
    end:{type:Number},
    backgroundColor:{type:Number},
    borderColor: {type: String},
    type: { type: String},
    emails:{type:[]}, 
    agenda:{type:String},

    

});
module.exports = mongoose.model('CalenderEvents', CalenderEventsSchema, 'events');
