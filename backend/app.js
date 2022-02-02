const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const moment = require('moment');
const app = express();
const port = 3000;
var cron = require('node-cron');
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('dist/Calendar'));
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json({limit:"100mb"}));

const database = "mongodb://localhost:27017/ogoul_main_db";

const Mailer = require('./controllers/MailController');

/* 
const database = "mongodb://crmuser:!crm123#@172.23.0.30:27017/dashboard";  */
 //const database = "mongodb://crmuser:!crm123#@localhost:27017/dashboard"; 

mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected");
});
mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:" + err);
});

// cron.schedule('*/2 * * * *', async () => {
//     console.log('last schedule on ',new Date());
//         // console.log(mailer);
//       const mailer = new Mailer();
//       //mailer.sendCalenderEventMail();
//       mailer.sendFollowUpEmail();
//       mailer.sendScheduleVisitEmail();  
    
//   }, {
//     scheduled: true,
//     // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
//   });

//routes
const allRoutes = require('./routes/allRoutes');
const savefiles = require('./routes/saveFiles');

const attachments = require('./routes/attachments');
const Calendar = require('./routes/Calendar')



// Make Images "Uploads" Folder Publicly Available
/* app.use('/public', express.static('public')); */
app.use('/api', allRoutes);

app.use('/api', savefiles);
app.use('/api', attachments);
app.use('/api', Calendar);



app.get("/", (req, res) => {
    res.send("Invalid Endpoint.");
});


app.listen(port, () => {
    console.log("Server started on port:" + port);
});
