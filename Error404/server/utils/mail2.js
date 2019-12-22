const nodemailer = require('nodemailer');

function configMail(emailId,user,pass,response){
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'guptarishuji@gmail.com',
        pass: '7027076310'
    }
    });

    // https://myaccount.google.com/lesssecureapps?pli=1

    // setup email data with unicode symbols
    let mailOptions = {
        from: '', // sender address
        to: emailId, // list of receivers
        subject: 'You are added as a new PoliceStation', // Subject line
        text:"Your USERNAME is "+user+"and password is"+ pass + ". Please login to portal to acess the service", // plain text body
        //html: `<b>${message} </b> ${name}` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Mail NOT Send ERROR.....",error);
            //response.send("Can't Send Mail , Some Error");
            //return console.log(error);
        }
        console.log("Mail Send SuccessFully.....");
       //response.send("Mail Send SuccessFully.....");
    });
});
}
module.exports = configMail;
