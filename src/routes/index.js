const express = require("express");

const productsRouter = require("./products.routes");
const usersRouter = require("./users.routes");
const categoriesRouter = require("./categories.routes");
const customersRouter = require("./customers.routes");
const ordersRouter = require("./orders.routes");
const authRouter = require("./auth.routes");
const profileRouter = require("./profile.routes");

function routerApi(app) {
	const router = express.Router();
	app.use("/api/v1", router);
	router.use("/products", productsRouter);
	router.use("/categories", categoriesRouter);
	router.use("/users", usersRouter);
	router.use("/customers", customersRouter);
	router.use("/orders", ordersRouter);
	router.use("/auth", authRouter);
	router.use("/profile", profileRouter);
}

module.exports = routerApi;
