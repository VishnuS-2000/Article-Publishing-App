require('dotenv').config()
const nodemailer=require('nodemailer')
// const googleKey=require('../keys/google.json')
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;


console.log(process.env.REFRESH_TOKEN)

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject(err.message);
          }
          resolve(token);
        });
      });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          tls: {
            rejectUnauthorized: false
          }
        },
      });   
    
      return transporter;
  };




const sendMail=async(email,subject,text)=>{
    try{
    
    let emailTransporter = await createTransporter();
       
    await emailTransporter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:subject,
        html:text
    })

    console.log('Email sent successfully')
    }
    catch(err){
        console.log(err,'email not sent')
    }




}



module.exports.sendMail=sendMail
