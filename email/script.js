const nodemailer = require('nodemailer');
const multiparty = require('multiparty');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const form = new multiparty.Form();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send(err.message);

    const to_email = fields.to_email[0];
    const subject = fields.subject[0];
    const message = fields.message[0];
    const attachmentFile = files.attachment ? files.attachment[0] : null;

    // Create transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // your Gmail
        pass: process.env.GMAIL_APP_PASSWORD // Gmail App Password
      }
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: to_email,
      subject: subject,
      text: message,
      attachments: attachmentFile ? [{
        filename: attachmentFile.originalFilename,
        path: attachmentFile.path
      }] : []
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
