import nodemailer from "nodemailer" ;
import { emailTemplate } from "./EmailTemplate.js";

export const sendMail = async (email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "elsamadony345@gmail.com", 
        pass: "wkmv nbay cgps cbbw" , 
      },
    });
    // Define the email options
    let mailOptions = {
      from: '"samadony" <elsamadony345@gmail.com>', // Sender address
      to: email , // List of recipients
      subject: "Email Verification ✔", // Subject line
      text: "would you please verify your email ?", // Plain text body


      html: emailTemplate(email) // HTML body
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // You can see a preview URL if you use an Ethereal test account.
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.error("Error sending email:", error);
  }
};
