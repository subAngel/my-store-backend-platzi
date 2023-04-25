const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const UserService = require("./user.service");
const { config } = require("../config/config");

const service = new UserService();
class AuthService {
	async getUser(username, password) {
		const user = await service.findByUsername(username);
		if (!user) {
			throw boom.notFound();
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized();
		}
		delete user.dataValues.password;
		return user;
	}

	signToken(user) {
		const payload = {
			sub: user.id,
			role: user.role,
		};
		const token = jwt.sign(payload, config.secret_key);
		return {
			user,
			token,
		};
	}

	async sendMail(email) {
		const user = await service.findByEmail(email);
		if (!user) {
			// throw boom.notFound(`User with email '${email}' not found`,);
			throw boom.unauthorized();
		}
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: config.mail_user,
				pass: config.mail_pass,
			},
		});
		await transporter.sendMail({
			from: "whoangel.agl@gmail.com", // * sender addres
			to: `${user.email}`,
			subject: "Recuperacion de contraseña",
			text: "Recuperar contraseña",
			html: "<b> hola mundo </b> ",
		});

		return {
			message: "Mail sent",
		};
	}
}

module.exports = AuthService;
