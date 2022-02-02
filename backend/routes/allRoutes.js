let express = require('express');
let router = express.Router();
multer = require('multer');
const bodyParser = require('body-parser')
const moment = require('moment');
const fs = require('fs');
const { MongoClient, ObjectID } = require('mongodb');
var jsonParse = bodyParser.json();
const sgMail = require('@sendgrid/mail')
let logger = require('../libs/Logger')
let constants = require('../config/constants')
let response = require('./Response');
let UserDetail = require('../schema/UserDetailSchema');
let ContactDetail = require('../schema/ContactDetailsSchema')
let LeadDetail = require('../schema/LeadsDetailSchema')
let ContactusDetail = require('../schema/ContactusDetailSchema')
let CampaignDetail = require('../schema/CampaignDetailsSchema')
let ActivityDetail = require('../schema/ActivityDetailSchema')
let ObjectDetail = require('../schema/ObjectdetailSchema');
let LoggingDetail = require('../schema/LoggingDetailSchema');
let ProductDetail = require('../schema/ProductDetailSchema');
let DealDetail = require('../schema/DealDetailsSchema');
let MarketingUserDetail = require('../schema/MarketingUserDetailSchema');
let QuoteDetail = require('../schema/QuoteDetailSchema');
let CaseDetail = require('../schema/CaseDetailSchema');
let CategoryDetail = require('../schema/CategoryDetailSchema');
let FaqDetail = require('../schema/FaqDetailSchema');
let PipelineDetail = require('../schema/PipelineDetailSchema');
let SalesStageDetail = require('../schema/SalesStageDetailSchema');
let LeadsourceDetail = require('../schema/LeadSourceDetailSchema');
let RequestdemoDetail = require('../schema/RequesteddemoDetailSchema');
let TicketDetail = require('../schema/TicketDetailSchema');
let FieldDetail = require('../schema/FieldDetailSchema');
let Landingpage = require('../schema/LandingpageSchema');
let SourceDetail = require('../schema/SourceDetailSchema');
let StatusDetail = require('../schema/StatusDetailSchema')
let DepartmentDetail = require('../schema/DepartmentDetailSchema');
let CampaigntypeDetail = require('../schema/CampaigntypeDetailSchema');
let ActiveDetails = require('../schema/ActiveDetailSchema');
let CampaignstatusDetail = require('../schema/CampaignstatusDetailSchema');
let AddvisitsDetail = require('../schema/AddvisitsDetailSchema');
let ShedulevisitsDetail = require('../schema/ShedulevisitsDetailSchema');
let ExpenseDetail = require('../schema/ExpenseDetailSchema');
let ExpenseItemDetail = require('../schema/ExpenseItemSchema');
let SuppliernameDetail = require('../schema/SuppliernameDetailSchema');
let SurveysDetail = require('../schema/SurveyDetailSchema');
let SalesstatusDetail = require('../schema/SalesstatusSchema');
let Serviceticketing = require('../schema/ServiceticketingSchema');
let CustomerNotes = require('../schema/CustomerNotesSchema');
let EscalationDetail = require('../schema/EscalationSchema')
let CurrencyDetail = require('../schema/CurrencyDetailSchema');
let PurchaseDetail = require('../schema/PurchaseDetailSchema');
let InvoiceDetails = require('../schema/InvoiceDetailSchema');
let StockDetail = require('../schema/StockDetailSchema');
let WarehouseDetail = require('../schema/WarehouseDetailSchema');
let ReturnDetail = require('../schema/ReturnDetailSchema');
let OgoulTicketDetail =require('../schema/Ogoulticketing');
let DesignationSchema =require('../schema/DesignationSchema');
let NoticetabDetail =require('../schema/NoticetabDetailsSchema');
let EmployeestatusDetail = require('../schema/EmployeestatusSchema');
let PlansDetail = require('../schema/PlansDetailSchema');
let PolicyDetail = require('../schema/PolicyDetailsSchema');
let jwt = require('jsonwebtoken');
let UserLogin = require('../schema/LoginDetailSchema');
let verifyToken = require('../controllers/controllers');
const csv = require('csvtojson');
let SECRET = "superSec";
// let sendMail = require('../controllers/sendMail');
// const uri = "mongodb://localhost:27017/ogoul_main_db";
// const uri = "mongodb://crm:crm!user@localhost:27017/test_ogoul_db"; 
const EJSON = require('mongodb-extended-json');
// const uri = "mongodb://noauthCRM:test123@localhost:27017/ogoul_main_db"; 
const uri = "mongodb://localhost:27017/ogoul_main_db"; 

const client = new MongoClient(uri,
    { useUnifiedTopology: true }, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1 });
