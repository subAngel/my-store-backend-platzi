const bcrypt = require("bcrypt");

async function desencriptar() {
	const myPassword = "admin123";
	const hash = "$2b$10$74cW4iC/gWucQ/hMJvoOHO6Zf0C16Rgw4S1g2mgDeuONQQbWGYaam";
	const isMatch = await bcrypt.compare(myPassword, hash);
	console.log(isMatch);
}

desencriptar();
