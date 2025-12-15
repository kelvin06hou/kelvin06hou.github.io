const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Setup multer to store uploaded files temporarily
const upload = multer({ dest: "uploads/" });

// Serve static HTML file
app.use(express.static(__dirname));

// POST route to send email with attachment
app.post("/send-email", upload.single("attachment"), async (req, res) => {
    // Use req.body for text fields, req.file for attachment
    const from = req.body.from;
    const password = req.body.password;
    const to = req.body.to;
    const subject = req.body.subject;
    const message = req.body.message;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: from, pass: password }
        });

        const mailOptions = {
            from,
            to,
            subject,
            text: message,
            html: message
        };

        if (req.file) {
            mailOptions.attachments = [
                {
                    filename: req.file.originalname,
                    path: req.file.path
                }
            ];
        }

        await transporter.sendMail(mailOptions);

        // delete uploaded file
        if (req.file) fs.unlinkSync(req.file.path);

        res.send("Email sent successfully!");
    } catch (err) {
        res.send("Failed to send email: " + err.message);
    }
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));

//node server.js