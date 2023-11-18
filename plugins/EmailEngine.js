const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharan1241@gmail.com",
    pass: "afzo xlkc pklt qacu",
  },
});

async function sendMail(from, to, subject, body, html) {
  console.log("Sending email");
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: body,
    html: html,
  };
  try {
    const mail = await transport.sendMail({ ...mailOptions });
    console.log(mail);
  } catch (error) {
    console.log("Error sending mail", error);
  }
}
module.exports = {
  sendMail,
};