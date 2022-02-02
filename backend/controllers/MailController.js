let AddvisitsDetail = require('../schema/AddvisitsDetailSchema');
let ObjectDetail = require('../schema/ObjectdetailSchema');
let ShedulevisitsDetail = require('../schema/ShedulevisitsDetailSchema');
let CalenderEventsSchema = require('../schema/CalenderEventsSchema');
const nodemailer = require('nodemailer');
const pug = require('pug');
const { MongoClient, ObjectID } = require('mongodb');
const uri = "mongodb://localhost:27017/dashboard"; 
const client = new MongoClient(uri,
    { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});


// const ContactEmails = require('../constants/contactEmails');
// const logger = require('../core/logger');

class MailRepository {
    constructor(email, password) {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'noreply.meetinapp@gmail.com',
                pass: 'kduvsuzyzbdhpnwh',
            },
        });
    }

    async sendMailInfo(email, subject, html,cstmrID,cstmr) {
        var id = cstmrID,doc;
        console.log('MailRepository: Inside sendMail method',email, subject, html);
        const finalEmailData = {
            from: `<info@ogoul.com>`,
            to: email,
            subject,
            html
        }
        var updateObj = {mailSent: true};
        const info = await this.transporter.sendMail(finalEmailData);
        console.log("info is ",info)
            if(subject == 'Reminder For the Scheduled Sales Visit  OgoulCRM')
            await AddvisitsDetail.findByIdAndUpdate(id, updateObj, {
                new: true
              });
            if(subject == 'Reminder For the Sales Visit  OgoulCRM')
             await ShedulevisitsDetail.findByIdAndUpdate(id, updateObj, {
                new: true
              });
            if(subject == 'Reminder For Calender Event  OgoulCRM')
            {

                client.connect(err => {
                    const db =  client.db("dashboard");
                    const collection = db.collection("events");
                    cstmr.emailSent = true;
                    console.log("cstmr is ... ",cstmr)
                    collection.updateOne(
                        {
                          _id: cstmrID
                        },
                        {
                          $set: cstmr
                        })
                })
                
               
            }
            
            
            // console.log("I am infooo data", data)
        return info;
    }
   


    async sendFollowUpEmail() {
       
        const email2SendArr = await AddvisitsDetail.find({'mailSent': false});
        console.log('here email2SendArr',email2SendArr);
        let emailDataArr = [],emailData={};
        if(email2SendArr.length>0){

            for(let cstmr of email2SendArr){

                let customer = await ObjectDetail.findOne({ "object_id": cstmr.object_id });
                if(customer && cstmr)
                emailData = {
                    customerName:customer?.first_name,
                    email:customer?.email,
                    phone: customer?.phone,
                    company_name: customer?.company_name,
                    department:customer?.department,
                    address:customer?.mailing_address,
                    followUpDate:cstmr?.follow_up_date,
                    meetingNote: cstmr?.visits_note,
                }
                let sendMailRepo = new MailRepository();
                 sendMailRepo.sendMailInfo(
                     cstmr.created_by,
                      "Reminder For the Scheduled Sales Visit  OgoulCRM",
                  pug.renderFile(`${__dirname}/../core/emailTemplate.pug`, {
                    emailData,
                  }),cstmr._id);
                

            }
            








            // console.log(data[0].created_by)
            // let emailArray = data.map((item)=> { return item["created_by"]; });
            
            // // const customer = await CustomerDetailSchema.find({'email': data[0].created_by});
            // console.log("customer,",customer)
            // // let sendMailRepo = new MailRepository();
            // // console.log(sendMailRepo)
            // // if(sendMail)
            // let emailDataArr = [],emailData={};
            // if(customer && data)
            // for (let k of data){
            //      emailData = {
            //         customerName:customer?.first_name,
            //         email:customer?.email,
            //         phone: customer?.phone,
            //         company_name: customer?.company_name,
            //         department:customer?.department,
            //         address:customer?.mailing_address,
            //         followUpDate:k.follow_up_date,
            //         meetingNote: k.visits_note,
            //       };
            //     //   emailDataArr.push(emailData)
            // }
            
            

        }
        // console.log('data is',data);
    }

    async sendScheduleVisitEmail() {
       
        const email2SendArr = await ShedulevisitsDetail.find({'mailSent': false});
        console.log('here sendScheduleVisitEmail',email2SendArr);
        let emailDataArr = [],emailData={};
        if(email2SendArr.length>0){

            for(let cstmr of email2SendArr){
                console.log('cstmr',cstmr);
                let customer = await ObjectDetail.findOne({ "object_id": cstmr.object_id });
                if(customer && cstmr)
                emailData = {
                    customerName:customer?.first_name,
                    email:customer?.email,
                    phone: customer?.phone,
                    company_name: customer?.company_name,
                    department:customer?.department,
                    address:customer?.mailing_address,
                    date:cstmr?.date,
                    time:cstmr?.time,
                    // meetingNote: cstmr?.visits_note,
                }
                let sendMailRepo = new MailRepository();
                 sendMailRepo.sendMailInfo(cstmr.created_by, "Reminder For the Sales Visit  OgoulCRM",pug.renderFile(`${__dirname}/../core/scheduleVisitReminder.pug`, {
                    emailData,
                  }),cstmr);
                 

            }
            








            // console.log(data[0].created_by)
            // let emailArray = data.map((item)=> { return item["created_by"]; });
            
            // // const customer = await CustomerDetailSchema.find({'email': data[0].created_by});
            // console.log("customer,",customer)
            // // let sendMailRepo = new MailRepository();
            // // console.log(sendMailRepo)
            // // if(sendMail)
            // let emailDataArr = [],emailData={};
            // if(customer && data)
            // for (let k of data){
            //      emailData = {
            //         customerName:customer?.first_name,
            //         email:customer?.email,
            //         phone: customer?.phone,
            //         company_name: customer?.company_name,
            //         department:customer?.department,
            //         address:customer?.mailing_address,
            //         followUpDate:k.follow_up_date,
            //         meetingNote: k.visits_note,
            //       };
            //     //   emailDataArr.push(emailData)
            // }
            
            

        }
        // console.log('data is',data);
    }

    async sendCalenderEventMail() {
        
       
       client.connect(err => {
        const db =  client.db("dashboard");
        const collection = db.collection("events");
        let emailDataArr = [],emailData={};
        collection.find({'emailSent': false}).toArray(function(err, email2SendArr) {
            console.log("I am email2SendArr",email2SendArr);
            if(email2SendArr.length>0){

            for(let cstmr of email2SendArr){
                console.log('cstmr',cstmr,cstmr._id);
                // let customer = await ObjectDetail.findOne({ "object_id": cstmr.object_id });
                // if(customer && cstmr)
                emailData = {
                    email:cstmr?.emails,
                    startDate:cstmr?.start,
                    endDate:cstmr?.end,
                    agenda:cstmr?.agenda,
                    type:cstmr?.type,
                    title:cstmr?.title,
                    // meetingNote: cstmr?.visits_note,
                }
                let sendMailRepo = new MailRepository();
                 sendMailRepo.sendMailInfo(cstmr.emails, "Reminder For Calender Event  OgoulCRM",pug.renderFile(`${__dirname}/../core/calenderReminder.pug`, {
                    emailData,
                  }),cstmr._id,cstmr);
                 

            }
            }
            // res.send(items);
        });
        // console.log("filtered",await filtered);
        // const email2SendArr =  db.collection("events").find({'mailSent': false});
        // console.log('here sendScheduleVisitEmail',email2SendArr);
        })
       
        // if(email2SendArr.length>0){

        //     for(let cstmr of email2SendArr){
        //         console.log('cstmr',cstmr);
        //         let customer = await ObjectDetail.findOne({ "object_id": cstmr.object_id });
        //         if(customer && cstmr)
        //         emailData = {
        //             customerName:customer?.first_name,
        //             email:customer?.email,
        //             phone: customer?.phone,
        //             company_name: customer?.company_name,
        //             department:customer?.department,
        //             address:customer?.mailing_address,
        //             date:cstmr?.date,
        //             time:cstmr?.time,
        //             // meetingNote: cstmr?.visits_note,
        //         }
        //         let sendMailRepo = new MailRepository();
        //          sendMailRepo.sendMailInfo(cstmr.created_by, "Reminder For the Sales Visit  OgoulCRM",pug.renderFile(`${__dirname}/../core/scheduleVisitReminder.pug`, {
        //             emailData,
        //           }),cstmr);
                 

        //     }
        // }
    }
}

module.exports = MailRepository
