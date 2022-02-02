var express = require('express');
var router = express.Router();
 const Calendar = require('../schema/Calendar'); 
let response = require('./Response');

router.post('/create_calendar', async function(req, res, next) {
    console.log(req.body);
    var tsk = await Calendar.create(req.body);
    res.json({ message: 'success', data: tsk });
})

 
/* 
router.post("/create_calendar", async function (req, res) {
    console.log("Enter: create_calendar");
    try {
        let calendar = new Calendar(req.body);
        calendar.calend_id = Date.now()
        let result = await calendar.save();
        console.log("Success");
        response.success(req, res, "Success create_calendar", calendar);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */

 router.get('/getall_calendar', async function(req, res, next) {
    var cal = await Calendar.find();
    res.json({ message: 'success', data: cal });
}) 


/* router.get('/getall_calendar/:id', async function(req, res, next) {
    console.log('-----------')
    console.log(req.params.id)
    console.log('-----------')
    var cal = await Calendar.find({ lead: req.params.id });
    res.json({ message: 'success', data: cal });
}) */

router.get('/get/:id', async function(req, res, next) {
    var single = await Calendar.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});


router.delete('/:id', async function(req, res, next) {
    await Calendar.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update_calendar', async function(req, res, next) {
    await Calendar.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' })
});

module.exports = router;