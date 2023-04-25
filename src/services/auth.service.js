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

	async sendRecovery(email) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized();
		}
		const payload = {
			sub: user.id,
		};
		const token = jwt.sign(payload, config.secret_key, { expiresIn: "15min" });
		const link = `http://myfrontend.com/recovery?token=${token}`;
		const mail = {
			from: "whoangel.agl@gmail.com", // * sender addres
			to: `${user.email}`,
			subject: "Email para recuperar contraseña",
			html: `
            <b>Ingresa a este link para generar una contraseña nueva</b>
            Tienes 15 minutos para cambiarla
            <h3>${link}</h3>
            `,
		};
		const rta = await this.sendMail(mail);
		return rta;
	}

	async sendMail(infoMail) {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: config.mail_user,
				pass: config.mail_pass,
			},
		});
		await transporter.sendMail(infoMail);

		return {
			message: "Mail sent",
		};
	}
}

module.exports = AuthService;
