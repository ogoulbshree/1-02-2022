
let express = require('express');
let router = express.Router();
multer = require('multer');
const moment = require('moment');
const bodyParser = require('body-parser')

const fs = require('fs');
var jsonParse = bodyParser.json();


const Attach = require('../schema/attachments');
let CustomerNotes = require('../schema/CustomerNotesSchema');

const fileUpload = require('express-fileupload');
router.use(fileUpload());

function authenticateToken(req, res, next) {
  let header = req.headers["authorization"];
  let token = header && header.split(" ")[1];
  if (token == null)
      return res.sendStatus(401);
  // console.log("TOKEN 1:", token);
  // let decoded = jwt.decode(token);
  // console.log("DECODED:", decoded);
  jwt.verify(token, SECRET, (err, clientDetails) => {
      if (err) return res.sendStatus(403);
      req.clientDetails = clientDetails;
      next();
  });
}
router.post('/create', authenticateToken,async function(req, res, next) {
    console.log(req.body);
    var tsk = await Attach.create(req.body);
    res.json({ message: 'success', data: tsk });
})


/* router.get('/getall/:id', async function(req, res, next) {
    var g = await Attach.find({ ObjectDetail: req.params.id }).populate('ObjectDetail');
    res.json({ message: 'success', data: g });
})
 */

router.get('/getall', authenticateToken,async function(req, res, next) {
    var fetchLead = await Attach.find();
    res.json({ message: 'success', data: fetchLead });
})

router.get('/get/:id', authenticateToken,async function(req, res, next) {
    var single = await Attach.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/delete/:id', authenticateToken,async function(req, res, next) {
    await Attach.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' });
});

router.post('/update',authenticateToken, async function(req, res, next) {
    await Attach.updateOne({
        _id: req.body.id
    }, {
        $set: req.body
    });
    res.json({ message: 'success' })
});


////notes and attachmnets


  //post request for notes
  router.post('/notes', (req, res) => {
    //get obj from body of request
    let obj = req.body;
  
    //create obj
    CustomerNotes.create(obj).then(
      (results) => res.send(results),
      (err) => console.log(err)
    )
  }); 
  
  //delete notes
  router.delete('/notes', (req, res) => {
    // get id and path
    let id = req.query.id;
    let path = req.query.file_path;
  
    //log
    console.log('DELETE');
    console.log(id);
  
    //get relative filepath
    let fp = (__dirname + '/..' + req.query.file_path);
    console.log(fp);
  
    //delete file
    fs.unlink(fp, (err) => console.log(err));
  
    //delete from database
    CustomerNotes.deleteOne({_id: id}).then(
      (result) => res.send(result),
      (err) => console.log(err)
    );
  }); 
  
  //uploading file
  router.post('/upload', (req, res) => {
    let sampleFile;
    let uploadPath;
  
    //check if file was passed
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    console.log("UPLOAD");
    sampleFile = req.files.uploadNotes;
    uploadPath = __dirname + '/../uploads/' + sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err){
        console.log(err);
        return res.status(500).send(err);
      }
      res.send({file_path: '/uploads/' + sampleFile.name});
    });
  })
  
  
  //on get request send file to download
  router.get('/upload', (req, res) => {
    //get file path from query string
    let file_path = req.query.file_path;
  
    //path to file 
    downloadPath = __dirname + '/..' + file_path;
  
    //send download response
    res.download(downloadPath, downloadPath);
  });

  
  //get request for notes
router.get('/notes', (req, res) => {
  //get deal_id from query 
  let object_id = req.query.object_id;
  let campaign_id = req.query.campaign_id;
  let policy_id = req.query.policy_id;
  //find entries from deal_id
  CustomerNotes.find({object_id: object_id,campaign_id:campaign_id,policy_id:policy_id}).then(
    (results) => res.send(results),
    (err) => console.log(err)
  )
}); 


  
  
module.exports = router;