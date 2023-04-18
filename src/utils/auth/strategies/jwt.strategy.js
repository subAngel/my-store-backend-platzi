const { Strategy, ExtractJwt } = require("passport-jwt");
const { config } = require("../../../config/config");

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret_key,
};

const jwtStrategy = new Strategy(options, (payload, done) => {
	return done(null, payload);
});

module.exports = jwtStrategy;
