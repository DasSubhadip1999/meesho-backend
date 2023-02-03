const nodemailer = require("nodemailer");

const sendMail = async (email, subject, text, html) => {
  let mailAccount = {
    user: process.env.USER,
    pass: process.env.PASS,
  };

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: mailAccount,
  });

  try {
    let info = await transporter.sendMail({
      from: mailAccount.user,
      to: email,
      subject,
      text,
      html,
    });

    return info.messageId;
  } catch (error) {
    console.log("err", error);
    return error;
  }
};

module.exports = sendMail;
