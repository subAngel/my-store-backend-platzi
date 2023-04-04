const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("my-store:index");
const cors = require("cors");

const routesApi = require("./routes");
const {
	errorHandler,
	logErrors,
	booErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
// * Settings
app.set("port", process.env.PORT || 3000);

// * Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// * Routes
app.get("/", (req, res) => {
	res.send("hello world");
});

routesApi(app);

app.use(logErrors);
app.use(booErrorHandler);
app.use(errorHandler);

// * running
app.listen(app.get("port"), () => {
	debug(`server is listening on http://localhost:${app.get("port")}`);
});
