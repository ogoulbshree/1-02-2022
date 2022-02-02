const mongoose = require("mongoose");

const OrganisationDetailSchema = mongoose.Schema({

    freeTrialDays:{type:Number}, 
});
module.exports = mongoose.model('OrganisationDetail', OrganisationDetailSchema, 'organisation_details');
