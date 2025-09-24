const nodeMailer = require('nodemailer');

module.exports.sendEmail = async (message) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, 
    auth: {
      user: "drashtiapani4@gmail.com",
      pass: "hvil ivyu sbhn lnry",
    },
  });

  let res = await transporter.sendMail(message);
  return res;
};
