const nodemailer = require("nodemailer");
const { config } = require("../config/config");
// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
	// create reusable transporter object using the default SMTP transport
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: config.mail_user,
			pass: config.mail_pass,
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Node mailer 👻"', // sender address
		to: "19161445@itoaxaca.edu.mx", // list of receivers
		subject: "Probando Nodemailer", // Subject line
		text: "Hello world", // plain text body
		html: "<b>Hello world?</b>", // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail();