let Mailer  = require('../controllers/MailController');
const pug = require('pug');
var mongoose = require('mongoose');
var cron = require('node-cron');
cron.schedule('*/2 * * * *', async () => {
    // console.log("running a task every 10 second",mongoose.connection.db);
    const mailer = new Mailer();
    mailer.sendScheduleVisitEmail();
    mailer.sendFollowUpEmail();
}, {
    scheduled: true,
});
router.post("/register", async function (req, res) {
    console.log("Enter: register");
    try {
        let userDetail = new UserDetail(req.body);
        userDetail.user_id = Date.now();
        let result = await userDetail.save();
        console.log("Success");
        response.success(req, res, "Success register", userDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllUserlogin", authenticateToken, async function (req, res) {
    console.log("Enter: getAllUserlogin");
    try {
        let result = await UserLogin.find();
        console.log("Success");
        response.success(req, res, "Success getAllUserlogin", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/login", async function (req, res) {
    //console.log("Enter: login");
    try {
        let result = await UserDetail.findOne({ 'email': req.body.email, 'password': req.body.password });
        //    console.log("Success", result);
        if (result) {
            var token = jwt.sign({
                user_id: result.user_id,
                email: result.email, usertype: result.usertype
            }, SECRET);

            let userLoginObj = {
                login_id: Date.now(),
                user_id: result.user_id,
                /*  username: result.username, */
                email: result.email,
                action: 'Login'
            }
            let userLogin = new UserLogin(userLoginObj);
            await userLogin.save();
            //      console.log("TOKEN ::::", token);
            response.success(req, res, "Success login", token);
        } else {
            res.json({ status: 404, message: "User not found, Please check password or register" })
        }

    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getUserFromEmail/:email", async function (req, res) {
    //console.log("Enter: getUserFromEmail.....");
    try {
        //  console.log(req.params);
        let result = await UserDetail.findOne({ 'email': req.params.email }, req.body);
        //console.log("Success", result);
        response.success(req, res, "Success getUserFromEmail", result);
    } catch (error) {
        //console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/logout", async function (req, res) {
    //console.log("Enter: logout");
    try {
        let userLoginObj = {
            login_id: Date.now(),
            user_id: req.body.user_id,
            /*  username: req.body.username, */
            email: req.body.email,
            action: 'Logout'
        }
        let userLogin = new UserLogin(userLoginObj);
        await userLogin.save();
        response.success(req, res, "Success logout", userLogin);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

/* router.post("/addUser", async function (req, res) {
    console.log("Enter: addUsers");
    try {
        console.log("BODY:", req.body);
        let r1 = await UserDetail.findOne({ "email": req.body.email });
        if (r1 != null) {
            throw new Error("User email already exists.");
        }
        let userDetail = new UserDetail(req.body);
        userDetail.user_id = Date.now()
        let result = await userDetail.save();
        console.log("Success");
        response.success(req, res, "Success addUser", userDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */
router.post("/addUser", authenticateToken, async function (req, res) {
    //console.log("Enter: addUser");
    try {
        //  console.log("BODY:", req.body);
        let r1 = await UserDetail.findOne({ "email": req.body.email });
        if (r1 != null) {
            throw new Error("User email already exists.");
        }
        let userDetail = new UserDetail(req.body);
        userDetail.user_id = Date.now();
        let result = await userDetail.save();
        //console.log("Success");

       // let msg = '<b>Hi User' + ' (' + req.body.email + ')' + '</b><br><br> New User is created in CRM app on your name. Please find the Login details:<br /><br />Email : ' + req.body.email + '<br />Password: ' + req.body.password + '<br /><br /><br /><br />Thanks,<br /> CRM Admin';
        //console.log(msg);
        sgMail.setApiKey('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');
        emailData = {
            first_name:userDetail.first_name,
            email:userDetail.email,
            password: userDetail.password,
            phone:userDetail.phone,
            usertype:userDetail.usertype,
        }
        
        const msg = {
          to: req.body.email, // Change to your recipient
          from: 'yoonus-pk@ogoul.com', // Change to your verified sender
          subject: 'Welcome to CRM',
          text: 'You are successfully registered to OgoulCRM',
          html: pug.renderFile(`${__dirname}/../core/userCreateTremplate.pug`, {
            emailData,
          }),
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
        response.success(req, res, "Success addUser", userDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


/* router.get("/getAllUsersOld",authenticateToken,async function (req, res) {
    console.log("Enter: getAllUsers");
    console.log("authenticateToken: ", authenticateToken);
    console.log("client: ", req.clientDetails);
    try {
        let result = await UserDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllUsers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

 */



router.get("/getAllUsersForAdmin/:moduleType", authenticateToken, async function (req, res) {
    /*  console.log("Enter: getAllUsersForAdmin");
     console.log("authenticateToken: ", authenticateToken);
     console.log("client: ", req.clientDetails); */
    
    try {
        // let objArr = [];
        
        let moduleType = req.params.moduleType;
        let searchableUserTypes = [];
       
        if (moduleType == "sales") {
            searchableUserTypes = ["Super Sales", "Super Manager", "Super Admin", "Sales Admin", "Sales Manager", "Sales User"];
        } else if (moduleType == "service") {
            searchableUserTypes = ["Service Admin", "Service Manager", "Service User", "Super Admin", "Super Manager", "Super Sales"];
        } else if (moduleType == "marketing") {
            searchableUserTypes = ["Marketing Admin", "Marketing Manager", "Marketing User", "Super Admin", "Super Manager", "Super Sales"];
        }
        else if (moduleType == "inventory") {
            searchableUserTypes = ["Inventory Admin", "Inventory Manager", "Inventory User", "Super Admin", "Super Manager", "Super Sales"];
        }
        else if (moduleType == "hrms") {	
            searchableUserTypes = ["Inventory Admin","Service Admin", "Sales Admin", "Sales Manager", "Sales User" ,"Service Manager", "Service User","Marketing Admin", "Marketing Manager", "Marketing User", "Inventory Manager", "Inventory User", "Super Admin", "Super Manager", "Super Sales","Hr Admin","Hr Manager","Hr User"];	
        }
        else if (moduleType == "ogoul") {
            searchableUserTypes = ["Ogoul User", "Super Ogoul Admin", "Super Ogoul Manager", "Super Ogoul Sales", "Super Ogoul Service"];
        }
        let result = await UserDetail.find({ "usertype": { $in: searchableUserTypes }});
        response.success(req, res, "Success getAllUsers", result);
    } 
    
    catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllUsers", authenticateToken, async function (req, res) {
    /* console.log("Enter: getAllUsers");
    console.log("authenticateToken: ", authenticateToken);
    console.log("client: ", req.clientDetails); */
    try {
        let searchableUserTypes = [];
        //based on usertype that has requested, find respective users
        // e.g. (1) if userType = Super Sales then search for userTYpes = {"Super Sales", ""}
        if (req.clientDetails.usertype == "Super Admin") {
            searchableUserTypes = ["Super Sales", "Super Manager", "Sales Admin", "Sales Manager", "Sales User", "Service Admin", "Super Admin", "Marketing Admin"];
        }

        else if (req.clientDetails.usertype == "Super Manager") {
            searchableUserTypes = ["Super Sales", "Super Manager", "Sales Admin", "Sales Manager", "Sales User", "Super Admin"];

        }
        else if (req.clientDetails.usertype == "Sales Admin") {
            searchableUserTypes = ["Sales Admin", "Sales Manager", "Sales User"];

        }

        else if (req.clientDetails.usertype == "Sales Manager") {
            searchableUserTypes = ["Sales Admin", "Sales Manager", "Sales User"];

        }
        else if (req.clientDetails.usertype == "Marketing Admin") {
            searchableUserTypes = ["Marketing Manager", "Marketing User", "Marketing Admin"];

        }
        else if (req.clientDetails.usertype == "Marketing Manager") {
            searchableUserTypes = ["Marketing Manager", "Marketing User", "Marketing Admin"];

        }



        else if (req.clientDetails.usertype == "Service Admin") {
            searchableUserTypes = ["Service Manager", "Service User", "Service Admin"];

        }


        else if (req.clientDetails.usertype == "Service Manager") {
            searchableUserTypes = ["Service Manager", "Service User", "Service Admin"];

        }

        else if (req.clientDetails.usertype == "Ogoul User") {
            searchableUserTypes = ["Ogoul User", "Super Ogoul Admin", "Super Ogoul Manager", " Super Ogoul Sales", "Super Ogoul Service"

            ];

        }


        else if (req.clientDetails.usertype == "Super Ogoul Manager") {
            searchableUserTypes = ["Ogoul User", "Super Ogoul Admin", "Super Ogoul Manager", "Super Ogoul Sales", "Super Ogoul Service"

            ];

        }

        else if (req.clientDetails.usertype == "Super Ogoul Admin") {
            searchableUserTypes = ["Ogoul User", "Super Ogoul Admin", "Super Ogoul Manager", "Super Ogoul Sales", "Super Ogoul Service"

            ];

        }



        else if (req.clientDetails.usertype == "Super Ogoul Sales") {
            searchableUserTypes = ["Ogoul User", "Super Ogoul Admin", "Super Ogoul Manager", "Super Ogoul Sales", "Super Ogoul Service"

            ];

        }

        else if (req.clientDetails.usertype == "Super Ogoul Service") {
            searchableUserTypes = ["Ogoul User", "Super Ogoul Admin", "Super Ogoul Manager", "Super Ogoul Sales", "Super Ogoul Service"

            ];

        }



        let result = await UserDetail.find({ "usertype": { $in: searchableUserTypes } });
        // console.log("Success");
        response.success(req, res, "Success getAllUsers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getUser/:id", authenticateToken, async function (req, res) {
    //  console.log("Enter: getUser");
    try {
        //    console.log(req.params);
        let result = await UserDetail.findOne({ 'user_id': req.params.id }, req.body);
        //  console.log("Success", result);
        response.success(req, res, "Success getCustomers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteUser", authenticateToken, async function (req, res) {
    try {
        let user_id = req.body.user_id;
        let result = await UserDetail.deleteOne({ 'user_id': user_id }, req.body);
        //console.log("Success");
        response.success(req, res, "Success deleteCustomers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateUser", authenticateToken, async function (req, res) {
    try {
        let user_id = req.body.user_id;
        let result = await UserDetail.updateOne({ 'user_id': user_id }, req.body);
        //console.log("Success");
        response.success(req, res, "Success updateCustomers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

//contactus


router.post("/addContactus", async function (req, res) {
    // console.log("Enter: addContactus");
    try {
        let contactusDetail = new ContactusDetail(req.body);
        contactusDetail.contact_us_id = Date.now()
        let result = await contactusDetail.save();
        //   console.log("Success");
        response.success(req, res, "Success addContactus", contactusDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllContactus", authenticateToken, async function (req, res) {
    //console.log("Enter: getAllContactus");
    try {
        let result = await ContactusDetail.find();
        //  console.log("Success");
        response.success(req, res, "Success getAllContactus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getContactus/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getContactus");
    try {
        console.log(req.params);
        let result = await ContactusDetail.findOne({ 'contact_us_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getContactus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteContactus", authenticateToken, async function (req, res) {
    try {
        let contact_us_id = req.body.contact_us_id;
        let result = await ContactusDetail.deleteOne({ 'contact_us_id': contact_us_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteContactus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateContactus", authenticateToken, async function (req, res) {
    try {
        let contact_us_id = req.body.contact_us_id;
        let result = await ContactusDetail.updateOne({ 'contact_us_id': contact_us_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateContactus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

//

router.post("/addDemodetails", async function (req, res) {
    console.log("Enter: addDemodetails");
    try {
        let adddemoDetail = new RequestdemoDetail(req.body);
        adddemoDetail.Requested_demo_id = Date.now()
        let result = await adddemoDetail.save();
        console.log("Success");
        response.success(req, res, "Success addDemodetails", adddemoDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllDemodetails", authenticateToken, async function (req, res) {
    console.log("Enter: getAllDemodetails");
    try {
        let result = await RequestdemoDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllDemodetails", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getDemodetails/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getDemodetails");
    try {
        console.log(req.params);
        let result = await RequestdemoDetail.findOne({ 'Requested_demo_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getDemodetails", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteDemodetails", authenticateToken, async function (req, res) {
    try {
        let Requested_demo_id = req.body.Requested_demo_id;
        let result = await RequestdemoDetail.deleteOne({ 'Requested_demo_id': Requested_demo_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteDemodetails", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateDemodetails", authenticateToken, async function (req, res) {
    try {
        let Requested_demo_id = req.body.Requested_demo_id;
        let result = await RequestdemoDetail.updateOne({ 'Requested_demo_id': Requested_demo_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateDemodetails", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



///markering user


router.post("/addMarketinguser", authenticateToken, async function (req, res) {
    console.log("Enter: addMarketinguser");
    try {
        console.log("BODY:", req.body);
        let r1 = await MarketingUserDetail.findOne({ "email": req.body.email });
        if (r1 != null) {
            throw new Error("User email already exists.");
        }
        let marketinguserDetail = new MarketingUserDetail(req.body);
        marketinguserDetail.marketing_user_id = Date.now()
        let result = await marketinguserDetail.save();
        console.log("Success");
        response.success(req, res, "Success addMarketinguser", marketinguserDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/addDeal", authenticateToken, async function (req, res) {
    console.log("Enter: addDeal");
    try {
        let dealDetail = new DealDetail(req.body);
        dealDetail.deal_id = Date.now()
        let result = await dealDetail.save();
        console.log("Success");
        response.success(req, res, "Success addDeal", dealDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addMultipleDeal", authenticateToken, async function (req, res) {
    console.log("Enter: addDealMultipleDeals");
    try {


        let json = req.body;
        let result = await DealDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success addDeal", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});






router.post("/addMultipleTicketing", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleTicketing");
    try {


        let json = req.body;
        let result = await Serviceticketing.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success Serviceticketing", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addMultipleProduct", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleProduct");
    try {


        let json = req.body;
        let result = await ProductDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success ProductDetail", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.post("/addMultipleSupplier", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleSupplier");
    try {


        let json = req.body;
        let result = await SuppliernameDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success SuppliernameDetail", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addMultipleFaq", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleFaq");
    try {


        let json = req.body;
        let result = await FaqDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success FaqDetail", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addMultipleCampiagn", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleCampiagn");
    try {


        let json = req.body;
        let result = await CampaignDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success Campiagn", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


/* router.get("/getAllDeals", async function (req, res) {
   console.log("Enter: getAllDeals");
   try {
       let result = await DealDetail.find();
       console.log("Success");
       response.success(req, res, "Success getAllDeals", result);
   } catch (error) {
       console.log("Failure:", error);
       response.serverError(req, res, error.message, error);
   }
});  */

/* router.get("/getDeals/:id", async function (req, res) {
    console.log("Enter: getDeals");
    try {
        console.log(req.params);
        let result = await DealDetail.findOne({ 'deal_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getDeals", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */


router.get("/getAllDeals", authenticateToken, async function (req, res) {
    console.log("Enter: getAllDeals");


    try {


        let dealResultArr = await DealDetail.find();
        let objArr = [];
        for (var k = 0; k < dealResultArr.length; k++) {
            /*    console.log("dealResultArr[k]::", dealResultArr[k].object_id); */
            let object_type = dealResultArr[k].object_type;

            let customerResultArr = await ObjectDetail.findOne({ "object_type": object_type });

            if (customerResultArr == null) continue;
            let obj = {
                "deal_id": dealResultArr[k].deal_id,
                "object_id": dealResultArr[k].object_id,
                "product_id": dealResultArr[k].product_id,
                "deal_name": dealResultArr[k].deal_name,

                "amount": dealResultArr[k].amount,
                "expected_close_date": dealResultArr[k].expected_close_date,
                "pipeline_name": dealResultArr[k].pipeline_name,
                "salesstage_name": dealResultArr[k].salesstage_name,
                "assigned_to": dealResultArr[k].assigned_to,
                "lead_source_name": dealResultArr[k].lead_source_name,
                "total_cost": dealResultArr[k].total_cost,
                "product_name": dealResultArr[k].product_name,
                "deal_close_date": dealResultArr[k].deal_close_date,
                "probobility": dealResultArr[k].probobility,
                "object_type": dealResultArr[k].object_type,

                "status": dealResultArr[k].status,
                "activity_type": dealResultArr[k].activity_type,
                "created_by": dealResultArr[k].created_by,
                "created_time": dealResultArr[k].created_time,
                "updated_by": dealResultArr[k].updated_by,
                "modified_time": dealResultArr[k].modified_time,
                "first_name": customerResultArr.first_name,
                "phone": customerResultArr.phone


            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllDeals", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getDeals/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getDeals");
    try {
        console.log(req.params);
        let dealResult = await DealDetail.findOne({ 'deal_id': req.params.id }, req.body);
        let customerResult = await ObjectDetail.findOne({ "object_type": dealResult["object_type"] });


        let obj = {
            "deal_id": dealResult.deal_id,
            "object_id": dealResult.object_id,
            "product_id": dealResult.product_id,
            "deal_name": dealResult.deal_name,

            "amount": dealResult.amount,
            "expected_close_date": dealResult.expected_close_date,
            "pipeline_name": dealResult.pipeline_name,
            "salesstage_name": dealResult.salesstage_name,
            "assigned_to": dealResult.assigned_to,
            "lead_source_name": dealResult.lead_source_name,
            "total_cost": dealResult.total_cost,
            "product_name": dealResult.product_name,
            "deal_close_date": dealResult.deal_close_date,
            "status": dealResult.status,
            "probobility": dealResult.probobility,
            "object_type": dealResult.object_type,
            "activity_type": dealResult.activity_type,
            "created_by": dealResult.created_by,
            "created_time": dealResult.created_time,
            "updated_by": dealResult.updated_by,
            "modified_time": dealResult.modified_time,
            "first_name": customerResult.first_name,
            "phone": customerResult.phone

        };

        console.log("Success", obj);
        response.success(req, res, "Success getDeals", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/deleteDeal", authenticateToken, async function (req, res) {
    try {
        let deal_id = req.body.deal_id;
        let result = await DealDetail.deleteOne({ 'deal_id': deal_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteDeal", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateDeal", authenticateToken, async function (req, res) {
    try {
        let deal_id = req.body.deal_id;
        let result = await DealDetail.updateOne({ 'deal_id': deal_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateDeal", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.put("/updateDeal/:id", authenticateToken, async function (req, res) {
    try {
        let deal_id = req.body.deal_id;
        delete deal_id;
        let result = await DealDetail.updateOne({ 'deal_id': deal_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateDeal", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



///end contact//////


function logStatement(loggedinUserId, actionTaken) {
    //save this to the model LoggingDetail
}

/////Leads start

router.post("/updateLead/:convertIt", authenticateToken, async function (req, res) {
    try {

        // 1 - get email id from token = EMAIL
        let dummyEmail = "admin@gmal.com";
        // 2 - logStatement(EMAIL, "updateLead");


        let convertIt = req.params.convertIt;
        console.log("convertit::::", convertIt);
        let leadDetail = new ObjectDetail(req.body);
        if (convertIt == "true") {
            leadDetail.object_type = constants.OBJECT_TYPES.CUSTOMER;
        }
        let result = await ObjectDetail.updateOne({ 'object_id': leadDetail.object_id }, leadDetail);
        console.log("Success");
        response.success(req, res, "Success updateCustomers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.post("/updateContact/:covertItLead", authenticateToken, async function (req, res) {
    try {



        let covertItLead = req.params.covertItLead;
        console.log("convertit::::", covertItLead);
        let contactDetail = new ObjectDetail(req.body);
        if (covertItLead == "true") {
            contactDetail.object_type = constants.OBJECT_TYPES.LEAD;
        }
        let result = await ObjectDetail.updateOne({ 'object_id': contactDetail.object_id }, contactDetail);
        console.log("Success");
        response.success(req, res, "Success updateContact", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




/* 
router.post("/addLeads", async function (req, res) {
    console.log("Enter: addLeads");
    try {
        let leadDetail = new LeadDetail(req.body);
        leadDetail.lead_id = Date.now()
        let result = await leadDetail.save();
        console.log("Success");
        response.success(req, res, "Success addLeads", leadDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllLeads", async function (req, res) {
    console.log("Enter: getAllLeads");
    try {
        let result = await LeadDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllLeads", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getLeads/:id", async function (req, res) {
    console.log("Enter: getLeads");
    try {
        console.log(req.params);
        let result = await LeadDetail.findOne({ 'lead_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getLeads", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteLeads", async function (req, res) {
    try {
        let lead_id = req.body.lead_id;
        let result = await LeadDetail.deleteOne({ 'lead_id': lead_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteLeads", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateLeads",async function (req, res) {
    try {
        let lead_id = req.body.lead_id;
        let result = await LeadDetail.updateOne({ 'lead_id': lead_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateLeads", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */
/////Lead end


/////customer start


router.post("/addCustomer", authenticateToken, async function (req, res) {
    console.log("Enter: addCustomer");

    try {
        console.log("BODY:", req.body);
        let r1 = await ObjectDetail.findOne({ "email": req.body.email });
        if (r1 != null) {
            throw new Error("Email already exists.");
        }
        let customerDetail = new ObjectDetail(req.body);
        customerDetail.object_id = Date.now()
        customerDetail.global_search = req.body.first_name
        let result = await customerDetail.save();
        console.log("Success");
        response.success(req, res, "Success addCustomer", customerDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addMultipleUser", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleUser");
    try {


        let json = req.body;
        let result = await UserDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success addMultipleUser", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addMultipleCustomer", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleCustomer");
    try {


        let json = req.body;
        let result = await ObjectDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success addMultipleCustomer", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/objgetAllCustomer", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCustomer");
    try {
        let result = await ObjectDetail.find({ "object_type": 3 });
        //console.log("Success");
        response.success(req, res, "Success getAllCustomer", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/objgetAllContacts", authenticateToken, async function (req, res) {
    console.log("Enter: objgetAllContacts");
    try {
        let result = await ObjectDetail.find({ "object_type": 1 });
        console.log("Success");
        response.success(req, res, "Success objgetAllContacts", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/objgetAllLeads", authenticateToken, async function (req, res) {
    console.log("Enter: objgetAllLeads");
    try {
        let result = await ObjectDetail.find({ "object_type": 2 });
        //console.log("Success");
        response.success(req, res, "Success objgetAllLeads", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getCustomer/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCustomer");
    try {
        console.log(req.params);
        let result = await ObjectDetail.findOne({ 'object_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCustomer", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteCustomer", authenticateToken, async function (req, res) {
    try {
        let object_id = req.body.object_id;
        let result = await ObjectDetail.deleteOne({ 'object_id': object_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCustomer", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCustomer", authenticateToken, async function (req, res) {
    try {
        let object_id = req.body.object_id;
        let result = await ObjectDetail.updateOne({ 'object_id': object_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCustomer", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});






/* 
router.post("/updateContact/:converttolead",authenticateToken,async function (req, res) {
    try {

        let converttolead = req.params.converttolead;
        console.log("converttolead::::", converttolead);
        let contactDetail = new ObjectDetail(req.body);
        if(converttolead == "true"){
            contactDetail.object_type = constants.OBJECT_TYPES.LEAD;
        }
        let result = await ObjectDetail.updateOne({ 'object_id': contactDetail.object_id }, contactDetail);
        console.log("Success");
        response.success(req, res, "Success updateCustomers ", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
 
 */

router.post("/updateContact/:convertItLead", authenticateToken, async function (req, res) {
    try {
        let convertItLead = req.params.convertItLead;
        let contactDetail = new ObjectDetail(req.body);
        if (convertItLead) {
            contactDetail.object_type = constants.OBJECT_TYPES.LEAD;
        }
        let result = await ObjectDetail.updateOne({ 'object_id': contactDetail.object_id }, contactDetail);
        console.log("Success");
        response.success(req, res, "Success updateContact", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/updateLead/:convertIt", authenticateToken, async function (req, res) {
    try {
        let convertIt = req.params.convertIt;
        let leadDetail = new ObjectDetail(req.body);
        if (convertIt) {
            leadDetail.object_type = constants.OBJECT_TYPES.CUSTOMER;
        }
        let result = await ObjectDetail.updateOne({ 'object_id': leadDetail.object_id }, leadDetail);
        console.log("Success");
        response.success(req, res, "Success updateCustomers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

//// Customer end
////product
/* router.post("/addProduct", async function (req, res) {
    console.log("Enter: addProduct");
    try {
        let productdetail = new ProductDetail(req.body);
        productdetail.product_id = Date.now();
        let result = await productdetail.save();
        console.log("Success");
        response.success(req, res, "Success addProduct", productdetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
*/




router.post("/addProduct", authenticateToken, async function (req, res) {
    console.log("Enter: addProduct");
    try {
        let productdetail = new ProductDetail(req.body);
        let checkProduct = await ProductDetail.findOne({ "product_name": productdetail.product_name });
        console.log("checkProduct:::", checkProduct);
        if (checkProduct == null) {
            productdetail.product_id = Date.now();
            productdetail.global_search = req.body.product_name;
            let result = await productdetail.save();
            console.log("Success");
            response.success(req, res, "Success addProduct", productdetail);
        } else {
            console.log("Product already exists.....");
            throw new Error("Product already exists.");

        }

    } catch (error) {
        console.log("Failure1:", error);
        console.log("Failure2:", error.message);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllProducts", authenticateToken, async function (req, res) {
    console.log("Enter: getAllProducts");
    try {
        let result = await ProductDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllProducts", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getProduct/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getProduct");
    try {
        console.log(req.params);
        let result = await ProductDetail.findOne({ 'product_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getProduct", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/deleteProduct", authenticateToken, async function (req, res) {
    try {
        let product_id = req.body.product_id;
        let result = await ProductDetail.deleteOne({ 'product_id': product_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteProduct", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateProduct", authenticateToken, async function (req, res) {
    try {
        let product_id = req.body.product_id;
        let result = await ProductDetail.updateOne({ 'product_id': product_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateProduct", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getTotalProducts", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalProducts");
    try {
        console.log(req.params);
        let result = await ProductDetail.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalProducts", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/updateCategory", authenticateToken, async function (req, res) {
    try {

        console.log("BODY:", req.body);
        let r1 = await CategoryDetail.findOne({ "category_name": req.body.category_name });
        if (r1 != null) {
            throw new Error("Category Name  already exists.");
        }
        let category_id = req.body.category_id;
        let result = await CategoryDetail.updateOne({ 'category_id': category_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addCategory", authenticateToken, async function (req, res) {
    console.log("Enter: addCategory");
    try {
        console.log("BODY:", req.body);
        let r1 = await CategoryDetail.findOne({ "category_name": req.body.category_name });
        if (r1 != null) {
            throw new Error("Category Name  already exists.");
        }
        let categorydetail = new CategoryDetail(req.body);
        categorydetail.category_id = Date.now();
        let result = await categorydetail.save();
        console.log("Success");
        response.success(req, res, "Success addCategory", categorydetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getAllCategory", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCategory");
    try {
        let result = await CategoryDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getCategory/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCategory");
    try {
        console.log(req.params);
        let result = await CategoryDetail.findOne({ 'category_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deleteCategory", authenticateToken, async function (req, res) {
    try {
        let category_id = req.body.category_id;
        let result = await CategoryDetail.deleteOne({ 'category_id': category_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCategory", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

////////Campaign start 

/////pipeline


router.post("/updatePipeline", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await PipelineDetail.findOne({ "pipeline_name": req.body.pipeline_name });
        if (r1 != null) {
            throw new Error("Pipeline Name already exists.");
        }
        let pipeline_id = req.body.pipeline_id;
        let result = await PipelineDetail.updateOne({ 'pipeline_id': pipeline_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updatePipeline", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addPipeline", authenticateToken, async function (req, res) {
    console.log("Enter: addPipeline");
    try {

        console.log("BODY:", req.body);
        let r1 = await PipelineDetail.findOne({ "pipeline_name": req.body.pipeline_name });
        if (r1 != null) {
            throw new Error("Pipeline Name already exists.");
        }
        let pipelinedetail = new PipelineDetail(req.body);
        pipelinedetail.pipeline_id = Date.now();
        let result = await pipelinedetail.save();
        console.log("Success");
        response.success(req, res, "Success addPipeline", pipelinedetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllPipeline", authenticateToken, async function (req, res) {
    console.log("Enter: getAllPipeline");
    try {
        let result = await PipelineDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllPipeline", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getPipeline/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getPipeline");
    try {
        console.log(req.params);
        let result = await PipelineDetail.findOne({ 'pipeline_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getPipeline", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deletePipeline", authenticateToken, async function (req, res) {
    try {
        let pipeline_id = req.body.pipeline_id;
        let result = await PipelineDetail.deleteOne({ 'pipeline_id': pipeline_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deletePipeline", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addCampaign", authenticateToken, async function (req, res) {
    try {
        let campaignDetail = new CampaignDetail(req.body);
        campaignDetail.campaign_id = Date.now();
        campaignDetail.global_search = req.body.campaign_name;
        let result = await campaignDetail.save();
        console.log("Success");
        response.success(req, res, "Success addCampaign", campaignDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllCampaign", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCampaign");
    try {
        let result = await CampaignDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllCampaign", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getCampaign/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCampaign");
    try {
        console.log(req.params);
        let result = await CampaignDetail.findOne({ 'campaign_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCampaign", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteCampaign", authenticateToken, async function (req, res) {
    try {
        let campaign_id = req.body.campaign_id;
        let result = await CampaignDetail.deleteOne({ 'campaign_id': campaign_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCampaign", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCampaign", authenticateToken, async function (req, res) {
    try {
        let campaign_id = req.body.campaign_id;
        let result = await CampaignDetail.updateOne({ 'campaign_id': campaign_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCampaign", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



////////Campaign end


//quotes
router.post("/updateQuote", authenticateToken, async function (req, res) {
    try {
        let quote_id = req.body.quote_id;
        let result = await QuoteDetail.updateOne({ 'quote_id': quote_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateQuote", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/deleteQuote", authenticateToken, async function (req, res) {
    try {
        let quote_id = req.body.quote_id;
        let result = await QuoteDetail.deleteOne({ 'quote_id': quote_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteQuote", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


/* 
router.get("/getQuote/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getQuote");
    try {
        console.log(req.params);
        let result = await QuoteDetail.findOne({ 'quote_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getQuote", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
  */



router.get("/getQuote/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getQuote");
    try {
        console.log(req.params);
        let quotesResult = await QuoteDetail.findOne({ 'quote_id': req.params.id }, req.body);

        let customerResult = await ObjectDetail.findOne({ "object_id": quotesResult["object_id"] });

        let obj = {
            "quote_id": quotesResult.quote_id,
            "object_id": quotesResult.object_id,
            "created_by": quotesResult.created_by,
            "created_time": quotesResult.created_time,
            "updated_by": quotesResult.updated_by,
            "modified_time": quotesResult.modified_time,
            "quotation_date": quotesResult.quotation_date,
            "total_cost": quotesResult.total_cost,
            "product_name": quotesResult.product_name,
            "first_name": customerResult.first_name,
            "phone": customerResult.phone
        };
        console.log("Success", obj);
        response.success(req, res, "Success getQuote", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

/* 
router.get("/getAllQuotes", authenticateToken,async function (req, res) {
    console.log("Enter: getAllQuotes");
    try {
        let result = await QuoteDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllQuotes", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});  */
router.get("/getAllQuotes", authenticateToken, async function (req, res) {
    console.log("Enter: getAllQuotes");
    try {


        let quoteDetailsArr = await QuoteDetail.find();
        let objArr = [];
        for (var k = 0; k < quoteDetailsArr.length; k++) {
            console.log("QuoteDetailArr[k]::", quoteDetailsArr[k].object_id);
            let object_id = quoteDetailsArr[k].object_id;
            let vendor = await ObjectDetail.findOne({ "object_id": object_id });
            if (vendor == null) continue;
            let obj = {
                "quote_id": quoteDetailsArr[k].quote_id,
                "object_id": quoteDetailsArr[k].object_id,
                "quotation_date": quoteDetailsArr[k].quotation_date,
                "total_cost": quoteDetailsArr[k].total_cost,
                "product_name": quoteDetailsArr[k].product_name,
                "created_time": quoteDetailsArr[k].created_time,
                "first_name": vendor.first_name,
                "phone": vendor.phone


            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllQuotes", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

/* router.get("/getAllQuotes", authenticateToken,async function (req, res) {
    console.log("Enter: getAllQuotes");
    try {


        let quoteDetailsArr = await QuoteDetail.find();
        let objArr = [];
        for (var k = 0; k < quoteDetailsArr.length; k++) {
         
            let object_id = quoteDetailsArr[k].object_id;
            let vendor = await CustomerDetail.findOne({ "object_id": object_id });
            if (vendor == null) continue;
            let obj = {
                "quote_id": quoteDetailsArr[k].quote_id,
                "object_id": quoteDetailsArr[k].object_id,
                "quotation_date": quoteDetailsArr[k].quotation_date,
                "total_cost": quoteDetailsArr[k].total_cost,
                "product_name": quoteDetailsArr[k].product_name,
                "first_name": vendor.first_name,
                "phone": vendor.phone 
            
            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllQuotes", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */

router.post("/addQuote", authenticateToken, async function (req, res) {
    console.log("Enter: addQuote");
    try {
        let quoteDetail = new QuoteDetail(req.body);
        quoteDetail.quote_id = Date.now();
        let result = await quoteDetail.save();
        console.log("Success");
        response.success(req, res, "Success addQuote", quoteDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addMultipleQuotes", authenticateToken, async function (req, res) {
    console.log("Enter: addDealMultipleDeals");
    try {


        let json = req.body;
        let result = await QuoteDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success addDeal", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


////activity

router.post("/addActivity", authenticateToken, async function (req, res) {
    console.log("Enter: addActivity");
    try {
        let activityDetail = new ActivityDetail(req.body);
        activityDetail.activity_id = Date.now()
        let result = await activityDetail.save();
        console.log("Success");
        response.success(req, res, "Success addActivity", activityDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllActivity", authenticateToken, async function (req, res) {
    console.log("Enter: getAllActivity");
    try {
        let result = await ActivityDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllActivity", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getObjectActivities/:activity_type", authenticateToken, async function (req, res) {
    console.log("Enter: getObjectActivities");
    try {
        let activity_type = req.params.activity_type;
        console.log("TYPE :", activity_type);
        let result = await ActivityDetail.find({ 'activity_type': activity_type });
        console.log("Success");
        response.success(req, res, "Success getObjectActivities", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getSpecificObjectActivities/:object_id", authenticateToken, async function (req, res) {
    console.log("Enter: getSpecificObjectActivities");
    try {
        let object_id = req.params.object_id;
        console.log("ID :", object_id);
        let result = await ActivityDetail.find({ 'object_id': object_id });
        console.log("Success");
        response.success(req, res, "Success getSpecificObjectActivities", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getSpecificActivities/:campaign_id", authenticateToken, async function (req, res) {
    console.log("Enter: getSpecificActivities");
    try {
        let campaign_id = req.params.campaign_id;
        console.log("ID :", campaign_id);
        let result = await ActivityDetail.find({ 'campaign_id': campaign_id });
        console.log("Success");
        response.success(req, res, "Success getSpecificActivities", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



/* 
 

router.get("/getAllActivity_original", async function (req, res) {
    console.log("Enter: getAllActivity");
    try {


        let activityDetailArr = await ActivityDetail.find();
        console.log("activityDetail:::", activityDetailArr);
        let objArr = [];
        for (var k = 0; k < activityDetailArr.length; k++) {
            console.log("activityDetail[k]::", activityDetailArr[k]);
            let lead_id = activityDetailArr[k].lead_id;
            let lead = await LeadDetail.findOne({ "lead_id": lead_id });
            if (lead == null) continue;
            let obj = {
                "activity_id": activityDetailArr[k].activity_id,
                "lead_id": activityDetailArr[k].lead_id,
                "task_name": activityDetailArr[k].task_name,
                "status": activityDetailArr[k].status,
                "due_date": activityDetailArr[k].due_date,
                "subject":activityDetailArr[k].subject,

              "first_name": lead.first_name,
                "phone": lead.phone,
                "email":lead.email 


            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllActivity", objArr);
    }
     catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 
 */









router.get("/getActivity/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getActivity");
    try {
        console.log(req.params);
        let activityResult = await ActivityDetail.findOne({ 'activity_id': req.params.id }, req.body);
        /*   console.log("Success", result);
          response.success(req, res, "Success getQuote", result); */
        let objectResult = await ObjectDetail.findOne({ "object_id": activityResult["object_id"] });




        let obj = {
            "activity_id": activityResult.activity_id,
            "activity_type": activityResult.activity_type,
            "selectedActivityType": activityResult.selectedActivityType,
            "record_type": activityResult.record_type,
            "object_id": activityResult.object_id,

            "task_name": activityResult.task_name,
            "status": activityResult.status,
            "due_date": activityResult.due_date,
            "subject": activityResult.subject,
            "comments": activityResult.comments,
            "created_by": activityResult.created_by,
            "created_time": activityResult.created_time,
            "updated_by": activityResult.updated_by,
            "modified_time": activityResult.modified_time,
            "first_name": objectResult.first_name,
            "phone": objectResult.phone,
            "email": objectResult.email,

        };
        console.log("Success", obj);
        response.success(req, res, "Success getActivity", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




/* router.get("/getAllActivity", async function (req, res) {
    console.log("Enter: getAllActivity");
    try {
        let activityDetailArr = await ActivityDetail.find();
        console.log("activityDetailArr:::", activityDetailArr);
        let objArr = [];
        for (var k = 0; k < activityDetailArr.length; k++) {
            console.log("activityDetail[k]::", activityDetailArr[k]);
            let parent_id = activityDetailArr[k].parent_id;
            let activity_type = activityDetailArr[k].activity_type;
            let obj = null;

          
          
             if(activity_type == 2){
                let contact = await ObjectDetail.findOne({ "object_id": parent_id });
            
                if (contact == null) continue;
                 obj = {
                    "activity_id": activityDetailArr[k].activity_id,
                    "record_type":activityDetailArr[k].record_type,
                    "parent_id": activityDetailArr[k].parent_id,
                    "task_name": activityDetailArr[k].task_name,
                    "status": activityDetailArr[k].status,
                    "due_date": activityDetailArr[k].due_date,
                    "subject":activityDetailArr[k].subject,    
                    "first_name": contact.first_name,
                    "phone": contact.phone,
                    "email":contact.email 
                };
            } 
            
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllActivity", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});  */




router.get("/getAllActivitiesOfParent/:object_id", authenticateToken, async function (req, res) {
    console.log("Enter: getAllActivitiesOfParent");
    try {
        console.log(req.params);
        let result = await ActivityDetail.findOne({ 'object_id': req.params.id }, req.body);;

        console.log("Success", result);
        response.success(req, res, "Success getAllActivitiesOfParent", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
/* 

router.get("/getActivity/:id", async function (req, res) {
    console.log("Enter: getActivity");
    try {
        console.log(req.params);
        let result = await ActivityDetail.findOne({ 'activity_id': req.params.id }, req.body);
        console.log("Success", result);
        let objArr = [];
        response.success(req, res, "Success getActivity", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */


/* router.get("/getActivity/:id", async function (req, res) {
    console.log("Enter: getActivity");
    try {
        console.log(req.params);
        let result = await ActivityDetail.findOne({ 'activity_id': req.params.id }, req.body);
        console.log("Success", result);
        let objArr = [];
        response.success(req, res, "Success getActivity", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}) */

///shree

/* router.get("/getActivity/:id", async function (req, res) {
    console.log("Enter: getActivity");
    try {
       console.log(req.params);
       let activityDetail = await ActivityDetail.findOne({ 'activity_id': req.params.id }, req.body);
     console.log("activityDetail:::", activityDetail);
     let objArr = null;
     let parent_id = activityDetail.parent_id;
         let activity_type = activityDetail.activity_type;
         
         if(activity_type == 3){
           let lead = await ObjectDetail.findOne({ "object_id": activityDetail.activity_id });
             if (lead != null)
             {
              objArr = {
                  "activity_id": activityDetail.activity_id,
                  "record_type":activityDetail.record_type,
                  "parent_id": activityDetail.parent_id,
                  "task_name": activityDetail.task_name,
                  "status": activityDetail.status,
                  "due_date": activityDetail.due_date,
                  "subject":activityDetail.subject,    
                  "first_name":lead.first_name,
                  "phone": lead.phone,
                   "email":lead.email 
                };
            } 
           }
            
              //contac
               else  if(activity_type == 2){
                   let contact = await ObjectDetail.findOne({ "object_id": activityDetail.activity_id });
               console.log("contact::", contact);
               if (contact != null)
               {
               objArr = {
                   "activity_id": activityDetail.activity_id,
                  "record_type":activityDetail.record_type,
                  "parent_id": activityDetail.parent_id,
                  "task_name": activityDetail.task_name,
                   "status": activityDetail.status,
                   "due_date": activityDetail.due_date,
                    "subject":activityDetail.subject,    
                  "first_name": contact.first_name,
                  "phone": contact.phone,
                   "email":contact.email 
               };
           } 
    
       }
       
       response.success(req, res, "Success getActivity", activityDetail);
   } 
        catch (error) {
      console.log("Failure:", error);
      response.serverError(req, res, error.message, error);
  }
});  */



/* router.get("/getActivity/:id", async function (req, res) {
    console.log("Enter: getActivity");
    try {
        console.log(req.params);
        let activityDetail = await ActivityDetail.findOne({ 'activity_id': req.params.id }, req.body);
        console.log("activityDetail:::", activityDetail);
        let objArr = [];
        let obj = null;
        if (activityDetail.activity_type == 3) {
            let lead = await LeadDetail.findOne({ "lead_id": activityDetail.activity_id });
            if (lead != null) {
                objArr = {
                "activity_id": activityDetail.activity_id,
                "record_type": activityDetail.record_type,
                "parent_id": activityDetail.parent_id,
                "task_name": activityDetail.task_name,
                "status": activityDetail.status,
                "due_date": activityDetail.due_date,
                "subject": activityDetail.subject,
                "first_name": lead.first_name,
                "phone": lead.phone,
                "email": lead.email
            }
        }
        }
    
        else if (activityDetail.activity_type == 2) {
            let contact = await ContactDetail.findOne({ "contact_id": activityDetail.activity_id });
        
            if (contact != null) {
            objArr = {
                "activity_id": activityDetail.activity_id,
                "record_type": activityDetail.record_type,
                "parent_id": activityDetail.parent_id,
                "task_name": activityDetail.task_name,
                "status": activityDetail.status,
                "due_date": activityDetail.due_date,
                "subject": activityDetail.subject,
                "first_name": contact.first_name,
                "phone": contact.phone,
                "email": contact.email
            }
        }
        
        }
        response.success(req, res, "Success getActivity", objArr);
    }    catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


manish sir

 */


router.post("/deleteActivity", authenticateToken, async function (req, res) {
    try {
        let activity_id = req.body.activity_id;
        let result = await ActivityDetail.deleteOne({ 'activity_id': activity_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteActivity", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateActivity", authenticateToken, async function (req, res) {
    try {
        let activity_id = req.body.activity_id;
        let result = await ActivityDetail.updateOne({ 'activity_id': activity_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateActivity", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

////cases




router.post("/addCases", authenticateToken, async function (req, res) {
    console.log("Enter: addCases");
    try {
        let caseDetail = new CaseDetail(req.body);
        caseDetail.case_id = Date.now()
        let result = await caseDetail.save();
        console.log("Success");
        response.success(req, res, "Success addCases", caseDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllCases", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCases");
    try {
        let result = await CaseDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllCases", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

/* router.get("/getCases/:id",authenticateToken, async function (req, res) {
    console.log("Enter: getCases");
    try {
        console.log(req.params);
        let result = await CaseDetail.findOne({ 'case_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCases", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */
router.get("/getCases/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCases");

    try {
        console.log(req.params);
        let caseResult = await CaseDetail.findOne({ 'case_id': req.params.id }, req.body);

        let customerResult = await ObjectDetail.findOne({ "object_id": caseResult["object_id"] });

        let obj = {
            "case_id": caseResult.case_id,
            "object_id": caseResult.object_id,
            "case_name": caseResult.case_name,
            "priority": caseResult.priority,
            "created_by": caseResult.created_by,
            "created_time": caseResult.created_time,
            "updated_by": caseResult.updated_by,
            "modified_time": caseResult.modified_time,
            "description": caseResult.description,
            "first_name": customerResult.first_name,
            "phone": customerResult.phone,
            "email": customerResult.email
        };
        console.log("Success", obj);
        response.success(req, res, "Success getCases", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteCases", authenticateToken, async function (req, res) {
    try {
        let case_id = req.body.case_id;
        let result = await CaseDetail.deleteOne({ 'case_id': case_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCases", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCases", authenticateToken, async function (req, res) {
    try {
        let case_id = req.body.case_id;
        let result = await CaseDetail.updateOne({ 'case_id': case_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCases", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
////salesstage


router.post("/addSalesstage", authenticateToken, async function (req, res) {
    console.log("Enter: addSalesstage");
    try {

        console.log("BODY:", req.body);
        let r1 = await SalesStageDetail.findOne({ "salesstage_name": req.body.salesstage_name });
        if (r1 != null) {
            throw new Error("Sales Stage Name already exists.");
        }
        let salesstageDetail = new SalesStageDetail(req.body);
        salesstageDetail.salesstage_id = Date.now()
        let result = await salesstageDetail.save();
        console.log("Success");
        response.success(req, res, "Success addSalesstage", salesstageDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllSalesstage", authenticateToken, async function (req, res) {
    console.log("Enter: getAllSalesstage");
    try {
        let result = await SalesStageDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllSalesstage", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getSalesstage/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getSalesstage");
    try {
        console.log(req.params);
        let result = await SalesStageDetail.findOne({ 'salesstage_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getFaqs", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteSalesstage", authenticateToken, async function (req, res) {
    try {
        let salesstage_id = req.body.salesstage_id;
        let result = await SalesStageDetail.deleteOne({ 'salesstage_id': salesstage_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteSalesstage", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateSalesstage", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await SalesStageDetail.findOne({ "salesstage_name": req.body.salesstage_name });
        if (r1 != null) {
            throw new Error("Sales Stage Name already exists.");
        }
        let salesstage_id = req.body.salesstage_id;
        let result = await SalesStageDetail.updateOne({ 'salesstage_id': salesstage_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateSalesstage", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

///leadsource


router.post("/addLeadsource", authenticateToken, async function (req, res) {
    console.log("Enter: addLeadsource");
    try {
        console.log("BODY:", req.body);
        let r1 = await LeadsourceDetail.findOne({ "lead_source_name": req.body.lead_source_name });
        if (r1 != null) {
            throw new Error("Lead Source Name already exists.");
        }
        let leadsourceDetail = new LeadsourceDetail(req.body);
        leadsourceDetail.lead_source_id = Date.now();
        leadsourceDetail.global_search = req.body.first_name
        let result = await leadsourceDetail.save();
        console.log("Success");
        response.success(req, res, "Success addLeadsource", leadsourceDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllLeadsource", authenticateToken, async function (req, res) {
    console.log("Enter: getAllLeadsource");
    try {
        let result = await LeadsourceDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllLeadsource", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getLeadsource/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getLeadsource");
    try {
        console.log(req.params);
        let result = await LeadsourceDetail.findOne({ 'lead_source_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getFaqs", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteLeadsource", authenticateToken, async function (req, res) {
    try {
        let lead_source_id = req.body.lead_source_id;
        let result = await LeadsourceDetail.deleteOne({ 'lead_source_id': lead_source_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteLeadsource", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateLeadsource", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await LeadsourceDetail.findOne({ "lead_source_name": req.body.lead_source_name });
        if (r1 != null) {
            throw new Error("Lead Source Name already exists.");
        }
        let lead_source_id = req.body.lead_source_id;
        let result = await LeadsourceDetail.updateOne({ 'lead_source_id': lead_source_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateLeadsource", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





///Faqs




router.post("/addFaqs", authenticateToken, async function (req, res) {

    try {
        let faqsDetail = new FaqDetail(req.body);

        faqsDetail.faq_id = Date.now()

        faqsDetail.global_search = req.body.questions;
        //     faqsDetail.created_by_user = req.clientDetails.user_id;
        //     faqsDetail.modified_by_user =req.clientDetails.user_id;
        //     faqsDetail.created_time = moment().format('DD/MM/YYYY') + ',' + moment().format('hh:mm:ss')
        // faqsDetail.modified_by_time =moment().format('DD/MM/YYYY') + ',' + moment().format('hh:mm:ss')

        let result = await faqsDetail.save();
        console.log("Success");
        response.success(req, res, "Success addFaqs", faqsDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllFaqs", authenticateToken, async function (req, res) {
    console.log("Enter: getAllFaqs");
    try {
        let result = await FaqDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllFaqs", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getFaqs/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getFaqs");
    try {
        console.log(req.params);
        let result = await FaqDetail.findOne({ 'faq_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getFaqs", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteFaqs", authenticateToken, async function (req, res) {
    try {
        let faq_id = req.body.faq_id;
        let result = await FaqDetail.deleteOne({ 'faq_id': faq_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteFaqs", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateFaqs", authenticateToken, async function (req, res) {
    try {
        let faq_id = req.body.faq_id;
        let result = await FaqDetail.updateOne({ 'faq_id': faq_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateFaqs", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/searchQuestions/:string",async function (req, res) {
    try {
        
        let result = await FaqDetail.find({ 'questions': { $regex: new RegExp(req.params.string, "i")} });
        
        response.success(req, res, "Success ", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


/**-- dynamic configurations-- */





router.post("/addDepartment", authenticateToken, async function (req, res) {
    console.log("Enter: addDepartment");
    try {
        console.log("BODY:", req.body);
        let r1 = await DepartmentDetail.findOne({ "department_name": req.body.department_name });
        if (r1 != null) {
            throw new Error("Department Name already exists.");
        }
        let departmentDetail = new DepartmentDetail(req.body);

        departmentDetail.department_id = Date.now()

        let result = await departmentDetail.save();
        console.log("Success");
        response.success(req, res, "Success addDepartment", departmentDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllDepartment", authenticateToken, async function (req, res) {
    console.log("Enter: getAllDepartment");
    try {
        let result = await DepartmentDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllDepartment", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getDepartment/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getDepartment");
    try {
        console.log(req.params);
        let result = await DepartmentDetail.findOne({ 'department_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getDepartment", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteDepartment", authenticateToken, async function (req, res) {
    try {
        let department_id = req.body.department_id;
        let result = await DepartmentDetail.deleteOne({ 'department_id': department_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteDepartment", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateDepartment", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await DepartmentDetail.findOne({ "department_name": req.body.department_name });
        if (r1 != null) {
            throw new Error("Department Name already exists.");
        }
        let department_id = req.body.department_id;
        let result = await DepartmentDetail.updateOne({ 'department_id': department_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateDepartment", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addSource", authenticateToken, async function (req, res) {
    console.log("Enter: addSource");
    try {
        console.log("BODY:", req.body);
        let r1 = await SourceDetail.findOne({ "source_name": req.body.source_name });
        if (r1 != null) {
            throw new Error("Source Name already exists.");
        }
        let sourceDetail = new SourceDetail(req.body);

        sourceDetail.source_id = Date.now()

        let result = await sourceDetail.save();
        console.log("Success");
        response.success(req, res, "Success addSource", sourceDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllSource", authenticateToken, async function (req, res) {
    console.log("Enter: getAllSource");
    try {
        let result = await SourceDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllSource", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getSource/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getSource");
    try {
        console.log(req.params);
        let result = await SourceDetail.findOne({ 'source_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getSource", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteSource", authenticateToken, async function (req, res) {
    try {
        let source_id = req.body.source_id;
        let result = await SourceDetail.deleteOne({ 'source_id': source_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteSource", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateSource", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await SourceDetail.findOne({ "source_name": req.body.source_name });
        if (r1 != null) {
            throw new Error("Source Name already exists.");
        }
        let source_id = req.body.source_id;
        let result = await SourceDetail.updateOne({ 'source_id': source_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateSource", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.post("/addCampaigntype", authenticateToken, async function (req, res) {
    console.log("Enter: addCampaigntype");

    try {
        console.log("BODY:", req.body);
        let r1 = await CampaigntypeDetail.findOne({ "campaign_type_name": req.body.campaign_type_name });
        if (r1 != null) {
            throw new Error("Campaign Type Name already exists.");
        }
        let campaigntypeDetail = new CampaigntypeDetail(req.body);

        campaigntypeDetail.campaign_type_id = Date.now()

        let result = await campaigntypeDetail.save();
        console.log("Success");
        response.success(req, res, "Success addCampaigntype", campaigntypeDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllCampaigntype", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCampaigntype");
    try {
        let result = await CampaigntypeDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllCampaigntype", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getCampaigntype/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCampaigntype");
    try {
        console.log(req.params);
        let result = await CampaigntypeDetail.findOne({ 'campaign_type_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCampaigntype", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteCampaigntype", authenticateToken, async function (req, res) {
    try {
        let campaign_type_id = req.body.campaign_type_id;
        let result = await CampaigntypeDetail.deleteOne({ 'campaign_type_id': campaign_type_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCampaigntype", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCampaigntype", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await CampaigntypeDetail.findOne({ "campaign_type_name": req.body.campaign_type_name });
        if (r1 != null) {
            throw new Error("Campaign Type Name already exists.");
        }
        let campaign_type_id = req.body.campaign_type_id;
        let result = await CampaigntypeDetail.updateOne({ 'campaign_type_id': campaign_type_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCampaigntype", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});














router.post("/addCampaignactive", authenticateToken, async function (req, res) {
    console.log("Enter: addCampaignactive");
    try {
        console.log("BODY:", req.body);
        let r1 = await ActiveDetails.findOne({ "active": req.body.active });
        if (r1 != null) {
            throw new Error("Active already exists.");
        }
        let activeDetail = new ActiveDetails(req.body);

        activeDetail.active_id = Date.now()

        let result = await activeDetail.save();
        console.log("Success");
        response.success(req, res, "Success addCampaignactive", activeDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllCampaignactive", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCampaignactive");
    try {
        let result = await ActiveDetails.find();
        console.log("Success");
        response.success(req, res, "Success getAllCampaignactive", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getCampaignactive/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCampaignactive");
    try {
        console.log(req.params);
        let result = await ActiveDetails.findOne({ 'active_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCampaignactive", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteCampaignactive", authenticateToken, async function (req, res) {
    try {
        let active_id = req.body.active_id;
        let result = await ActiveDetails.deleteOne({ 'active_id': active_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCampaignactive", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCampaignactive", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await ActiveDetails.findOne({ "active": req.body.active });
        if (r1 != null) {
            throw new Error("Active already exists.");
        }
        let active_id = req.body.active_id;
        let result = await ActiveDetails.updateOne({ 'active_id': active_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCampaignactive", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});







router.post("/addCampaignstatus", authenticateToken, async function (req, res) {
    console.log("Enter: addCampaignstatus");
    try {
        let campaignstatusDetail = new CampaignstatusDetail(req.body);

        campaignstatusDetail.campaign_status_id = Date.now()

        let result = await campaignstatusDetail.save();
        console.log("Success");
        response.success(req, res, "Success addCampaignstatus", campaignstatusDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllCampaignstatus", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCampaignstatus");
    try {
        let result = await CampaignstatusDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllCampaignstatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getCampaignstatus/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCampaignstatus");
    try {
        console.log(req.params);
        let result = await CampaignstatusDetail.findOne({ 'campaign_status_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCampaignstatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteCampaignstatus", authenticateToken, async function (req, res) {
    try {
        let campaign_status_id = req.body.campaign_status_id;
        let result = await CampaignstatusDetail.deleteOne({ 'campaign_status_id': campaign_status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteCampaignstatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCampaignstatus", authenticateToken, async function (req, res) {
    try {
        let campaign_status_id = req.body.campaign_status_id;
        let result = await SourceDetail.updateOne({ 'campaign_status_id': campaign_status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCampaignstatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.post("/addsalesStatus", authenticateToken, async function (req, res) {
    console.log("Enter: addsalesStatus");
    try {
        let salesstatusDetail = new SalesstatusDetail(req.body);

        salesstatusDetail.status_id = Date.now()

        let result = await salesstatusDetail.save();
        console.log("Success");
        response.success(req, res, "Success addsalesStatus", salesstatusDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllsalesStatus", authenticateToken, async function (req, res) {
    console.log("Enter: getAllsalesStatus");
    try {
        let result = await SalesstatusDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllsalesStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getsalesStatus/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getsalesStatus");
    try {
        console.log(req.params);
        let result = await salesstatusDetail.findOne({ 'status_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getsalesStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deletesalesStatus", authenticateToken, async function (req, res) {
    try {
        let status_id = req.body.status_id;
        let result = await SalesstatusDetail.deleteOne({ 'status_id': status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deletesalesStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updatesalesStatus", authenticateToken, async function (req, res) {
    try {
        let status_id = req.body.status_id;
        let result = await SalesstatusDetail.updateOne({ 'status_id': status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updatesalesStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addStatus", authenticateToken, async function (req, res) {
    console.log("Enter: addStatus");
    try {
        let statusDetail = new StatusDetail(req.body);

        statusDetail.status_id = Date.now()

        let result = await statusDetail.save();
        console.log("Success");
        response.success(req, res, "Success addStatus", statusDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllStatus", authenticateToken, async function (req, res) {
    console.log("Enter: getAllStatus");
    try {
        let result = await StatusDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getStatus/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getStatus");
    try {
        console.log(req.params);
        let result = await statusDetail.findOne({ 'status_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteStatus", authenticateToken, async function (req, res) {
    try {
        let status_id = req.body.status_id;
        let result = await StatusDetail.deleteOne({ 'status_id': status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateStatus", authenticateToken, async function (req, res) {
    try {
        let status_id = req.body.status_id;
        let result = await statusDetail.updateOne({ 'status_id': status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateStatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.post("/addSurvey", authenticateToken, async function (req, res) {
    console.log("Enter: addSurvey");
    try {
        let surveyDetail = new SurveysDetail(req.body);

        surveyDetail.survey_id = Date.now()

        let result = await surveyDetail.save();
        console.log("Success");
        response.success(req, res, "Success addSurvey", surveyDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllSurvey", authenticateToken, async function (req, res) {
    console.log("Enter: getAllSurvey");
    try {
        let result = await SurveysDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllSurvey", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getSurvey/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getSurvey");
    try {
        console.log(req.params);
        let result = await SurveysDetail.findOne({ 'survey_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getSurvey", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteSurvey", authenticateToken, async function (req, res) {
    try {
        let survey_id = req.body.survey_id;
        let result = await SurveysDetail.deleteOne({ 'survey_id': survey_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteSurvey", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateSurvey", authenticateToken, async function (req, res) {
    try {
        let survey_id = req.body.survey_id;
        let result = await SurveysDetail.updateOne({ 'survey_id': survey_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateSurvey", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





/*-----ticketing--*/



router.post("/addTicketing", authenticateToken, async function (req, res) {
    console.log("Enter: addTicketing");
    try {
        let ticketDetail = new TicketDetail(req.body);

        ticketDetail.ticket_id = Date.now()

        let result = await ticketDetail.save();
        console.log("Success");
        response.success(req, res, "Success addTicketing", ticketDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllTicketing", authenticateToken, async function (req, res) {
    console.log("Enter: getAllTicketing");
    try {
        let result = await Serviceticketing.find();
        console.log("Success");
        response.success(req, res, "Success getAllTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getTicketing/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getTicketing");
    try {
        console.log(req.params);
        let result = await TicketDetail.findOne({ 'ticket_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteTicketing", authenticateToken, async function (req, res) {
    try {
        let ticket_id = req.body.ticket_id;
        let result = await TicketDetail.deleteOne({ 'ticket_id': ticket_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateTicketing", authenticateToken, async function (req, res) {
    try {
        let ticket_id = req.body.ticket_id;
        let result = await TicketDetail.updateOne({ 'ticket_id': ticket_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});








router.post("/addserviceTicketing", authenticateToken, async function (req, res) {
    console.log("Enter: addserviceTicketing");
    try {
        let serviceticketing = new Serviceticketing(req.body);

        serviceticketing.ticket_id = Date.now()

        let result = await serviceticketing.save();
        console.log("Success");
        response.success(req, res, "Success addserviceTicketing", serviceticketing);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllserviceTicketing", authenticateToken, async function (req, res) {
    console.log("Enter: getAllserviceTicketing");
    try {
        let result = await Serviceticketing.find();
        console.log("Success");
        response.success(req, res, "Success getAllserviceTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getserviceTicketing/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getserviceTicketing");
    try {
        console.log(req.params);
        let result = await Serviceticketing.findOne({ 'ticket_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getserviceTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteserviceTicketing", authenticateToken, async function (req, res) {
    try {
        let ticket_id = req.body.ticket_id;
        let result = await Serviceticketing.deleteOne({ 'ticket_id': ticket_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteserviceTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateserviceTicketing", authenticateToken, async function (req, res) {
    try {
        let ticket_id = req.body.ticket_id;
        let result = await Serviceticketing.updateOne({ 'ticket_id': ticket_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateserviceTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addVisit", async function (req, res) {
    console.log("Enter: addVisits", req.body);
    try {
        let visitsDetail = new AddvisitsDetail(req.body);
        //visitDetail.visit_id = Date.now();
        let result = await visitsDetail.save();
        console.log("Success");
        // if (result) {
            let admins = await UserDetail.find({ usertype: 'Admin' });
            let selectedUser =  await ObjectDetail.findOne({ object_id:req.body.object_id , object_type: 3 });
            let selectedSalesUser = await UserDetail.findOne({email:req.body.sales_email});
            console.log(selectedSalesUser,selectedUser);
            //naveen final code changes
            let emailText;
             
            sgMail.setApiKey('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');
            emailData = {
                name:selectedUser.first_name,
                visits_note:req.body.visits_note,
                follow_up_date: req.body.follow_up_date,
                company:selectedUser.company_name,
                address:selectedUser.mailing_address,
                department:selectedUser.department,
                sales_user_name:selectedSalesUser.first_name,
            }
            console.log(emailData)
            const msg = {
              to: req.body.sales_email, // Change to your recipient
              from: 'yoonus-pk@ogoul.com', // Change to your verified sender
              subject: 'Visit Added',
              text: 'You are successfully registered to OgoulCRM',
              html: pug.renderFile(`${__dirname}/../core/emailTemplate.pug`, {
                emailData,
              }),
            }
            sgMail
              .send(msg)
              .then(() => {
                console.log('Email sent')
              })
              .catch((error) => {
                console.error(error)
              })
        // }
        response.success(req, res, "Success addVisits", visitsDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getVisit/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getVisit");
    try {
        console.log(req.params);
        let visitResult = await AddvisitsDetail.findOne({ 'visit_id': req.params.id });
        let customerResult = await ObjectDetail.findOne({ "object_id": visitResult["object_id"] });
        let obj = {
            "visit_id": visitResult.visit_id,
            "visits_note": visitResult.visits_note,
            "follow_up_date": visitResult.follow_up_date,
            "lat": visitResult.lat,
            "long": visitResult.long,
            "object_id": visitResult.object_id,
            "email": customerResult.email,
            "phone": customerResult.phone,
            "first_name": customerResult.first_name,
            "last_name": customerResult.last_name,
            "other_address": customerResult.other_address,
            "company_name": customerResult.company_name,
            "sales_email":visitResult.sales_email,
            "department": customerResult.department,
            "created_by": visitResult.created_by,
            "created_time": visitResult.created_time,
            "updated_by": visitResult.updated_by,
            "modified_time": visitResult.modified_time
        };
        console.log("Success", obj);
        response.success(req, res, "Success getVisit", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


/* router.get("/getAllVisits", authenticateToken, async function (req, res) {
    console.log("Enter: getAllVisits");
    try {
        let customerIds = await CustomerVisits.find({}, { _id: 0, vendor_id: 1 });
        let vendorDetailArr = [];
        let customerIdArr = [];
        for (let k = 0; k < customerIds.length; k++) {
            customerIdArr.push(customerIds[k].vendor_id);
            vendorDetailArr.push(await VendorDetail.findOne({ "vendor_id":  customerIds[k].vendor_id}));
        }
        let result = vendorDetailArr;
        console.log("Success");
        response.success(req, res, "Success getAllVisits", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});  
 */
router.get("/getAllVisits1", authenticateToken, async function (req, res) {
    console.log("Enter: getAllVisits");
    try {
        let AddVisitslistArr = await AddvisitsDetail.find();
        let objArr = [];
        for (var k = 0; k < AddVisitslistArr.length; k++) {
            // console.log("customerVisitsArr[k]::", customerVisitsArr[k].vendor_id);
            let object_id = AddVisitslistArr[k].object_id;
            let customer = await ObjectDetail.findOne({ "object_id": object_id });
            if (customer == null) continue;
            let obj = {
                "visit_id": AddVisitslistArr[k].visit_id,
                "visits_note": AddVisitslistArr[k].visits_note,
                "follow_up_date": AddVisitslistArr[k].follow_up_date,
                "lat": AddVisitslistArr[k].lat,
                "long": AddVisitslistArr[k].long,
                "object_id": AddVisitslistArr[k].object_id,
                "created_by": AddVisitslistArr[k].created_by,
                "created_time": AddVisitslistArr[k].created_time,
                "updated_by": AddVisitslistArr[k].updated_by,
                "modified_time": AddVisitslistArr[k].modified_time,

                "email": customer.email,
                "phone": customer.phone,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "other_address": customer.other_address,
                "company_name": customer.company_name,

                "department": customer.department,
                "visit_added_by_email": customer.visit_added_by_email,
            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllVisits", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getVisitsOfSalesUser", authenticateToken, async function (req, res) {
    console.log("Enter: getVisitsOfSalesUser");
    try {

        let AddVisitslistArr = await AddvisitsDetail.find({ "visit_added_by_email ": req.clientDetails.email });
        let objArr = [];
        for (var k = 0; k < AddVisitslistArr.length; k++) {
            // console.log("customerVisitsArr[k]::", customerVisitsArr[k].vendor_id);
            let object_id = AddVisitslistArr[k].object_id;
            let customer = await ObjectDetail.findOne({ "object_id": object_id });
            if (customer == null) continue;
            let obj = {
                "visit_id": AddVisitslistArr[k].visit_id,
                "visits_note": AddVisitslistArr[k].visits_note,
                "lat": AddVisitslistArr[k].lat,
                "follow_up_date": AddVisitslistArr[k].follow_up_date,
                "long": AddVisitslistArr[k].long,
                "object_id": AddVisitslistArr[k].object_id,

                "email": customer.email,
                "phone": customer.phone,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "address": customer.address,
                "company_name": customer.company_name,
                "follow_up_date": customer.follow_up_date,
                "department": customer.department,
            };
            objArr.push(obj);
        }
        response.success(req, res, "Success getVisitsOfSalesUser", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


// router.get("/getAllVisits", async function (req, res) {
//     console.log("Enter: getAllVisits");
//     try {
//         let result = await CustomerVisits.find();
//         console.log("Success");
//         response.success(req, res, "Success getAllVisits", result);
//     } catch (error) {
//         console.log("Failure:", error);
//         response.serverError(req, res, error.message, error);
//     }
// }); 

// router.get("/getVisitsOfSalesUser", authenticateToken, async function (req, res) {
//     console.log("Enter: getVisitsOfSalesUser");
//     try {
//         let customerIds = await CustomerVisits.find({ "visit_added_by_email": req.clientDetails.email }, { _id: 0, vendor_id: 1 });
//         let vendorDetailArr = [];
//         let customerIdArr = [];
//         for (let k = 0; k < customerIds.length; k++) {
//             customerIdArr.push(customerIds[k].vendor_id);
//             vendorDetailArr.push(await VendorDetail.findOne({ "vendor_id": customerIds[k].vendor_id }));
//         }
//         let result = vendorDetailArr;
//         console.log("Success");
//         response.success(req, res, "Success getVisitsOfSalesUser", result);
//     } catch (error) {
//         console.log("Failure:", error);
//         response.serverError(req, res, error.message, error);
//     }
// });



router.post("/getVisitsBetweenDates", authenticateToken, async function (req, res) {
    console.log("Enter: getVisitsBetweenDates");
    try {
        let result = await AddvisitsDetail.find({ visit_id: { $gte: req.body.from, $lt: req.body.to } });
        console.log("Success");
        response.success(req, res, "Success getVisitsBetweenDates", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateVisit", authenticateToken, async function (req, res) {
    try {
        let visit_id = req.body.visit_id;
        let result = await AddvisitsDetail.updateOne({ 'visit_id': visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deleteVisit", authenticateToken, async function (req, res) {
    try {
        let visit_id = req.body.visit_id;
        let result = await AddvisitsDetail.deleteOne({ 'visit_id': visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Customer Visit deleted", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/getUsersByUserType", authenticateToken, async function (req, res) {
    console.log("Enter: getUsersByUserType");
    try {
        let result = await UserDetail.find({ usertype: req.body.usertype });
        console.log("Success");
        response.success(req, res, "Success getUsersByUserType", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getVisitsOfSalesUser", authenticateToken, async function (req, res) {
    console.log("Enter: getVisitsOfSalesUser");
    try {

        let AddVisitslistArr = await AddvisitsDetail.find({ "visit_added_by_email ": req.clientDetails.email });
        let objArr = [];
        for (var k = 0; k < AddVisitslistArr.length; k++) {
            // console.log("customerVisitsArr[k]::", customerVisitsArr[k].vendor_id);
            let object_id = AddVisitslistArr[k].object_id;
            let customer = await ObjectDetail.findOne({ "object_id": object_id });
            if (customer == null) continue;
            let obj = {
                "visit_id": AddVisitslistArr[k].visit_id,
                "visits_note": AddVisitslistArr[k].visits_note,
                "follow_up_date": AddVisitslistArr[k].follow_up_date,
                "lat": AddVisitslistArr[k].lat,
                "long": AddVisitslistArr[k].long,
                "object_id": AddVisitslistArr[k].object_id,

                "email": customer.email,
                "phone": customer.phone,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "address": customer.address,
                "company_name": customer.company_name,

                "department": customer.department,
            };
            objArr.push(obj);
        }
        response.success(req, res, "Success getVisitsOfSalesUser", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/getUidsAndEmail", authenticateToken, async function (req, res) {
    console.log("Enter: getUidsAndEmail");
    try {
        let result = await UserDetail.find();
        console.log("Success");
        response.success(req, res, "Success getUidsAndEmail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


///////////////////////// -- Schedule Visits code -- /////////////////////////
router.post("/scheduleVisit", authenticateToken, async function (req, res) {
    console.log("Enter: scheduleVisit");
    try {
        let scheduleVisit = new ShedulevisitsDetail(req.body);
        scheduleVisit.schedule_visit_id = Date.now();
        let result = await scheduleVisit.save();
        console.log("Success");
        let customer = await ObjectDetail.findOne({ "object_id": result.object_id });
        let selectedSalesUser = await UserDetail.findOne({email:req.body.email});        
        console.log("customer", customer);
        emailData = {
            customerName: customer?.first_name,
            email: customer?.email,
            phone: customer?.phone,
            company_name: customer?.company_name,
            department: customer?.department,
            address: customer?.mailing_address,
            date: result?.date,
            time: result?.time,
            visitAssignedBy: result.created_by,
            sales_name:selectedSalesUser.first_name       
        }
        sgMail.setApiKey('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');
        const msg = {
          to: req.body.email, // Change to your recipient
          from: 'yoonus-pk@ogoul.com', // Change to your verified sender
          subject: 'Scheduled Visit Added',
          text: 'You are successfully registered to OgoulCRM',
          html: pug.renderFile(`${__dirname}/../core/schedulevisit.pug`, {
            emailData,
          }),
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
        response.success(req, res, "Success scheduleVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllScheduleVisits", authenticateToken, async function (req, res) {
    console.log("Enter: getAllScheduleVisits");
    try {
        let result = await ShedulevisitsDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllScheduleVisits", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getScheduleVisit/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getScheduleVisit");
    try {
        console.log(req.params);
        let result = await ShedulevisitsDetail.findOne({ 'schedule_visit_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getScheduleVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateScheduleVisit", authenticateToken, async function (req, res) {
    try {
        let schedule_visit_id = req.body.schedule_visit_id;
        let result = await ShedulevisitsDetail.updateOne({ 'schedule_visit_id': schedule_visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateScheduleVisit", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deleteScheduleVisit", authenticateToken, async function (req, res) {
    try {
        let schedule_visit_id = req.body.schedule_visit_id;
        let result = await ShedulevisitsDetail.deleteOne({ 'schedule_visit_id': schedule_visit_id }, req.body);
        console.log("Success");
        response.success(req, res, "Schedule Visit deleted", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addExpenseItem", authenticateToken, async function (req, res) {
    console.log("Enter: addExpenseItem");
    try {

        console.log("BODY:", req.body);
        let r1 = await ExpenseItemDetail.findOne({ "expense_item": req.body.expense_item });
        if (r1 != null) {
            throw new Error("Expense item already exists.");
        }
        let expenseItemDetail = new ExpenseItemDetail(req.body);
        expenseItemDetail.item_id = Date.now();
        let result = await expenseItemDetail.save();
        console.log("Success");
        response.success(req, res, "Success addExpenseItem", expenseItemDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/updateExpenseItem", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await ExpenseItemDetail.findOne({ "expense_item": req.body.expense_item });
        if (r1 != null) {
            throw new Error("Expense item already exists.");
        }
        let item_id = req.body.item_id;
        let result = await ExpenseItemDetail.updateOne({ 'item_id': item_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/deleteExpenseItem", authenticateToken, async function (req, res) {
    try {
        let item_id = req.body.item_id;
        let result = await ExpenseItemDetail.deleteOne({ 'item_id': item_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/getAllExpenseItem", authenticateToken, async function (req, res) {

    console.log("Enter: getAllExpenseItem");
    try {
        let result = await ExpenseItemDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getExpenseItem/:id", authenticateToken, async function (req, res) {

    console.log("Enter: getExpenseItem");
    try {
        let result = await ExpenseItemDetail.findOne({ 'item_id': req.params.id }, req.body);
        console.log("Success");
        response.success(req, res, "Success getExpenseItem", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getTotalExpenses", authenticateToken, async function (req, res) {
    console.log("Enter: getTotalExpenses");
    try {
        console.log(req.params);
        let result = await ExpenseDetail.find().count();
        console.log("Success", result);
        response.success(req, res, "Success getTotalExpenses", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/getAllExpenseForEmail", authenticateToken, async function (req, res) {
    console.log("Enter: getAllExpenseForEmail");
    try {
        /* let email = req.clientDetails.email; */

        /* let result = await ExpenseDetail.find({ "expense_added_by_email": email }); */
        let result = await ExpenseDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllExpenseForEmail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAllExpense", authenticateToken, async function (req, res) {
    console.log("Enter: getAllExpense");
    try {
        let result = await ExpenseDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



/* 
router.post("/addExpense", authenticateToken, async function (req, res) {
    console.log("Enter: addExpense");
    try {
        let expenseDetail = new ExpenseDetail(req.body);
           let checkexpensesItem = await ExpenseDetail.findOne({"expense_item": expenseDetail.expense_item});
            console.log("checkexpensesItem:::", checkexpensesItem);
             if(checkexpensesItem == null){
                expenseDetail.expense_id = Date.now();
        let result = await expenseDetail.save();
        console.log("Success");
        response.success(req, res, "Success addExpense", expenseDetail);
        } 
        else {
            console.log("Expense Item already exists.....");
            throw new Error("Expense Item  already exists.");
          
        }
        
    } catch (error) {
        console.log("Failure1:", error);
        console.log("Failure2:", error.message);
        response.serverError(req, res, error.message, error);
    }
}); */

router.post("/addExpense", authenticateToken, async function (req, res) {
    console.log("Enter: addExpense");
    try {
        let expenseDetail = new ExpenseDetail(req.body);
        expenseDetail.expense_id = Date.now();
        let result = await expenseDetail.save();
        console.log("Success");
        response.success(req, res, "Success addExpense", expenseDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/deleteExpense", authenticateToken, async function (req, res) {
    try {
        let expense_id = req.body.expense_id;
        let result = await ExpenseDetail.deleteOne({ 'expense_id': expense_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getExpense/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getExpense");
    try {
        console.log(req.params);
        let result = await ExpenseDetail.findOne({ 'expense_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/updateExpense", authenticateToken, async function (req, res) {
    try {
        let expense_id = req.body.expense_id;
        let result = await ExpenseDetail.updateOne({ 'expense_id': expense_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateExpense", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getUserFromEmail/:email", async function (req, res) {
    console.log("Enter: getUserFromEmail.....");
    try {
        console.log(req.params);
        let result = await UserDetail.findOne({ 'email': req.params.email }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getUserFromEmail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

/* 
router.put("/updateFaqs/:id",async function (req, res) {
    try {
        let faq_id = req.body.faq_id;
        delete faq_id;
        let result = await FaqDetail.updateOne({ 'faq_id': faq_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateFaqs", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});  */

/*-----Dasboard count-----*/
router.get("/dashboardSearch", authenticateToken, async function (req, res) {
    console.log("Enter: dashboardSearch");
    try {
        console.log(req.params);
        let dashObj = {
            "totalcontacts": 0,
            "totalleads": 0,
            "totalcustomers": 0,
            "totalcampaigns": 0,
            "totalactivity": 0,
            "totalusers": 0


        }
        dashObj.totalleads = await ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.LEAD }).countDocuments();
        dashObj.totalcontacts = await ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CONTACT }).countDocuments();
        dashObj.totalcustomers = await ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER }).countDocuments();
        dashObj.totalcampaigns = await CampaignDetail.countDocuments();
        dashObj.totalactivity = await ActivityDetail.countDocuments();
        dashObj.totalusers = await UserDetail.countDocuments();
        dashObj.totaldeals = await DealDetail.countDocuments();
        dashObj.totalproducts = await ProductDetail.countDocuments();
        dashObj.totalquotes = await QuoteDetail.countDocuments();
        dashObj.totalcases = await CaseDetail.countDocuments();
        dashObj.totalrequesteddemo = await RequestdemoDetail.countDocuments()
        dashObj.totalcontactedusers = await ContactusDetail.countDocuments();
        dashObj.totalfaq = await FaqDetail.countDocuments();
        dashObj.totaltickets = await TicketDetail.countDocuments();
        dashObj.totalsurvey = await SurveysDetail.countDocuments();

        dashObj.totaladdvisits = await AddvisitsDetail.countDocuments();
        dashObj.totalshchedulevisits = await ShedulevisitsDetail.countDocuments();
        dashObj.totalsupplier = await SuppliernameDetail.countDocuments();
        dashObj.totalpurchase = await PurchaseDetail.countDocuments();

        dashObj.totalinvoices = await InvoiceDetails.countDocuments();
        dashObj.totalreturns = await ReturnDetail.countDocuments();

        console.log("dashObj::", dashObj);
        console.log("Success", dashObj);
        response.success(req, res, "Success dashboardSearch", dashObj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
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


////dynamic page




router.get("/getFieldDetailsForComponent/:component_name", async function (req, res) {
    logger.logString("Enter: getFieldDetailsForComponent");
    try {
        let component_name = req.params.component_name;
        let result = await FieldDetail.find({ "component_name": component_name });
        // logger.logStringWithObj("Success getFieldDetailsForComponent", result);
        response.success(req, res, "Success getFieldDetailsForComponent", result);
    } catch (error) {
        logger.logErrorStringWithObj("Error in getFieldDetailsForComponent", error.message);
        response.serverError(req, res, "Error in getFieldDetailsForComponent", error);
    }
});


/*
router.get("/getlandingpageForComponent/:component_name", async function (req, res) {
    logger.logString("Enter: getlandingpageForComponent");
    try {
        let component_name = req.params.component_name;
        let result = await Landingpage.find({ "component_name": component_name });
        // logger.logStringWithObj("Success getFieldDetailsForComponent", result);
        response.success(req, res, "Success getlandingpageForComponent", result);
    } catch (error) {
        logger.logErrorStringWithObj("Error in getlandingpageForComponent", error.message);
        response.serverError(req, res, "Error in getlandingpageForComponent", error);
    }
});
*/

router.post("/updateFieldDetail", authenticateToken, async function (req, res) {
    logger.logString("Enter: updateFieldDetail");
    try {
        logger.logObj(req.params);
        logger.logObj(req.body);
        let result = await FieldDetail.updateOne({ 'field_id': req.body.field_id }, req.body);
        logger.logStringWithObj("Success updateFieldDetail", result);
        response.success(req, res, "Success updateFieldDetail", result);
    } catch (error) {
        logger.logErrorStringWithObj("Error in updateFieldDetail", error.message);
        response.serverError(req, res, "Error in updateFieldDetail", error);
    }
});




router.post("/updateLandingpage", authenticateToken, async function (req, res) {
    logger.logString("Enter: updateLandingpage");
    try {
        logger.logObj(req.params);
        logger.logObj(req.body);
        let result = await Landingpage.updateOne({ 'field_id': req.body.field_id }, req.body);
        logger.logStringWithObj("Success updateLandingpage", result);
        response.success(req, res, "Success updateLandingpage", result);
    } catch (error) {
        logger.logErrorStringWithObj("Error in updateLandingpage", error.message);
        response.serverError(req, res, "Error in updateLandingpage", error);
    }
});






///uploadcsv



router.post('/uploadcsv', authenticateToken, async function (req, res) {
    var alreday = [];
    var store_email = [];

    for (let i = 0; i < req.body.arr.length; i++) {
        store_email.push(req.body.arr[i].email);
        alreday = await ObjectDetail.find({ email: store_email, });
    }

    for (let j = 0; j < alreday.length; j++) {
        var deleted = await ObjectDetail.deleteOne({ _id: alreday[j]._id });
    }

    for (let k = 0; k < req.body.arr.length; k++) {
        var leadData = await ObjectDetail.create({

            first_name: req.body.arr[k].first_name,
            last_name: req.body.arr[k].last_name,
            email: req.body.arr[k].email,
            phone: req.body.arr[k].phone,
            object_id: req.body.arr[k].object_id,
            object_type: req.body.arr[k].object_type

        });
    }
    res.json({ message: 'success', data: leadData })
})
/* 

router.post('/uploadcsv', async function(req, res) {
    var alreday = [];
    var store_email = [];

    for (let i = 0; i < req.body.arr.length; i++) {
        store_email.push(req.body.arr[i].email);
        alreday = await DealDetail.find({ email: store_email, });
    }

    for (let j = 0; j < alreday.length; j++) {
        var deleted = await DealDetail.deleteOne({_id: alreday[j]._id });
    }

    for (let k = 0; k < req.body.arr.length; k++) {
        var dealdata = await DealDetail.create({
           
            deal_name: req.body.arr[k].deal_name,
            amount: req.body.arr[k].amount,
            deal_id:req.body.arr[k].deal_id
          
        });
    }
    res.json({ message: 'success', data: dealdata })
})
 */

///image  uploader
var multer = require('multer');
const ServiceticketingSchema = require('../schema/ServiceticketingSchema');
const EscalationSchema = require('../schema/EscalationSchema');
const OrganisationSchema = require('../schema/OrganisationSchema');
const EmployeeDetailSchema = require('../schema/EmployeeDetailSchema');
const HolidayDetailSchema = require('../schema/HolidayDetailSchema');
const LeaveDetailSchema = require('../schema/LeaveDetailSchema');
const TrainingDetailSchema = require('../schema/TrainingDetailSchema');
const TravelDetailSchema = require('../schema/TravelDetailSchema');
const CandidateDetailSchema = require('../schema/CandidateDetailSchema');
const EmployeestatusSchema = require('../schema/EmployeestatusSchema');
const ProjectDetailSchema = require('../schema/ProjectDetailSchema');
const AttendanceDetailSchema = require('../schema/AttendanceDetailSchema');
const LeaveTypeDetailSchema = require('../schema/LeaveTypeDetailSchema');
const PayrollDetailSchema = require('../schema/PayrollDetailSchema');
const TaskDetailSchema = require('../schema/TaskDetailSchema');
const OrganisationInfoDetailsSchema = require('../schema/OrganisationInfoDetailsSchema');


var path = constants.DEFAULTS_FILE_LOCATIONS.ENTITY_ICONS;


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});


const upload = multer({ storage: storage })
router.post('/uploadFile', upload.single('file'), (req, res, next) => {
    logger.logErrorStringWithObj("params:", req.params);

    const file = req.file;
    const size =req.size;
    console.log(file.filename);
    if (!file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
    }
    logger.logSuccessEvent("Success uploadFile", file, req.body);
    response.success(req, res, "Success uploadFile", file);
});


/* 
router.post('/download', function(req,res,next){
    path = path.join(__dirname,'public') +'/'+ req.body.filename;
console.log("path",path);
    res.sendFile(path);

}); */


router.get('/download/:id',(req,res)=>{
    PolicyDetail.find({_id:req.params.id},(err,data)=>{
         if(err){
             console.log(err)
         }
         else{
             var path= __dirname+'/public/'+data[0].path;
             res.download(path)
         }
    })
})
//Calendar...



// perform actions on the collection object
router.get('/api/events', (req, res, next) => {
    console.log('GET');
    collection.find({}).toArray((err, results) => {
        if (err) {
            next(err);
        }
        res.send(results);
    });
})

router.post('/api/events', jsonParse, (req, res, next) => {
    console.log('POST');
    console.log(req.body);
    collection.insertOne(req.body).then(
        results => res.status(201).send(results.insertedId),
        err => next(err),
    );
})

router.put('/api/events', jsonParse, (req, res, next) => {
    let id = req.query._id;
    id = new ObjectID(id);
    console.log('PUT -- id: ' + id);
    console.log(req.body);
    collection.updateOne(
        {
            _id: id
        },
        {
            $set: req.body
        }).then(
            (results) => {
                if (results.result.nModified > 0) {
                    res.status(200).send();
                } else {
                    res.status(204).send();
                }
            },
            (err) => next(err),
        );
})

router.delete('/api/events', (req, res, next) => {
    let id = req.query._id;
    id = new ObjectID(id);
    let query = { _id: id };
    console.log('DELETE');
    console.log(query);
    collection.deleteOne({ _id: id }).then(
        (result) => {
            if (result.deletedCount > 0) {
                res.status(200).send();
            } else {
                res.status(204).send();
            }
        },
        (err) => next(err),
    );
})



router.get("/getAllnotes", authenticateToken, async function (req, res) {
    console.log("Enter: getAllnotes");
    try {
        let result = await CustomerNotes.find();
        console.log("Success");
        response.success(req, res, "Success getAllnotes", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





///escalation


/* router.post("/addEscalation", authenticateToken,async function (req, res) {
    console.log("Enter: addEscalation");
    try {
        let escalationDetail = new EscalationDetail(req.body);
      
        escalationDetail.escalation_id = Date.now()
    
        let result = await escalationDetail.save();
        console.log("Success");
        response.success(req, res, "Success addEscalation", escalationDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
 */

//post request for notes
router.post('/addEscalation', (req, res) => {
    //get obj from body of request
    let obj = req.body;

    //create obj
    TicketDetail.create(obj).then(
        (results) => res.send(results),
        (err) => console.log(err)
    )
});

router.get("/getAllEscalation", authenticateToken, async function (req, res) {
    console.log("Enter: getAllEscalation");
    try {
        let result = await EscalationDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllEscalation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

/* router.get("/getEscalation/:id",authenticateToken, async function (req, res) {
    console.log("Enter: getEscalation");
    try {
        console.log(req.params);
        let result = await EscalationDetail.findOne({'escalation_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getEscalation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */

router.get("/getEscalation/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getEscalation");
    try {
        console.log(req.params);
        let result = await TicketDetail.findOne({ 'ticket_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getEscalation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteEscalation", authenticateToken, async function (req, res) {
    try {
        let escalation_id = req.body.escalation_id;
        let result = await EscalationDetail.deleteOne({ 'escalation_id': escalation_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteEscalation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateEscalation", authenticateToken, async function (req, res) {
    try {
        let escalation_id = req.body.escalation_id;
        let result = await EscalationDetail.updateOne({ 'escalation_id': escalation_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateEscalation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});






//Calendar...



client.connect(err => {
    const db = client.db("ogoul_main_db")
    const collection = db.collection("events");

    // perform actions on the collection object
    router.get('/get_events', (req, res, next) => {
        console.log('##### Enter:Get Calendar #####');
        collection.find({}).toArray((err, results) => {
            if (err) {
                next(err);
            }
            res.send(results);
        });
    })

    router.post('/set_event', jsonParse, (req, res, next) => {
        console.log('POST');
        console.log(req.body);
        // collection.insertOne(req.body).then(
        //   results => res.status(201).send(results.insertedId),
        //   err => next(err),
        // );
        var ElementList = req.body;

        console.log(ElementList)
        let newList = Object.assign(ElementList, { "emailSent": false });
        // return newList

        console.log(newList)
        // let response = req.body;
        emailData = {

            email: newList?.emails,
            startDate: newList?.start,
            endDate: newList?.end,
            agenda: newList?.agenda,
            type: newList?.type,
            title: newList?.title,



        }
        //let sendMailInfo = new MailRepository();

        collection.insertOne(req.body).then(
            results => {
                res.status(201).send(results.insertedId)
                // sendMailInfo.sendMailInfo(newList.emails, "New Calender Event Added ", pug.renderFile(`${__dirname}/../core/calenderMail.pug`, {
                //     emailData,
                // }));
            },
            err => next(err),
        );
    })


    router.put('/put_event', jsonParse, (req, res, next) => {
        let id = req.query._id;
        id = new ObjectID(id);
        console.log('PUT -- id: ' + id);
        console.log(req.body);
        collection.updateOne(
            {
                _id: id
            },
            {
                $set: req.body
            }).then(
                (results) => {
                    if (results.result.nModified > 0) {
                        res.status(200).send();
                    } else {
                        res.status(204).send();
                    }
                },
                (err) => next(err),
            );
    })

    router.delete('/delete_event', (req, res, next) => {
        let id = req.query._id;
        id = new ObjectID(id);
        let query = { _id: id };
        console.log('DELETE');
        console.log(query);
        collection.deleteOne({ _id: id }).then(
            (result) => {
                if (result.deletedCount > 0) {
                    res.status(200).send();
                } else {
                    res.status(204).send();
                }
            },
            (err) => next(err),
        );
    })
})




router.post("/addSuppliername", authenticateToken, async function (req, res) {
    console.log("Enter: addSuppliername",req.body);
    try {
        let r1 = await SuppliernameDetail.findOne({ "supplier_email": req.body.supplier_email });
        console.log(r1);
        if (r1 != null) {
            throw new Error("Email already exists.");
        }
        let suppliernameDetail = new SuppliernameDetail(req.body);

        suppliernameDetail.supplier_id = Date.now()

        let result = await suppliernameDetail.save();
        // console.log("Success");
        response.success(req, res, "Success addSuppliername", suppliernameDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getAllSuppliername", authenticateToken, async function (req, res) {
    console.log("Enter: getAllSuppliername");
    try {
        let result = await SuppliernameDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllSuppliername", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});







router.post("/deleteSuppliername", authenticateToken, async function (req, res) {
    try {
        let supplier_id = req.body.supplier_id;
        let result = await SuppliernameDetail.deleteOne({ 'supplier_id': supplier_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteSuppliername", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getSuppliername/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getSuppliername");
    try {
        console.log(req.params);
        let result = await SuppliernameDetail.findOne({ 'supplier_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getSuppliername", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});






router.post("/updateSuppliername", authenticateToken, async function (req, res) {
    try {
        let supplier_id = req.body.supplier_id;
        let result = await SuppliernameDetail.updateOne({ 'supplier_id': supplier_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateSuppliername", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});









router.post("/addCurrency", authenticateToken, async function (req, res) {
    console.log("Enter: addCurrency");
    try {
        let currencyDetail = new CurrencyDetail(req.body);

        currencyDetail.currency_id = Date.now()

        let result = await currencyDetail.save();
        console.log("Success");
        response.success(req, res, "Success addCurrency", currencyDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getAllCurrency", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCurrency");
    try {
        let result = await CurrencyDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllCurrency", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});







router.post("/deleteCurrency", authenticateToken, async function (req, res) {
    try {
        let currency_id = req.body.currency_id;
        let result = await CurrencyDetail.deleteOne({ 'currency_id': currency_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success CurrencyDetail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getCurrency/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCurrency");
    try {
        console.log(req.params);
        let result = await CurrencyDetail.findOne({ 'currency_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getCurrency", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});






router.post("/updateCurrency", authenticateToken, async function (req, res) {
    try {
        let currency_id = req.body.currency_id;
        let result = await CurrencyDetail.updateOne({ 'currency_id': currency_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateCurrency", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




//Invoice





router.post("/addInvoice", authenticateToken, async function (req, res) {
    console.log("Enter: addInvoice");
    try {
        let invoiceDetail = new InvoiceDetails(req.body);
        // console.log("I am invoiceDetail", invoiceDetail)
        invoiceDetail.invoice_id = await InvoiceDetails.countDocuments() == 0?1:await InvoiceDetails.countDocuments()+1;

        let result = await invoiceDetail.save();
        console.log("Success");
        response.success(req, res, "Success addInvoice", invoiceDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});










router.post("/deleteInvoice", authenticateToken, async function (req, res) {
    try {
        let invoice_id = req.body.invoice_id;
        let result = await InvoiceDetails.deleteOne({ 'invoice_id': invoice_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success InvoiceDetails", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



/* router.get("/getInvoice/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getInvoice");
    try {
        console.log(req.params);
        let result = await InvoiceDetails.findOne({ 'invoice_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getInvoice", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); */
/* router.get("/getAllInvoice", authenticateToken, async function (req, res) {
    console.log("Enter: getAllInvoice");
    try {
        let result = await InvoiceDetails.find();
        console.log("Success");
        response.success(req, res, "Success getAllInvoice", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
  */

router.get("/getAllInvoice", authenticateToken, async function (req, res) {
    console.log("Enter: getAllInvoice");
    try {


        let invoiceDetailsArr = await InvoiceDetails.find();
        let objArr = [];
        for (var k = 0; k < invoiceDetailsArr.length; k++) {
            console.log("InvoiceDetailArr[k]::", invoiceDetailsArr[k].object_id);
            let object_id = invoiceDetailsArr[k].object_id;
            let vendor = await ObjectDetail.findOne({ "object_id": object_id });
            if (vendor == null) continue;
            let obj = {
                "invoice_id": invoiceDetailsArr[k].invoice_id,
                "object_id": invoiceDetailsArr[k].object_id,
                "date": invoiceDetailsArr[k].date,
                "total_cost": invoiceDetailsArr[k].total_cost,
                "product_name": invoiceDetailsArr[k].product_name,
                "created_time":invoiceDetailsArr[k].created_time,
                "first_name": vendor.first_name,
                "phone": vendor.phone


            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllInvoice", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getInvoice/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getInvoice");
    try {
        console.log(req.params);
        let invoicesResult = await InvoiceDetails.findOne({ 'invoice_id': req.params.id }, req.body);

        let customerResult = await ObjectDetail.findOne({ "object_id": invoicesResult["object_id"] });

        let obj = {
            "invoice_id": invoicesResult.invoice_id,
            "object_id": invoicesResult.object_id,
            "created_by": invoicesResult.created_by,
            "created_time": invoicesResult.created_time,
            "updated_by": invoicesResult.updated_by,
            "modified_time": invoicesResult.modified_time,
            "date": invoicesResult.date,
            "total_cost": invoicesResult.total_cost,
            "product_name": invoicesResult.product_name,
            "first_name": customerResult.first_name,
            "phone": customerResult.phone
        };
        console.log("Success", obj);
        response.success(req, res, "Success getInvoice", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.post("/updateInvoice", authenticateToken, async function (req, res) {
    try {
        let invoice_id = req.body.invoice_id;
        let result = await InvoiceDetails.updateOne({ 'invoice_id': invoice_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateInvoice", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addMultipleInvoice", authenticateToken, async function (req, res) {
   try {


        let json = req.body;
        let result = await InvoiceDetails.collection.insertMany(json);
        response.success(req, res, "Success addMultipleInvoice", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



//purchases
router.post("/updatePurchases", authenticateToken, async function (req, res) {
    try {
        let purchase_id = req.body.purchase_id;
        let result = await PurchaseDetail.updateOne({ 'purchase_id': purchase_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updatePurchases", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/deletePurchases", authenticateToken, async function (req, res) {
    try {
        let purchase_id = req.body.purchase_id;
        let result = await PurchaseDetail.deleteOne({ 'purchase_id': purchase_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deletePurchases", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/getPurchases/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getPurchases");
    try {
        console.log(req.params);
        let purchasesResult = await PurchaseDetail.findOne({ 'purchase_id': req.params.id }, req.body);

        let supplierResult = await SuppliernameDetail.findOne({ "supplier_id": purchasesResult["supplier_id"] });

        let obj = {
            "purchase_id": purchasesResult.purchase_id,
            "supplier_id": purchasesResult.supplier_id,
            "created_by": purchasesResult.created_by,
            "created_time": purchasesResult.created_time,
            "updated_by": purchasesResult.updated_by,
            "modified_time": purchasesResult.modified_time,
            "purchases_date": purchasesResult.purchases_date,
            "warehouse_name": purchasesResult.warehouse_name,
            "total_cost": purchasesResult.total_cost,
            "product_name": purchasesResult.product_name,
            "supplier_name": supplierResult.supplier_name,
            "supplier_phone": supplierResult.supplier_phone
        };
        console.log("Success", obj);
        response.success(req, res, "Success getPurchases", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllPurchases", authenticateToken, async function (req, res) {
    console.log("Enter: getAllPurchases");
    try {


        let purchaseDetailsArr = await PurchaseDetail.find();
        let objArr = [];
        for (var k = 0; k < purchaseDetailsArr.length; k++) {
            console.log("PurchasesDetailArr[k]::", purchaseDetailsArr[k].supplier_id);
            let supplier_id = purchaseDetailsArr[k].supplier_id;
            let supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
            if (supplier == null) continue;
            let obj = {
                "purchase_id": purchaseDetailsArr[k].purchase_id,
                "supplier_id": purchaseDetailsArr[k].supplier_id,
                "purchases_date": purchaseDetailsArr[k].purchases_date,
                "total_cost": purchaseDetailsArr[k].total_cost,
                "product_name": purchaseDetailsArr[k].product_name,
                "warehouse_name": purchaseDetailsArr[k].warehouse_name,
                "supplier_name": supplier.supplier_name,
                "supplier_phone": supplier.supplier_phone,
                "created_time":purchaseDetailsArr[k].created_time,


            };
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllPurchases", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addPurchases", authenticateToken, async function (req, res) {
    console.log("Enter: addPurchases");
    try {
        let purchaseDetail = new PurchaseDetail(req.body);
        purchaseDetail.purchase_id = await PurchaseDetail.countDocuments() == 0?1:await PurchaseDetail.countDocuments()+1;;
        let result = await purchaseDetail.save();
        console.log("Success");
        response.success(req, res, "Success addPurchases", purchaseDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addMultiplePurchase", authenticateToken, async function (req, res) {
    console.log("Enter: addMultiplePurchase");
    try {


        let json = req.body;
        let result = await PurchaseDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success addMultiplePurchase", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/addStock", authenticateToken, async function (req, res) {
    console.log("Enter: addStock");
    try {
        let stockDetail = new StockDetail(req.body);

        stockDetail.stock_id = Date.now()

        let result = await stockDetail.save();
        console.log("Success");
        response.success(req, res, "Success addStock", stockDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getAllStock", authenticateToken, async function (req, res) {
    console.log("Enter: getAllStock");
    try {
        let result = await StockDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllStock", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});







router.post("/deleteStock", authenticateToken, async function (req, res) {
    try {
        let stock_id = req.body.stock_id;
        let result = await StockDetail.deleteOne({ 'stock_id': stock_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success StockDetail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



router.get("/getStock/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getStock");
    try {
        console.log(req.params);
        let result = await StockDetail.findOne({ 'stock_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getStock", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});






router.post("/updateStock", authenticateToken, async function (req, res) {
    try {
        let stock_id = req.body.stock_id;
        let result = await StockDetail.updateOne({ 'stock_id': stock_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateStock", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.post("/addWarehouse", authenticateToken, async function (req, res) {
    console.log("Enter: addWarehouse");
    try {
        console.log("BODY:", req.body);
        let r1 = await WarehouseDetail.findOne({ "warehouse_name": req.body.warehouse_name });
        if (r1 != null) {
            throw new Error("Warehouse Name already exists.");
        }
        let warehouseDetail = new WarehouseDetail(req.body);

        warehouseDetail.warehouse_id = Date.now()

        let result = await warehouseDetail.save();
        console.log("Success");
        response.success(req, res, "Success addWarehouse", warehouseDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllWarehouse", authenticateToken, async function (req, res) {
    console.log("Enter: getAllWarehouse");
    try {
        let result = await WarehouseDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllWarehouse", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getWarehouse/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getWarehouse");
    try {
        console.log(req.params);
        let result = await WarehouseDetail.findOne({ 'warehouse_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getWarehouse", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteWarehouse", authenticateToken, async function (req, res) {
    try {
        let warehouse_id = req.body.warehouse_id;
        let result = await WarehouseDetail.deleteOne({ 'warehouse_id': warehouse_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteWarehouse", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateWarehouse", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await WarehouseDetail.findOne({ "warehouse_name": req.body.warehouse_name });
        if (r1 != null) {
            throw new Error("Warehouse Name already exists.");
        }
        let warehouse_id = req.body.warehouse_id;
        let result = await WarehouseDetail.updateOne({ 'warehouse_id': warehouse_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateWarehouse", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



/*return*/


router.post("/updateReturns", authenticateToken, async function (req, res) {
    try {
        let return_id = req.body.return_id;
        let result = await ReturnDetail.updateOne({ 'return_id': return_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateReturns", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});





router.post("/deleteReturns", authenticateToken, async function (req, res) {
    try {
        let return_id = req.body.return_id;
        let result = await ReturnDetail.deleteOne({ 'return_id': return_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteReturns", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/getReturns/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getReturns");
    let supplierResult="",customerResult="";
    try {
        
        let returnsResult = await ReturnDetail.findOne({ 'return_id': req.params.id }, req.body);
        console.log("returnsResult",returnsResult);
        if(returnsResult.activity_type != "customer")
         supplierResult = await SuppliernameDetail.findOne({ "supplier_id": returnsResult["supplier_id"] });
        else
         customerResult = await ObjectDetail.findOne({ "object_id": returnsResult["object_id"] });

        let obj = {
            "return_id": returnsResult.return_id,
            "purchase_id":returnsResult.purchase_id,
            "invoice_id": returnsResult.invoice_id,
            "warehouse_name": returnsResult.warehouse_name,
            "supplier_id": returnsResult.supplier_id,
            "created_by": returnsResult.created_by,
            "created_time": returnsResult.created_time,
            "updated_by": returnsResult.updated_by,
            "modified_time": returnsResult.modified_time,
            'activity_type':returnsResult.activity_type,
            "returns_date": returnsResult.returns_date,
            "total_cost": returnsResult.total_cost,
            "product_name": returnsResult.product_name,
            "supplier_name": customerResult?customerResult.first_name :supplierResult.supplier_name,
            "supplier_phone": customerResult?customerResult.phone:supplierResult.supplier_phone
        };
        console.log("Success", obj);
        response.success(req, res, "Success getReturns", obj);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllReturns", authenticateToken, async function (req, res) {
    console.log("Enter: getAllReturns");
    try {


        let returnDetailsArr = await ReturnDetail.find();
        let objArr = [],obj,supplier,customer;
        for (var k = 0; k < returnDetailsArr.length; k++) {
            console.log("ReturnsDetailArr[k]::", returnDetailsArr[k]);
            let supplier_id = returnDetailsArr[k].supplier_id;
            if(returnDetailsArr[k].activity_type == "customer")
            {
                 customer = await ObjectDetail.findOne({ "object_id": returnDetailsArr[k].object_id }); 
                console.log(customer);
            }
            
            else
             supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
            // if (supplier == null) continue;
            if(returnDetailsArr[k].activity_type == "customer")
            {
                 obj = {
                    "return_id": returnDetailsArr[k].return_id,
                    "warehouse_name": returnDetailsArr[k].warehouse_name,
                    "object_id": returnDetailsArr[k].object_id,
                    "returns_date": returnDetailsArr[k].returns_date,
                    "total_cost": returnDetailsArr[k].total_cost,
                    "product_name": returnDetailsArr[k].product_name,
                    "created_time":returnDetailsArr[k].created_time,
                    "supplier_name": customer.first_name,
                    "supplier_phone": customer.phone
    
    
                };
            }
            else{
                 obj = {
                    "return_id": returnDetailsArr[k].return_id,
                    "warehouse_name": returnDetailsArr[k].warehouse_name,
                    "supplier_id": returnDetailsArr[k].supplier_id,
                    "returns_date": returnDetailsArr[k].returns_date,
                    "total_cost": returnDetailsArr[k].total_cost,
                    "product_name": returnDetailsArr[k].product_name,
                    "created_time":returnDetailsArr[k].created_time,
                    "supplier_name": supplier.supplier_name,
                    "supplier_phone": supplier.supplier_phone
    
    
                };
            }
            
            objArr.push(obj);
        }
        console.log("Success");
        response.success(req, res, "Success getAllReturns", objArr);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.post("/addReturns", authenticateToken, async function (req, res) {
    console.log("Enter: addReturns");
    try {
        let returnDetail = new ReturnDetail(req.body);
        returnDetail.return_id = Date.now();
        let result = await returnDetail.save();
        console.log("Success");
        response.success(req, res, "Success addReturns", returnDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/addMultipleReturns", authenticateToken, async function (req, res) {
    console.log("Enter: addMultipleReturns",req.body);
    try {


        let json = req.body;
        let result = await ReturnDetail.collection.insertMany(json);
        console.log("Success");
        response.success(req, res, "Success addDeal", result.insertedIds);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


//Added New API to fetch cutomers,leads,products 
router.get("/globalSearch", async function (req, res) {
    try {

        let allUsers = await ObjectDetail.find({});
        let allProducts = await ProductDetail.find({});
        if (allUsers && allProducts) {
            console.log("herer", allUsers, allProducts)
            let finalArray = allUsers.concat(allProducts);
            response.success(req, res, "Success", finalArray);
        }

    }
    catch (error) {
        console.log("error", error)
        response.success(req, res, "Error", "");
    }
})

//Added New Logic in searching --START


router.get("/globalSearchByKeywordAndSection/:id/:type", async function (req, res) {
    let result,finalArr= [],checkCompleted=false;
    console.log(req.params.type);
    try {
        //Return the all the customers with matching word
        if(req.params.type == "customers")
         result = await ObjectDetail.find({ first_name: { $regex: new RegExp(req.params.id, "i") } ,object_type:3});
        else if(req.params.type == "suppliers")
        result = await SuppliernameDetail.find({ supplier_name: { $regex: new RegExp(req.params.id, "i") }});
        else if(req.params.type == "purchases"){
                let purchaseDetailsArr =await PurchaseDetail.find();
                let objArr = [];
                for (var k = 0; k < purchaseDetailsArr.length; k++) {
                    let supplier_id = purchaseDetailsArr[k].supplier_id;
                    let supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
                    if (supplier == null) continue;
                    let obj = {
                        "purchase_id": purchaseDetailsArr[k].purchase_id,
                        "supplier_id": purchaseDetailsArr[k].supplier_id,
                        "purchases_date": purchaseDetailsArr[k].purchases_date,
                        "total_cost": purchaseDetailsArr[k].total_cost,
                        "product_name": purchaseDetailsArr[k].product_name,
                        "warehouse_name": purchaseDetailsArr[k].warehouse_name,
                        "supplier_name": supplier.supplier_name,
                        "supplier_phone": supplier.supplier_phone
            
                    };
                    objArr.push(obj);
                }
                objArr.map(x=>{
                    if(x.supplier_name.includes(req.params.id)){
                        finalArr.push(x)
                    }
                    checkCompleted=true
                })
                if(checkCompleted)
                result = finalArr       
        }
        else if(req.params.type == "return"){
            let returnDetailsArr = await ReturnDetail.find()
            let objArr = [],obj,supplier,customer;
            for (var k = 0; k < returnDetailsArr.length; k++) {
            let supplier_id = returnDetailsArr[k].supplier_id;
            if(returnDetailsArr[k].activity_type == "customer")
            customer = await ObjectDetail.findOne({ "object_id": returnDetailsArr[k].object_id }); 
            else
            supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
            if(returnDetailsArr[k].activity_type == "customer")
            {
            obj = {
            "return_id": returnDetailsArr[k].return_id,
            "warehouse_name": returnDetailsArr[k].warehouse_name,
            "object_id": returnDetailsArr[k].object_id,
            "returns_date": returnDetailsArr[k].returns_date,
            "total_cost": returnDetailsArr[k].total_cost,
            "product_name": returnDetailsArr[k].product_name,
            "supplier_name": customer.first_name,
            "supplier_phone": customer.phone,
            "return_type":"customer"
            };
            }
            else{
            obj = {
            "return_id": returnDetailsArr[k].return_id,
            "warehouse_name": returnDetailsArr[k].warehouse_name,
            "supplier_id": returnDetailsArr[k].supplier_id,
            "returns_date": returnDetailsArr[k].returns_date,
            "total_cost": returnDetailsArr[k].total_cost,
            "product_name": returnDetailsArr[k].product_name,              
            "supplier_name": supplier.supplier_name,
            "supplier_phone": supplier.supplier_phone,
            "return_type":"suppliers"
            };
            }
            objArr.push(obj);
            }
            objArr.map(x=>{
                if(x.supplier_name.includes(req.params.id)){
                    finalArr.push(x)
                }
                checkCompleted=true
            })
            if(checkCompleted)
            result = finalArr      
        }
        else if(req.params.type == "expense"){
            result = await ExpenseDetail.find({ expense_item: { $regex: new RegExp(req.params.id, "i") } });
        }
        else if(req.params.type == "invoice"){
            let invoiceDetailsArr = await InvoiceDetails.find();
            let objArr = [];
            for (var k = 0; k < invoiceDetailsArr.length; k++) {
            let object_id = invoiceDetailsArr[k].object_id;
            let vendor = await ObjectDetail.findOne({ "object_id": object_id });
            if (vendor == null) continue;
            let obj = {
                "invoice_id": invoiceDetailsArr[k].invoice_id,
                "object_id": invoiceDetailsArr[k].object_id,
                "date": invoiceDetailsArr[k].date,
                "total_cost": invoiceDetailsArr[k].total_cost,
                "product_name": invoiceDetailsArr[k].product_name,
                "first_name": vendor.first_name,
                "phone": vendor.phone
            };
            objArr.push(obj);
            }
            objArr.map(x=>{
                if(x.first_name.includes(req.params.id)){
                    finalArr.push(x)
                }
                checkCompleted=true
            })
            if(checkCompleted)
            result = finalArr    
        }
        else if(req.params.type == "stock"){
            result = await ProductDetail.find({ code: { $regex: new RegExp(req.params.id, "i") } });
        }
        else if(req.params.type == "stockInReturn"){
            result = await ProductDetail.find( { code: { $regex: new RegExp(req.params.id, "i") } ,"product_returned_total":{ $gte: 1 }});
        }
        else if(req.params.type == "userEmailAddVisits"){
        checkCompleted=false
        let AddVisitslistArr = await  AddvisitsDetail.find({})
        let objArr = [];
        for (var k = 0; k < AddVisitslistArr.length; k++) {
            let object_id = AddVisitslistArr[k].object_id;
            let customer = await ObjectDetail.findOne({ "object_id": object_id });
            if (customer == null) continue;
            let obj = {
                "visit_id": AddVisitslistArr[k].visit_id,
                "visits_note": AddVisitslistArr[k].visits_note,
                "follow_up_date": AddVisitslistArr[k].follow_up_date,
                "lat": AddVisitslistArr[k].lat,
                "long": AddVisitslistArr[k].long,
                "object_id": AddVisitslistArr[k].object_id,
                "created_by": AddVisitslistArr[k].created_by,
                "created_time": AddVisitslistArr[k].created_time,
                "updated_by": AddVisitslistArr[k].updated_by,
                "modified_time": AddVisitslistArr[k].modified_time,
                "email": customer.email,
                "phone": customer.phone,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "other_address": customer.other_address,
                "company_name": customer.company_name,
                "department": customer.department,
                "visit_added_by_email": customer.visit_added_by_email,
            };
            objArr.push(obj);
        }
        objArr.map(x=>{
            if(x.created_by.includes(req.params.id)){
                finalArr.push(x)
            }
            checkCompleted=true
        })
        if(checkCompleted)
        result = finalArr  
            
        }
        else if(req.params.type == "ScheduleVisits"){
            result = await ShedulevisitsDetail.find({ email: { $regex: new RegExp(req.params.id, "i") } });
        }
        else if(req.params.type == "deal"){
            checkCompleted=false
            let objArr = [],finalArr=[];
            objArr = await  DealDetail.find({})
            objArr.map(x=>{
                if(x.deal_name.includes(req.params.id)){
                    finalArr.push(x)
                }
                checkCompleted=true
            })
            if(checkCompleted)
            result = finalArr  
        }
        else if(req.params.type == "products"){
            result = await ProductDetail.find({ product_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "contacts"){
            result =await ObjectDetail.find({ first_name: { $regex: new RegExp(req.params.id, "i") } ,object_type:1});
        }
        else if(req.params.type == "leads"){
            result =await ObjectDetail.find({ first_name: { $regex: new RegExp(req.params.id, "i") } ,object_type:2});
        }
        else if(req.params.type == "campaign"){
            result =await CampaignDetail.find({ campaign_owner: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "activity"){
            result =await ActivityDetail.find({ record_type: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "faq"){
            result =await FaqDetail.find({ questions: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "ticket"){
            result =await Serviceticketing.find({ assigned_users: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "quotes"){
        let quoteDetailsArr = await QuoteDetail.find();
        let objArr = [];
        for (var k = 0; k < quoteDetailsArr.length; k++) {
        let object_id = quoteDetailsArr[k].object_id;
        let vendor = await ObjectDetail.findOne({ "object_id": object_id,first_name: { $regex: new RegExp(req.params.id, "i") }});
        if (vendor == null) continue;
        let obj = {
            "quote_id": quoteDetailsArr[k].quote_id,
            "object_id": quoteDetailsArr[k].object_id,
            "quotation_date": quoteDetailsArr[k].quotation_date,
            "total_cost": quoteDetailsArr[k].total_cost,
            "product_name": quoteDetailsArr[k].product_name,
            "first_name": vendor.first_name,
            "phone": vendor.phone
        };
        objArr.push(obj);
        }
        result =objArr
        }
        else if(req.params.type == "employee"){
            result =await EmployeeDetailSchema.find({ first_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "holiday"){
            result =await HolidayDetailSchema.find({ holiday_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "leaves"){
            let leaveDetailsArr =await LeaveDetailSchema.find({});
              leaveDetailsArr.map(x=>{
                if(x.leave_type.toLowerCase().includes(req.params.id.toLowerCase())){
                    finalArr.push(x)
                }
                checkCompleted=true
            })
            if(checkCompleted)
            result = finalArr       
        }
        else if(req.params.type == "training"){
            let trainingDetailsArr =await TrainingDetailSchema.find({});
            console.log(trainingDetailsArr);
            if(trainingDetailsArr)
             trainingDetailsArr.map(x=>{
                if(x.training_type.toLowerCase().includes(req.params.id.toLowerCase())){
                    finalArr.push(x)
                }
                checkCompleted=true
            })
            console.log(finalArr);
            if(checkCompleted)
            result = finalArr      
             }
        else if(req.params.type == "travel"){
            result =await TravelDetailSchema.find({ employee_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "candidate"){
            result =await CandidateDetailSchema.find({ candidate_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "project"){
            result =await ProjectDetailSchema.find({ project_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "attendence"){
        let attendenceArr = await AttendanceDetailSchema.find();
        let objArr = [];
        for (var k = 0; k < attendenceArr.length; k++) {
        let employee_id = attendenceArr[k].employee_id;
        let vendor = await EmployeeDetailSchema.findOne({ "employee_id": employee_id,first_name: { $regex: new RegExp(req.params.id, "i") }});
        if (vendor == null) continue;
        let obj = {
            "employee_id": attendenceArr[k].employee_id,
            "leave_type": attendenceArr[k].leave_type,
            "leave_from": attendenceArr[k].leave_from,
            "leave_to": attendenceArr[k].leave_to,
            "leave_reason": attendenceArr[k].leave_reason,
            "attendance_status": vendor.attendance_status,
            "created_by":attendenceArr[k].created_by,
            "created_time":attendenceArr[k].created_time,
            "updated_by":attendenceArr[k].updated_by,
            "modified_time":attendenceArr[k].modified_time,
            "attendance_id":attendenceArr[k].attendance_id,
        };
        objArr.push(obj);
        }
        result =objArr
        }
        else if(req.params.type == "leaveType"){
            result =await LeaveTypeDetailSchema.find({ leavetype_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "task"){
            result =await TaskDetailSchema.find({ task_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "organisationInfo"){
            result =await OrganisationInfoDetailsSchema.find({ orginfo_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "notice"){
            let noticeDetailsArr =await NoticetabDetail.find({});
             noticeDetailsArr.map(x=>{
                if(x.notice_type.toLowerCase().includes(req.params.id.toLowerCase())){
                    finalArr.push(x)
                }
                checkCompleted=true
            })
            if(checkCompleted)
            result = finalArr       
        }
        else if(req.params.type == "payroll"){
            let payrollArr = await PayrollDetailSchema.find();
        let objArr = [];
        for (var k = 0; k < payrollArr.length; k++) {
        let employee_id = payrollArr[k].employee_id;
        let vendor = await EmployeeDetailSchema.findOne({ "employee_id": employee_id,first_name: { $regex: new RegExp(req.params.id, "i") }});
        if (vendor == null) continue;
        let obj = {
            "payroll_id": payrollArr[k].payroll_id,
            "employee_id": payrollArr[k].employee_id,
            "basic_salary": payrollArr[k].basic_salary,
            "allowance_transportation": payrollArr[k].allowance_transportation,
            "allowance_food": payrollArr[k].allowance_food,
            "allowance_accomadation": payrollArr[k].allowance_accomadation,
            "net_salary": payrollArr[k].net_salary,
            "created_by":payrollArr[k].created_by,
            "created_time":payrollArr[k].created_time,
            "updated_by":payrollArr[k].updated_by,
            "modified_time":payrollArr[k].modified_time,
            "attendance_id":payrollArr[k].attendance_id,
        };
        objArr.push(obj);
        }
        result =objArr
        }
        else if(req.params.type == "designation"){
            result =await DesignationSchema.find({ designation_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "department"){
            result =await DepartmentDetail.find({ department_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "employeestatus"){
            result =await EmployeestatusSchema.find({ employee_status: { $regex: new RegExp(req.params.id, "i") }});
        }
        else if(req.params.type == "policy"){
            result =await PolicyDetail.find({ policy_name: { $regex: new RegExp(req.params.id, "i") }});
        }
        
        // result =await AttendanceDetailSchema.find({ : { $regex: new RegExp(req.params.id, "i") }});
        // let products = await ProductDetail.find({ "product_name":  });
        // let finalArray = customer.concat(products);

        response.success(req, res, "Success", result);
    } catch (error) {
    }
})

router.get("/globalSearchSalesByKeyword/:id", async function (req, res) {
    try {
        //Return the all the customers with matching word
        let customer = await ObjectDetail.find({ "first_name": { $regex: new RegExp(req.params.id, "i") } });
        let products = await ProductDetail.find({ "product_name": { $regex: new RegExp(req.params.id, "i") } });
        let finalArray = customer.concat(products);

        response.success(req, res, "Success", finalArray);
    } catch (error) {
    }
})
router.get("/globalSearchMarketingByKeyword/:id", async function (req, res) {
    try {
        //Return the all the customers with matching word
        let customer = await ObjectDetail.find({ "first_name": { $regex: new RegExp(req.params.id, "i") } });
        let campaign = await CampaignDetail.find({ "campaign_name": { $regex: new RegExp(req.params.id, "i") } });
        let contacts = await ContactDetail.find({ "first_name": { $regex: new RegExp(req.params.id, "i") } });
        let finalArray = customer.concat(campaign, contacts);

        response.success(req, res, "Success", finalArray);
    } catch (error) {
    }
})
router.get("/globalSearchInventoryByKeyword/:id", async function (req, res) {
    try {
         
            let purchaseDetailsArr = await PurchaseDetail.find({})
            let objArrPurchase = [],purchases;
            for (var k = 0; k < purchaseDetailsArr.length; k++) {
                let supplier_id = purchaseDetailsArr[k].supplier_id;
                let supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id, "supplier_name": { $regex: new RegExp(req.params.id, "i") } });
                if (supplier == null) continue;
                let obj = {
                    "purchase_id": purchaseDetailsArr[k].purchase_id,
                    "supplier_id": purchaseDetailsArr[k].supplier_id,
                    "purchases_date": purchaseDetailsArr[k].purchases_date,
                    "total_cost": purchaseDetailsArr[k].total_cost,
                    "product_name": purchaseDetailsArr[k].product_name,
                    "warehouse_name": purchaseDetailsArr[k].warehouse_name,
                    "supplier_name": supplier.supplier_name,
                    "supplier_phone": supplier.supplier_phone,
                    "created_time":purchaseDetailsArr[k].created_time,
                    "global_search":supplier.supplier_name,
                };
                objArrPurchase.push(obj);
            }
            purchases =objArrPurchase
            let returnDetailsArr = await ReturnDetail.find({});
            console.log(returnDetailsArr)
            let objArrayReturn = [],obj,supplier,customer,returns;
            for (var k = 0; k < returnDetailsArr.length; k++) {
            let supplier_id = returnDetailsArr[k].supplier_id;
            if(returnDetailsArr[k].activity_type == "customer"){
                customer = await ObjectDetail.findOne({ "object_id": returnDetailsArr[k].object_id,"first_name": { $regex: new RegExp(req.params.id, "i") } }); 
                if(customer){
                    obj = {
                    "return_id": returnDetailsArr[k].return_id,
                    "warehouse_name": returnDetailsArr[k].warehouse_name,
                    "object_id": returnDetailsArr[k].object_id,
                    "returns_date": returnDetailsArr[k].returns_date,
                    "total_cost": returnDetailsArr[k].total_cost,
                    "product_name": returnDetailsArr[k].product_name,
                    "supplier_name": customer.first_name,
                    "supplier_phone": customer.phone,
                    "return_type":"customer",
                    "global_search":customer.first_name,
                    };
                }
               
            }
            else{
                supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id,"supplier_name": { $regex: new RegExp(req.params.id, "i") } });
                if(supplier){
                     obj = {
                    "return_id": returnDetailsArr[k].return_id,
                    "warehouse_name": returnDetailsArr[k].warehouse_name,
                    "supplier_id": returnDetailsArr[k].supplier_id,
                    "returns_date": returnDetailsArr[k].returns_date,
                    "total_cost": returnDetailsArr[k].total_cost,
                    "product_name": returnDetailsArr[k].product_name,              
                    "supplier_name": supplier.supplier_name,
                    "supplier_phone": supplier.supplier_phone,
                    "return_type":"supplier",
                    "global_search":supplier.supplier_name,
                    };
                }
               
            }
            if(obj)
            objArrayReturn.push(obj);
            }
            returns = objArrayReturn;
            let invoiceDetailsArr = await InvoiceDetails.find({});
            let objArrayInvoice = [],invoices;
            for (var k = 0; k < invoiceDetailsArr.length; k++) {
            let object_id = invoiceDetailsArr[k].object_id;
            let vendor = await ObjectDetail.findOne({ "object_id": object_id,"first_name": { $regex: new RegExp(req.params.id, "i") } });
            if (vendor == null) continue;
            let obj = {
                "invoice_id": invoiceDetailsArr[k].invoice_id,
                "object_id": invoiceDetailsArr[k].object_id,
                "date": invoiceDetailsArr[k].date,
                "total_cost": invoiceDetailsArr[k].total_cost,
                "product_name": invoiceDetailsArr[k].product_name,
                "first_name": vendor.first_name,
                "phone": vendor.phone,
                "created_time":invoiceDetailsArr[k].created_time,
                "global_search": vendor.first_name,
            };
            objArrayInvoice.push(obj);
            }
            invoices =objArrayInvoice;
            console.log(objArrayInvoice,objArrayReturn,objArrPurchase   )
            let finalArray = purchases.concat(returns, invoices);
            response.success(req, res, "Success", finalArray);
    } catch (error) {
        console.log("I am error ",error);
    }
})

router.get("/globalSearchHrmsByKeyword/:id", async function (req, res) {
    try {
        console.log(req.params.id)
        //Return the all the customers with matching word
        let employee = await EmployeeDetailSchema.find({ "first_name": { $regex: new RegExp(req.params.id, "i") } });
        let project = await ProjectDetailSchema.find({ "project_name": { $regex: new RegExp(req.params.id, "i") } });
        let holiday = await HolidayDetailSchema.find({ "holiday_name": { $regex: new RegExp(req.params.id, "i") } });
        let finalArray = employee.concat(project, holiday);

        response.success(req, res, "Success", finalArray);
    } catch (error) {
    }
})

router.get("/globalSearchSalesByDate/:startDate/:endDate/:page", async function (req, res) {
    try {
        console.log(req.params)
        let dashObj = {
            "totalcustomers": [],
            "totaldeals": [],
            "totalproducts": [],
            "totalquotes": [],
            "totalusers": [],
            "totalleads": [],
            "totaladdvisits": [],
            "totalschedulevisits": [],
            "totalScheduleCount": 0,
            "totalCustomersCount": 0,
            "totalDealsCount": 0,
            "totalProductsCount": 0,
            "totalQuotesCount": 0,
            "totalUsersCount": 0,
            "totalLeadsCount": 0,
            "totalAddVisitsCount": 0,

        }
        dashObj.totalcustomers = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER }), req.params)).res;
        dashObj.totalCustomersCount = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER }), req.params)).count;

        dashObj.totaldeals = await (await paginationByDate(DealDetail, req.params)).res;
        dashObj.totalDealsCount = await (await paginationByDate(DealDetail, req.params)).count;

        dashObj.totalproducts = await (await paginationByDate(ProductDetail, req.params)).res;
        dashObj.totalProductsCount = await (await paginationByDate(ProductDetail, req.params)).count;

        dashObj.totalschedulevisits = await (await paginationByDate(ShedulevisitsDetail, req.params)).res;
        dashObj.totalScheduleCount = await (await paginationByDate(ShedulevisitsDetail, req.params)).count

        dashObj.totalusers = await (await paginationByDate(UserDetail, req.params)).res;
        dashObj.totalUsersCount = await (await paginationByDate(UserDetail, req.params)).count


        dashObj.totalleads = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.LEAD }), req.params)).res;
        dashObj.totalLeadsCount = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.LEAD }), req.params)).count;

        // dashObj.totalleads = await ObjectDetail.find({"object_type": constants.OBJECT_TYPES.LEAD,"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});

        let AddVisitslistArr = await (await paginationByDate(AddvisitsDetail, req.params)).res;
        dashObj.totalAddVisitsCount = await (await paginationByDate(AddvisitsDetail, req.params)).count
        console.log("AddVisitslistArr", AddVisitslistArr.length)
        //    let AddVisitslistArr = await AddvisitsDetail.find({"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});
        let objArr = [];
        for (var k = 0; k < AddVisitslistArr.length; k++) {
            console.log("AddVisitslistArr[k]::", AddVisitslistArr[k]);
            let id = AddVisitslistArr[k].object_id;
            console.log("I am object_id", id);
            let customer = await ObjectDetail.findOne({ "object_id": id });
            console.log("I am customer", customer);
            if (customer == null) continue;
            let obj = {
                "visit_id": AddVisitslistArr[k].visit_id,
                "visits_note": AddVisitslistArr[k].visits_note,
                "follow_up_date": AddVisitslistArr[k].follow_up_date,
                "lat": AddVisitslistArr[k].lat,
                "long": AddVisitslistArr[k].long,
                "object_id": AddVisitslistArr[k].object_id,
                "created_by": AddVisitslistArr[k].created_by,
                "created_time": AddVisitslistArr[k].created_time,
                "updated_by": AddVisitslistArr[k].updated_by,
                "modified_time": AddVisitslistArr[k].modified_time,

                "email": customer.email,
                "phone": customer.phone,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "other_address": customer.other_address,
                "company_name": customer.company_name,

                "department": customer.department,
                "visit_added_by_email": customer.visit_added_by_email,
            };
            objArr.push(obj);
            console.log("I am objArr", objArr)
        }
        dashObj.totaladdvisits = objArr;
        // dashObj.totalproducts = await  ProductDetail.find({"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});
        let quoteDetailsArr = await (await paginationByDate(QuoteDetail, req.params)).res;
        // let quoteDetailsArr = await QuoteDetail.find({"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});
        let objArr1 = [];
        for (var k = 0; k < quoteDetailsArr.length; k++) {
            console.log("QuoteDetailArr[k]::", quoteDetailsArr[k].object_id);
            let object_id = quoteDetailsArr[k].object_id;
            let vendor = await ObjectDetail.findOne({ "object_id": object_id });
            console.log("vendor:", vendor)
            if (vendor == null) continue;
            let obj = {
                "quote_id": quoteDetailsArr[k].quote_id,
                "object_id": quoteDetailsArr[k].object_id,
                "quotation_date": quoteDetailsArr[k].quotation_date,
                "total_cost": quoteDetailsArr[k].total_cost,
                "product_name": quoteDetailsArr[k].product_name,
                "first_name": vendor.first_name,
                "phone": vendor.phone


            };
            objArr1.push(obj);
        }
        dashObj.totalquotes = objArr1;
        dashObj.totalQuotesCount = await (await paginationByDate(QuoteDetail, req.params)).count;






        response.success(req, res, "Success", dashObj);
    }
    catch (error) {
        console.log("Nooo")
    }

})
router.get("/globalSearchMarketingByDate/:startDate/:endDate/:page", async function (req, res) {
    try {
        console.log(req.params)
        let dashObj = {
            "totalContacts": [],
            "totalContactsCount": 0,
            "totalCustomers": [],
            "totalCustomersCount": 0,
            "totalLeads": [],
            "totalLeadsCount": 0,
            "totalCampaigns": [],
            "totalCampaignsCount": 0,
            "totalActivities": [],
            "totalActivitiesCount": 0,
            "totalUsers": [],
            "totalUsersCount": 0,






        }
        dashObj.totalCustomers = await (await paginationByDate(ObjectDetail, req.params)).res;
        dashObj.totalCustomersCount = await (await paginationByDate(ObjectDetail, req.params)).count;
        dashObj.totalLeads = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.LEAD }), req.params)).res;
        dashObj.totalLeadsCount = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.LEAD }), req.params)).count;
        dashObj.totalCampaigns = await (await paginationByDate(CampaignDetail, req.params)).res;
        dashObj.totalCampaignsCount = await (await paginationByDate(CampaignDetail, req.params)).count;
        dashObj.totalContacts = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CONTACT }), req.params)).res;
        dashObj.totalContactsCount = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CONTACT }), req.params)).count;

        dashObj.totalActivities = await (await paginationByDate(ActivityDetail, req.params)).res;
        dashObj.totalActivitiesCount = await (await paginationByDate(ActivityDetail, req.params)).count;
        dashObj.totalUsers = await (await paginationByDate(UserDetail, req.params)).res;
        dashObj.totalUsersCount = await (await paginationByDate(UserDetail, req.params)).count;

        // dashObj.totalContacts = await ContactusDetail.find({"created_time" :{ $gte : req.params.startDate,$lte : req.params.endDate} });
        // dashObj.totalCustomers  = await ObjectDetail.find({"created_time" :{ $gte : req.params.startDate,$lte : req.params.endDate} });
        // dashObj.totalLeads = await ObjectDetail.find({"object_type": constants.OBJECT_TYPES.LEAD,"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});
        // dashObj.totalCampaigns = await CampaignDetail.find({"created_time" :{ $gte : req.params.startDate,$lte : req.params.endDate} });
        // dashObj.totalActivities = await ActivityDetail.find({"created_time" :{ $gte : req.params.startDate,$lte : req.params.endDate} });
        // dashObj.totalUsers = await  UserDetail.find({"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});


        response.success(req, res, "Success", dashObj);
    }
    catch (error) {
        console.log("Nooo")
    }

})

router.get("/globalSearchServiceByDate/:startDate/:endDate/:page", async function (req, res) {
    try {
        console.log(req.params)
        let dashObj = {
            "totalCustomers": [],
            "totalFaq": [],
            "totalUsers": [],
            "totalCustomersCount": 0,
            "totalFaqCount": 0,
            "totalUsersCount": 0


        }

        dashObj.totalCustomers = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER }), req.params)).res;
        dashObj.totalCustomersCount = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER }), req.params)).count;
        dashObj.totalFaq = await (await paginationByDate(FaqDetail, req.params)).res;
        dashObj.totalFaqCount = await (await paginationByDate(FaqDetail, req.params)).count;
        dashObj.totalUsers = await (await paginationByDate(UserDetail, req.params)).res;
        dashObj.totalUsersCount = await (await paginationByDate(UserDetail, req.params)).count;

        // dashObj.totalCustomers  = await ObjectDetail.find({"object_type": constants.OBJECT_TYPES.CUSTOMER,"created_time" :{ $gte : req.params.startDate,$lte : req.params.endDate} });
        // dashObj.totalFaq = await FaqDetail.find({"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});
        // dashObj.totalUsers = await  UserDetail.find({"created_time" :{ $gte : req.params.startDate,$lte :req.params.endDate}});


        response.success(req, res, "Success", dashObj);
    }
    catch (error) {
        console.log("error",error)
    }

})
router.get("/globalSearchServiceByKeyword/:id", async function (req, res) {
    try {
        //Return the all the customers with matching word
        let customer = await ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER, "first_name": { $regex: new RegExp(req.params.id, "i") } });
        let faq = await FaqDetail.find({ "questions": { $regex: new RegExp(req.params.id, "i") } });
        let finalArray = customer.concat(faq);

        response.success(req, res, "Success", finalArray);
    } catch (error) {
    }
})

router.get("/globalSearchInventoryByDate/:startDate/:endDate/:page", async function (req, res) {
    try {
        console.log(req.params)
        let dashObj = {
            "totalCustomers": [],
            "totalCustomersCount": 0,
            "totalProducts":[],
            "totalProductsCount":0,
            "totalSuppliers":[],
            "totalSuppliersCount":0,
            "totalPurchases":[],
            "totalPurchasesCount":0,
            "totalReturns":[],
            "totalReturnsCount":0,
            "totalInvoices":[],
            "totalInvoiceCount":0,
            "totalExpense":[],
            "totalExpenseCount":0,
            "totalReturnedProducts":[],
            "totalReturnedProductCount":0,
        }
        dashObj.totalProducts = await (await paginationByDate(ProductDetail, req.params)).res;
        dashObj.totalProductsCount = await (await paginationByDate(ProductDetail, req.params)).count;
        dashObj.totalReturnedProducts = await (await paginationByDate(ProductDetail.find({ "product_returned_total": { $gte: 1 }}), req.params)).res;
        dashObj.totalReturnedProductCount = await (await paginationByDate(ProductDetail.find({ "product_returned_total": { $gte: 1 }}), req.params)).count;
        dashObj.totalCustomers = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER }), req.params)).res;
        dashObj.totalCustomersCount = await (await paginationByDate(ObjectDetail.find({ "object_type": constants.OBJECT_TYPES.CUSTOMER }), req.params)).count;
        dashObj.totalSuppliers  =  await (await paginationByDate(SuppliernameDetail, req.params)).res;
        dashObj.totalSuppliersCount  =  await (await paginationByDate(SuppliernameDetail, req.params)).count;
        dashObj.totalPurchases  =  await (await paginationByDate(PurchaseDetail, req.params)).res;
        dashObj.totalPurchasesCount  =  await (await paginationByDate(PurchaseDetail, req.params)).count;
        dashObj.totalReturns  =  await (await paginationByDate(ReturnDetail, req.params)).res;
        dashObj.totalReturnsCount  =  await (await paginationByDate(ReturnDetail, req.params)).count;
        dashObj.totalInvoices  =  await (await paginationByDate(InvoiceDetails, req.params)).res;
        dashObj.totalInvoiceCount  =  await (await paginationByDate(InvoiceDetails, req.params)).count;
        dashObj.totalExpense  =  await (await paginationByDate(ExpenseDetail, req.params)).res;
        dashObj.totalExpenseCount  =  await (await paginationByDate(ExpenseDetail, req.params)).count;
        response.success(req, res, "Success", dashObj);
    }
    catch (error) {
        console.log("error", error)
    }

})
router.get("/globalSearchHrmsByDate/:startDate/:endDate/:page", async function (req, res) {
    try {
        console.log(req.params)
        let dashObj = {
            "totalEmployees": [],
            "totalEmployeesCount": 0,
            "totalHolidays":[],
            "totalHolidaysCount":0,
            "totalLeaves":[],
            "totalLeavesCount":0,
            "totalTrainings":[],
            "totalTrainingsCount":0,
            "totalNotices":[],
            "totalNoticesCount":0,
            "totalProjects":[],
            "totalProjectsCount":0,
            "candidateArr":[],
            "candidateArrCount":0,
            "policyArr":[],
            'policyArrCount':0,
            'expenseArr':[],
            'expenseArrCount':0

        }
        dashObj.totalEmployees = await (await paginationByDate(EmployeeDetailSchema, req.params)).res;
        dashObj.totalEmployeesCount = await (await paginationByDate(EmployeeDetailSchema, req.params)).count;
        dashObj.totalHolidays = await (await paginationByDate(HolidayDetailSchema, req.params)).res;
        dashObj.totalHolidaysCount = await (await paginationByDate(HolidayDetailSchema, req.params)).count;
        dashObj.totalLeaves = await (await paginationByDate(LeaveDetailSchema, req.params)).res;
        dashObj.totalLeavesCount = await (await paginationByDate(LeaveDetailSchema, req.params)).count;
        
        dashObj.totalTrainings = await (await paginationByDate(TrainingDetailSchema, req.params)).res;
        dashObj.totalTrainingsCount = await (await paginationByDate(TrainingDetailSchema, req.params)).count;
        dashObj.totalInterviews = await (await paginationByDate(CandidateDetailSchema, req.params)).res;
        dashObj.totalInterviewsCount = await (await paginationByDate(CandidateDetailSchema, req.params)).count;
        dashObj.totalProjects = await (await paginationByDate(ProjectDetailSchema, req.params)).res;
        dashObj.totalProjectsCount = await (await paginationByDate(ProjectDetailSchema, req.params)).count;
        dashObj.totalNotices = await (await paginationByDate(NoticetabDetail, req.params)).res;
        dashObj.totalNoticesCount = await (await paginationByDate(NoticetabDetail, req.params)).count;
        dashObj.candidateArr = await (await paginationByDate(CandidateDetailSchema, req.params)).res;
        dashObj.candidateArrCount = await (await paginationByDate(CandidateDetailSchema, req.params)).count;

        dashObj.policyArr = await (await paginationByDate(PolicyDetail, req.params)).res;
        dashObj.policyArrCount = await (await paginationByDate(PolicyDetail, req.params)).count;
        dashObj.expenseArr = await (await paginationByDate(ExpenseDetail, req.params)).res;
        dashObj.expenseArrCount = await (await paginationByDate(ExpenseDetail, req.params)).count;
        
        response.success(req, res, "Success", dashObj);
    }
    catch (error) {
        console.log("error", error)
    }

})
//Added New Logic in searching --END

//Added Pagination for scheduled Visits
router.get('/getScheduledVisitsByPage', paginatedResults(ShedulevisitsDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination visits
router.get('/getaddVisitsByPage', paginatedResults(AddvisitsDetail), (req, res) => {
    res.json(res.paginatedResults);
})

//pagination customer
router.get('/getcustomerByPage', paginatedResults( ObjectDetail,3), (req, res) => {
    res.json(res.paginatedResults);
})

//pagination leads
router.get('/getleadsByPage', paginatedResults(ObjectDetail,2), (req, res) => {
    res.json(res.paginatedResults);
})

//pagination deals
router.get('/getDealsByPage', paginatedResults(DealDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination products
router.get('/getProductsByPage', paginatedResults(ProductDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination returned products
router.get('/getReturnedProductsByPage', paginatedResults(ProductDetail,"return"), (req, res) => {
    res.json(res.paginatedResults)
})
router.get('/getPlansByPage', paginatedResults(PlansDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//getallQuotes
router.get('/getQuotesByPage', paginatedResults(QuoteDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//users
router.get('/getUsersForAdminByPage', paginatedResults(UserDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination  campaignactive
router.get('/getCampaigntypeByPage', paginatedResults(CampaigntypeDetail), (req, res) => {
    res.json(res.paginatedResults)
})

//Faq
router.get('/getFaqByPage', paginatedResults(FaqDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//service ticketing
router.get('/getServiceTicketingByPage', paginatedResults(Serviceticketing), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination department

router.get('/getDepartmentByPage', paginatedResults(DepartmentDetail), (req, res) => {
    res.json(res.paginatedResults)
})

//pagination source
router.get('/getSourceByPage', paginatedResults(SourceDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//expenses
router.get('/getExpensesByPage', paginatedResults(ExpenseDetail), (req, res) => {
    res.json(res.paginatedResults)
})


//pagination Category
router.get('/getCategoryByPage', paginatedResults(CategoryDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination Currency
router.get('/getCurrencyByPage', paginatedResults(CurrencyDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination ExpenseItem
router.get('/getExpenseItemByPage', paginatedResults(ExpenseItemDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination Suppliername
router.get('/getSuppliernameByPage', paginatedResults(SuppliernameDetail), (req, res) => {
    res.json(res.paginatedResults)
})

//pagination Leadsource
router.get('/getLeadsourceByPage', paginatedResults(LeadsourceDetail), (req, res) => {
    res.json(res.paginatedResults)
})

//pagination pipeline
router.get('/getPipelineByPage', paginatedResults(PipelineDetail), (req, res) => {
    res.json(res.paginatedResults)
})


//pagination salestage
router.get('/getSalesstageByPage', paginatedResults(SalesStageDetail), (req, res) => {
    res.json(res.paginatedResults)
})



//pagination contacts
router.get('/getContactsByPage', paginatedResults(ObjectDetail,1), (req, res) => {
    res.json(res.paginatedResults)
})


//pagination campaign
router.get('/getCampaignByPage', paginatedResults(CampaignDetail), (req, res) => {
    res.json(res.paginatedResults)
})


//pagination activity
router.get('/getActivityByPage', paginatedResults(ActivityDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination  campaignactive
router.get('/getCampaignctiveByPage', paginatedResults(ActiveDetails), (req, res) => {
    res.json(res.paginatedResults)
})


//pagination  Purchase
router.get('/getPurchaseByPage', paginatedResults(PurchaseDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//pagination  Returns
router.get('/getReturnsByPage', paginatedResults(ReturnDetail), (req, res) => {
    res.json(res.paginatedResults)
})

//pagination  Invoice
router.get('/getInvoiceByPage', paginatedResults(InvoiceDetails), (req, res) => {
    res.json(res.paginatedResults)
})


//pagination warehouse
router.get('/getWarehouseByPage', paginatedResults(WarehouseDetail), (req, res) => {
    res.json(res.paginatedResults)
})

//designation
router.get('/getDesignationByPage', paginatedResults(DesignationSchema), (req, res) => {
    res.json(res.paginatedResults)
})

//Noticetab
router.get('/getNoticetabByPage', paginatedResults(NoticetabDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//travel
router.get('/getTravelByPage', paginatedResults(TravelDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//candidate
router.get('/getCandidateByPage', paginatedResults(CandidateDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//leave
router.get('/getLeaveByPage', paginatedResults(LeaveDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//employeestatus
router.get('/getEmployeestatusByPage', paginatedResults(EmployeestatusSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//projects
router.get('/getProjectByPage', paginatedResults(ProjectDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//attendance
router.get('/getAttendaceByPage', paginatedResults(AttendanceDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//payroll
router.get('/getPayrollsByPage', paginatedResults(PayrollDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//policy
router.get('/getPolicyByPage', paginatedResults(PolicyDetail), (req, res) => {
    res.json(res.paginatedResults)
})
//holiday
router.get('/getHolidayByPage', paginatedResults(HolidayDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
//holiday
router.get('/getHolidayByPage', paginatedResults(HolidayDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
router.get('/getTrainingByPage', paginatedResults(TrainingDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
router.get('/getEmployeeByPage', paginatedResults(EmployeeDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
router.get('/getTasksByPage', paginatedResults(TaskDetailSchema), (req, res) => {
    res.json(res.paginatedResults)
})
router.get('/getOrganisationInfoByPage', paginatedResults(OrganisationInfoDetailsSchema), (req, res) => {
    res.json(res.paginatedResults)
})

//Common function for pagination 
 function paginatedResults  (model,id) {
    // console.log("I am the model",model == AddvisitsDetail);
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        results.count = await model.countDocuments();
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
        if(model == AddvisitsDetail){
        let AddVisitslistArr = await  model.find().sort({ 'created_time': -1 }).limit(limit).skip(startIndex).exec();
        let objArr = [];
        for (var k = 0; k < AddVisitslistArr.length; k++) {
            let object_id = AddVisitslistArr[k].object_id;
            let customer = await ObjectDetail.findOne({ "object_id": object_id });
            if (customer == null) continue;
            let obj = {
                "visit_id": AddVisitslistArr[k].visit_id,
                "visits_note": AddVisitslistArr[k].visits_note,
                "follow_up_date": AddVisitslistArr[k].follow_up_date,
                "sales_email": AddVisitslistArr[k].sales_email,
                "lat": AddVisitslistArr[k].lat,
                "long": AddVisitslistArr[k].long,
                "object_id": AddVisitslistArr[k].object_id,
                "created_by": AddVisitslistArr[k].created_by,
                "created_time": AddVisitslistArr[k].created_time,
                "updated_by": AddVisitslistArr[k].updated_by,
                "modified_time": AddVisitslistArr[k].modified_time,
                "email": customer.email,
                "phone": customer.phone,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "other_address": customer.other_address,
                "company_name": customer.company_name,
                "department": customer.department,
                "visit_added_by_email": customer.visit_added_by_email,
            };
            objArr.push(obj);
        }
        results.results =objArr
        }
        else if(model == QuoteDetail){
        let quoteDetailsArr = await model.find().sort({ 'created_time': -1 }).limit(limit).skip(startIndex).exec();
        let objArr = [];
        for (var k = 0; k < quoteDetailsArr.length; k++) {
        console.log("QuoteDetailArr[k]::", quoteDetailsArr[k].object_id);
        let object_id = quoteDetailsArr[k].object_id;
        let vendor = await ObjectDetail.findOne({ "object_id": object_id });
        if (vendor == null) continue;
        let obj = {
            "quote_id": quoteDetailsArr[k].quote_id,
            "object_id": quoteDetailsArr[k].object_id,
            "quotation_date": quoteDetailsArr[k].quotation_date,
            "total_cost": quoteDetailsArr[k].total_cost,
            "product_name": quoteDetailsArr[k].product_name,
            "first_name": vendor.first_name,
            "phone": vendor.phone,
            "created_by":quoteDetailsArr[k].created_by,
            "created_time":quoteDetailsArr[k].created_time,
           "updated_by":quoteDetailsArr[k].updated_by,
            "modified_time":quoteDetailsArr[k].modified_time,
        };
        objArr.push(obj);
        }
        results.results =objArr
        }
        else if(model == PurchaseDetail){
        let purchaseDetailsArr = await model.find().sort({ 'created_time': -1 }).limit(limit).skip(startIndex).exec()
        let objArr = [];
        for (var k = 0; k < purchaseDetailsArr.length; k++) {
            let supplier_id = purchaseDetailsArr[k].supplier_id;
            let supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
            if (supplier == null) continue;
            let obj = {
                "purchase_id": purchaseDetailsArr[k].purchase_id,
                "supplier_id": purchaseDetailsArr[k].supplier_id,
                "purchases_date": purchaseDetailsArr[k].purchases_date,
                "total_cost": purchaseDetailsArr[k].total_cost,
                "product_name": purchaseDetailsArr[k].product_name,
                "warehouse_name": purchaseDetailsArr[k].warehouse_name,
                "supplier_name": supplier.supplier_name,
                "supplier_phone": supplier.supplier_phone,
                "created_time":purchaseDetailsArr[k].created_time,

            };
            objArr.push(obj);
        }
        results.results =objArr
        }
        else if(model == ReturnDetail){
        let returnDetailsArr = await model.find().sort({ 'created_time': -1 }).limit(limit).skip(startIndex).exec()
        let objArr = [],obj,supplier,customer;
        for (var k = 0; k < returnDetailsArr.length; k++) {
        let supplier_id = returnDetailsArr[k].supplier_id;
        if(returnDetailsArr[k].activity_type == "customer")
        customer = await ObjectDetail.findOne({ "object_id": returnDetailsArr[k].object_id }); 
        else
        supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
        if(returnDetailsArr[k].activity_type == "customer")
        {
        obj = {
        "return_id": returnDetailsArr[k].return_id,
        "warehouse_name": returnDetailsArr[k].warehouse_name,
        "object_id": returnDetailsArr[k].object_id,
        "returns_date": returnDetailsArr[k].returns_date,
        "total_cost": returnDetailsArr[k].total_cost,
        "product_name": returnDetailsArr[k].product_name,
        "supplier_name": customer.first_name,
        "supplier_phone": customer.phone,
        "return_type":"customer",
        'created_time':returnDetailsArr[k].created_time,
        };
        }
        else{
        obj = {
        "return_id": returnDetailsArr[k].return_id,
        "warehouse_name": returnDetailsArr[k].warehouse_name,
        "supplier_id": returnDetailsArr[k].supplier_id,
        "returns_date": returnDetailsArr[k].returns_date,
        "total_cost": returnDetailsArr[k].total_cost,
        "product_name": returnDetailsArr[k].product_name,              
        "supplier_name": supplier.supplier_name,
        "supplier_phone": supplier.supplier_phone,
        "return_type":"supplier",
        'created_time':returnDetailsArr[k].created_time,
        };
        }
        objArr.push(obj);
        }
        results.results =objArr;
        }
        else if(model == InvoiceDetails){
        let invoiceDetailsArr = await InvoiceDetails.find();
        let objArr = [];
        for (var k = 0; k < invoiceDetailsArr.length; k++) {
        let object_id = invoiceDetailsArr[k].object_id;
        let vendor = await ObjectDetail.findOne({ "object_id": object_id });
        if (vendor == null) continue;
        let obj = {
            "invoice_id": invoiceDetailsArr[k].invoice_id,
            "object_id": invoiceDetailsArr[k].object_id,
            "date": invoiceDetailsArr[k].date,
            "total_cost": invoiceDetailsArr[k].total_cost,
            "product_name": invoiceDetailsArr[k].product_name,
            "first_name": vendor.first_name,
            "phone": vendor.phone,
            "created_time":invoiceDetailsArr[k].created_time,
        };
        objArr.push(obj);
        }
        results.results =objArr;
        } 
        else if(model == ObjectDetail){
        results.count = await model.find({ "object_type":id}).countDocuments();
        if (endIndex < await model.find({ "object_type":id}).countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
            results.results = await model.find({ "object_type":id}).sort({ 'created_time': -1 }).limit(limit).skip(startIndex).exec()
        }  
        else if(model == ProductDetail && id =="return"){
            results.results = await model.find({"product_returned_total":{ $gte: 1 }}).sort({ 'created_time': -1 }).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results;
        }  
        else
        results.results = await model.find().sort({ 'created_time': -1 }).limit(limit).skip(startIndex).exec()
        // results.count = results.results.length
        res.paginatedResults = results;
        next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

async function paginationByDate(modal, params) {
    const page = params.page;
    const startDate = params.startDate;
    const endDate = params.endDate;
    const limit = 5
    let result = {
        res: [],
        count: 0
    }
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}
    results.count = (await modal.find({ "created_time": { $gte: startDate, $lte: endDate } })).length;
    if (endIndex < await modal.find({ "created_time": { $gte: startDate, $lte: endDate } }).exec()) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    if(modal == PurchaseDetail){
    let purchaseDetailsArr =await modal.find({ "created_time": { $gte: startDate, $lte: endDate } }).limit(limit).skip(startIndex);
    let objArr = [];
    for (var k = 0; k < purchaseDetailsArr.length; k++) {
        let supplier_id = purchaseDetailsArr[k].supplier_id;
        let supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
        if (supplier == null) continue;
        let obj = {
            "purchase_id": purchaseDetailsArr[k].purchase_id,
            "supplier_id": purchaseDetailsArr[k].supplier_id,
            "purchases_date": purchaseDetailsArr[k].purchases_date,
            "total_cost": purchaseDetailsArr[k].total_cost,
            "product_name": purchaseDetailsArr[k].product_name,
            "warehouse_name": purchaseDetailsArr[k].warehouse_name,
            "supplier_name": supplier.supplier_name,
            "supplier_phone": supplier.supplier_phone

        };
        objArr.push(obj);
    }
    result.res =objArr
    }
    else if(modal == ReturnDetail){
        let returnDetailsArr = await modal.find({ "created_time": { $gte: startDate, $lte: endDate } }).limit(limit).skip(startIndex);
        let objArr = [],obj,supplier,customer;
        for (var k = 0; k < returnDetailsArr.length; k++) {
        let supplier_id = returnDetailsArr[k].supplier_id;
        if(returnDetailsArr[k].activity_type == "customer")
        customer = await ObjectDetail.findOne({ "object_id": returnDetailsArr[k].object_id }); 
        else
        supplier = await SuppliernameDetail.findOne({ "supplier_id": supplier_id });
        if(returnDetailsArr[k].activity_type == "customer")
        {
        obj = {
        "return_id": returnDetailsArr[k].return_id,
        "warehouse_name": returnDetailsArr[k].warehouse_name,
        "object_id": returnDetailsArr[k].object_id,
        "returns_date": returnDetailsArr[k].returns_date,
        "total_cost": returnDetailsArr[k].total_cost,
        "product_name": returnDetailsArr[k].product_name,
        "supplier_name": customer.first_name,
        "supplier_phone": customer.phone,
        "return_type":"customer"
        };
        }
        else{
        obj = {
        "return_id": returnDetailsArr[k].return_id,
        "warehouse_name": returnDetailsArr[k].warehouse_name,
        "supplier_id": returnDetailsArr[k].supplier_id,
        "returns_date": returnDetailsArr[k].returns_date,
        "total_cost": returnDetailsArr[k].total_cost,
        "product_name": returnDetailsArr[k].product_name,              
        "supplier_name": supplier.supplier_name,
        "supplier_phone": supplier.supplier_phone,
        "return_type":"suppliers"
        };
        }
        objArr.push(obj);
        }
        result.res =objArr;
    }
    else if(modal == InvoiceDetails){
        let invoiceDetailsArr = await modal.find({ "created_time": { $gte: startDate, $lte: endDate } }).limit(limit).skip(startIndex);
        let objArr = [];
        for (var k = 0; k < invoiceDetailsArr.length; k++) {
        let object_id = invoiceDetailsArr[k].object_id;
        let vendor = await ObjectDetail.findOne({ "object_id": object_id });
        if (vendor == null) continue;
        let obj = {
            "invoice_id": invoiceDetailsArr[k].invoice_id,
            "object_id": invoiceDetailsArr[k].object_id,
            "date": invoiceDetailsArr[k].date,
            "total_cost": invoiceDetailsArr[k].total_cost,
            "product_name": invoiceDetailsArr[k].product_name,
            "first_name": vendor.first_name,
            "phone": vendor.phone
        };
        objArr.push(obj);
        }
        result.res =objArr;
        }
    else
    result.res = await modal.find({ "created_time": { $gte: startDate, $lte: endDate } }).limit(limit).skip(startIndex);
    result.count = results.count;
    return result;
}

//Create New DB

router.post("/createNewDB", async function (req, res) {
    try {
        let duplicateDB= await UserDetail.find({organziation_id:req.body.organisationName})
        let duplicateEmail =await UserDetail.find({ $or: [{ email: req.body.email }, { emailArray: req.body.email }]})
        console.log(duplicateEmail)
        if(duplicateDB.length>0 || duplicateEmail.length>0){
            response.success(req, res, "failed", "Organisation / Email Already Exists");
            return
        }
        //var url = `mongodb://localhost:27017/${newDB}`;
        const url = `mongodb://localhost:27017/${req.body.organisationName}`;
        //const ogoulDB = `mongodb://crm:!crm123@localhost:27017/ogoul_main_db`
        var user = new UserDetail({
            "email": req.body.email,
            "password": req.body.password,
            "usertype": "Super Admin",
            "first_name": req.body.firstName,
            "last_name": req.body.lastName,
            "phone": req.body.phone,
            "updated_by": req.body.email,
            "modified_time": Date.now(),
            "created_by": req.body.email,
            "created_time": Date.now(),
            "user_id": Date.now(),
            "organziation_id": req.body.organisationName,
            "currency": req.body.currency,

        });
        mongoose.connection.db.collection("user_details", async (err, collection) => {
            collection.insertOne(user).then(() => {
                mongoose.disconnect().then(() => {
                    console.log("Disconnected Called");
                    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
                      
                        if (err) throw err;
                        let db = mongoose.connection.db; // <-- This is your MongoDB driver instance.
                        db.createCollection("user_details", (err, result) => {
                            if (err) throw err;
                            db.collection("user_details").insertOne(user, (err, res) => {
                                if (err) throw err;
                            });
                        });
                        db.createCollection("field_detail", (err, result) => {
                            fs.readFile('public/field_details.json', 'utf8', (err, data) => {
                                if (err) throw err;
                                var json = EJSON.parse(data);
                                db.collection("field_detail").insertMany(json, (err, res) => {
                                    if (err) throw err;
                                });
                            })
                        });
                        response.success(req, res, "Success", "DB Created");
                    });
                });
            });
        });
       
    
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});




router.get("/switchDB/:name", async function (req, res) {
    try {
        let disconnectFlag = false,url;
        if(req.params.name == 'ogoul_main_db')
        url = `mongodb://localhost:27017/ogoul_main_db`;
        //  url = `mongodb://noauthCRM:test123@localhost:27017/ogoul_main_db`;
        else
        url = `mongodb://localhost:27017/${req.params.name}`;
        mongoose.disconnect().then(() => {
            mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
                () => { response.success(req, res, "Success", true) },
                err => { response.success(req, res, "Success", false) })
        })

    }
    catch (error) {
        console.log("I am the errorr", error)
    }
    
})

router.get("/switchDBOrg/:email", async function (req, res) {
    console.log(req.params.email);
    let db;
    let user = await UserDetail.findOne({ email: req.params.email });
    let subUser = await UserDetail.findOne({ emailArray: req.params.email });
    console.log(user, subUser);
    if (user || subUser) {
        if (user) db = user.organziation_id;
        else db = subUser.organziation_id;
        //var newDBUrl = `mongodb://localhost:27017/${db}`;
        var newDBUrl = `mongodb://localhost:27017/${db}`;
        mongoose.disconnect().then(() => {
            mongoose.connect(newDBUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
                () => { response.success(req, res, "Success", true) },
                err => { response.success(req, res, "Success", false) })
        })
    }
    else {
        response.success(req, res, "failed", false);
    }

})

router.get("/switchDBUsers/:email/:baseEmail", async function (req, res) {

    let tempArray = [];
    tempArray.push(req.params.baseEmail)
    mongoose.disconnect().then(() => {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
            () => {
                let db = mongoose.connection.db; // <-- This is your MongoDB driver instance.
                // console.log("db",db);
                db.collection("user_details").updateOne({ email: req.params.email }, { $addToSet: { emailArray: req.params.baseEmail } });
                response.success(req, res, "Success", true)
            },
            err => { response.success(req, res, "Success", false) })
    })
})


router.get("/productInStock/:id/:value/:type", authenticateToken, async function (req, res) {
    // console.log("I am req",req.params)

    let product = await ProductDetail.findOne({"product_id": req.params.id}),result;
    let availableProduct = {
        "productCount":product.stock,
        "productName":product.product_name,
        "status":(Number(product.stock) < Number(req.params.value))?false:true
    } 
   if(req.params.type == "dealsCreated")
   {
    if(Number(product.stock) < Number(req.params.value))
    response.success(req, res, "failed", availableProduct);
    else
    response.success(req, res, "Success", availableProduct); 
   }
    else if(req.params.type != "return"){
    if(Number(product.stock) < Number(req.params.value))
    response.success(req, res, "failed", availableProduct);
    else
    {
      if((Number(product.stock) -  Number(req.params.value) == 0))
      await ProductDetail.updateOne({ 'product_id': req.params.id }, { $set: { "availability": "no"} });
      result = await ProductDetail.updateOne({ 'product_id': req.params.id }, { $set: { "stock": (Number(product.stock) -  Number(req.params.value))} });
      response.success(req, res, "Success", availableProduct); 
    }
   }
   else
   {
     let k = await ProductDetail.updateOne({ 'product_id': req.params.id }, { $set: { "product_returned_total": (Number(product.product_returned_total) +  Number(req.params.value))} });
     response.success(req, res, "Success", true);   
   }
   

})

router.get("/fetchInvoices/:id", authenticateToken, async function (req, res) {
    let userInvoices = await InvoiceDetails.find({'object_id': req.params.id});
    console.log("userInvoices",userInvoices)
    if(userInvoices.length>0)
    response.success(req, res, "Success", userInvoices);
    else
    response.success(req, res, "Success", false);
    
})
router.get("/fetchPurchases/:id", authenticateToken, async function (req, res) {
    let userInvoices = await PurchaseDetail.find({'supplier_id': req.params.id});
    console.log("userInvoices",userInvoices)
    if(userInvoices.length>0)
    response.success(req, res, "Success", userInvoices);
    else
    response.success(req, res, "Success", false);
    
})
router.get("/addPurchases/:id/:value/:type", authenticateToken, async function (req, res) {
    let product = await ProductDetail.findOne({"product_id": req.params.id}),result;
    let availableProduct = {
        "productCount":product.stock,
        "productName":product.product_name,
        "status":(Number(product.stock) < Number(req.params.value))?false:true
    } 
    if(req.params.type == "addPurchase"){
      await ProductDetail.updateOne({ 'product_id': req.params.id }, { $set: { "stock": (Number(product.stock) + Number(req.params.value))} });
      response.success(req, res, "Success", availableProduct); 
    
   }
   else
   {
    let k = await ProductDetail.updateOne({ 'product_id': req.params.id }, { $set: { "product_returned_total": (Number(product.product_returned_total) +  Number(req.params.value))} });
    response.success(req, res, "Success", true);   
   }
   

})

router.get("/getFreeTrialDays/", async function (req, res) {
    let organisationDetails = await OrganisationSchema.find();
  
    response.success(req, res, "Success", organisationDetails);
    
    
})


router.put("/UpdateFreeTrialDays/:id", authenticateToken, async function (req, res) {
    try {
        let freeTrialDays = req.body.freeTrialDays;
        console.log("freeTrialDays",freeTrialDays);
        let result = await OrganisationSchema.updateOne({ _id: req.params.id }, { $set: { freeTrialDays: freeTrialDays } })
        response.success(req, res, "Success updateDeal", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


/*------Ogoulticketing*/

router.post("/addOgoulTicketing", authenticateToken,async function (req, res) {
    console.log("Enter: addOgoulTicketing");
    try {
        let ogoulticketDetail = new OgoulTicketDetail(req.body);
      
        ogoulticketDetail.ogoul_ticket_id = Date.now()
    
        let result = await ogoulticketDetail.save();
        console.log("Success");
        response.success(req, res, "Success OgoulTicketDetail", ogoulticketDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllOgoulTicketing", authenticateToken,async function (req, res) {
    console.log("Enter: getAllOgoulTicketing");
    try {
        let result = await OgoulTicketDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllOgoulTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getOgoulTicketing/:id",authenticateToken, async function (req, res) {
    console.log("Enter: getOgoulTicketing");
    try {
        console.log(req.params);
        let result = await OgoulTicketDetail.findOne({ 'ogoul_ticket_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getOgoulTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteOgoulTicketing", authenticateToken,async function (req, res) {
    try {
        let ogoul_ticket_id = req.body.ogoul_ticket_id;
        let result = await OgoulTicketDetail.deleteOne({ 'ogoul_ticket_id': ogoul_ticket_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteOgoulTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateOgoulTicketing",authenticateToken,async function (req, res) {
    try {
        let ogoul_ticket_id = req.body.ogoul_ticket_id;
        let result = await OgoulTicketDetail.updateOne({ 'ogoul_ticket_id': ogoul_ticket_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateOgoulTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 
router.post("/addPlans", authenticateToken, async function (req, res) {
    console.log("Enter: addPlans");
    try {
        console.log("BODY:", req.body);
        let r1 = await PlansDetail.findOne({ "plan": req.body.plan });
        if (r1 != null) {
            throw new Error("plan already exists.");
        }
        let planDetail = new PlansDetail(req.body);

        planDetail.plan_id = Date.now()

        let result = await planDetail.save();
        console.log("Success");
        response.success(req, res, "Success addPlans", planDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllPlans", authenticateToken, async function (req, res) {
    console.log("Enter: getAllPlans");
    try {
        let result = await PlansDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllPlans", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getPlans/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getPlans");
    try {
        console.log(req.params);
        let result = await PlansDetail.findOne({ 'plan_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getPlans", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deletePlans", authenticateToken, async function (req, res) {
    try {
        let plan_id = req.body.source_id;
        let result = await PlansDetail.deleteOne({ 'plan_id': plan_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deletePlans", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updatePlans", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await PlansDetail.findOne({ "plan": req.body.plan });
        if (r1 != null) {
            throw new Error("plan Name already exists.");
        }
        let plan_id = req.body.plan_id;
        let result = await PlansDetail.updateOne({ 'plan_id': plan_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updatePlans", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/sendMailToEmployee",authenticateToken,async function (req, res) {
    try {
        // console.log("body",req.body)
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey('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');
        const fs = require("fs");
        
        // var pdfDoc = printer.createPdfKitDocument(req.body.documentDefinition); 
        // pdfDoc.end()
        
        const msg = {
          to: req.body.email, // Change to your recipient
          from: 'yoonus-pk@ogoul.com', // Change to your verified sender
          subject: 'Pay Slip',
          text: 'PFA pay slip',
          
          attachments: [
            {
              content: req.body.base64,
              filename: 'PaySlip.pdf',
              type: "application/pdf",
              disposition: 'attachment',
              content_id: 'mytext'
            },
          ],
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log("Mail sent")
            response.success(req, res, "Success", true);
          })
          .catch((error) => {
            console.log("Mail err",error)
            response.success(req, res, "false", false);
          })
        
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

///Employee Section START 
router.post("/addEmployee", authenticateToken,async function (req, res) {
    console.log("Enter: addEmployee",req.body);

    try {
        let assigned_to;
        let r1 = await EmployeeDetailSchema.findOne({ "employee_id": req.body.employee_id });
        if(req.body.assigned_to != "self")
        assigned_to = await EmployeeDetailSchema.findOne({ "employee_id": Number(req.body.assigned_to) });
        if (r1 != null) {
            throw new Error("Email already exists.");
        }
        let employeeDetail = new EmployeeDetailSchema(req.body);
        employeeDetail.employee_id = Date.now();
        employeeDetail.global_search = employeeDetail.first_name;
        let result = await employeeDetail.save();
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey('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');
        emailData = {
            name:req.body.first_name,
            email:req.body.email,
            user_name: req.body.user_name,
            designation:req.body.designation, 
            employee_status:req.body.employee_status,
            leaves_available:30,
            assigned_to:req.body.assigned_to != "self"?assigned_to.first_name:req.body.assigned_to,
        }
        
        const msg = {
          to: employeeDetail.email, // Change to your recipient
          from: 'yoonus-pk@ogoul.com', // Change to your verified sender
          subject: 'Welcome To OgoulCRM',
          text: 'You are successfully registered to OgoulCRM',
          html: pug.renderFile(`${__dirname}/../core/emailTemplate.pug`, {
            emailData,
          }),
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch((error) => {
            console.error(error)
          })
        response.success(req, res, "Success", employeeDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllEmployees", authenticateToken,async function (req, res) {
    console.log("Enter: getAllEmployees");
    try {
        let result = await EmployeeDetailSchema.find().sort({ 'designation_weight': 1 });
        // console.log(result);
        response.success(req, res, "Success getAllEmployees", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/deleteEmployees", authenticateToken,async function (req, res) {
    try {
        let employee_id = req.body.employee_id;
        console.log(employee_id);
        let result = await EmployeeDetailSchema.deleteOne({ 'employee_id': employee_id }, req.body);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getEmployeeByID/:id", authenticateToken, async function (req, res) {
    try {
        let result = await EmployeeDetailSchema.findOne({ 'employee_id': req.params.id }, req.body);
        //  console.log("Success", result);
        response.success(req, res, "Success getCustomers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateEmployee",authenticateToken,async function (req, res) {
    try {
        let employee_id = req.body.employee_id;
        console.log(employee_id);
        let result = await EmployeeDetailSchema.updateOne({ 'employee_id': employee_id }, req.body);
        console.log("Success",result);
        response.success(req, res, "Success updateOgoulTicketing", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 
///Employee Section END 
///Holiday Section START 
router.post("/addHoliday", authenticateToken,async function (req, res) {
    console.log("Enter: addHoliday",req.body);

    try {
        let holidayeDetail = new HolidayDetailSchema(req.body);
        holidayeDetail.holiday_id = Date.now()
        holidayeDetail.global_search = holidayeDetail.holiday_name;
        let result = await holidayeDetail.save();
        response.success(req, res, "Success", holidayeDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllHolidays", authenticateToken,async function (req, res) {
    console.log("Enter: getAllHolidays");
    try {
        let result = await HolidayDetailSchema.find({});
        // console.log(result);
        response.success(req, res, "Success getAllHolidays", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateHoliday",authenticateToken,async function (req, res) {
    try {
        let holiday_id = req.body.holiday_id;
        console.log(holiday_id);
        let result = await HolidayDetailSchema.updateOne({ 'holiday_id': holiday_id }, req.body);
        console.log("Success",result);
        response.success(req, res, "Success update", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 
router.post("/deleteHoliday", authenticateToken,async function (req, res) {
    try {
        let holiday_id = req.body.holiday_id;
        console.log(holiday_id);
        let result = await HolidayDetailSchema.deleteOne({ 'holiday_id': holiday_id }, req.body);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getHolidayByID/:id", authenticateToken, async function (req, res) {
    try {
        let result = await HolidayDetailSchema.findOne({ 'holiday_id': req.params.id }, req.body);
        //  console.log("Success", result);
        response.success(req, res, "Success getCustomers", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
///Holiday Section END 
///Leave Section START 
router.post("/addLeave", authenticateToken,async function (req, res) {
    console.log("Enter: addLeave",req.body);

    try {
        let leaveDetail = new LeaveDetailSchema(req.body);
        leaveDetail.holiday_id = Date.now()
        let result = await leaveDetail.save();
        response.success(req, res, "Success", leaveDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllLeaves", authenticateToken,async function (req, res) {
    console.log("Enter: getAllLeaves");
    try {
        let result = await LeaveDetailSchema.find({});
        // console.log(result);
        response.success(req, res, "Success getAllLeaves", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateLeave",authenticateToken,async function (req, res) {
    try {
        let leave_id = req.body.leave_id;
        let result = await LeaveDetailSchema.updateOne({ 'leave_id': leave_id }, req.body);
        console.log("Success",result);
        response.success(req, res, "Success update", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 
router.post("/deleteLeave", authenticateToken,async function (req, res) {
    try {
        let leave_id = req.body.leave_id;
        let result = await LeaveDetailSchema.deleteOne({ 'leave_id': leave_id }, req.body);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getLeaveByID/:id", authenticateToken, async function (req, res) {
    try {
        let result = await LeaveDetailSchema.findOne({ 'leave_id': req.params.id }, req.body);
        //  console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getLeaveByEmailID/:id", authenticateToken, async function (req, res) {
    try {
        let result = await LeaveDetailSchema.find({ 'leave_mail': req.params.id });
        //  console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
///Leave Section END 
///Training Section START 
router.post("/addTraining", authenticateToken,async function (req, res) {
    console.log("Enter: addTraining",req.body);

    try {
        let trainingDetail = new TrainingDetailSchema(req.body);
        trainingDetail.training_id = Date.now()
        let result = await trainingDetail.save();
        response.success(req, res, "Success", trainingDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getAllTrainings", authenticateToken,async function (req, res) {
    console.log("Enter: getAllTrainings");
    try {
        let result = await TrainingDetailSchema.find({});
        // console.log(result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateTraining",authenticateToken,async function (req, res) {
    try {
        let training_id = req.body.training_id;
        let result = await TrainingDetailSchema.updateOne({ 'training_id': training_id }, req.body);
        response.success(req, res, "Success update", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 
router.post("/deleteTraining", authenticateToken,async function (req, res) {
    try {
        let training_id = req.body.training_id;
        let result = await TrainingDetailSchema.deleteOne({ 'training_id': training_id }, req.body);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.get("/getTrainingByID/:id", authenticateToken, async function (req, res) {
    try {
        let result = await TrainingDetailSchema.findOne({ 'training_id': req.params.id }, req.body);
        //  console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
///Training Section END 


//Travel START
router.post("/addTravel", authenticateToken, async function (req, res) {
    console.log("Enter: addTravel");
    try {
        let travelDetail = new TravelDetailSchema(req.body);

        travelDetail.travel_id = Date.now()

        let result = await travelDetail.save();
        console.log("Success");
        response.success(req, res, "Success travel", travelDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllTravel", authenticateToken, async function (req, res) {
    console.log("Enter: getAllTravel");
    try {
        let result = await TravelDetailSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllTravel", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getTravel/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getTravel");
    try {
        console.log(req.params);
        let result = await TravelDetailSchema.findOne({ 'travel_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteTravel", authenticateToken, async function (req, res) {
    try {
        let travel_id = req.body.travel_id;
        let result = await TravelDetailSchema.deleteOne({ 'travel_id': travel_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateTravel", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        
        let travel_id = req.body.travel_id;
        let result = await TravelDetailSchema.updateOne({ 'travel_id': travel_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
//Travel END
//Candidate START
router.post("/addCandidate", authenticateToken, async function (req, res) {
    console.log("Enter: addCandidate");
    try {
        let candidateDetail = new CandidateDetailSchema(req.body);

        candidateDetail.candidate_id = Date.now()
        candidateDetail.candidate_status = "New";
        let result = await candidateDetail.save();
        console.log("Success");
        response.success(req, res, "Success travel", candidateDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllCandidate", authenticateToken, async function (req, res) {
    console.log("Enter: getAllCandidate");
    try {
        let result = await CandidateDetailSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllCandidate", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getCandidate/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getCandidate");
    try {
        console.log(req.params);
        let result = await CandidateDetailSchema.findOne({ 'candidate_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteCandidate", authenticateToken, async function (req, res) {
    try {
        let candidate_id = req.body.candidate_id;
        let result = await CandidateDetailSchema.deleteOne({ 'candidate_id': candidate_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateCandidate", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        
        let candidate_id = req.body.candidate_id;
        let result = await CandidateDetailSchema.updateOne({ 'candidate_id': candidate_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
//Candidate END
//Attendance START 
router.post("/addAttendance", authenticateToken, async function (req, res) {
    console.log("Enter: addProject");
    try {
        let attendanceDetail = new AttendanceDetailSchema(req.body);

        attendanceDetail.attendance_id = Date.now()
        let result = await attendanceDetail.save();
        console.log("Success");
        response.success(req, res, "Success travel", attendanceDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllAttendances", authenticateToken, async function (req, res) {
    console.log("Enter: getAllAttendances");
    try {
        let result = await AttendanceDetailSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllAttendances", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getAttendance/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getProject");
    try {
        console.log(req.params);
        let result = await AttendanceDetailSchema.findOne({ 'attendance_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteAttendance", authenticateToken, async function (req, res) {
    try {
        let attendance_id = req.body.attendance_id;
        let result = await AttendanceDetailSchema.deleteOne({ 'attendance_id': attendance_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateAttendance", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let leavetypeDetail = new LeaveTypeDetailSchema(req.body);

        let attendance_id = req.body.attendance_id;
        let result = await AttendanceDetailSchema.updateOne({ 'attendance_id': attendance_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
////Attendance  END

//Leave Type START 
router.post("/addLeaveType", authenticateToken, async function (req, res) {
    console.log("Enter: addProject");
    try {
        let leavetypeDetail = new LeaveTypeDetailSchema(req.body);

        leavetypeDetail.leavetype_id = Date.now()
        let result = await leavetypeDetail.save();
        console.log("Success");
        response.success(req, res, "Success travel", leavetypeDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllLeaveTypes", authenticateToken, async function (req, res) {
    console.log("Enter: getAllLeaveTypes");
    try {
        let result = await LeaveTypeDetailSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllLeaveTypes", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getLeaveType/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getProject");
    try {
        console.log(req.params);
        let result = await LeaveTypeDetailSchema.findOne({ 'leavetype_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteLeaveType", authenticateToken, async function (req, res) {
    try {
        let leavetype_id = req.body.leavetype_id;
        let result = await LeaveTypeDetailSchema.deleteOne({ 'leavetype_id': leavetype_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateLeaveType", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        
        let leavetype_id = req.body.leavetype_id;
        let result = await LeaveTypeDetailSchema.updateOne({ 'leavetype_id': leavetype_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
////Leave Type  END
//Task Management START 
router.post("/addTask", authenticateToken, async function (req, res) {
    console.log("Enter: addTask");
    try {
        let taskDetail = new TaskDetailSchema(req.body);
        taskDetail.task_id = Date.now()
        let result = await taskDetail.save();
        console.log("Success");
        response.success(req, res, "Success", taskDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllTasks", authenticateToken, async function (req, res) {
    console.log("Enter: getAllTasks");
    try {
        let result = await TaskDetailSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllTasks", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getTask/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getTask");
    try {
        console.log(req.params);
        let result = await TaskDetailSchema.findOne({ 'task_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteTask", authenticateToken, async function (req, res) {
    try {
        let task_id = req.body.task_id;
        let result = await TaskDetailSchema.deleteOne({ 'task_id': task_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateTask", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        
        let task_id = req.body.task_id;
        let result = await TaskDetailSchema.updateOne({ 'task_id': task_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
////Task Management   END

//Organisation Info START 
router.post("/addOrganisationInfo", authenticateToken, async function (req, res) {
    console.log("Enter: addTask");
    try {
        let orgInfoDetail = new OrganisationInfoDetailsSchema(req.body);
        orgInfoDetail.orginfo_id = Date.now()
        let result = await orgInfoDetail.save();
        console.log("Success");
        response.success(req, res, "Success", orgInfoDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllOrganisationInfoList", authenticateToken, async function (req, res) {
    console.log("Enter: getAllOrganisationInfoList");
    try {
        let result = await OrganisationInfoDetailsSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllOrganisationInfoList", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getOrganisationInfo/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getTask");
    try {
        console.log(req.params);
        let result = await OrganisationInfoDetailsSchema.findOne({ 'orginfo_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteOrganisationInfo", authenticateToken, async function (req, res) {
    try {
        let orginfo_id = req.body.orginfo_id;
        let result = await OrganisationInfoDetailsSchema.deleteOne({ 'orginfo_id': orginfo_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateOrganisationInfo", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        
        let orginfo_id = req.body.orginfo_id;
        let result = await OrganisationInfoDetailsSchema.updateOne({ 'orginfo_id': orginfo_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
////Organisation Info   END
//Payroll START 
router.post("/addPayroll", authenticateToken, async function (req, res) {
    console.log("Enter: addPayroll");
    try {
        let payrollDetail = new PayrollDetailSchema(req.body);

        payrollDetail.payroll_id = Date.now()
        let result = await payrollDetail.save();
        console.log("Success");
        response.success(req, res, "Success travel", payrollDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllPayrolls", authenticateToken, async function (req, res) {
    console.log("Enter: getAllPayrolls");
    try {
        let result = await PayrollDetailSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllPayrolls", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getPayrollByEmployeeID/:id", authenticateToken, async function (req, res) {
    console.log("Enter: ");
    try {
        console.log(req.params);
        let result = await PayrollDetailSchema.findOne({ 'employee_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
})
router.get("/getPayroll/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getProject");
    try {
        console.log(req.params);
        let result = await PayrollDetailSchema.findOne({ 'payroll_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deletePayroll", authenticateToken, async function (req, res) {
    try {
        let payroll_id = req.body.payroll_id;
        let result = await PayrollDetailSchema.deleteOne({ 'payroll_id': payroll_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updatePayroll", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        
        let payroll_id = req.body.payroll_id;
        let result = await PayrollDetailSchema.updateOne({ 'payroll_id': payroll_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
////Payroll  END
router.post("/addProject", authenticateToken, async function (req, res) {
    console.log("Enter: addProject");
    try {
        let projectDetail = new ProjectDetailSchema(req.body);

        projectDetail.project_id = Date.now();
        projectDetail.global_search = projectDetail.project_name;
        let result = await projectDetail.save();
        console.log("Success");
        response.success(req, res, "Success travel", projectDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllProjects", authenticateToken, async function (req, res) {
    console.log("Enter: getAllProjects");
    try {
        let result = await ProjectDetailSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllProjects", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getProject/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getProject");
    try {
        console.log(req.params);
        let result = await ProjectDetailSchema.findOne({ 'project_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteProject", authenticateToken, async function (req, res) {
    try {
        let project_id = req.body.project_id;
        let result = await ProjectDetailSchema.deleteOne({ 'project_id': project_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateProject", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        
        let project_id = req.body.project_id;
        let result = await ProjectDetailSchema.updateOne({ 'project_id': project_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/addDesignation", authenticateToken, async function (req, res) {
    console.log("Enter: addDesignation");
    try {
        console.log("BODY:", req.body);
        let r1 = await DesignationSchema.findOne({ "designation_name": req.body.designation_name });
        if (r1 != null) {
            throw new Error("Designation Name already exists.");
        }
        let designationDetail = new DesignationSchema(req.body);

        designationDetail.designation_id = Date.now()

        let result = await designationDetail.save();
        console.log("Success");
        response.success(req, res, "Success addDesignation", designationDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllDesignation", authenticateToken, async function (req, res) {
    console.log("Enter: getAllDesignation");
    try {
        let result = await DesignationSchema.find();
        console.log("Success");
        response.success(req, res, "Success getAllDesignation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getDesignation/:id", authenticateToken, async function (req, res) {
    console.log("Enter: getDesignation");
    try {
        console.log(req.params);
        let result = await DesignationSchema.findOne({ 'designation_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getDesignation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteDesignation", authenticateToken, async function (req, res) {
    try {
        let designation_id = req.body.designation_id;
        let result = await DesignationSchema.deleteOne({ 'designation_id': designation_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteDesignation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateDesignation", authenticateToken, async function (req, res) {
    try {
        console.log("BODY:", req.body);
        let r1 = await DesignationSchema.findOne({ "designation_name": req.body.designation_name });
        if (r1 != null) {
            throw new Error("Designation Name already exists.");
        }
        let designation_id = req.body.designation_id;
        let result = await DesignationSchema.updateOne({ 'designation_id': designation_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateDesignation", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});



//noticetab
router.post("/addNoticetab", authenticateToken,async function (req, res) {
    console.log("Enter: addNoticetab");
    try {
        let noticetabDetail = new NoticetabDetail(req.body);
      
        noticetabDetail.notice_tab_id = Date.now()
    
        let result = await noticetabDetail.save();
        console.log("Success");
        response.success(req, res, "Success noticetabDetail", noticetabDetail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllNoticetab", authenticateToken,async function (req, res) {
    console.log("Enter: getAllNoticetab");
    try {
        let result = await NoticetabDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllNoticetab", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getNoticetab/:id",authenticateToken, async function (req, res) {
    console.log("Enter: getNoticetab");
    try {
        console.log(req.params);
        let result = await NoticetabDetail.findOne({ 'notice_tab_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success NoticetabDetail", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteNoticetab", authenticateToken,async function (req, res) {
    try {
        let notice_tab_id = req.body.notice_tab_id;
        let result = await NoticetabDetail.deleteOne({ 'notice_tab_id': notice_tab_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteNoticetab", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateNoticetab",authenticateToken,async function (req, res) {
    try {
        let notice_tab_id = req.body.notice_tab_id;
        let result = await NoticetabDetail.updateOne({ 'notice_tab_id': notice_tab_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateNoticetab", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 



//empstatus

router.post("/addEmployeestatus", authenticateToken,async function (req, res) {
    console.log("Enter: addEmployeestatus");
    try {
        let employee_status_Detail = new EmployeestatusDetail(req.body);
      
        employee_status_Detail.employee_status_id = Date.now()
    
        let result = await employee_status_Detail.save();
        console.log("Success");
        response.success(req, res, "Success addEmployeestatus", employee_status_Detail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllEmployeestatus", authenticateToken,async function (req, res) {
    console.log("Enter: getAllEmployeestatus");
    try {
        let result = await EmployeestatusDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllEmployeestatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getEmployeestatus/:id",authenticateToken, async function (req, res) {
    console.log("Enter: getEmployeestatus");
    try {
        console.log(req.params);
        let result = await EmployeestatusDetail.findOne({ 'employee_status_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getEmployeestatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deleteEmployeestatus", authenticateToken,async function (req, res) {
    try {
        let employee_status_id = req.body.employee_status_id;
        let result = await EmployeestatusDetail.deleteOne({ 'employee_status_id': employee_status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deleteEmployeestatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updateEmployeestatus",authenticateToken,async function (req, res) {
    try {
        let employee_status_id = req.body.employee_status_id;
        let result = await EmployeestatusDetail.updateOne({ 'employee_status_id': employee_status_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updateEmployeestatus", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
}); 
//policy


router.post("/addPolicy", authenticateToken,async function (req, res) {
    console.log("Enter: addPolicy");
    try {
        let policy_detail = new PolicyDetail(req.body);
      
        policy_detail.policy_id = Date.now()
    
        let result = await policy_detail.save();
        console.log("Success");
        response.success(req, res, "Success addPolicy", policy_detail);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});


router.get("/getAllPolicy", authenticateToken,async function (req, res) {
    console.log("Enter: getAllPolicy");
    try {
        let result = await PolicyDetail.find();
        console.log("Success");
        response.success(req, res, "Success getAllPolicy", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.get("/getPolicy/:id",authenticateToken, async function (req, res) {
    console.log("Enter: getPolicy");
    try {
        console.log(req.params);
        let result = await PolicyDetail.findOne({ 'policy_id': req.params.id }, req.body);
        console.log("Success", result);
        response.success(req, res, "Success getPolicy", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

router.post("/deletePolicy", authenticateToken,async function (req, res) {
    try {
        let policy_id = req.body.policy_id;
        let result = await PolicyDetail.deleteOne({ 'policy_id': policy_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success deletePolicy", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});
router.post("/updatePolicy",authenticateToken,async function (req, res) {
    try {
        let policy_id = req.body.policy_id;
        let result = await PolicyDetail.updateOne({ 'policy_id': policy_id }, req.body);
        console.log("Success");
        response.success(req, res, "Success updatePolicy", result);
    } catch (error) {
        console.log("Failure:", error);
        response.serverError(req, res, error.message, error);
    }
});

//////////
module.exports = router;
