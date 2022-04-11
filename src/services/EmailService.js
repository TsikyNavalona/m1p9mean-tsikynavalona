const nodemailer = require("nodemailer");


function mailSending(subject:string , text:string){
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
      user:"ekaly.tsiky@gmail.com",
      pass:"ekaly0606!"
    },
    tls:{
      rejectUnauthorized: false
    }
  })

  let mailOptions = {
    from :"ekaly.tsiky@gmail.com",
    to :"ekaly.tsiky@gmail.com",
    subject :subject,
    text :text
  }
  transporter.sendMail(mailOptions, function(err,success){
    if(err){
      console.log(err);
    }else{
       console.log("email send");
    }
  })
}

//const EmailService = module.exports;
module.exports = {
  mailSending: mailSending,
};
