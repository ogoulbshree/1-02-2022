const mongoose = require("mongoose");

const LandingpageSchema = mongoose.Schema({
    field_uid: String,
    field_language: String,
    field_name: String,
   
    field_details: String,
    is_required: Boolean,
    ar: String,
    en: String,
    fr: String,
    ja: String,
    ko: String,
    ru: String,
    es: String,
    tr:String,
    zh:String,
});
module.exports = mongoose.model('LandingPage', LandingpageSchema, 'landing_page');
