require("dotenv").config(); // Load environment variables

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001; // Fix typo: POR -> PORT

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Use SMTP_HOST from .env
    port: process.env.SMTP_PORT, // Use SMTP_PORT from .env
    secure: process.env.SMTP_PORT == 465, // SSL for port 465
    auth: {
        user: process.env.SMTP_USER, // Use SMTP_USER from .env
        pass: process.env.SMTP_PASS, // Use SMTP_PASS from .env
    },
});

// Verify SMTP connection
transporter.verify((error) => {
    if (error) {
        console.error("SMTP connection error:", error);
    } else {
        console.log("SMTP server is ready to send emails.");
    }
});

// Email sending endpoint
app.post("/send-email", async (req, res) => {
    const { name, email, packageType, message } = req.body;

   const mailOptions = {
    from: `"${name}" <services@zaaric.com>`,  // Always send from your domain email
    replyTo: email,  // Allows the receiver to reply to the user's email
    to: process.env.RECEIVER_EMAIL, 
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPackage: ${packageType}\nMessage: ${message}`,
};


    try {
        // Try sending the email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        // Log the error with more details
        console.error("Error sending email:", error.message);
        console.error("Detailed error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send email.",
            error: error.message, // Send the error message back for more insights
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});