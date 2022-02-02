let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'shreer1411@gmail.com',
        pass: 'fhfytytyt'
    },
    tls: { rejectUnauthorized: false }
});
const sendMail = async (to, sub,msg) => {
    const mailOptions = {
        from: 'shreer1411@gmail.com', // sender address
        to: to, // list of receivers
        subject: sub,// Subject line
        html: msg
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err);
            return false
        }
        
        else
          return true;
      });
}

module.exports = sendMail;