const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("my-store:index");
const cors = require("cors");
require("dotenv").config();

const routesApi = require("./routes");
const {
	errorHandler,
	logErrors,
	booErrorHandler,
	ormErrorHandler,
} = require("./middlewares/error.handler");
const { checkApiKey } = require("./middlewares/auth.handler");

const app = express();

// * Settings
app.set("port", process.env.PORT || 3000);
const whiteList = ["http://localhost:5500", "https://myapp.com"];
const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("No permitido"));
		}
	},
};

// * Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptions));

// * Routes
app.get("/", (req, res) => {
	res.send("welcome to the api store");
});

app.get("/ruta", checkApiKey, (req, res) => {
	res.send("Hola soy una ruta");
});

routesApi(app);

// * catch errors
app.use(logErrors);
app.use(ormErrorHandler);
app.use(booErrorHandler);
app.use(errorHandler);

// * running
app.listen(app.get("port"), () => {
	debug(`server is listening on http://localhost:${app.get("port")}`);
});
