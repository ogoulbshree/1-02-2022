const mongoose = require("mongoose");

const SurveyDetailSchema = mongoose.Schema({
    survey_id: { type: String, required: true },
    name:{type:String},
    phone:{type:String},
      company:{type:String},
        message:{type:String},
        email:{type:String}
});
module.exports = mongoose.model('SurveysDetail', SurveyDetailSchema, 'survey_details');
