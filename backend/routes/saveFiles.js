var express = require('express');
var router = express.Router();
var multer = require('multer');
var Stream = require('stream');
var src = new Stream();
var path = require('path')
var app = express()
var uploadFolder = app.use(express.static(path.join(__dirname, './uploads/')))
const fs = require('fs');


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});

var upload = multer({ //multer settings
    storage: storage
})

router.post('/save', upload.single('file'), function(req, res, next) {
    console.log(req.file);
    res.json(req.file.filename);
});

router.post('/download', function(req, res, next) {
    console.log(req.body);
    var filePath = './uploads/' + req.body.filename;
    res.download(filePath);
});


module.exports = router;