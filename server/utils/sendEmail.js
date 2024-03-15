import nodemailer from 'nodemailer'
const sendEmail = async function (email, subject, message){
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_HOST,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL, //sender address
        to: email,
        subject: subject, //subject line
        html: message, //html body
    }, (err) => {
        if(err){
            console.log(err.message);
        }
        else{
            console.log("Email sent");
        }
    })
};

export default sendEmail;